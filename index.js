window.onload = () => {
    const router = new Router(document.getElementById("root"));

    const mainPage = new MainPage(router);
    router.register("main", mainPage);

    const recordingPage = new RecordingPage();
    router.register("recording", recordingPage);

    router.navigate("main");
}