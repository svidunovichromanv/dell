export class Model {
    constructor() {
        this.value = new Date();
        this.changeCallback = null;
        this.isActive = true;

        let self = this;
        function recalculate() {
            self.value = new Date();
            if (self.isActive && typeof (self.changeCallback) === 'function') {
                self.changeCallback();
            }
            if (self.timer) {
                clearTimeout(self.timer);
            }
            self.timer = setTimeout(recalculate, 1000);
        }

        this.timer = setTimeout(recalculate, 1000);
    }

    start(isOn) {
        this.isActive = isOn;
    }
}