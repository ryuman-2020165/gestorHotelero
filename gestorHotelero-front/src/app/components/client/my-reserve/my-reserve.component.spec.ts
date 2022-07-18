import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReserveComponent } from './my-reserve.component';

describe('MyReserveComponent', () => {
  let component: MyReserveComponent;
  let fixture: ComponentFixture<MyReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReserveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
