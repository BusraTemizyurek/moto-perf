document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
});

function seedData() {
    if (!window.localStorage.getItem('sessions')) {
        const sessions = [
            {
                date: new Date("2024-11-04T06:15:00"), // Morning
                distance: 100,
                speed: 100,
                duration: 5400000, // 1 hour 30 minutes in milliseconds
                maxLeanAngle: 30
            },
            {
                date: new Date("2022-12-05T13:30:00"), // Afternoon
                distance: 200,
                speed: 120,
                duration: 8100000, // 2 hours 15 minutes in milliseconds
                maxLeanAngle: 35
            },
            {
                date: new Date("2023-01-15T08:00:00"), // Morning
                distance: 150,
                speed: 110,
                duration: 3600000, // 1 hour in milliseconds
                maxLeanAngle: 32
            },
            {
                date: new Date("2023-02-20T17:45:00"), // Evening
                distance: 250,
                speed: 130,
                duration: 4500000, // 1 hour 15 minutes in milliseconds
                maxLeanAngle: 40
            },
            {
                date: new Date("2023-03-30T20:30:00"), // Evening
                distance: 175,
                speed: 115,
                duration: 5400000, // 1 hour 30 minutes in milliseconds
                maxLeanAngle: 33
            },
            {
                date: new Date("2023-05-12T10:00:00"), // Morning
                distance: 300,
                speed: 125,
                duration: 7200000, // 2 hours in milliseconds
                maxLeanAngle: 42
            },
            {
                date: new Date("2023-07-04T15:00:00"), // Afternoon
                distance: 225,
                speed: 105,
                duration: 5400000, // 1 hour 30 minutes in milliseconds
                maxLeanAngle: 28
            },
            {
                date: new Date("2023-08-16T21:15:00"), // Evening
                distance: 275,
                speed: 140,
                duration: 3600000, // 1 hour in milliseconds
                maxLeanAngle: 38
            },
            {
                date: new Date("2023-09-10T23:00:00"), // Night
                distance: 150,
                speed: 90,
                duration: 4500000, // 1 hour 15 minutes in milliseconds
                maxLeanAngle: 27
            },
            {
                date: new Date("2023-10-02T05:30:00"), // Morning
                distance: 320,
                speed: 135,
                duration: 5400000, // 1 hour 30 minutes in milliseconds
                maxLeanAngle: 45
            }
        ];
        window.localStorage.setItem('sessions', JSON.stringify(sessions))
    }
}
seedData();


window.onload = () => {
    const sessionRepository = new SessionRepository();
    const root = document.getElementById("root");
    if (!root) {
        throw new Error("No root element available");
    }

    const orientation = new Orientation();

    const router = new Router(root);

    const mainPage = new MainPage(router, sessionRepository, orientation);
    router.register("main", mainPage);

    const recordingPage = new RecordingPage();
    router.register("recording", recordingPage);

    router.navigate("main");
}