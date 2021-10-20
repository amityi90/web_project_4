class Section {
    constructor({ items, renderer }, sectionSelector) {
        this._items = items;
        this._renderer = renderer;
        this._sectionSelector = sectionSelector;
        this._cardsSection = document.querySelector(this._sectionSelector);
    }

    renderer() {
        this._items.forEach(item => this.addItem(this._renderer(item)));
    }

    addItem(item) {
        this._cardsSection.append(item);
    }

    addNewItem(item) {
        this._cardsSection.prepend(item);
    }
}

export { Section };