var EVT = new EventEmitter2();

document.addEventListener("DOMContentLoaded", function() {
    EVT.emit("init");
});
