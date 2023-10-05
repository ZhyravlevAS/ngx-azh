import { NgxAzhNotifyPosition } from './ngx-azh-notify-position';

/**
 * Notification configuration class.
 */
export class NgxAzhConfig {

  /**
   * How long the notification will be shown.
   * Value in milliseconds.
   * 5000 by default.
   */
  public delay: number = 5000;


  /**
   * Position of notifications. Installed globally for everyone.
   * Cannot be set for single notification. Use the NgxAzhNotifyPosition enums.
   * Top right by default.
   */
  public position: NgxAzhNotifyPosition = NgxAzhNotifyPosition.TopRight;

  /**
   * Do not hide the notification if the mouse is over it.
   * True by default.
   */
  public freeze: boolean = true;
}
