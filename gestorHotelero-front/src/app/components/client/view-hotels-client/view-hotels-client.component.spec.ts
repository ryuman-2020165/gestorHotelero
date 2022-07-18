import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHotelsClientComponent } from './view-hotels-client.component';

describe('ViewHotelsClientComponent', () => {
  let component: ViewHotelsClientComponent;
  let fixture: ComponentFixture<ViewHotelsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHotelsClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHotelsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
