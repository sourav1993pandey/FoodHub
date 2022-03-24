import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WayToComponent } from './way-to.component';

describe('WayToComponent', () => {
  let component: WayToComponent;
  let fixture: ComponentFixture<WayToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WayToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WayToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
