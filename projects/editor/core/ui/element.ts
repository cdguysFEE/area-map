import { ElementBase } from './element.base'

export class UiElement<T extends HTMLElement> extends ElementBase<T> {
    constructor(public dom: T) {
        super()
    }
}
