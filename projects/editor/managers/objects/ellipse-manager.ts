import { fabric } from 'fabric'

export class EllipseManager {
    isDrawing = false
    object: fabric.Ellipse
    initPos: fabric.Point
    ellipses: fabric.Ellipse[] = []
    constructor(
        private canvas: fabric.Canvas
    ) {
        this.canvas.setCursor('crosshair')
        this.canvas.on('mouse:down', this.onMouseDown)
        this.canvas.on('mouse:move', this.onMouseMove)
        this.canvas.on('mouse:up', this.onMouseUp)
    }

    destroy() {
        this.canvas.off('mouse:down', this.onMouseDown)
        this.canvas.off('mouse:move', this.onMouseMove)
        this.canvas.off('mouse:up', this.onMouseUp)
        this.canvas.setCursor('default')
    }

    private onMouseDown = (e) => {
        this.isDrawing = true
        this.initPos = e.pointer
        this.object = new fabric.Ellipse({
            rx: 0,
            ry: 0,
            fill: 'red',
            top: e.pointer.y,
            left: e.pointer.x,
        })
        this.canvas.add(this.object)
        this.object.hoverCursor = 'crosshair'
    }

    private onMouseMove = (event) => {
        // todo: 当hover到canvas上时会被不知名的改成default
        // this.canvas.setCursor('crosshair')
        if (!this.isDrawing) return
        const currentPos = event.pointer
        const x = currentPos.x - this.initPos.x
        const y = currentPos.y - this.initPos.y

        this.object.set({
            rx: Math.abs(x/2),
            ry: Math.abs(y/2)
        })

        // as x, y is smaller than 0 , so use '+'
        if (x < 0) {
            this.object.set({
                left: this.initPos.x + x,
            })
        }

        if ( y < 0) {
            this.object.set({
                top: this.initPos.y + y,
            })
        }

        this.object.setCoords()
        this.canvas.renderAll()
    }

    private onMouseUp = () => {
        this.isDrawing = false
        this.ellipses.push(this.object)
    }
}
