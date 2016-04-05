import {
    Component,
    Directive,
    Input,
    Output,
    EventEmitter,
    ElementRef
} from 'angular2/core';

import { BrowserDomAdapter } from 'angular2/platform/browser';

///////////////
///////////////


// Drop

@Component({
    selector: 'drop',
    templateUrl: 'app/src/drop/drop.ng.html'
})

export class Drop {
    show: boolean = false;
    items: Array<DropItem> = [];
    selectedItem: DropItem = null;

    @Input() value: any = null;
    @Output() valueChange = new EventEmitter();

    add(item: DropItem) {
        this.items.push(item);

        if (item.value === this.value) {
            this.select(item, false);
        }
    }

    remove(item: DropItem) {
        let index = this.items.indexOf(item);
        if (~index) {
            this.items.splice(index, 1);
        }

        // Item is currently selected, unset it
        if (this.selectedItem === item) {
            this.selectedItem = null;
        }
    }

    select(item: DropItem, emit: boolean = true) {
        if (this.selectedItem !== item) {
            this.selectedItem = item;

            // update [value] binding
            if (emit) {
                this.valueChange.emit(item.value);
            }

            // update items selection state
            for (let _item of this.items) {
                _item.selected = _item === item;
            }
        }
    }

    hideMenu() {
        this.show = false;
    }

    toggleMenu() {
        this.show = !this.show;
    }

    // todo: better matching when value changes. if the reference
    // changes how do we determine if it is the "same" or not?
    // something like `track by` to know what to compare to would be handy
    ngOnChanges(changes) {
        let match;
        let value = changes.value;
        if (value) {
            value = value.currentValue;
            for (let item of this.items) {
                if (item.value === value) {
                    match = true;
                    this.select(item, false);
                } else {
                    item.selected = false;
                }
            }
            if (!match) {
                this.selectedItem = null;
            }
        }
    }
}


// Drop Closer

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
        let lastEvent = this.lastEvent;
        this.lastEvent = null;

        if (lastEvent !== event) {
            this.drop.hideMenu();
        }
    }

    ngOnDestroy() {
        this.lastEvent = null;
    }

}


// Drop Item

@Component({
    selector: 'drop-item',
    templateUrl: 'app/src/drop/drop-item.ng.html'
})

export class DropItem {
    dom: BrowserDomAdapter;
    selected: boolean = false;

    @Input() value: any = null;
    @Input('label') _label: string = '';

    constructor(
        private drop: Drop,
        private element: ElementRef
    ) {
        this.dom = new BrowserDomAdapter();
    }

    get label() : string {
        return this._label || this.dom.getText(this.element.nativeElement).trim();
    }

    onClick() {
        this.drop.select(this);
    }

    ngOnInit() {
        this.drop.add(this);
    }

    ngOnDestroy() {
        this.drop.remove(this);
        this.drop = this.dom = null;
    }

}
