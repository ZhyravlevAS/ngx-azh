import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { NgxAzhModalHostDirective } from './ngx-azh-modal-host.directive';
import { NgxAzhModalService } from './ngx-azh-modal.service';

@Component({
    selector: 'ngx-azh-modal-placement',
    styleUrls: ['./ngx-azh-modal.scss'],
    template: `
        <div #backdrop class="azh-modal__wrapper">
            <ng-template appNgxAzhModalHost></ng-template>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'azh-modal__placement',
    },
})
export class NgxAzhModalPlacementComponent implements AfterViewChecked {
    @ViewChild(NgxAzhModalHostDirective, {static: true})
    public host: NgxAzhModalHostDirective | undefined;
    
    @ViewChild('backdrop')
    public backdrop: ElementRef | undefined;
    
    private isInit: boolean = false;
    
    public ngAfterViewChecked(): void {
        if (!this.isInit && this.host && this.backdrop) {
            NgxAzhModalService.host = this.host;
            NgxAzhModalService.backdrop = this.backdrop;
            this.isInit = true;
        }
    }
}
