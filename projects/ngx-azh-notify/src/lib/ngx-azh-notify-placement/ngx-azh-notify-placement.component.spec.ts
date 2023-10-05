import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAzhNotifyPlacementComponent } from './ngx-azh-notify-placement.component';

describe('NgxAzhNotifyPlacementComponent', () => {
  let component: NgxAzhNotifyPlacementComponent;
  let fixture: ComponentFixture<NgxAzhNotifyPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAzhNotifyPlacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAzhNotifyPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
