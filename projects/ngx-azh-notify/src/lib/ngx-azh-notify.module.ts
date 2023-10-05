import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxAzhNotifyElementComponent } from './ngx-azh-notify-element/ngx-azh-notify-element.component';
import { NgxAzhNotifyHostDirective } from './ngx-azh-notify-host.directive';
import { NgxAzhNotifyPlacementComponent } from './ngx-azh-notify-placement/ngx-azh-notify-placement.component';


@NgModule({
  declarations: [
    NgxAzhNotifyPlacementComponent,
    NgxAzhNotifyElementComponent,
    NgxAzhNotifyHostDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxAzhNotifyPlacementComponent,
    NgxAzhNotifyElementComponent,
    NgxAzhNotifyHostDirective,
  ],
})
export class NgxAzhNotifyModule {

  /**
   *
   * @param parentModule
   */
  constructor(@Optional() @SkipSelf() parentModule?: NgxAzhNotifyModule) {
    if (parentModule) {
      throw new Error(
        'NgxAzhNotifyModule is already loaded. Import it in the AppModule only');
    }
  }
}
