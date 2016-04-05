import { ElementRef } from 'angular2/core';
import { BrowserDomAdapter } from 'angular2/platform/browser';

//////////////
//////////////


// Animation Runner

export class AnimationRunner {

    constructor(
        private prefix: string,
        private elementRef: ElementRef,
        private dom: BrowserDomAdapter
    ) {}

    enter(): Promise<any> {
        return new Promise((done) => {
            this.addClass('animate-enter');
            let off = this.onAnimateEnd(() => {
                this.removeClass('animate-enter');
                off();
                done();
            });
        });
    }

    leave(): Promise<any> {
        return new Promise((done) => {
            this.addClass('animate-leave');
            let off = this.onAnimateEnd(() => {
                this.removeClass('animate-leave');
                off();
                done();
            });
        });
    }

    ngOnDestroy() {
        this.elementRef = null;
        this.dom = null;
    }

    private addClass(cls: string) {
        this.dom.addClass(this.elementRef.nativeElement, `${this.prefix}-${cls}`);
    }

    private removeClass(cls: string) {
        this.dom.removeClass(this.elementRef.nativeElement, `${this.prefix}-${cls}`);
    }

    private onAnimateEnd(fn: Function) {
        let element = this.elementRef.nativeElement,
            endEvents,
            fns;

        endEvents = [
            'animationend',
            'animationend',
            'webkitAnimationEnd',
            'oanimationend',
            'MSAnimationEnd'
        ];

        fns = [];

        for (let event of endEvents) {
            fns.push( this.dom.onAndCancel(element, event, fn) );
        }

        return function off() {
            fns && fns.forEach((removeListener) => removeListener());
            fns = null;
        };
    }

}
