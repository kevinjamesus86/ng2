import {
    Type,
    Component
} from 'angular2/core';

import { ROUTER_DIRECTIVES } from 'angular2/router';

export * from './dialog/dialog';
export * from './drop/drop';

////////////////////
////////////////////

@Component({
    selector: 'demos',
    templateUrl: 'app/src/demos/demos.ng.html',
    directives: [ROUTER_DIRECTIVES]
})

export class Demos { }
