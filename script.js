document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript connected successfully!");

    // Example: welcome message
    const welcomeButton = document.querySelector("#welcomeButton");

    if (welcomeButton) {
        welcomeButton.addEventListener("click", function () {
            alert("Welcome to my website!");
        });
    }
});