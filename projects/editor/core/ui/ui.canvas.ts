import { UiElement } from './element'

export class UiCanvas extends UiElement<HTMLCanvasElement> {

    constructor() {
        const dom = document.createElement('canvas')
        super(dom)
    }
}
