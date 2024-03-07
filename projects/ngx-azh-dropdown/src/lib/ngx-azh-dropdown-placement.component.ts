import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {NgxAzhDropdownService} from './ngx-azh-dropdown.service';

@Component({
  selector: 'ngx-azh-dropdown-placement',
  template: `<ng-container #host></ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgxAzhDropdownPlacementComponent implements OnInit {
  @ViewChild('host', {read: ViewContainerRef, static: true })
  public host: ViewContainerRef | undefined;

  @HostListener('document:click', ['$event'])
  private click(event: MouseEvent): void {
    if (
      this.ngxAzhDropdownService.hasMenu &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.ngxAzhDropdownService.closePreviousEvent.next();
    }
  }

  constructor(
    private elementRef: ElementRef,
    private ngxAzhDropdownService: NgxAzhDropdownService,
  ) {}

  public ngOnInit(): void {
    console.log('ngOnInit', this.host);
    NgxAzhDropdownService.host = this.host;
  }
}
