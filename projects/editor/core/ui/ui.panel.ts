import { UiElement } from './element'

export class UiPanel extends UiElement<HTMLDivElement> {

    constructor() {
        const dom = document.createElement('div')
        super(dom)
        this.setClass('Panel')
    }
}
