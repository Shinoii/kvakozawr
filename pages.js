document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const menu = document.querySelector(".mobile-menu");

    function isRussian(){
        console.log(Cookies.get('googtrans'));
        console.log(reservation);
    }

    burger.addEventListener("change", () => {
        menu.classList.toggle("menu-open", burger.checked);
    });

    function checkScreenWidth() {
        if (window.innerWidth > 1024) {
            menu.classList.remove("menu-open");
            burger.checked = false;
        }
    }

    function isRussian(){
        let lang = Cookies.get('googtrans');

        if(lang == '/en/ru'){
            return true;
        } else{
            return false;
        }
    }

    function changTos(){
        let reservation = document.querySelector('.uc-reservation');
    }

    function changeHome(){
        // Перевод отзывов карусели
        let carousel = $('#carousel_813703198');
        if(carousel && carousel.length > 0){
            console.log('change home')
            $(carousel).find('.t659__title').each(function() {
                $(this).addClass('notranslate');
            });

            $(carousel).find('.t659__descr').each(function() {
                $(this).addClass('notranslate');
            });
        }
    }

    function init(){
        checkScreenWidth();
        changeHome();
    }

    window.addEventListener("resize", checkScreenWidth);
    init();
});