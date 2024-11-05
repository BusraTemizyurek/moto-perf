class SessionRepository {
    #sessions = [];

    constructor() {
        const sessions = localStorage.getItem("sessions");
        if (sessions) {
            this.#sessions = JSON.parse(sessions);
            for (const session of this.#sessions) {
                session.date = new Date(session.date);
            }
        }
    }

    get sessions() {
        return this.#sessions;
    }

}