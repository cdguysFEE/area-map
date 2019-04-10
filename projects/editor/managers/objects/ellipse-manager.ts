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

    private onMouseDown = (option) => {
        this.isDrawing = true
        this.initPos = option.pointer
        this.object = new fabric.Ellipse({
            rx: 0,
            ry: 0,
            fill: 'red',
            top: option.pointer.y,
            left: option.pointer.x,
        })
        this.canvas.add(this.object)
    }

    private onMouseMove = (event) => {
        // todo: 当hover到canvas上时会被不知名的改成default
        this.canvas.setCursor('crosshair')
        if (!this.isDrawing) return
        const currentPos = event.pointer
        const x = currentPos.x - this.initPos.x
        const y = currentPos.y - this.initPos.y

        this.object.setOptions({
            rx: Math.abs(x/2),
            ry: Math.abs(y/2)
        })

        // as x, y is smaller than 0 , so use '+'
        if (x < 0) {
            this.object.setOptions({
                left: this.initPos.x + x,
            })
        }

        if ( y < 0) {
            this.object.setOptions({
                top: this.initPos.y + y,
            })
        }
    }

    private onMouseUp = () => {
        this.isDrawing = false
        this.ellipses.push(this.object)
    }
}
