import {
    Input,
    Output,
    Component,
    Directive,
    ElementRef,
    ViewChild,
    EventEmitter,
    OnDestroy
} from 'angular2/core';


///////////////
///////////////


// Dialog

@Component({
    selector: 'bb-dialog',
    template: `
        <template [ngIf]="showDialog">
            <div class="dialog-mask">
                <div #dialog class="dialog" [ngClass]="dialogClasses">
                    <ng-content></ng-content>
                </div>
            </div>
        </template>
    `
})

export class Dialog {

    showDialog: boolean = false;
    @Input() size: string = DialogSize.MD;
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onDismiss: EventEmitter<any> = new EventEmitter();

    open(): Promise<any> {
        return new Promise((yep) => {
            this.showDialog = true;
            yep();
        });
    }

    close(result?: any): Promise<any> {
        return new Promise((yep) => {
            this.showDialog = false;
            this.onClose.emit(result);
            yep(result);
        });
    }

    dismiss(): Promise<any> {
        return new Promise((yep) => {
            this.showDialog = false;
            this.onDismiss.emit(undefined);
            yep();
        });
    }

    get visible(): boolean {
        return this.showDialog;
    }

    get dialogClasses(): string {
        return 'bb-dialog--' + this.size;
    }
}

export class DialogSize {
    static SM: string = 'sm';
    static MD: string = 'md';
    static LG: string = 'lg';
}


// Dialog External Closer

@Directive({
    selector: 'bb-dialog[dismiss-on-click]',
    host: {
        '(click)': 'verifyEvent($event)'
    }
})

export class DialogExternalCloser implements OnDestroy {
    @ViewChild('dialog') dialogElementRef: ElementRef;

    constructor(private dialog: Dialog) {}

    verifyEvent(event: MouseEvent) {
        let targetElement = event.target,
            dialogElement = this.dialogElementRef &&
                            this.dialogElementRef.nativeElement;
        if (targetElement && dialogElement && !dialogElement.contains(targetElement)) {
            this.dialog.dismiss();
        }
    }

    ngOnDestroy() {
        this.dialog = null;
        this.dialogElementRef = null;
    }
}


// Dialog Header

@Component({
    selector: 'bb-dialog-header',
    template: `
        <div class="dialog__header">
            <div class="dialog__close" (click)="dialog.dismiss()" role="button"></div>
            <ng-content></ng-content>
        </div>
    `
})

export class DialogHeader {
    constructor(private dialog: Dialog) { }
}


// Dialog Content

@Component({
    selector: 'bb-dialog-content',
    template: `
        <div class="dialog__content">
            <ng-content></ng-content>
        </div>
    `
})

export class DialogContent { }


// Dialog Footer

@Component({
    selector: 'bb-dialog-footer',
    template: `
        <div class="dialog__footer">
            <ng-content></ng-content>
        </div>
    `
})

export class DialogFooter { }
