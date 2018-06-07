addEventListener("load", () => {

    let themes = [];

    let default_theme = document.querySelector('.themeOptions > div:first-of-type').dataset.color;
    themeChange(default_theme);

    for (let item of document.querySelectorAll('.themeOptions > *')) {
        item.style.background = item.dataset.color;
        item.onclick = e => {
            themeChange(e.target.dataset.color);
        };
        themes.push(item.dataset.color);
    }
    
    changeThemeAutomatically(themes);

});

function themeChange(theme) {
    document.body.style.setProperty('--main-color', theme);
}

function changeThemeAutomatically (arr) {
    let ind = 1;
    let interval = setInterval(() => {        
        for (let item of document.querySelectorAll('.themeOptions > *')) {
            item.style.border = 'none';
        }
        let triggeredTheme = arr[ind];
        document.querySelector('.themeOptions > div:nth-of-type(' + (ind + 1) + ')').style.border = '2px solid #fff';
        themeChange(triggeredTheme);
        ind++;
        if (ind >= arr.length) {
            ind = 0;
        }
    }, 30000);
}