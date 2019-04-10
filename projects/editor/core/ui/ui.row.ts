import { UiElement } from './element'

export class UiRow extends UiElement<HTMLDivElement> {

    constructor() {
        const dom = document.createElement('div')
        super(dom)

        this.setClass('Row')
    }
}
