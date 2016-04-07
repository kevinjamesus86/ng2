import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DemoTitle {
    title = new Subject<string>();
    titleChange = this.title.asObservable();
}

export class Demo {
    title: string;

    constructor(private _demoTitle: DemoTitle) {}

    // Set demo's title when the route activates
    routerOnActivate() {
        this._demoTitle.title.next(this.title);
    }

    // Clear the demo's title when the route deactivates.
    // Without this we'll be left with the last viewed demo's
    // title when navigating back to the Demo List
    routerOnDeactivate() {
        this._demoTitle.title.next(null);
        this._demoTitle = null;
    }

}
