import type { Point, Session } from "./types";

interface SerializedSession {
  date: string;
  distance: number;
  speed: number;
  duration: number;
  maxLeanAngle: number;
  points?: Point[];
}

export class SessionRepository {
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
          points: session.points ?? [],
        });
      }
      this.sessions.sort((a: Session, b: Session) => {
        return b.date.getTime() - a.date.getTime();
      });
    }
  }

  addSession(session: Session) {
    this._sessions.unshift(session);
    localStorage.setItem("sessions", JSON.stringify(this.sessions));
  }

  get sessions() {
    return this._sessions;
  }
}
