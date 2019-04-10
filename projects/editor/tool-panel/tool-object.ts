import { UiDiv } from '../core/ui/ui.div'

export abstract class ToolObject {
    abstract html: string
    abstract container: UiDiv


    abstract onClick();


    bindEvents() {
        this.container.addEventListener('click', this.onClick.bind(this))
    }

    unbindEvents() {
        this.container.removeEventListener('click', this.onClick.bind(this))
    }
}
