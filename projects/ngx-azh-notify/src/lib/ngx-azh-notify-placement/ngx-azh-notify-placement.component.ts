import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgxAzhConfig } from '../ngx-azh-config';
import { NgxAzhNotifyHostDirective } from '../ngx-azh-notify-host.directive';
import { NgxAzhNotifyPosition } from '../ngx-azh-notify-position';
import { NgxAzhNotifyService } from '../ngx-azh-notify.service';

@Component({
  selector: 'ngx-azh-notify-placement',
  template: `
    <ng-template ngxAzhNotifyHost></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgxAzhNotifyPlacementComponent implements OnInit, AfterViewChecked {

  @ViewChild(NgxAzhNotifyHostDirective, {static: true})
  public host: NgxAzhNotifyHostDirective | undefined;

  private init: boolean = false;

  constructor(private readonly ngxAzhConfig: NgxAzhConfig,
              private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  /**
   *
   */
  public ngOnInit(): void {
    switch (this.ngxAzhConfig.position) {
      case NgxAzhNotifyPosition.TopLeft:
        this.renderer.addClass(this.elementRef.nativeElement, 'ngx-azh-notify--top-left');
        break;
      case NgxAzhNotifyPosition.TopRight:
        this.renderer.addClass(this.elementRef.nativeElement, 'ngx-azh-notify--top-right');
        break;
      case NgxAzhNotifyPosition.BottomLeft:
        this.renderer.addClass(this.elementRef.nativeElement, 'ngx-azh-notify--bottom-left');
        break;
      case NgxAzhNotifyPosition.BottomRight:
        this.renderer.addClass(this.elementRef.nativeElement, 'ngx-azh-notify--bottom-right');
        break;
    }
  }

  /**
   *
   */
  public ngAfterViewChecked(): void {
    if (!this.init && this.host) {
      NgxAzhNotifyService.host = this.host;
      NgxAzhNotifyService.position = this.ngxAzhConfig.position;
      this.init = true;
    }
  }

}
