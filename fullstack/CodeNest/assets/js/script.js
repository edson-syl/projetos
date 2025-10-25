$(document).ready(() => {
    const theme = localStorage.getItem('theme') || 'light-theme';
    $('body').removeClass('light-theme dark-theme').addClass(theme);
    $('#btn-theme').text(theme === 'light-theme' ? 'TEMA ESCURO' : 'TEMA CLARO');

    $('#btn-theme').click(function() {
        $('body').toggleClass('light-theme dark-theme');
        const newTheme = $('body').hasClass('light-theme') ? 'light-theme' : 'dark-theme';
        $(this).text(newTheme === 'light-theme' ? 'TEMA ESCURO' : 'TEMA CLARO');
        localStorage.setItem('theme', newTheme);
    });
});
