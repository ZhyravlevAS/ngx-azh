import { ComponentRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NgxAzhNotifyPosition } from './ngx-azh-notify-position';
import { of, Subscriber } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NgxAzhNotifyProperties } from './ngx-azh-notify';
import { NgxAzhNotifyElementComponent } from './ngx-azh-notify-element/ngx-azh-notify-element.component';
import { NgxAzhNotifyHostDirective } from './ngx-azh-notify-host.directive';
import { NgxAzhNotifyType } from './ngx-azh-notify-type';

@Injectable({
  providedIn: 'root',
})
export class NgxAzhNotifyService {

  public static host: NgxAzhNotifyHostDirective;
  public static position: NgxAzhNotifyPosition;

  private components: any[] = [];
  private observers: any[] = [];
  private renderer: Renderer2;
  private readonly waitTime: number = 350;
  private readonly cssClassName: string = 'ngx-azh-notify--in';

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Create notification.
   * @param type - Notification type. See NgxAzhNotifyType enums.
   * @param message - Notification text.
   * @param properties - Notification properties. Overwrites the global application settings. See NgxAzhNotifyProperties.
   * @return ComponentRef<NgxAzhNotifyElementComponent>
   */
  public create(type: NgxAzhNotifyType, message: string, properties?: NgxAzhNotifyProperties): ComponentRef<NgxAzhNotifyElementComponent> {
    if (!type) {
      throw new Error('NgxAzhNotifyService.create: Type of notification is missing!');
    }

    const uid = Math.random().toString(36).substring(7);
    const options = NgxAzhNotifyService.position === NgxAzhNotifyPosition.BottomLeft || NgxAzhNotifyService.position === NgxAzhNotifyPosition.BottomRight ? {index: 0} : {};

    const component: ComponentRef<NgxAzhNotifyElementComponent>
      = NgxAzhNotifyService.host.viewContainerRef.createComponent<NgxAzhNotifyElementComponent>(NgxAzhNotifyElementComponent, options);

    const subscription = component.instance.closeEvent.subscribe((uid: string) => this.close(uid));

    of(true).pipe(delay(50)).subscribe(() => {
      let styledClass: string;

      switch (type) {
        case NgxAzhNotifyType.Info:
          styledClass = 'ngx-azh-notify--info';
          break;
        case NgxAzhNotifyType.Danger:
          styledClass = 'ngx-azh-notify--danger';
          break;
        case NgxAzhNotifyType.Warning:
          styledClass = 'ngx-azh-notify--warning';
          break;
      }
      this.renderer.addClass(component.location.nativeElement, styledClass);
      this.renderer.addClass(component.location.nativeElement, this.cssClassName);
    });

    component.instance.uid = uid;
    component.instance.message = message;

    if (typeof properties === 'object') {
      if ('header' in properties) {
        component.instance.header = properties.header;
      }

      if ('delay' in properties) {
        component.instance.delay = properties.delay;
      }

      if ('freeze' in properties) {
        component.instance.freeze = properties.freeze;
      }

      if ('button' in properties && typeof properties.button !== 'undefined' && ('fn' in properties.button && 'text' in properties.button)) {
        component.instance.button = properties.button;
      }
    }

    this.observers.push({uid, subscription});
    this.components.push({uid, component});

    component.changeDetectorRef.markForCheck();
    return component;
  }

  /**
   * Hide notification by its id.
   * @param uid
   */
  public close(uid: string | undefined): void {
    if (!uid) {
      throw new Error('NgxAzhNotifyService.close: Unique id is missing!');
    }

    const componentIndex = this.components.findIndex((c: any) => c.uid === uid);
    const subscriptionIndex = this.observers.findIndex((c: any) => c.uid === uid);

    if (componentIndex < 0 || subscriptionIndex < 0) {
      throw new Error('NgxAzhNotifyService.close: Notification with this id was not found.');
    }

    this.renderer.removeClass(this.components[componentIndex].component.location.nativeElement, this.cssClassName);

    of(true).pipe(delay(this.waitTime)).subscribe(() => {
      this.observers[subscriptionIndex].subscription.unsubscribe();
      this.components[componentIndex].component.hostView.destroy();

      this.observers.splice(subscriptionIndex, 1);
      this.components.splice(componentIndex, 1);
    });
  }

  /**
   * Close all.
   */
  public clear(): void {
    for (const item of this.observers) {
      if (item.subscription instanceof Subscriber) {
        item.subscription.unsubscribe();
      }
    }

    this.observers = [];
    this.components = [];

    NgxAzhNotifyService.host.viewContainerRef.clear();
  }
}
