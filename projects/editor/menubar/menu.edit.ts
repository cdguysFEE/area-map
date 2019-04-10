import { Editor } from '../editor'
import { MenuBase } from './menu.base'

export class MenuEdit extends MenuBase {
    constructor(private editor: Editor) {
        super('Edit')
    }
}
