interface SummaryPageOptions {
    session: Session
}

class SummaryPage implements Page<SummaryPageOptions> {
    constructor() {

    }

    // TODO: draft data either will be sent to sessionsRepo or deleted

    render(root: HTMLElement, options?: SummaryPageOptions) {
        console.log(options?.session);
        // TODO: summary page ui will be done
    }
}