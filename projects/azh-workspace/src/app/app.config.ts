import { Injectable } from '@angular/core';
import { NgxAzhConfig, NgxAzhNotifyPosition } from 'ngx-azh-notify';

@Injectable()
export class AppConfig extends NgxAzhConfig {

  override delay = 3000;

  override position = NgxAzhNotifyPosition.BottomRight;

  override freeze = false;
}
