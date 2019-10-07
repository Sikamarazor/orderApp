import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletefooditemsComponent } from './deletefooditems.component';

describe('DeletefooditemsComponent', () => {
  let component: DeletefooditemsComponent;
  let fixture: ComponentFixture<DeletefooditemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletefooditemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletefooditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
