import { Type } from 'angular2/core';

import { Drop } from './drop.component';
import { DropCloser } from './drop-closer.directive';
import { DropItem } from './drop-item.component';

export const DROP_DIRECTIVES: Type[] = [
    Drop,
    DropCloser,
    DropItem
]
