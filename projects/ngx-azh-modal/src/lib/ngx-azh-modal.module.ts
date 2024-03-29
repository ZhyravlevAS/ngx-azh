import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxAzhModalConfig, NgxAzhModalConfigToken } from './ngx-azh-modal-config';
import { NgxAzhModalPlacementComponent } from './ngx-azh-modal-placement.component';

@NgModule({
  imports: [CommonModule],
  exports: [NgxAzhModalPlacementComponent],
  declarations: [NgxAzhModalPlacementComponent],
  providers: [
    {
      provide: NgxAzhModalConfigToken,
      useClass: NgxAzhModalConfig
    }
  ]
})
export class NgxAzhModalModule {

  /**
   *
   * @param parentModule
   */
  constructor(@Optional() @SkipSelf() parentModule?: NgxAzhModalModule) {
    if (parentModule) {
      throw new Error(
          'NgxAzhModalModule is already loaded. Import it in the AppModule only');
    }
  }
}
