import { NgxAzhModalReasonEnum, NgxAzhModalResultInterface } from './ngx-azh-modal';
import { Subject } from 'rxjs';

export class NgxAzhModalResultSubject<ResultT> extends Subject<NgxAzhModalResultInterface<ResultT>> {
  
  /**
   * To confirm the window.
   * @param value - Data to transfer.
   * @param dontShowAgain - Return true if you don't want to show the window anymore.
   */
  public confirm(value: ResultT, dontShowAgain?: boolean): void {
    super.next({
      reason: NgxAzhModalReasonEnum.CONFIRM,
      value,
      dontShowAgain,
    });

    super.complete();
  }
  
  /**
   * To cancel the window.
   * @param value - Data to transfer.
   * @param dontShowAgain - Return true if you don't want to show the window anymore.
   */
  public cancel(value?: ResultT, dontShowAgain?: boolean): void {
    super.next({
      reason: NgxAzhModalReasonEnum.CANCEL,
      value,
      dontShowAgain,
    });

    super.complete();
  }
  
  /**
   * When you pressed escape and the window was closed.
   * This doesn't work if you passed `notClosed` as an object when creating the window.
   */
  public escape(): void {
    super.next({
      reason: NgxAzhModalReasonEnum.ESCAPE,
    });

    super.complete();
  }
  
  /**
   * When you clicked outside the window and it was closed.
   * This doesn't work if you passed `notClosed` as an object when creating the window.
   */
  public backdrop(): void {
    super.next({
      reason: NgxAzhModalReasonEnum.BACKDROP,
    });

    super.complete();
  }
}
