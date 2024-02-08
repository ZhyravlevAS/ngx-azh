import { NgxAzhModalResultSubject } from './ngx-azh-modal-result-subject';

/**
 * Every modal window must implement this interface.
 */
export interface NgxAzhModalComponentInterface<ResultT = any> {
  /**
   * You can subscribe to get the result of the modal window.
   *
   * You don't need to unsubscribe from "result".
   * This happens automatically.
   * See the source code of ModalResultSubject.
   */
  result: NgxAzhModalResultSubject<ResultT>;
}

/**
 * Interface describing the result of a modal window.
 */
export interface NgxAzhModalResultInterface<ResultT> {
  /**
   * Reason why the window was closed.
   */
  reason: NgxAzhModalReasonEnum;

  /**
   * Data to transfer.
   */
  value?: ResultT;

  /**
   * Return true if you no longer wish to show this window to the user.
   * The `dontShowAgainId` property must be passed in the window options when it is created.
   */
  dontShowAgain?: boolean;
}

/**
 * Modal window options.
 */
export interface NgxAzhModalOptionsInterface {
  /**
   * Window dimensions
   */
  size?: NgxAzhModalSizeEnum;

  /**
   * Window ID if you want to use "don't show anymore".
   */
  dontShowAgainId?: string;

  /**
   * True if the window cannot be closed by ESC or by clicking outside of it.
   */
  notClosed?: boolean;

  /**
   * Close the window when you navigate the app from one route to another.
   */
  closeWhileNavigating?: boolean;
}

/**
 * Reasons why the window was closed
 */
export enum NgxAzhModalReasonEnum {
  ESCAPE, // closed by ESC
  BACKDROP, // closed by clicking outside
  NAVIGATION, // closed by navigation
  CANCEL, // closed by ModalResultSubject.cancel()
  CONFIRM, // closed by ModalResultSubject.confirm()
}

/**
 * Window dimensions
 */
export enum NgxAzhModalSizeEnum {
  SMALL,
  MEDIUM,
  LARGE,
  FULLSCREEN,
}
