export class Controller {
    constructor(model, view) {
        this.view = view;
        let self = this;
        model.changeCallback = function() {
            self.renderView();
        };
        view.onCheckedCallback = function(isChecked) {
            model.start(isChecked);
        }
    }

    renderView() {
        this.view.render();
    }
}