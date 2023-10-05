# Notification for Angular

The simplest solution for notification in Angular.

## Demo

Check out the live demo here: TODO link

## Quick start

```
npm install ngx-azh-notify --save
```

### Angular version

This library is built to work with **Angular 13+**.

## Simple example

```TypeScript
// app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxAzhNotifyModule} from 'ngx-azh-notify';
import {MyComponent} from './my.component';

@NgModule({
    imports: [BrowserModule, NgxAzhNotifyModule],
    declarations: [MyComponent],
    bootstrap: [MyComponent]
})
export class MyAppModule {}
```

```TypeScript
// my.component.ts
import {Component} from '@angular/core';

@Component({
    selector: 'my-component',
    template: `

    <!-- IMPORTANT: place this tag in your bootstrap component! -->
    <ngx-azh-notify-placement></ngx-azh-notify-placement>
    
    <button (click)="createDanger()">danger</button>
    <button (click)="createInfo()">info</button>
    <button (click)="createWarning()">warning</button>
    `
})
export class MyComponent {
    
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
```

## Configuration example

```TypeScript
// app.config.ts
import { Injectable } from '@angular/core';
import { NgxAzhConfig, NgxAzhNotifyPosition } from 'ngx-azh-notify';

@Injectable()
export class AppConfig extends NgxAzhConfig {

  override delay = 3000;

  override position = NgxAzhNotifyPosition.BottomRight;

  override freeze = false;
}
```

```TypeScript
// app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxAzhNotifyModule, NgxAzhConfig} from 'ngx-azh-notify';
import {MyComponent} from './my.component';

@NgModule({
    imports: [BrowserModule, NgxAzhNotifyModule],
    declarations: [MyComponent],
    bootstrap: [MyComponent],
    providers: [
        {
          provide: NgxAzhConfig,
          useClass: AppConfig,
        },
      ],
})
export class MyAppModule {}
```

## API

### Inject tag

Inject the `<ngx-azh-notify-placement></ngx-azh-notify-placement>` tag into your autoload component. Otherwise, the library will not be able to show the notification!

```HTML
<!-- YOUR HTML -->

<ngx-azh-notify-placement></ngx-azh-notify-placement>

<!-- YOUR HTML -->
```
### Method: create(type, message, properties): ComponentRef < NgxAzhNotifyElementComponent > - Create notification

* **`type`** [`NgxAzhNotifyType`] - **required** Notification type. See NgxAzhNotifyType enums.
* **`message`** [`string`] - **required** Notification text.
* **`properties`** [`NgxAzhNotifyProperties`] Notification properties. Overwrites the global application settings. See NgxAzhNotifyProperties.

### Method: close(uid): void - Close notification

* **`uid`** [`string`] - **required** Close notification by its id.

### Method: clear(): void - Close all

Just close all notifications.

### Class: NgxAzhConfig

You can set global preferences for all notifications in your application.

The settings are hierarchical: Default (library) -> Global configuration settings (you override NgxAzhConfig) -> Settings passed at the time of notification creation (See create method and `properties` value).

* **`delay`** [`number`] - How long the notification will be shown. Value in milliseconds. 5000 by default.
* **`position`** [`NgxAzhNotifyPosition`] - Position of notifications. Installed globally for everyone. Cannot be set for single notification. Use the NgxAzhNotifyPosition enums. Top right by default.
* **`freeze`** [`boolean`] Do not hide the notification if the mouse is over it. True by default.

### Interface: NgxAzhNotifyProperties

* **`header`** [`string`] - Header of the notification. Undefined by default.
* **`delay`** [`number`] - How long the notification will be shown. Value in milliseconds. 5000 by default.
* **`button`** [`NgxAzhNotifyPropertiesButton`] - An object describing the button. Undefined by default.
* **`freeze`** [`boolean`] Do not hide the notification if the mouse is over it. True by default.

### Interface: NgxAzhNotifyPropertiesButton

* **`fn`** [`function`] - The function to be executed when the button is pressed.
* **`text`** [`string`] - Button text.

### Enum: NgxAzhNotifyPosition

* **`TopLeft`**
* **`TopRight`**
* **`BottomLeft`**
* **`BottomRight`**

### Enum: NgxAzhNotifyType

* **`Info`**
* **`Danger`**
* **`Warning`**

## Styling

Import `ngx-azh-notify.scss` from the library into your root stylesheet.

## License

MIT
