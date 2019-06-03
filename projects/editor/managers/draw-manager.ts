import { Editor } from '../editor'
import { fabric } from 'fabric'
import { EllipseManager } from './objects/ellipse-manager'

export interface DrawingListener {
    mouseDown?: Function
    mouseMove?: Function
    mouseUp?: Function

}

export class DrawManager {
    dom: HTMLCanvasElement
    canvas: fabric.Canvas
    activeManager: EllipseManager

    constructor(private editor: Editor) {}

    init(dom: HTMLCanvasElement) {
        this.dom = dom
        this.canvas = new fabric.Canvas(dom)
        this.setBound(500, 500)
    }

    drawEllipse() {
        this.setAllUnSelectable()
        if (this.activeManager) {
            this.activeManager.destroy()
            this.activeManager = null
        }
        this.activeManager = new EllipseManager(this.canvas)
    }

    setBound(width: number, height: number) {
        this.canvas.setWidth(width)
        this.canvas.setHeight(height)
    }

    selectMode() {
        this.canvas.getObjects().forEach(obj => {
            obj.setOptions({
                selectable: true
            })
        })
        if (this.activeManager) {
            this.activeManager.destroy()
            this.activeManager = null
        }
    }

    setAllUnSelectable() {
        this.canvas.getObjects().forEach(obj => {
            obj.setOptions({
                selectable: false
            })
        })
    }

}
