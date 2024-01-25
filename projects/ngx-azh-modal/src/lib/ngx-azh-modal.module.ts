import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxAzhModalHostDirective } from './ngx-azh-modal-host.directive';
import { NgxAzhModalPlacementComponent } from './ngx-azh-modal-placement.component';

@NgModule({
  imports: [CommonModule],
  exports: [NgxAzhModalHostDirective, NgxAzhModalPlacementComponent],
  declarations: [NgxAzhModalHostDirective, NgxAzhModalPlacementComponent],
})
export class NgxAzhModalModule {}
