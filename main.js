document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const menu   = document.querySelector(".mobile-menu");

    // Показываем/скрываем меню при клике
    burger.addEventListener("click", () => {
        menu.classList.toggle("menu-open");
    });

    // Автоматически скрываем меню, если ширина > 1024
    function checkScreenWidth() {
        if (window.innerWidth > 1024) {
            menu.classList.remove("menu-open");
        }
    }
    checkScreenWidth();

    // Проверка перевода вкл/выкл
    function isRussian(){
        let lang = Cookies.get('googtrans');

        if(lang == '/en/ru'){
            return true;
        } else{
            return false;
        }
    }

    function init(){
        checkScreenWidth();
        document.querySelectorAll('.uc-notranslate').forEach(el => {
            el.classList.add('notranslate');
        });
    }

    window.addEventListener("resize", checkScreenWidth);
    init();
});