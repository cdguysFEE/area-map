import { ToolObject } from '../tool-object'
import { UiDiv } from '../../core/ui/ui.div'
import { Editor } from '../../editor'

export class Select extends ToolObject {
    html = `
    <svg viewBox="0 0 24 24" version="1.1" width="30" height="30" style="background-color: #000;">
        <g>
        <path fill="#fff" d="M0,0v24h24V0H0z M17.147,20.757l-2.941,1.501l-3.677-6.005l-4.411,3.003V1.241l12.5,12.01l-4.412,1.501   L17.147,20.757z"></path>
        </g>
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
        this.editor.drawManager.selectMode()
    }
}
