import { Component } from 'angular2/core';

import {
    RouteConfig,
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES
} from 'angular2/router';

import * as Demos from './demos/demos';

/////////////////
/////////////////


@Component({
    selector: 'main',
    templateUrl: 'app/src/app.ng.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
    { path: '/demos', name: 'Demos', component: Demos.Demos, useAsDefault: true },
    { path: '/dialogs', name: 'DialogDemo', component: Demos.DialogDemo },
    { path: '/drops', name: 'DropDemo', component: Demos.DropDemo }
])

export class AppComponent {}
