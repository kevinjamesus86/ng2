import {
    Component,
    Input,
    ElementRef
} from 'angular2/core';

import { BrowserDomAdapter } from 'angular2/platform/browser';
import { Drop } from './drop.component';

/////////////////
/////////////////

@Component({
    selector: 'drop-item',
    templateUrl: 'app/src/drop/drop-item.ng.html'
})
export class DropItem {
    dom: BrowserDomAdapter;
    selected: boolean = false;

    @Input()
    value: Object = null;
    @Input('label')
    _label: string = '';

    constructor(
        private drop: Drop,
        private element: ElementRef
    ) {
        this.dom = new BrowserDomAdapter();
    }

    get label() : string {
        return this._label || this.dom.getText(this.element.nativeElement);
    }

    onSelect() {
        if (!this.selected) {
            this.drop.select(this);
        }
    }

    ngOnInit() {
        this.drop.add(this);
    }

    ngOnDestroy() {
        console.log('destroy', this);
        this.drop.remove(this);
    }

}
