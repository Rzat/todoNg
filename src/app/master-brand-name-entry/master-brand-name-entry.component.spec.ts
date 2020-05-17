import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBrandNameEntryComponent } from './master-brand-name-entry.component';

describe('MasterBrandNameEntryComponent', () => {
  let component: MasterBrandNameEntryComponent;
  let fixture: ComponentFixture<MasterBrandNameEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterBrandNameEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBrandNameEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
