import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNgxAzhModalHost]',
})
export class NgxAzhModalHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
