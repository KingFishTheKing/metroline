
class Metroline extends HTMLElement{
    constructor(){
        super();
        //Extract or build the optionObject
        this.optionObject = this.hasAttribute('options') ? JSON.parse(this.getAttribute('options').replace(/'/gi, "\"")) : {};
        //Check general settings
        this.optionObject.scale = !isNaN(this.optionObject.scale) ? this.optionObject.scale : 10;
        this.optionObject.direction = (['r2l', 'l2r'].includes(this.optionObject.direction)) ? this.optionObject.direction : 'r2l';
        //Reappend or initialize row object
        this.optionObject.row = this.optionObject.row ? this.optionObject.row : {};
        this.optionObject.row.stops = !isNaN(this.optionObject.row.stops) ? this.optionObject.row.stops : 4;
        this.optionObject.row.spaceBetween = !isNaN(this.optionObject.row.spaceBetween) ? this.optionObject.row.spaceBetween : 2.5;
        this.optionObject.row.connected =  (['no', 'first', 'last', 'init'].includes(this.optionObject.row.connected)) ? this.optionObject.row.connected : 'init';
        //Reappend or initialize stop object
        this.optionObject.stop = this.optionObject.stop ? this.optionObject.stop : {};
        this.optionObject.stop.bgIncomplete = this.optionObject.stop.bgIncomplete ? this.optionObject.stop.bgIncomplete : '#333333'; 
        this.optionObject.stop.bgPending = this.optionObject.stop.bgPending ?  this.optionObject.stop.bgPending : "#333333";
        this.optionObject.stop.bgComplete = this.optionObject.stop.bgComplete ? this.optionObject.stop.bgComplete :  "#000000";
        this.optionObject.stop.height = !isNaN(this.optionObject.stop.height) ? this.optionObject.stop.height : 2.5;
        this.optionObject.stop.width = !isNaN(this.optionObject.stop.width) ? this.optionObject.stop.width: 2.5;
        this.optionObject.stop.circle = this.optionObject.stop.circle != undefined ? new Boolean(this.optionObject.stop.circle) : true;
        this.optionObject.stop.border = this.optionObject.stop.border ? this.optionObject.stop.border : {};
        this.optionObject.stop.border.spacing = !isNaN(this.optionObject.stop.border.spacing) ? this.optionObject.stop.border.spacing : 0.1;
        this.optionObject.stop.border.size = !isNaN(this.optionObject.stop.border.size) ? this.optionObject.stop.border.size : 0.2;
        this.optionObject.stop.border.color = this.optionObject.stop.border.color ? this.optionObject.stop.border.color : '#333333';
        this.optionObject.stop.info = this.optionObject.stop.info ? this.optionObject.stop.info : {};
        this.optionObject.stop.info.size = !isNaN(this.optionObject.stop.info.size) ? this.optionObject.stop.info.size : 0.5;
        this.optionObject.stop.info.color = this.optionObject.stop.info.color ? this.optionObject.stop.info.color : "#333333";
        //Reappend or initialize stop object
        this.optionObject.route = this.optionObject.route ? this.optionObject.route : {};
        this.optionObject.route.bgComplete = this.optionObject.route.bgComplete ? this.optionObject.route.bgComplete : "#333333";
        this.optionObject.route.bgIncomplete = this.optionObject.route.bgIncomplete ? this.optionObject.route.bgIncomplete : '#333333';
        this.optionObject.route.bgPending = this.optionObject.route.bgPending ? this.optionObject.route.bgPending : "#000000";
        this.optionObject.route.height = !isNaN(this.optionObject.route.height) ? this.optionObject.route.height : 1;
        this.optionObject.route.border = this.optionObject.route.border ? this.optionObject.route.border : {};
        this.optionObject.route.border.spacingBetween = !isNaN(this.optionObject.route.border.spacingBetween) ? this.optionObject.route.border.spacingBetween : 0.1;
        this.optionObject.route.border.size = !isNaN(this.optionObject.route.border.size) ? this.optionObject.route.border.size : 0.2;
        this.optionObject.route.border.color = this.optionObject.route.border.color ? this.optionObject.route.border.color : '#333333'
        console.dir(this.optionObject);
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
                        font-size: ${this.optionObject.scale}px;
                    }
            
                    .metroline-container>.metroline-row {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        margin-bottom: ${this.optionObject.row.spaceBetween}em;
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
                        border: ${this.optionObject.stop.border.size}em solid ${this.optionObject.stop.border.color};
                        padding: ${this.optionObject.stop.border.spacing}em;
                        background-clip: content-box;
                        width: ${this.optionObject.stop.width}em;
                        height: ${this.optionObject.stop.circle ? this.optionObject.stop.height : this.optionObject.stop.width}em;
                        ${this.optionObject.stop.circle ? 'border-radius:50%;' : ''}
                    }
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-stop.complete{
                        background-color: ${this.optionObject.stop.bgComplete};
                    }
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-stop.incomplete{
                        background-color: ${this.optionObject.stop.bgIncomplete};
                    }
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-stop.pending{
                        background-color: ${this.optionObject.stop.bgPending};
                    }
            
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-stop:after {
                        content: attr(info);
                        position: absolute;
                        margin-top: ${this.optionObject.stop.height}em;
                        margin-left: -${this.optionObject.stop.width / 2 - 0.5}em;
                        text-align:center;
                        width:${this.optionObject.stop.width * 2}em;
                        size:${this.optionObject.stop.info.size}em;
                        color:${this.optionObject.stop.info.color};
                    }
                    .metroline-container .metroline-row .metroline-item:nth-child(1) .metroline-display .metroline-element-stop:after {
                        margin-left:${this.optionObject.stop.width / 2 - 0.5}em;
                    }
                    .metroline-container .metroline-row .metroline-item:nth-last-child(1) .metroline-display .metroline-element-stop:after {
                        margin-left:calc(-1 * (${this.optionObject.stop.width / 2 - 0.5}em * 3));
                    }

            
                    /*Route*/
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-route {
                        flex: 1 0.1 auto;
                        width: calc(100% - ${this.optionObject.stop.width}em);
                        position: relative;
                        display: block;
                        height: ${this.optionObject.route.height}em;
                        padding: ${this.optionObject.route.border.spacingBetween}em;
                        border: ${this.optionObject.route.border.size}em solid ${this.optionObject.route.border.color};
                        border-left: 0;
                        border-right: 0;
                        background-clip: content-box;
                        margin-left: -${this.optionObject.scale / 100}em;
                        margin-right: -${this.optionObject.scale / 100}em;
                    }
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-route.complete {
                        background-color:${this.optionObject.route.bgComplete};
                    } 
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-route.incomplete {
                        background-color:${this.optionObject.route.bgIncomplete};
                    }
                    .metroline-container .metroline-row .metroline-item .metroline-display .metroline-element-route.pending {
                        background-color:${this.optionObject.route.bgPending};
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
            stop.classList.add(obj.status);
            stop.setAttribute('info', obj.info);
            let route = this.route.cloneNode();
            route.classList.add(obj.status);
            display.appendChild(route);
            display.appendChild(stop);
            item.appendChild(display);
            return item;
        });
        let c = this.container.cloneNode();
        for(let loop = 0; loop <= Math.ceil(object.length / this.optionObject.row.stops); loop++){
            let newRow = this.row.cloneNode();
            for (let countItem = 0; countItem < this.optionObject.row.stops; countItem++){
                if (object.length != 0){
                    newRow.appendChild(object.pop());
                }
            }
            console.log(newRow, Math.ceil(object.length / this.optionObject.row.stops))
            c.appendChild(newRow);
        }
        shadow.appendChild(this.stylesheet);
        shadow.appendChild(c);
    }
}
window.customElements.define("metro-line", Metroline);