import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBrandListComponent } from './master-brand-list.component';

describe('MasterBrandListComponent', () => {
  let component: MasterBrandListComponent;
  let fixture: ComponentFixture<MasterBrandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBrandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBrandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
