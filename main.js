document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const menu = document.querySelector(".mobile-menu");

    burger.addEventListener("change", () => {
        menu.classList.toggle("menu-open", burger.checked);
    });

    function checkScreenWidth() {
        if (window.innerWidth > 1024) {
            menu.classList.remove("menu-open");
            burger.checked = false;
        }
    }

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
    }

    window.addEventListener("resize", checkScreenWidth);
    init();
});