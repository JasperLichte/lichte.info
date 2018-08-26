addEventListener('load', () => {
    for (let button of document.querySelectorAll('.inputs button')) {
        if (button.dataset.color) {
            button.style.backgroundColor = button.dataset.color;
            button.addEventListener('click', () => {
                changeColor(button.dataset.color);
            });
        } else if (button.dataset.theme) {
            button.addEventListener('click', () => {
                changeTheme(button.dataset.theme);
            });
        }
    }
});

function changeColor(color) {
    document.body.style.setProperty('--color-2', color);
}

function changeTheme(theme) {
    let color1;
    let color2;
    if (theme === 'dark') {
        color1 = '#222';
        color2 = '#eee';
    } else if (theme === 'light') {
        color1 = '#eee';
        color2 = '#222';
    }
    document.body.style.setProperty('--color-1', color1);
    document.body.style.setProperty('--color-3', color2);
}