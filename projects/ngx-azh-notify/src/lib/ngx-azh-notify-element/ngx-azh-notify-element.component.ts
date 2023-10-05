import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NgxAzhConfig } from '../ngx-azh-config';
import { of, Subscriber } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NgxAzhNotifyPropertiesButton } from '../ngx-azh-notify';

@Component({
  selector: 'ngx-azh-notify-element',
  template: `
    <div class="ngx-azh-notify" (mouseover)="stop()" (mouseleave)="play()">
      <div class="ngx-azh-notify__close" (click)="onClose();"></div>
      <div *ngIf="header" class="ngx-azh-notify__header">{{header}}</div>
      <div *ngIf="message" class="ngx-azh-notify__content">{{message}}</div>
      <div *ngIf="button" class="ngx-azh-notify__button" (click)="button.fn()">{{button.text}}</div>
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgxAzhNotifyElementComponent implements OnInit {

  @Input()
  public uid: string | undefined;

  @Input()
  public message: string | undefined;

  @Input()
  public header: string | undefined;

  @Input()
  public delay: number | undefined;

  @Input()
  public button: NgxAzhNotifyPropertiesButton | undefined;

  @Input()
  public freeze: boolean | undefined;

  @Output()
  public closeEvent: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();

  private delaySubscriber: any;

  constructor(private readonly ngxAzhConfig: NgxAzhConfig) {
  }

  /**
   *
   */
  public ngOnInit(): void {
    if (!this.delay) {
      this.delay = this.ngxAzhConfig.delay;
    }

    if (!this.freeze) {
      this.freeze = this.ngxAzhConfig.freeze;
    }

    this.play();
  }

  /**
   *
   */
  public ngOnDestroy(): void {
    this.stop();
  }

  /**
   *
   */
  public onClose(): void {
    this.closeEvent.emit(this.uid);
  }

  /**
   *
   */
  public stop(): void {
    if (!this.freeze) {
      return;
    }

    if (this.delaySubscriber instanceof Subscriber) {
      this.delaySubscriber.unsubscribe();
      this.delaySubscriber = null;
    }
  }

  /**
   *
   */
  public play(): void {
    if (typeof this.delay !== 'undefined') {
      this.delaySubscriber = of(true).pipe(delay(this.delay)).subscribe(() => {
        this.closeEvent.emit(this.uid);
      });
    }
  }
}
