
import { MenuFile } from './menu.file'
import { MenuEdit } from './menu.edit'
import { UiPanel } from '../core/ui/ui.panel'
import { Editor } from '../editor'

export class EditorMenu {
    container: UiPanel
    constructor(editor: Editor) {
        this.container = new UiPanel()
        this.container.setId('menubar')
        this.container.add([new MenuFile(editor), new MenuEdit(editor)])
    }
}
