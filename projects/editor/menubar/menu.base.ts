import { ElementBase } from '../core/ui/element.base'
import { UiPanel } from '../core/ui/ui.panel'


export class MenuBase extends ElementBase<HTMLDivElement> {
    container: HTMLDivElement
    menuPanel: HTMLDivElement
    dom: HTMLDivElement

    constructor(title: string) {
        const container = new UiPanel()
        const titlePanel = new UiPanel()
        titlePanel.setTextContent(title)
        titlePanel.setClass('title')

        const menuPanel = new UiPanel()
        menuPanel.setClass('menu')

        container.add([titlePanel, menuPanel])
        super()
        this.container = container.dom
        this.menuPanel = menuPanel.dom
        this.dom = container.dom
    }

    addMenuItem(menuItem: ElementBase<any>) {
        this.menuPanel.appendChild(menuItem.dom)
    }
}
