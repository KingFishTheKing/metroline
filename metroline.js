
class Metroline extends HTMLElement{
    constructor(){
        super();
        let options = {
            "row": 4,
            "scale": 10,
            "direction": 'r2l' | 'l2r',
            "stop": {
                "bg_incomplete": '#FFF',
                "bg_pending": "#F0F0F0",
                "bg_complete": "#000",
                "circle": true | false,
                "border": {
                    "spacing": 0.1,
                    "size": 0.2,
                    "color": "grey"
                },
                "info": {
                    "size": 0.5,
                    "color": "red"
                }
            },
            "route": {
                "bg_incomplete": '#FFF',
                "bg_pending": "#F0F0F0",
                "bg_complete": "#000",
                "height": 1,
                "border": {
                    "spacing": 0.1,
                    "size": 0.2,
                    "color": "grey"
                }
            }   
        }
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
            var style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(`
                    /*General*/
                    * {
                        box-sizing: border-box;
                        background-origin: border-box;
                    }
            
                    /*Metroline start*/
                    .metroline-container {
                        width: 100%;
                        padding: 20px;
                        font-size: 10px;
                    }
            
                    .metroline-container>.metroline-row {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        margin-bottom: 12em;
                    }
            
                    .metroline-container .metroline-row .metroline-item {
                        position: relative;
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: column;
                    }
            
                    .metroline-container .metroline-row .metroline-item>* {
                        flex: 10 0.5 100%;
                    }
            
                    .metroline-container .metroline-row .metroline-item .metroline-display {
                        flex: 2 1 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
            
                    /*Metroline graphics*/
                    /*Stop element*/
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-stop {
                        display: block;
                        position: relative;
                        border: 0.2em solid grey;
                        background-color: green;
                        padding: 0.5em;
                        background-clip: content-box;
                        width: 2.5em;
                        height: 2.5em;
                    }
            
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-stop:after {
                        content: attr(info);
                        position: absolute;
                        margin-top: 2em;
                        margin-left: -1.6em;
                        text-align:center;
                        width:5em;
                    }
                    .metroline-container .metroline-row .metroline-item:nth-child(1) .metroline-display .metroline-element-stop:after {
                        margin-left:1.6em;
                    }
                    .metroline-container .metroline-row .metroline-item:nth-last-child(1) .metroline-display .metroline-element-stop:after {
                        margin-left:calc(-1 * (1.6em * 3));
                    }
            
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-stop.circle {
                        border-radius: 50%;
                    }
            
                    /*Route*/
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-route {
                        flex: 1 0.1 auto;
                        width: calc(100% - 2.5em);
                        position: relative;
                        display: block;
                        height: 1em;
                        padding: 0.1em;
                        border: 0.2em solid grey;
                        border-left: 0;
                        border-right: 0;
                        background-color: green;
                        background-clip: content-box;
                        margin-left: -0.1em;
                        margin-right: -0.1em;
                    }
            
                    /*Direction modifiers*/
                    /*Left to right*/
                    .metroline-container.l2r .metroline-row:nth-child(odd) .metroline-item:nth-last-child(1) {
                        flex: 0 0.1 auto;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(odd) .metroline-item:nth-last-child(1) .metroline-display {
                        justify-content: end;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(odd) .metroline-item:nth-last-child(1) .metroline-display .metroline-element-stop {
                        order: 1;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(odd) .metroline-item:nth-last-child(1) .metroline-display .metroline-element-route {
                        order: 0;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(odd) .metroline-item .metroline-display .metroline-element-stop {
                        order: 1
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(odd) .metroline-item .metroline-info {
                        display: flex;
                        justify-items: start;
                        justify-content: start;
                        align-items: start;
                        align-content: start;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(odd) .metroline-item .metroline-display .metroline-element-route {
                        order: 2;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(even) .metroline-item:nth-child(1) {
                        flex: 0 0.1 auto;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(odd) .metroline-item:nth-last-child(1) .metroline-display {
                        justify-content: start;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(even) .metroline-item:nth-child(1) .metroline-display .metroline-element-stop {
                        order: 1;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(even) .metroline-item:nth-child(1) .metroline-display .metroline-element-route {
                        order: 2;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(even) .metroline-item .metroline-display .metroline-element-route {
                        order: 1;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(even) .metroline-item .metroline-info {
                        display: flex;
                        justify-items: end;
                        justify-content: end;
                        align-items: end;
                        align-content: end;
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(even) .metroline-item .metroline-display .metroline-element-stop {
                        order: 2
                    }
            
                    .metroline-container.l2r .metroline-row:nth-child(even) .metroline-item:nth-child(1) .metroline-display {
                        justify-content: end;
                    }
            
                    /*Right to left*/
                    .metroline-container.r2l .metroline-row:nth-child(even) .metroline-item:nth-last-child(1) {
                        flex: 0 0.1 auto;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(even) .metroline-item:nth-last-child(1) .metroline-display {
                        justify-content: end;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(even) .metroline-item:nth-last-child(1) .metroline-display .metroline-element-stop {
                        order: 1;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(even) .metroline-item:nth-last-child(1) .metroline-display .metroline-element-route {
                        order: 0;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(even) .metroline-item .metroline-display .metroline-element-stop {
                        order: 1
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(even) .metroline-item .metroline-info {
                        display: flex;
                        justify-items: start;
                        justify-content: start;
                        align-items: start;
                        align-content: start;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(even) .metroline-item .metroline-display .metroline-element-route {
                        order: 2;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(odd) .metroline-item:nth-child(1) {
                        flex: 0 0.1 auto;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(even) .metroline-item:nth-last-child(1) .metroline-display {
                        justify-content: start;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(odd) .metroline-item:nth-child(1) .metroline-display .metroline-element-stop {
                        order: 1;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(odd) .metroline-item:nth-child(1) .metroline-display .metroline-element-route {
                        order: 2;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(odd) .metroline-item .metroline-display .metroline-element-route {
                        order: 1;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(odd) .metroline-item .metroline-info {
                        display: flex;
                        justify-items: end;
                        justify-content: end;
                        align-items: end;
                        align-content: end;
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(odd) .metroline-item .metroline-display .metroline-element-stop {
                        order: 2
                    }
            
                    .metroline-container.r2l .metroline-row:nth-child(odd) .metroline-item:nth-child(1) .metroline-display {
                        justify-content: end;
                    }
            `))
            this.stylesheet = style;
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
        c.appendChild(r);
        shadow.appendChild(this.stylesheet);
        shadow.appendChild(c);
    }
}
this.customElements.define("metro-line", Metroline);