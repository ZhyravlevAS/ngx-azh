import { Injectable } from '@angular/core';
import { NgxAzhModalOptionsInterface, NgxAzhModalSizeEnum } from 'projects/ngx-azh-modal/src/lib/ngx-azh-modal';

@Injectable()
export class AppModalConfig implements NgxAzhModalOptionsInterface {
    public size: NgxAzhModalSizeEnum = NgxAzhModalSizeEnum.SMALL;
    public dontShowAgainId: string | undefined = undefined;
    public notClosed: boolean = false;
    public closeWhileNavigating: boolean = true;
}