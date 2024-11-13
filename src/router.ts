class Router {
    private readonly _root: HTMLElement;
    private readonly _map = new Map<string, Page>();

    constructor(root: HTMLElement) {
        this._root = root;
    }

    navigate(pageName: string, options?: unknown) {
        const page = this._map.get(pageName);
        if (!page) {
            return;
        }

        this._root.innerHTML = "";
        page.render(this._root, options);
    }

    register(pageName: string, page: Page<any>) {
        this._map.set(pageName, page);
    }
}