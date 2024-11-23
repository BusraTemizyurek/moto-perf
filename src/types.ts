export interface Page<TOptions = unknown> {
  render: (root: HTMLElement, options?: TOptions) => void;
}

export interface Point {
  date: number;
  latitude?: number;
  longitude?: number;
  timestamp?: number;
  speed?: number;
  distance?: number;
  gamma: number;
}

export interface Session {
  date: Date;
  distance: number;
  speed: number;
  duration: number;
  maxLeanAngle: number;
  points: Point[];
}
