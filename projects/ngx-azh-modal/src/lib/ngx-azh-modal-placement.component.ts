import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {NgxAzhModalService} from './ngx-azh-modal.service';

@Component({
    selector: 'ngx-azh-modal-placement',
    styleUrls: ['./ngx-azh-modal.scss'],
    template: `
        <div #backdrop class="azh-modal__wrapper">
            <ng-container #host></ng-container>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'azh-modal__placement',
    },
})
export class NgxAzhModalPlacementComponent implements OnInit {
    @ViewChild('host', {read: ViewContainerRef, static: true})
    public host: ViewContainerRef | undefined;

    @ViewChild('backdrop', {read: ElementRef, static: true})
    public backdrop: ElementRef | undefined;

    public ngOnInit(): void {
      NgxAzhModalService.host = this.host;
      NgxAzhModalService.backdrop = this.backdrop;
    }
}
