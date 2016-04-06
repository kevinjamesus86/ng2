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

import { BrowserDomAdapter } from 'angular2/platform/browser';

import { AnimationRunner } from '../core/animation-runner';

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
    animationRunner: AnimationRunner;

    @Input() size: string = DialogSize.MD;
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onDismiss: EventEmitter<any> = new EventEmitter();

    constructor(elementRef: ElementRef) {
        this.animationRunner = new DialogAnimationRunner(elementRef);
    }

    open(): Promise<any> {
        this.showDialog = true;
        return this.animationRunner.enter().then(null, function() {
            console.log('Dialog LEAVE in progress, calm down.');
        });
    }

    close(result?: any): Promise<any> {
        return this.animationRunner.leave().then(() => {
            this.showDialog = false;
            this.onClose.emit(result);
        }, function() {
            console.log('Dialog ENTER in progress, calm down.');
        });
    }

    dismiss(): Promise<any> {
        return this.animationRunner.leave().then(() => {
            this.showDialog = false;
            this.onDismiss.emit(undefined);
        }, function() {
            console.log('Dialog ENTER in progress, calm down.');
        });
    }

    get visible(): boolean {
        return this.showDialog;
    }

    get dialogClasses(): string {
        return 'bb-dialog--' + this.size;
    }

    ngOnDestroy() {
        this.animationRunner.ngOnDestroy();
        this.animationRunner = null;
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
    @ViewChild('dialog') elementRef: ElementRef;

    constructor(private dialog: Dialog) {}

    verifyEvent(event: MouseEvent) {
        let targetElement = event.target,
            dialogElement = this.elementRef &&
                            this.elementRef.nativeElement;
        if (targetElement && dialogElement && !dialogElement.contains(targetElement)) {
            this.dialog.dismiss();
        }
    }

    ngOnDestroy() {
        this.dialog = null;
        this.elementRef = null;
    }
}


// Dialog Animation Runner

export class DialogAnimationRunner extends AnimationRunner {
    _enter: Promise<any>;
    _leave: Promise<any>;

    constructor(elementRef: ElementRef) {
        super({
            prefix: 'dialog',
            elementRef: elementRef
        });
    }

    enter(): Promise<any> {
        return this._leave ? Promise.reject(false) : this._enter || (

            this._enter = super.enter().then(() => {
                this._enter = null;
            })

        );
    }

    leave(): Promise<any> {
        return this._enter ? Promise.reject(false) : this._leave || (

            this._leave = super.leave().then(() => {
                this._leave = null;
            })

        );
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
