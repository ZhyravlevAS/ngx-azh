export interface NgxAzhNotifyProperties {

  /**
   * Header of the notification.
   * Undefined by default.
   * @type string
   */
  header?: string | undefined;

  /**
   * How long the notification will be shown.
   * Value in milliseconds.
   * 5000 by default.
   * @type number
   */
  delay?: number | undefined;

  /**
   * An object describing the button.
   * Undefined by default.
   * @type NgxAzhNotifyPropertiesButton
   */
  button?: NgxAzhNotifyPropertiesButton | undefined;

  /**
   * Do not hide the notification if the mouse is over it.
   * True by default.
   * @type boolean
   */
  freeze?: boolean | undefined;
}

/**
 * An object describing the button.
 */
export interface NgxAzhNotifyPropertiesButton {
  /**
   * The function to be executed when the button is pressed.
   * @type function
   */
  fn: () => void;

  /**
   * Button text.
   * @type string
   */
  text: string;
}
