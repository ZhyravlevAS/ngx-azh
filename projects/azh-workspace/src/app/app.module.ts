import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppConfig } from 'projects/azh-workspace/src/app/app.config';
import { ModalComponent } from 'projects/azh-workspace/src/app/modal/modal.component';
import { NgxAzhModalModule } from 'projects/ngx-azh-modal/src/lib/ngx-azh-modal.module';
import { NgxAzhConfig } from 'projects/ngx-azh-notify/src/lib/ngx-azh-config';
import { NgxAzhNotifyModule } from 'projects/ngx-azh-notify/src/lib/ngx-azh-notify.module';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        ModalComponent,
    ],
    imports: [
        BrowserModule,
        NgxAzhModalModule,
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
