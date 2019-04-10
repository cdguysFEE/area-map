import { Editor } from '../editor'
import { MenuBase } from './menu.base'
import { UiRow } from '../core/ui/ui.row'
import { LANG } from '../lang'

export class MenuFile extends MenuBase {
    constructor(private editor: Editor) {
        super(LANG.file)

        const newItem = new UiRow()
        newItem.setTextContent(LANG.newFile)

        this.addMenuItem(newItem)
    }
}
