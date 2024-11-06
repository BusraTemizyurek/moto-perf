class Router {
    private readonly _root: HTMLElement;
    private readonly _map = new Map<string, Page>();

    constructor(root: HTMLElement) {
        this._root = root;
    }

    navigate(pageName: string) {
        const page = this._map.get(pageName);
        if (!page) {
            return;
        }

        this._root.innerHTML = "";
        page.render(this._root)
    }

    register(pageName: string, page: Page) {
        this._map.set(pageName, page);
    }
}