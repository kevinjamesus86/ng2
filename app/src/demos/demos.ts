import {
    Type,
    Component
} from 'angular2/core';

import {
    RouteConfig,
    ROUTER_DIRECTIVES
} from 'angular2/router';

import { Subscription } from 'rxjs/Subscription';

import { DemoTitle } from './demo';

import * as Dialog from './dialog/dialog';
import * as Drop from './drop/drop';

////////////////////
////////////////////


@Component({
    selector: 'demos-list',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <ul class="demos-nav">
        <li>
            <a href [routerLink]="['Dialog']">Dialog</a>
            <p>
                Show messages, get feedback, do a bunch of custom stuff.. etc
            </p>
        </li>
        <li>
            <a href [routerLink]="['Drop']">Dropdown</a>
            <p>
                Display a list of things, select said things, get notified about it.. etc
            </p>
        </li>
    </ul>
    `
})

class List { }


@Component({
    selector: 'demos',
    templateUrl: 'app/src/demos/demos.ng.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [DemoTitle],
    styles: [`
        h2 {
            padding-bottom: 1em;
            margin-bottom: 1.5em;
            border-bottom: 1px solid #ececec;
        }
    `]
})

@RouteConfig([
    { path: '/', name: 'List', component: List, useAsDefault: true },
    { path: '/dialog', name: 'Dialog', component: Dialog.DialogDemo },
    { path: '/drop', name: 'Drop', component: Drop.DropDemo }
])

export class Demos {
    title: string;
    titleSubscription: Subscription;

    constructor(private titleService: DemoTitle) {
        this.titleSubscription = titleService.titleChange.subscribe(
            title => {
                this.title = title;
            });
    }

    ngOnDestroy() {
        this.titleSubscription.unsubscribe();
    }

}
