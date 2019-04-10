import { Editor } from '../editor'
import { UiPanel } from '../core/ui/ui.panel'
import { UiDiv } from '../core/ui/ui.div'
import { Ellipse } from './basic/ellipse'
import { ToolObject } from './tool-object'
import { Select } from './basic/select'

export class ToolPanel {
    container: UiPanel
    constructor(private editor: Editor) {
        this.container = new UiPanel()
        this.container.setId('tool_panel')

        this.buildCategory('Basic', [new Select(editor), new Ellipse(editor)])
    }

    buildCategory(titleText, objects) {
        const container = new UiPanel()
        container.setClass('tool_category')

        const title = new UiDiv()
        title.setClass('category_title')
        title.setTextContent(titleText)

        const objectContainer = new UiDiv()
        objectContainer.setClass('category_container')

        const objectUis = objects.map(this.buildObject.bind(this))

        objectContainer.add(objectUis)

        container.add([title, objectContainer])

        this.container.add([container])
    }

    buildObject(tool: ToolObject) {
        return tool.container
    }

}
