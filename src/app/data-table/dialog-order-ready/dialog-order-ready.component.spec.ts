import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderReadyComponent } from './dialog-order-ready.component';

describe('DialogOrderReadyComponent', () => {
  let component: DialogOrderReadyComponent;
  let fixture: ComponentFixture<DialogOrderReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOrderReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrderReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
