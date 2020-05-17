import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPurchaseComponent } from './daily-purchase.component';

describe('DailyPurchaseComponent', () => {
  let component: DailyPurchaseComponent;
  let fixture: ComponentFixture<DailyPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
