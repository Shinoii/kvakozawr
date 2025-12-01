/*!***************************************************
 * google-translate.js v1.0.3
 * https://Get-Web.Site/
 * author: Vitalii P.
 *****************************************************/
const googleTranslateConfig = {
    /* Original language */
    lang: "en",
    /* Язык, на который переводим при первом посещении */
    langFirstVisit: 'en',
    domain: "kvakozawrstudio.com"
};

document.querySelectorAll('.uc-notranslate').forEach(el => {
    el.classList.add('notranslate');
});

function TranslateInit() {

    if (googleTranslateConfig.langFirstVisit && !Cookies.get('googtrans')) {
        // Если установлен язык перевода для первого посещения и куки не назначены
        TranslateCookieHandler("/auto/" + googleTranslateConfig.langFirstVisit);
    }

    let code = TranslateGetCode();
    // Находим флаг с выбранным языком для перевода и добавляем к нему активный класс
    if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
        document.querySelector('[data-google-lang="' + code + '"]').classList.add('language__img_active');
    }

    if (code == googleTranslateConfig.lang) {
        // Если язык по умолчанию, совпадает с языком на который переводим
        // То очищаем куки
        TranslateCookieHandler(null, googleTranslateConfig.domain);
    }

    // Инициализируем виджет с языком по умолчанию
    new google.translate.TranslateElement({
        pageLanguage: googleTranslateConfig.lang,
    });

    // Вешаем событие  клик на флаги
    TranslateEventHandler('click', '[data-google-lang]', function (e) {
        TranslateCookieHandler("/" + googleTranslateConfig.lang + "/" + e.getAttribute("data-google-lang"), googleTranslateConfig.domain);
        // Перезагружаем страницу
        window.location.reload();
    });
}

function TranslateGetCode() {
    // Если куки нет, то передаем дефолтный язык
    let lang = (Cookies.get('googtrans') != undefined && Cookies.get('googtrans') != "null") ? Cookies.get('googtrans') : googleTranslateConfig.lang;
    return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {
    // Записываем куки /язык_который_переводим/язык_на_который_переводим
    Cookies.set('googtrans', val);
    Cookies.set("googtrans", val, {
        domain: "." + document.domain,
    });

    if (domain == "undefined") return;
    // записываем куки для домена, если он назначен в конфиге
    Cookies.set("googtrans", val, {
        domain: domain,
    });

    Cookies.set("googtrans", val, {
        domain: "." + domain,
    });
}

function TranslateEventHandler(event, selector, handler) {
    document.addEventListener(event, function (e) {
        let el = e.target.closest(selector);
        if (el) handler(el);
    });
}

// Слова, которые запрещено переводить
const translateExceptions = [
    "Rigger"
];

// Функция, которая оборачивает слова в <span class="notranslate">
function protectExceptions() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    let node;
    while (node = walker.nextNode()) {
        let text = node.nodeValue;

        translateExceptions.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, "gi");
            if (regex.test(text)) {
                const span = document.createElement("span");
                span.innerHTML = text.replace(regex, match =>
                    `<span class="notranslate">${match}</span>`
                );
                node.parentNode.replaceChild(span, node);
            }
        });
    }
}

// Вызываем защиту слов ДО запуска переводчика
protectExceptions();