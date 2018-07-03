addEventListener("load", () => {
  let themes = [];

  let default_theme = document.querySelector(
    ".themeOptions > div:first-of-type"
  ).dataset.color;
  themeChange(default_theme);

  for (let item of document.querySelectorAll(".themeOptions > *")) {
    item.style.background = item.dataset.color;
    item.onclick = e => {
      themeChange(e.target.dataset.color);
    };
    themes.push(item.dataset.color);
  }

  changeThemeAutomatically(themes);
});

function themeChange(theme) {
  let secondaryTheme;

  switch (theme) {
    case "seagreen":
      secondaryTheme = "lightcoral";
      break;
    case "darkorange":
      secondaryTheme = "rgb(63, 63, 63)";
      break;
    case "darkred":
      secondaryTheme = "DarkCyan";
      break;
    case "tomato":
      secondaryTheme = "DarkCyan";
      break;
    case "rgb(63, 63, 63)":
      secondaryTheme = "goldenrod";
      break;
    case "slateblue":
      secondaryTheme = "hotpink";
      break;
    default:
      secondaryTheme = "goldenrod";
      break;
  }

  document.body.style.setProperty("--main-color", theme);
  document.body.style.setProperty("--secondary-color", secondaryTheme);
}

function changeThemeAutomatically(arr) {
  let ind = 1;
  let interval = setInterval(() => {
    for (let item of document.querySelectorAll(".themeOptions > *")) {
      item.style.border = "none";
    }
    let triggeredTheme = arr[ind].toLowerCase();

    themeChange(triggeredTheme);
    ind++;
    if (ind >= arr.length) {
      ind = 0;
    }
  }, 20000);
}
