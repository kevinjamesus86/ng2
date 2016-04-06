import {
    Component,
    ViewChild
} from 'angular2/core';

import { DIALOG_DIRECTIVES } from '../../dialog/dialog';

import {
    Demo,
    DemoTitle
 } from '../demo';

///////////////
///////////////


@Component({
    selector: 'dialog-demo',
    directives: [DIALOG_DIRECTIVES],
    template: `
        <button class="btn btn-default" (click)="hipsters.open()">
            Show Hipster Speak
        </button>

        <bb-dialog #hipsters size="md" dismiss-on-click>
            <bb-dialog-header>
                <div class="dialog__title">
                    Dialog Header
                </div>
            </bb-dialog-header>
            <bb-dialog-content>
                <p>Taxidermy sartorial four dollar toast, butcher messenger bag etsy small batch asymmetrical. Try-hard before they sold out chicharrones neutra, offal shabby chic letterpress pitchfork migas venmo kale chips plaid. Fanny pack kickstarter trust fund, biodiesel VHS pug waistcoat locavore banjo kogi drinking vinegar irony hella. XOXO single-origin coffee kogi forage banh mi bushwick, hella flexitarian beard narwhal. Church-key jean shorts wolf 3 wolf moon, quinoa locavore poutine bicycle rights seitan ethical. Williamsburg four loko disrupt thundercats marfa roof party post-ironic, ramps gochujang hoodie truffaut asymmetrical YOLO cronut. Gentrify tote bag kickstarter, bitters viral XOXO fingerstache ramps.</p>
                <p>Vinyl tumblr poutine mlkshk, pickled irony salvia. Yr bitters dreamcatcher skateboard heirloom, polaroid retro williamsburg tumblr direct trade try-hard. Readymade hashtag brunch pork belly, mumblecore keytar taxidermy retro squid microdosing yr intelligentsia literally. Disrupt quinoa readymade humblebrag, irony celiac waistcoat neutra lo-fi polaroid squid keytar. Cornhole freegan fap, pug kombucha sriracha kale chips synth hella. YOLO dreamcatcher vegan, raw denim health goth PBR&B meditation normcore shoreditch actually stumptown twee irony polaroid gastropub. Photo booth pitchfork echo park, austin freegan narwhal cornhole meh retro poutine tilde.</p>
            </bb-dialog-content>
            <bb-dialog-footer>
                <button class="btn btn-default pull-right" (click)="hipsters.dismiss()">
                    Close
                </button>
            </bb-dialog-footer>
        </bb-dialog>
    `
})

export class DialogDemo extends Demo {
    demoTitle = 'Dialog';

    constructor(demoTite: DemoTitle) {
        super(demoTite);
    }

}
