import { Type } from 'angular2/core';

import {
    Dialog,
    DialogExternalCloser,
    DialogHeader,
    DialogContent,
    DialogFooter
} from './dialog.component';

export * from './dialog.component';

export const DIALOG_DIRECTIVES: Type[] = [
    Dialog,
    DialogExternalCloser,
    DialogHeader,
    DialogContent,
    DialogFooter
]
