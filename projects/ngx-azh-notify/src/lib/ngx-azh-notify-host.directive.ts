import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngxAzhNotifyHost]'
})
export class NgxAzhNotifyHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
