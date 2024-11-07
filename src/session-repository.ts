interface SerializedSession {
    date: string,
    distance: number,
    speed: number,
    duration: number,
    maxLeanAngle: number
}

interface InitialOrientation {
    alpha: number,
    beta: number,
    gamma: number
}

class SessionRepository {
    private _sessions: Session[] = [];
    private _initialOrientation: InitialOrientation | undefined;
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
                    maxLeanAngle: session.maxLeanAngle
                });
            }
        }
    }

    set initialOrientation(initialOrientation: InitialOrientation) {
        this._initialOrientation = initialOrientation;
    }

    get sessions() {
        return this._sessions;
    }
}