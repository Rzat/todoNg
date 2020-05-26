import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueStockComponent } from './issue-stock.component';

describe('IssueStockComponent', () => {
  let component: IssueStockComponent;
  let fixture: ComponentFixture<IssueStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
