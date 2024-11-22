import type { Page } from "../types";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type PageFactory = () => Promise<Page<any>>;

export class Router {
  private readonly _root: HTMLElement;
  private readonly _pageFactoryMap = new Map<string, PageFactory>();
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  private readonly _pageMap = new Map<string, Page<any>>();

  constructor(root: HTMLElement) {
    this._root = root;
  }

  /**
   * @param pageName - to be used as the key
   * @returns - the existing page (which has been used before), or it will create a new page if the page has never been used before.
   */
  private async getOrCreatePage(pageName: string) {
    const existingPage = this._pageMap.get(pageName);
    if (existingPage) {
      return existingPage;
    }

    const createPage = this._pageFactoryMap.get(pageName);
    if (!createPage) {
      return undefined;
    }

    const page = await createPage();
    this._pageMap.set(pageName, page);

    return page;
  }

  async navigate(pageName: string, options?: unknown) {
    const page = await this.getOrCreatePage(pageName);
    if (!page) {
      return;
    }

    this._root.innerHTML = "";
    page.render(this._root, options);
  }

  register(pageName: string, createPage: PageFactory) {
    this._pageFactoryMap.set(pageName, createPage);
  }
}
