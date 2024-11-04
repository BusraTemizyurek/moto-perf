class Router {
    /** @type HTMLElement */
    #root = undefined;

    /** @type Map<string, { render: (root:HTMLElement) => void } */
    #map = new Map();

    /**
     * @param {HTMLElement} root 
     */
    constructor(root) {
        this.#root = root;
    }

    /**
     * @param {string} pageName 
     */
    navigate(pageName) {
        const page = this.#map.get(pageName);
        if (!page) {
            return;
        }

        this.#root.innerHTML = "";
        page.render(this.#root)
    }

    /**
     * @param {string} pageName 
     * @param {{ render: (root:HTMLElement) => void }} page 
     */
    register(pageName, page) {
        this.#map.set(pageName, page);
    }
}