interface Page {
    render: (root: HTMLElement) => void
}

interface Session {
    date: Date,
    distance: number,
    speed: number,
    duration: number,
    maxLeanAngle: number
}