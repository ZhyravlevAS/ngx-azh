# Modal for Angular

A simple solution for displaying modal windows in Angular.

## Quick start

```
npm install ngx-azh-modal --save
```

### Angular version

This library is built to work with **Angular ^17.1.0**.

## Simple example

```TypeScript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAzhModalModule, NgxAzhModalConfigToken } from 'ngx-azh-modal';
import { AppComponent } from './app.component';
import { AppModalConfig } from './app-modal-config';
import { YourModalComponent } from './your-modal.component';

@NgModule({
    imports: [BrowserModule, NgxAzhModalModule],
    declarations: [AppComponent, YourModalComponent],
    bootstrap: [AppComponent],
    providers: [
        {
            // Global configuration for all modal windows of the application
            provide: NgxAzhModalConfigToken,
            useClass: AppModalConfig
        }
    ]
})
export class MyAppModule {
}
```

```TypeScript
// app-modal-config.ts
import { Injectable } from '@angular/core';
import { NgxAzhModalOptionsInterface, NgxAzhModalSizeEnum } from 'ngx-azh-modal';

@Injectable()
export class AppModalConfig implements NgxAzhModalOptionsInterface {
    public size: NgxAzhModalSizeEnum = NgxAzhModalSizeEnum.LARGE;
    public dontShowAgainId: string | undefined = undefined;
    public notClosed: boolean = false;
    public closeWhileNavigating: boolean = true;
}
```

```Typescript
// your-modal.component.ts
import { Component } from '@angular/core';
import { NgxAzhModalComponentInterface, NgxAzhModalResultSubject } from 'ngx-azh-modal';

@Component({
    selector: 'app-your-modal',
    template: `<!-- Template of you modal component -->`
})
export class YourModalComponent
    implements NgxAzhModalComponentInterface</* interface link */> {
    public result: NgxAzhModalResultSubject</* interface link */> = new NgxAzhModalResultSubject</* interface link */>();
    
    public onCancel(): void {
        this.result.cancel();
    }
    
    public onConfirm(): void {
        this.result.confirm( /* you data to transfer */ );
    }
}
```

```TypeScript
// app.component.ts
import { Component } from '@angular/core';
import { NgxAzhModalService } from 'ngx-azh-modal';
import { YourModalComponent } from './your-modal.component';

@Component({
    selector: 'app-root',
    template: `
    <!-- IMPORTANT: place this tag in your bootstrap component! -->
    <ngx-azh-modal-placement></ngx-azh-modal-placement>`
})
export class AppComponent {
    
    constructor(private modalService: NgxAzhModalService) {
    }
    
    /**
     *
     */
    public createModal(): void {
        const cmp = this.modalService.open<YourModalComponent>(YourModalComponent);
        
        cmp.instance.result.subscribe((result) => {
            /* do something */
        });
    }
}
```

## API

### Inject tag

Inject the `<ngx-azh-modal-placement></ngx-azh-modal-placement>` tag into your autoload component. Otherwise, the library will not be able to show the modal!

```HTML
<!-- YOUR HTML -->

<ngx-azh-modal-placement></ngx-azh-modal-placement>

<!-- YOUR HTML -->
```
### Method: create(component, options): ComponentRef <T> | null - Create modal

Important: `null` may be returned if the user previously selected “do not show again”.

* **`component`** [`Type<T>`] - **required** Link to modal window.
* **`options`** [`NgxAzhModalOptionsInterface`] Modal options.

### Method: clear(): void - Clear all modal windows

### Interface: NgxAzhModalOptionsInterface

* **`size`** [`NgxAzhModalSizeEnum`] - Window dimensions. `NgxAzhModalSizeEnum.SMALL` by default.
* **`dontShowAgainId`** [`string`] - Window ID if you want to use "don't show anymore". `undefined` by default.
* **`notClosed`** [`boolean`] - True if the window cannot be closed by ESC, navigation or by clicking outside of it. `false` by default.
* **`closeWhileNavigating`** [`boolean`] - Close the window when you navigate the app from one route to another. `true` by default.

### Interface: NgxAzhModalResultInterface< ResultT >

* **`reason`** [`NgxAzhModalReasonEnum`] - Reason why the window was closed.
* **`value`** [`ResultT | undefined`] - Data to transfer.
* **`dontShowAgain`** [`boolean`] - Return true if you no longer wish to show this window to the user. The `dontShowAgainId` property must be passed in the window options when it is created.

### Interface: NgxAzhModalComponentInterface< ResultT >

Every modal window must implement this interface.

* **`result`** [`NgxAzhModalResultSubject<ResultT>`] - You can subscribe to get the result of the modal window. You don't need to unsubscribe from "result". This happens automatically.

### Enum: NgxAzhModalReasonEnum

* **`ESCAPE`** - closed by ESC
* **`BACKDROP`** - closed by clicking outside
* **`NAVIGATION`** - closed by navigation
* **`CANCEL`** - closed by ModalResultSubject.cancel()
* **`CONFIRM`** - closed by ModalResultSubject.confirm()

### Enum: NgxAzhModalSizeEnum

Applies the following CSS classes to a modal window component

* **`SMALL`** - `.azh-modal--small`
* **`MEDIUM`** - `.azh-modal--medium`
* **`LARGE`** - `.azh-modal--large`
* **`FULLSCREEN`** - `.azh-modal--fullscreen`

## Styling

Import `./node_modules/ngx-azh-notify/src/lib/ngx-azh-modal.scss` from the library into your root stylesheet.

## License

MIT
