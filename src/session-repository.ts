interface SerializedSession {
    date: string,
    distance: number,
    speed: number,
    duration: number,
    maxLeanAngle: number,
    points?: Point[]
}

class SessionRepository {
    private _sessions: Session[] = [];

    constructor() {
        const sessions = localStorage.getItem("sessions");
        if (sessions) {
            const temp: SerializedSession[] = JSON.parse(sessions);
            for (const session of temp) {
                this._sessions.push({
                    date: new Date(session.date),
                    distance: session.distance,
                    speed: session.speed,
                    duration: session.duration,
                    maxLeanAngle: session.maxLeanAngle,
                    points: session.points ?? []
                });
            }
        }
    }

    addSession(session: Session) {
        this.sessions.push(session);
        localStorage.setItem("sessions", JSON.stringify(this.sessions));
    }

    get sessions() {
        return this._sessions;
    }
}