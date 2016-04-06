import { ElementRef } from 'angular2/core';
import { BrowserDomAdapter } from 'angular2/platform/browser';

//////////////
//////////////


// Animation Runner Config

interface AnimationRunnerConfig {
    prefix: string;
    elementRef: ElementRef;
}


// Animation Runner

export class AnimationRunner {

    static AnimationEndEvents: Array<string> = [
        'animationend',
        'webkitAnimationEnd',
        'oAnimationEnd',
        'oanimationend',
        'MSAnimationEnd'
    ];

    static TransitionEndEvents: Array<string> = [
        'transitionend',
        'webkitTransitionEnd',
        'oTransitionEnd',
        'otransitionend',
        'MSTransitionEnd'
    ];

    prefix: string;
    dom: BrowserDomAdapter;
    elementRef: ElementRef;

    constructor(config: AnimationRunnerConfig) {
        Object.assign(this, config);
        this.dom = new BrowserDomAdapter();
    }

    enter(): Promise<any> {
        return this.animate('animate-enter');
    }

    leave(): Promise<any> {
        return this.animate('animate-leave');
    }

    ngOnDestroy() {
        this.elementRef = null;
        this.dom = null;
    }

    private animate(cls: string): Promise<any> {
        return new Promise((done) => {
            this.addClass(cls);
            let off = this.onAnimateEnd(() => {
                this.removeClass(cls);
                off();
                done();
            });
        });
    }

    private addClass(cls: string) {
        this.dom.addClass(this.elementRef.nativeElement, `${this.prefix}-${cls}`);
    }

    private removeClass(cls: string) {
        this.dom.removeClass(this.elementRef.nativeElement, `${this.prefix}-${cls}`);
    }

    private onAnimateEnd(fn: Function) {
        let element = this.elementRef.nativeElement,
            endEvents = AnimationRunner.AnimationEndEvents,
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
