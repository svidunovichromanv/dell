export class View {
    constructor(model, host, zone) {
        this.model = model;
        this.element = null;
        this.start = null;
        this.end = null;
        this.host = host;
        this.zone = zone;
        this.onCheckedCallback = null;
        this.hourHand=null;
        this.secHand=null;
        this.minHand=null;
        this.container = null;
    }
    render() {
        if (!this.element) {
            this.container = document.createElement('div');
            this.container.className = "container";
            //button start
            this.start = document.createElement('button');
            this.start.textContent = 'Старт!';
            this.start.addEventListener(
                'click',
                e => this.onChecked(true));
            this.container.appendChild(this.start);
            //button stop
            this.end = document.createElement('button');
            this.end.textContent = 'Стоп!';
            this.end.addEventListener(
                'click',
                e => this.onChecked(false));
            this.container.appendChild(this.end);
            //clock display
            this.element = document.createElement('div');
            this.element.className = "clock";
            this.element.innerHTML=`<div class="h1 h"></div>

                                            <div class="h2 h"></div>

                                            <div class="h3 h"></div>

                                            <div class="h4 h"></div>

                                            <div class="h5 h"></div>

                                            <div class="h6 h"></div>

                                            <div class="h7 h"></div>

                                            <div class="h8 h"></div>

                                            <div class="h9 h"></div>

                                            <div class="h10 h"></div>

                                            <div class="h11 h"></div>

                                            <div class="h12 h"></div>`;

            this.hourHand = document.createElement('div');
            this.hourHand.className="hour";
            this.element.appendChild(this.hourHand);

            this.secHand = document.createElement('div');
            this.secHand.className="sec";
            this.element.appendChild(this.secHand);

            this.minHand = document.createElement('div');
            this.minHand.className="min";
            this.element.appendChild(this.minHand);

            this.container.appendChild(this.element);
            this.host.appendChild(this.container);
            for (let i = 1; i <= 12; i++){//подпись цифрами
                let p = document.createElement('p');
                p.textContent = `${i}`;
                let alf = 30*i;
                let cos = Math.cos(alf*(Math.PI/180));
                let sin = Math.sin(alf*(Math.PI/180));
                let rx = 0 - 1;
                let ry = 0 - 83;
                p.style.cssText = `position: absolute; text-alirn:center; z-index: 10000; top: ${ 80 + rx * sin + ry * cos}px; left: ${ 106 + rx * cos - ry * sin}px`;//x = r*cos(fi)
                this.element.appendChild(p);//подпись цифрой
            }

        }
        if (this.model) {
            //console.log(this.model.value.getUTCHours() + this.zone);//есть час
            this.hourHand.style.transform=`rotate(${(this.model.value.getUTCHours() + this.zone)*30}deg)`;
            this.minHand.style.transform=`rotate(${(this.model.value.getUTCMinutes())*6}deg)`;
            this.secHand.style.transform=`rotate(${(this.model.value.getUTCSeconds())*6}deg)`;
            //this.element.textContent = this.model.value;//тут вся магия
        }
    }

    onChecked(isChecked) {
        if (typeof (this.onCheckedCallback) === 'function') {
            this.onCheckedCallback(isChecked);
        }
    }
}