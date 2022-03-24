const mysql=require("mysql");
const express= require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
const bcrypt=require("bcryptjs");
const { sign }= require("jsonwebtoken");
const multer=require('multer');
var fileExtension=require('file-extension');
const path = require('path');
const fileFolder = 'my_uploaded_files';

const app=express();
app.use(bodyParser.json());
// app.use(cors({
//     origin: "http://localhost:4200"
// }))

const db= mysql.createConnection({
    host : "localhost",
    user : "root",
    password: "joypassword1",
    database: "foodhub"
});
//Connect To MySQL
db.connect((err)=>{
    if(err){
        throw err
    }

        console.log("MySQL Connected");




});
//Create DataBase
// app.get("/createdb",(req,res)=>{
//     let sql=" CREATE DATABASE foodhub";
//     db.query(sql, (err)=>{
//         if(err){
//             throw err;
//         }
//         res.send("Database Created")
//     })
// })
// app.get("/additem",(req,res)=>{
//     let sql=" CREATE TABLE items(id int AUTO_INCREMENT, name VARCHAR(255), price int, PRIMARY KEY(id))"
//     db.query(sql, (err)=>{
//         if(err){
//             throw err;
//         }
//         res.send("Items Table Created")
//     })
// })
//Insert Record
app.post("/api/insertitem",(req,res)=>{

    let request = req.body.request;

    console.log('========', request.name)

    let post={name: request.name, price:request.price, image: request.image}
    let sql=" INSERT INTO foodhub.items SET ?"
    let querry=db.query(sql,post, (err)=>{
        if(err){
            throw err;
        }
        res.send("Items Inserted")
    })
})
//get list of all items
app.get("/api/get/items",(req,res)=>{

    let sql=" SELECT * FROM items"
    let querry=db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results)


        let response = successResponse('getitems', results);
        res.send(response);
    })
})
//get item
app.get("/api/get/item/:id",(req,res)=>{

    let sql=`SELECT * FROM items WHERE id = ${req.params.id}`;
    let querry=db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results[0])


        let response = successResponse('getitem', results[0]);
        res.send(response);
    })
})

app.use("/api/images", express.static(path.join("my_uploaded_files")))



//Update Employee
app.post("/api/update/item/:id",(req,res)=>{

    let request = req.body.request;

    console.log('========', request.name)



    let sql=`UPDATE items SET name = "${request.name}" , price = "${request.price}" WHERE id = "${req.params.id}"`;

    let querry=db.query(sql,err=>{
        if(err){
            throw err;
        }

        res.send("Items Updated")
    })
})
//Delete record
app.get("/api/delete/item/:id",(req,res)=>{


   let sql=`DELETE FROM items WHERE id = ${req.params.id}`;

   let querry=db.query(sql,err=>{
       if(err){
           throw err;
       }

       res.send("items DELETED")
   })
})

//Register user
app.post("/api/register/users",(req,res)=>{
    let request = req.body.request;
    let errorArray = [];
    if( !request.name || !request.password || !request.email){


        if(!request.name) {
            errorArray.push('name')
        }
        if(!request.email) {
            errorArray.push('email')
        }
        if(!request.password) {
            errorArray.push('password')
        };

        let customError = `${errorArray.join(",")} cannot be empty`




        res.status(400).send(errorResponse('register user', customError));
        return
    }
    let post={name: request.name, password:(request.password), email: request.email}
    let sql=" INSERT INTO foodhub.users SET ?"
    let querry=db.query(sql, post, (err)=>{
        if(err){
            throw err;
        }
        res.send("User Inserted"+request.password)
    })
})

// function hashPassword(password){
//     //return bcrypt.hashSync(password, 10);
//   return password;
// }
// function isValid(password){
//     return bcrypt.compareSync(hashedpassword, this.password)
// }

//verify user
app.post("/api/verify/users",(req,res)=>{
    let request = req.body.request;
   // const password = hashPassword(request.password);
    let sql=`SELECT * FROM foodhub.users WHERE email = '${request.email}' and password = '${request.password}'`;
    let querry=db.query(sql,(err,results)=>{
        if(err){
            res.err('verification failed');
        }
        // console.log('========', results)
        if (!results[0]) {
            res.status(400).send(errorResponse('verify user', 400) + password);
        } else {
            // create token let token =
            // let token=jwt.sign({username:request.username},'secret',{expiresIn : '3h'});
            // insert token to db
            // create custom object let res = userid: results[0].id, token: token}
           let secret="qwe1234";

            const jsontoken= sign({result:results[0]}, secret,{
                expiresIn: "1h"
            });
            console.log('jsontoken', jsontoken)


            let response = successResponse('verify user', {token: jsontoken});
            res.send(response);
        }
    });
//     const result=bcrypt.compareSync(request.password, results.password);
//     if(result){
//         results.password= undefined;
//         const jsontoken= sign({result:results}, "qwe1234",{
//             expiresIn: "1h"
//         });
//         return res.json({
//             success: 1,
//             message: "login successfully",
//             token: jsontoken
//         });
//     }else{
//    return res.json({
//      success: 0,
//      data: "invalid email or password"
//    });
    // }
});




// //sign in
// app.post("/api/signin", function(req,res,next) {
//     let promise=user.findOne({email:req.body.email}).exec();

//     promise.then(function(doc){

//         if(doc){
//         if(doc.isValid(req.body.password)){
//            let token=jwt.sign({username:doc.username},'secret',{expiresIn : '3h'});
//               return res.status(200).json(token);

//         }else{
//             return res.status(501).json({message:'Invalid Credentials'});
//         }
//     }
//     else{
//         return res.status(501).json({message:'User email is not regitered'})
//     }
//     });
//     promise.catch(function(err){
//      return res.status(501).json({message:'some internal issue'})
//     })
// })





//get all users
app.get("/api/get/users",(req,res)=>{

    let sql=" SELECT * FROM foodhub.users"
    let querry=db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results)


        let response = successResponse('getusers', results);
        res.send(response);
    })
})
//Delete Users
app.get("/api/delete/user/:id",(req,res)=>{


    let sql=`DELETE FROM foodhub.users WHERE id = ${req.params.id}`;

    let querry=db.query(sql,err=>{
        if(err){
            throw err;
        }

        res.send("User DELETED")
    })
 })


 //Register Admins
 app.post("/api/register/admins",(req,res)=>{
    let request = req.body.request;
    let errorArray = [];
    if( !request.name || !request.password || !request.email){


        if(!request.name) {
            errorArray.push('name')
        }
        if(!request.email) {
            errorArray.push('email')
        }
        if(!request.password) {
            errorArray.push('password')
        };

        let customError = `${errorArray.join(",")} cannot be empty`




        res.status(400).send(errorResponse('register admin', customError));
        return
    }
    let post={name: request.name, password:(request.password), email: request.email}
    let sql=" INSERT INTO foodhub.admins SET ?"
    let querry=db.query(sql,post, (err)=>{
        if(err){
            throw err;
        }
        res.send("Admin Inserted")
    })
})

// function hashPassword(password){
//     return bcrypt.hashSync(password, 10);

// }
// function isValid(password){
//     return bcrypt.compareSync(hashedpassword, this.password)
// }

//Verify Admins
app.post("/api/verify/admins",(req,res)=>{
    let request = req.body.request;
    let sql=`SELECT * FROM foodhub.admins WHERE email = '${request.email}' and password = '${request.password}'`;
    let querry=db.query(sql,(err,results)=>{
        if(err){
            res.err('verification failed');
        }
        // console.log('========', results)
        if (!results[0]) {
            res.status(400).send(errorResponse('verify admin', 400));
        } else {
            // create token let token =
            // let token=jwt.sign({username:request.username},'secret',{expiresIn : '3h'});
            // insert token to db
            // create custom object let res = userid: results[0].id, token: token}
           let secret="qwe12345";

            const jsontoken= sign({result:results[0]}, secret,{
                expiresIn: "1h"
            });
            console.log('jsontoken', jsontoken)


            let response = successResponse('verify admin', {token: jsontoken});
            res.send(response);
        }
    });

});

//Get Admins

app.get("/api/get/admins",(req,res)=>{

    let sql=" SELECT * FROM foodhub.admins"
    let querry=db.query(sql,(err,results)=>{
        if(err){
            throw err;
        }
        console.log(results)


        let response = successResponse('getadmins', results);
        res.send(response);
    })
})

//delete Admins

app.get("/api/delete/admin/:id",(req,res)=>{


    let sql=`DELETE FROM foodhub.admins WHERE id = ${req.params.id}`;

    let querry=db.query(sql,err=>{
        if(err){
            throw err;
        }

        res.send("Admin DELETED")
    })
 })













var storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, fileFolder)
    },
     filename: function(req,file,cb){
         cb(null,file.fieldname+'-'+ Date.now()+ '.'+fileExtension(file.originalname))
     }

})

var upload=multer({
    storage: storage,
    limits:{
        fileSize: 3000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            cb(new Error('Please upload Jpg and PNG images only'))
        }
        cb(undefined, true)
    }
})

app.post('/api/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})





app.listen(3000,()=>{
    console.log("server started on port 3000 ")
});


function successResponse(id, data) {
    return {
        "id": id,
        "version": "1.0.0",
        "datetime": "2016-10-06T19:55:10Z",
        "timestamp": 1475783710372391716,
        "status": "success",
        "code": 200,
        "message": "OK",
        "data": data
    }
}

function errorResponse(id, customError) {
    return {
        "id": id,
        "version": "1.0.0",
        "datetime": "2016-10-06T19:55:10Z",
        "timestamp": 1475783710372391716,
        "status": "error",
        "code": 400,
        "message": "OK",
        "errorMessage": customError
    }
}
