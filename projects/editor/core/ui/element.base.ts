
export abstract class ElementBase<T extends HTMLElement> {
    public dom: T

    add(elems: ElementBase<any>[]) {
        elems.forEach(item => {
            this.dom.appendChild(item.dom)
        })
    }

    remove() {

    }

    clear() {

    }

    setId(id) {
        this.dom.id = `AreaEditor_${id}`
    }

    setClass(name) {
        this.dom.className = name
    }

    setStyle(name, value) {
        this.dom.style[name] = value
    }

    setDisabled() {
    }

    setTextContent(text) {
        this.dom.innerText = text
    }

    setHtml(html) {
        this.dom.innerHTML = html
    }

    addEventListener(name: string, callback) {
        this.dom.addEventListener(name, callback, false)
    }

    removeEventListener(name: string, handler) {
        this.dom.removeEventListener(name, handler)
    }
}
