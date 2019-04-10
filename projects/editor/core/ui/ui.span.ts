import { UiElement } from './element'

export class UiSpan extends UiElement<HTMLSpanElement> {

    constructor() {
        const dom = document.createElement('span')
        super(dom)
    }
}
