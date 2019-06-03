import * as bgGradient from './images/bgGradient.png'
import * as bueBar from './images/hueBar.png'
import * as circleBlack from './images/circle-selected-black.gif'
import * as leftArrow from './images/arrow-l.gif'
import * as rightArrow from './images/arrow-r.gif'
import './styles/index.less'

const HSV_W = 11
export class ColorPicker {
    private isDraging = false
    private isDragHsv = false
    private initPos
    private hsvInitPos
    private dom: HTMLDivElement
    private hsvRect: ClientRect
    private hsvDom: HTMLSpanElement
    constructor() {
        const dom: HTMLDivElement = this.layoutDom()
        const body = document.querySelector('body')
        body.appendChild(dom)
        this.init()

        const titleElem = dom.querySelector('#pickerTitle')
        titleElem.addEventListener('mousedown', this.mouseDone)
        body.addEventListener('mousemove', this.mouseMove)
        body.addEventListener('mouseup', this.mouseUp)

        const hsValue = dom.querySelector('#hsValue')
        this.hsvDom = <HTMLSpanElement>hsValue
        hsValue.addEventListener('mousedown', this.hsMouseDone)
        body.addEventListener('mousemove', this.hsMouseMove)
        body.addEventListener('mouseup', this.mouseUp)

        const palette = dom.querySelector('#colorLValue')

        this.dom = dom
    }

    layoutDom(): HTMLDivElement {
        const htmlStr = `
            <div class="color-picker" style="position: absolute;top: 100px;left: 100px;">
                <div id="pickerTitle"><span>拾色器</span></div>
                <div class="picker-body">
                    <!-- 防止出现浏览器selected 效果 -->
                    <div id="colorHs" onmousedown="return false">
                        <img src="${bgGradient}" draggable="false">
                        <span id="hsValue" style="background: url(${circleBlack})"></span>
                    </div>
                    <div id="colorL" onmousedown="return false">
                        <img src="${bueBar}" draggable="false">
                        <div id="colorLValue" style="top: 0;cursor: pointer;">
                            <div id="valL" style="background: url(${leftArrow})"></div>
                            <div id="valR" style="background: url(${rightArrow})"></div>
                        </div>
                    </div>
                    <div id="pickerValues">
                        <div class="value-row">
                            <div id="valueBlock"></div>
                            <div id="pickerButtons"><button id="btnSure">确定</button><button id="btnCancel">取消</button></div>
                        </div>
                        <div class="value-row"></div>
                        <div class="value-row"></div>

                    </div>
                </div>
            </div>

        `

        const container = document.createElement('div')
        container.innerHTML = htmlStr

        return <HTMLDivElement>container.querySelector('.color-picker')
    }

    init() {
    }

    hsv2rgb(H, S, V) {
        let R
        let G
        let B
        if (S === 0) {
            R = G = B = V
        } else {
            let _H = H * 6
            if (_H === 6) {
                _H = 0
            }
            const i = Math.floor(_H)
            const v1 = V * (1 - S)
            const v2 = V * (1 - S * (_H - i ))
            const v3 = V * (1 - S * (1 - (_H - i)))
            if (i === 0) {
                R = V
                G = v3
                B = v1
            } else if (i === 1) {
                R = v2
                G = V
                B = v1
            } else if (i === 2) {
                R = v1
                G = V
                B = v3
            } else if (i === 3) {
                R = v1
                G = v2
                B = V
            } else if (i === 4) {
                R = v3
                G = v1
                B = V
            } else {
                R = V
                G = v1
                B = v2
            }
        }

        return {r: Math.round(R * 255), g: Math.round(G * 255), b: Math.round(B * 255)}

    }

    private hsMouseDone = (e) => {
        const hsvContainer = this.dom.querySelector('#colorHs')
        this.hsvRect = hsvContainer.getClientRects()[0]
        this.isDragHsv = true
        this.hsvInitPos = {
            x: e.clientX,
            y: e.clientY
        }
    }

    private hsMouseMove = (e) => {
        if (!this.isDragHsv) { return }

        const dx = e.clientX - this.hsvInitPos.x
        const dy = e.clientY - this.hsvInitPos.y
        this.hsvInitPos = {
            x: e.clientX,
            y: e.clientY
        }
        const left = parseInt(this.hsvDom.style.left, 10) || 0
        const top = parseInt(this.hsvDom.style.top, 10) || 0

        let fLeft = left + dx
        let fTop = top + dy


        const offset = HSV_W / 2

        if (fLeft < -offset) {
            fLeft = -offset
        } else if (fLeft > this.hsvRect.width - offset) {
            fLeft = this.hsvRect.width - offset
        }

        if (fTop < -offset) {
            fTop = -offset
        } else if (fTop > this.hsvRect.height - offset) {
            fTop = this.hsvRect.height - offset
        }

        this.hsvDom.style.left = `${fLeft}px`
        this.hsvDom.style.top = `${fTop}px`
    }

    private mouseDone = (e) => {
        this.isDraging = true
        this.initPos = {
            x: e.clientX,
            y: e.clientY
        }
    }

    private mouseMove = (e) => {
        if (!this.isDraging) { return }

        const dx = e.clientX - this.initPos.x
        const dy = e.clientY - this.initPos.y
        this.initPos = {
            x: e.clientX,
            y: e.clientY
        }
        const left = parseInt(this.dom.style.left, 10)
        const top = parseInt(this.dom.style.top, 10)

        this.dom.style.left = `${left + dx}px`
        this.dom.style.top = `${top + dy}px`
    }

    private mouseUp = (e) => {
        this.isDraging = false
        this.isDragHsv = false
    }

    private getHColor(top, height) {
        const dH = height / 6
        let d = 0
        let rgbStr = ''

        if (top < dH * 1) {
            d = top / dH * 255
            rgbStr = `rgb(255, 0, ${Math.round(d)})`
        } else if (top >= dH && top < 2 * dH) {
            d = 255 - ((top - dH) / dH) * 255
            rgbStr = `rgb(${Math.round(d)},0,255)`
        } else if (top >= 2 * dH && top < 3 * dH) {
            d = ((top - 2 * dH) / dH) * 255
            rgbStr = `rgb(0,${Math.round(d)},255)`
        } else if (top >= 3 * dH && top < 4 * dH) {
            d = 255 - ((top - 3 * dH) / dH) * 255
            rgbStr = `rgb(0,255,${Math.round(d)})`
        } else if (top >= 4 * dH && top < dH * 5) {
            d = ((top - dH * 4) / dH) * 255
            rgbStr = `rgb(${Math.round(d)},255,0)`
        } else {
            d = 255 - ((top - dH * 5) / dH) * 255
            rgbStr = `rgb(255,${Math.round(d)},0)`
        }

        return rgbStr
    }
}
