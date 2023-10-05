import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAzhNotifyElementComponent } from './ngx-azh-notify-element.component';

describe('NgxAzhNotifyElementComponent', () => {
  let component: NgxAzhNotifyElementComponent;
  let fixture: ComponentFixture<NgxAzhNotifyElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAzhNotifyElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAzhNotifyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
