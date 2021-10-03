class Section {
    constructor({ items, renderer }, sectionSelector) {
        this._items = items;
        this._renderer = renderer;
        this._sectionSelector = sectionSelector;
    }

    renderer() {
        this._items.forEach(item => this.addItem(this._renderer(item)));
    }

    addItem(item) {
        const cardsSection = document.querySelector(this._sectionSelector);
        cardsSection.prepend(item);
    }
}

export { Section };