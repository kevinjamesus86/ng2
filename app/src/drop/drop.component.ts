import {
    Component,
    Input,
    Output,
    EventEmitter
} from 'angular2/core';

import { DropItem } from './drop-item.component';

///////////////
///////////////

@Component({
    selector: 'drop',
    templateUrl: 'app/src/drop/drop.ng.html'
})
export class Drop {
    show: boolean = false;
    item: DropItem = null;
    items: Array<DropItem> = [];

    @Input()
    value = null;
    @Output()
    valueChange = new EventEmitter();

    add(item: DropItem) {
        this.items.push(item);

        // Drop item value matches the current [value] binding,
        // select it without emitting a value change event
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
        if (this.item === item) {
            this.item = null;
        }

    }

    select(nextItem: DropItem, emit: boolean = true) {
        this.item = nextItem;

        // update [value] binding
        emit && this.valueChange.emit(nextItem.value);

        // update items selection state
        for (let item of this.items) {
            item.selected = item === nextItem;
        }
    }

    hideMenu() {
        this.show = false;
    }

    toggleMenu() {
        this.show = !this.show;
    }

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
                this.item = null;
            }
        }
    }
}
