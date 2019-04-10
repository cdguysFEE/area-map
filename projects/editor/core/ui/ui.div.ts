import { UiElement } from './element'

export class UiDiv extends UiElement<HTMLDivElement> {

    constructor() {
        const dom = document.createElement('div')
        super(dom)
    }
}
