import { Component } from '@angular/core';
import { TestInterface } from 'projects/azh-workspace/src/app/types';
import { NgxAzhModalComponentInterface } from 'projects/ngx-azh-modal/src/lib/ngx-azh-modal';
import { NgxAzhModalResultSubject } from 'projects/ngx-azh-modal/src/lib/ngx-azh-modal-result-subject';


@Component({
    selector: 'app-modal',
    template: `<div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>`,
})
export class ModalComponent
    implements NgxAzhModalComponentInterface<TestInterface> {
    public result: NgxAzhModalResultSubject<TestInterface> = new NgxAzhModalResultSubject<TestInterface>();
    
    public onCancel(): void {
        this.result.cancel();
    }
    
    public onConfirm(): void {
        this.result.confirm({ foo: 'foo' });
    }
}