class Metroline extends HTMLElement{
    constructor(){
        super();
        this.dataObject = this.getAttribute('stops').split(';');
        const span = document.createElement('span');
            this.container = span.cloneNode()
                this.container.classList.add('metroline-container');
                this.container.classList.add('r2l');
            this.row = span.cloneNode()
                this.row.classList.add('metroline-row');
            this.item = span.cloneNode();
                this.item.classList.add('metroline-item')
            this.display = span.cloneNode()
                this.display.classList.add('metroline-display');
            this.stop = span.cloneNode()
                this.stop.classList.add('metroline-element-stop')
                this.stop.classList.add('circle')
            this.route = span.cloneNode()
                this.route.classList.add('metroline-element-route');
        this.render;
    }
    get render(){
        const shadow = this.attachShadow({mode: 'open'});
        let object = this.dataObject.map((obj) => {
            obj = JSON.parse(obj.replace(/'/gi, "\""));
            let item = this.item.cloneNode();
            let display = this.display.cloneNode();
            let stop = this.stop.cloneNode();
            stop.setAttribute('info', obj.info);
            let route = this.route.cloneNode();
            route.classList.add(obj.status);
            display.appendChild(route);
            display.appendChild(stop);
            item.appendChild(display);
            return item;
        });
        let r = this.row.cloneNode();
        let c = this.container.cloneNode();
        r.appendChild(object[0]);
        r.appendChild(object[1]);
        r.appendChild(object[2]);
        r.appendChild(document.getElementById('metroline-style-template').content);
        c.appendChild(r);
        
        shadow.appendChild(c);
    }
}
this.customElements.define("metro-line", Metroline);