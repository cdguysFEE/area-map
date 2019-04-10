import { Editor } from '../editor'
import { UiCanvas } from '../core/ui/ui.canvas'
import { UiPanel } from '../core/ui/ui.panel'
import { fabric } from 'fabric'

export class Viewport {

    container: UiPanel

    uiCanvas: UiCanvas

    constructor(private editor: Editor) {
        this.container = new UiPanel()
        this.container.setId('viewport')

        this.uiCanvas = new UiCanvas()
        this.uiCanvas.setId('main_canvas')

        this.container.add([this.uiCanvas])
        this.init()

    }

    init() {
        this.editor.drawManager.init(this.uiCanvas.dom)

    }
}
