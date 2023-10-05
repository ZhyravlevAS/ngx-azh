import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAzhConfig, NgxAzhNotifyModule } from 'ngx-azh-notify';
import { AppConfig } from 'projects/azh-workspace/src/app/app.config';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxAzhNotifyModule,
  ],
  providers: [
    {
      provide: NgxAzhConfig,
      useClass: AppConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
