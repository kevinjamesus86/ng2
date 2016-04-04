import { Directive } from 'angular2/core';
import { Drop } from './drop.component';

/////////////////
/////////////////

@Directive({
    selector: 'drop',
    host: {
        '(click)': 'trackEvent($event)',
        '(document:click)': 'verifyEvent($event)'
    }
})
export class DropCloser {
    lastEvent: MouseEvent = null;

    constructor(private drop: Drop) {}

    trackEvent(event: MouseEvent) {
        this.lastEvent = event;
    }

    verifyEvent(event: MouseEvent) {
        if (this.lastEvent !== event) {
            this.drop.hideMenu();
        }
        this.lastEvent = null;
    }

}
