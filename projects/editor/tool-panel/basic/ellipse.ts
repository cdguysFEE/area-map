import { ToolObject } from '../tool-object'
import { UiDiv } from '../../core/ui/ui.div'
import { Editor } from '../../editor'

export class Ellipse extends ToolObject {
    html = `
        <svg width="30" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg">
        
            <ellipse cx="15" cy="15" rx="14" ry="10"
                style="fill:#fff;
                stroke:#333;stroke-width:1"/>
        </svg>
    `
    container: UiDiv
    constructor(private editor: Editor) {
        super()
        this.container = new UiDiv()
        this.container.setClass('tool-object')

        this.container.setHtml(this.html)
        this.bindEvents()

    }

    onClick() {
        this.editor.drawManager.drawEllipse()
    }

    destroy() {
        this.unbindEvents()
    }

}
