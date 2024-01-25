import { Injectable } from '@angular/core';
import { NgxAzhConfig } from 'projects/ngx-azh-notify/src/lib/ngx-azh-config';
import { NgxAzhNotifyPosition } from 'projects/ngx-azh-notify/src/lib/ngx-azh-notify-position';

@Injectable()
export class AppConfig extends NgxAzhConfig {

  override delay = 3000;

  override position = NgxAzhNotifyPosition.BottomRight;

  override freeze = false;
}
