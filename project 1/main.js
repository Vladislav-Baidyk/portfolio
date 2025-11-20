let themeButton = document.getElementById("buttn-theme");
let imageTheme = document.getElementById("theme-icon");
let theme = document.body;
let header = document.getElementById("header-name");


function toggleTheme() {
    if (theme.classList.contains("white-theme")) {

        imageTheme.src = "browser-extensions-manager-ui-main/assets/images/icon-sun.svg";
        header.classList.remove("header-name-white");
        theme.classList.remove("white-theme");
        themeButton.classList.remove("buttn-theme-white");
    } else {

        imageTheme.src = "browser-extensions-manager-ui-main/assets/images/icon-moon.svg";
        header.classList.add("header-name-white");
        theme.classList.add("white-theme");
        themeButton.classList.add("buttn-theme-white");
    }
}
themeButton.addEventListener("click", toggleTheme);



let all = document.getElementById("all");
let active = document.getElementById("active");
let inactive = document.getElementById("inactive");
all.classList.add("active");  

function controlButtons(clickedButton) {
    all.classList.remove("active");
    active.classList.remove("active");
    inactive.classList.remove("active");
    clickedButton.classList.add("active");
}

all.addEventListener("click", function() {
    controlButtons(all);
});
active.addEventListener("click", function() {
    controlButtons(active);
});
inactive.addEventListener("click", function() {
    controlButtons(inactive);
});


