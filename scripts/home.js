document.addEventListener("DOMContentLoaded", () => {
    const teamNames = {
        'айюри': 'Ayyuri',
        'наямико': 'Nayamiko',
        'нантоку': 'Nantoku',
        'тетора': 'Tetora',
        'томико': 'Tomiko',
        'xaitt': 'Xaitt',
        'кенсайи': 'Kensaii',
        'асагичи': 'Asagichi',
        'мзарм': 'Mzarm',
        'масомеру': 'Masomeru',
        'альтруми': 'Altrumi',
        'идзуми': 'Idzumi',
        'синоии': 'Shinoii',
    }

    function replaceTeamNames(text) {
        let replacedText = text;

        for (const russianName in teamNames) {
            if (teamNames.hasOwnProperty(russianName)) {
                const englishName = teamNames[russianName];

                const regex = new RegExp(`\\b${russianName}\\b`, 'gi');

                replacedText = replacedText.replace(regex, englishName);
            }
        }

        return replacedText;
    }

    // Перевод отзывов в карусели
    function reviewTranslate(){
        let carousel = $('#carousel_813703198');

        if (carousel && carousel.length > 0) {
            const elementsToProcess = $(carousel).find('.t659__title, .t659__descr');

            elementsToProcess.each(function() {
                const originalElement = $(this);
                const originalText = originalElement.html();

                const processedText = replaceTeamNames(originalText);

                originalElement.html(processedText);

                originalElement.addClass('notranslate');
            });
        }
    }

    function init(){
        reviewTranslate();
    }

    init();
})