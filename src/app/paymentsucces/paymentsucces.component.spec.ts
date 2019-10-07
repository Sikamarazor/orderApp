import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsuccesComponent } from './paymentsucces.component';

describe('PaymentsuccesComponent', () => {
  let component: PaymentsuccesComponent;
  let fixture: ComponentFixture<PaymentsuccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsuccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsuccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
