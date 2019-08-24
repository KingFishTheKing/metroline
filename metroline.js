class Metroline extends HTMLElement{
    constructor(){
        super();
        this.optionsObject = this.getAttribute('options') | {};
        this.dataObject = this.getAttribute('data') | [];
        this.render;
    }
    get render(){
        let span = document.createElement('span')
        span.innerText = this.dataObject;
        const shadow = this.attachShadow({mode: 'closed'})
            .appendChild(span);
    }
}
this.customElements.define("metro-line", Metroline);