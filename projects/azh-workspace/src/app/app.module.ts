import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppModalConfig} from 'projects/azh-workspace/src/app/app-modal-config';
import {AppConfig} from 'projects/azh-workspace/src/app/app.config';
import {ModalComponent} from 'projects/azh-workspace/src/app/modal/modal.component';
import {NgxAzhModalConfigToken} from 'projects/ngx-azh-modal/src/lib/ngx-azh-modal-config';
import {NgxAzhModalModule} from 'projects/ngx-azh-modal/src/lib/ngx-azh-modal.module';
import {NgxAzhConfig} from 'projects/ngx-azh-notify/src/lib/ngx-azh-config';
import {NgxAzhNotifyModule} from 'projects/ngx-azh-notify/src/lib/ngx-azh-notify.module';

import {AppComponent} from './app.component';
import {NgxAzhDropdownModule} from "projects/ngx-azh-dropdown/src/lib/ngx-azh-dropdown.module";

@NgModule({
  declarations: [AppComponent, ModalComponent,],
  imports: [
    BrowserModule,
    NgxAzhModalModule,
    NgxAzhNotifyModule,
    NgxAzhDropdownModule,
  ],
  providers: [{
    provide: NgxAzhConfig, useClass: AppConfig,
  }, {
    provide: NgxAzhModalConfigToken, useClass: AppModalConfig
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
