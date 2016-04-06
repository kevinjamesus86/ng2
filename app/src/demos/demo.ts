import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class DemoTitle {
    value: Subject<any> = new Subject();
}

export class Demo {
    demoTitle: string;

    constructor(private _demoTitle: DemoTitle) {}

    routerOnActivate() {
        this._demoTitle.value.next(this.demoTitle);
    }

    routerOnDeactivate() {
        this._demoTitle.value.next(null);
        this._demoTitle = null;
    }

}
