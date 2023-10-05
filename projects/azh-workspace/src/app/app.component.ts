import { Component, ComponentRef } from '@angular/core';
import { NgxAzhNotifyElementComponent, NgxAzhNotifyService, NgxAzhNotifyType } from 'ngx-azh-notify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private notify: NgxAzhNotifyService) {
  }

  /**
   *
   */
  public createDanger(): void {
    const notification: ComponentRef<NgxAzhNotifyElementComponent> = this.notify.create(NgxAzhNotifyType.Danger, 'This is in danger notification!', {
      button: {
        fn: () => {
          this.close(notification);
        },
        text: 'Close me!',
      },
      header: 'Notification:',
    });
  }

  /**
   *
   */
  public createInfo(): void {
    const notification: ComponentRef<NgxAzhNotifyElementComponent> = this.notify.create(NgxAzhNotifyType.Info, 'This is an information notification!', {
      button: {
        fn: () => {
          this.close(notification);
        },
        text: 'Close me!',
      },
      header: 'Notification:',
    });
  }

  /**
   *
   */
  public createWarning(): void {
    const notification: ComponentRef<NgxAzhNotifyElementComponent> = this.notify.create(NgxAzhNotifyType.Warning, 'This is an warning notification!', {
      button: {
        fn: () => {
          this.close(notification);
        },
        text: 'Close me!',
      },
      header: 'Notification:',
    });
  }

  /**
   *
   * @param notification
   */
  private close(notification: ComponentRef<NgxAzhNotifyElementComponent>): void {
    this.notify.close(notification.instance.uid);
  }
}
