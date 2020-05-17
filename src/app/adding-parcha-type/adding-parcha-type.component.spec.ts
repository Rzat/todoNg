import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingParchaTypeComponent } from './adding-parcha-type.component';

describe('AddingParchaTypeComponent', () => {
  let component: AddingParchaTypeComponent;
  let fixture: ComponentFixture<AddingParchaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingParchaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingParchaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
