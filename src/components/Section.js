class Section {
    constructor({ renderer }, sectionSelector) {
        this._renderer = renderer;
        this._sectionSelector = sectionSelector;
        this._cardsSection = document.querySelector(this._sectionSelector);
    }

    renderer(items) {
        items.forEach(item => this.addItem(this._renderer(item)));
    }

    addItem(item) {
        this._cardsSection.append(item);
    }

    prependItem(item) {
        this._cardsSection.prepend(item);
    }
}

export { Section };