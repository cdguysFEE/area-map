import { Editor } from '../editor'
import { UiPanel } from '../core/ui/ui.panel'

export class RightPanel {
    container: UiPanel
    constructor(private editor: Editor) {
        this.container = new UiPanel()
        this.container.setId('right_panel')

    }
}
