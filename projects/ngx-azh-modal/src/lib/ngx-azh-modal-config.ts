import { Injectable, InjectionToken } from '@angular/core';
import { NgxAzhModalOptionsInterface, NgxAzhModalSizeEnum } from './ngx-azh-modal';

@Injectable()
export class NgxAzhModalConfig implements NgxAzhModalOptionsInterface {
    public size: NgxAzhModalSizeEnum = NgxAzhModalSizeEnum.SMALL;
    public dontShowAgainId: string | undefined = undefined;
    public notClosed: boolean = false;
    public closeWhileNavigating: boolean = true;
}

export const NgxAzhModalConfigToken = new InjectionToken<NgxAzhModalOptionsInterface>('NgxAzhModalConfig');