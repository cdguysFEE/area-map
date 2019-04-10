import { EditorMenu } from './menubar/editor-menu'
import { Viewport } from './viewport/viewport'
import { ToolPanel } from './tool-panel/tool-panel'
import { RightPanel } from './right-panel/right-panel'
import { UiDiv } from './core/ui/ui.div'
import { DrawManager } from './managers/draw-manager'

export interface EditorOption {
    container: HTMLDivElement,
}

export class Editor {
    viewport: Viewport
    drawManager = new DrawManager(this)

    constructor(private option: EditorOption) {
        this.buildLayout(option)
    }

    setCanvas() {

    }

    private buildLayout(option) {
        const container = new UiDiv()
        container.setId('container')
        const menubar = new EditorMenu(this)

        const editorBody = new UiDiv()
        editorBody.setId('body')

        const toolPanel = new ToolPanel(this)

        this.viewport = new Viewport(this)

        const rightPanel = new RightPanel(this)

        const children = [toolPanel, this.viewport, rightPanel].map((item) => item.container)

        editorBody.add(children)

        container.add([menubar.container, editorBody])
        option.container.appendChild(container.dom)
    }
}
