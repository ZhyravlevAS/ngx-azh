import { Component, ComponentRef } from '@angular/core';
import { ModalComponent } from 'projects/azh-workspace/src/app/modal/modal.component';
import { NgxAzhModalService } from 'projects/ngx-azh-modal/src/lib/ngx-azh-modal.service';
import {
    NgxAzhNotifyElementComponent,
} from 'projects/ngx-azh-notify/src/lib/ngx-azh-notify-element/ngx-azh-notify-element.component';
import { NgxAzhNotifyType } from 'projects/ngx-azh-notify/src/lib/ngx-azh-notify-type';
import { NgxAzhNotifyService } from 'projects/ngx-azh-notify/src/lib/ngx-azh-notify.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    
    constructor(private notify: NgxAzhNotifyService,
                private modal: NgxAzhModalService) {
    }
    
    openModal(): void {
        // Parent class
        const cmp = this.modal.open(ModalComponent);
        
        if (cmp) {
            cmp.instance.result.subscribe((result) => {
                /* do something */
                console.log(result.value?.foo);
            });
        }
    }
    
    /**
     *
     */
    public createDanger(): void {
        const notification = this.notify.create(NgxAzhNotifyType.Danger, 'This is in danger notification!', {
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
        const notification = this.notify.create(NgxAzhNotifyType.Info, 'This is an information notification!', {
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
        const notification = this.notify.create(NgxAzhNotifyType.Warning, 'This is an warning notification!', {
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
