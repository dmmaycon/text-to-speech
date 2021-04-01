let   indexVoicesByLanguage = 0;
let   languages         = window.navigator.languages;
let   languageDefault   = window.navigator.language;
let   voiceDefault      = speechSynthesis.getVoices().filter(voice => voice.lang.includes(languageDefault))[indexVoicesByLanguage];
let   voicesByLanguage  = null;
const selectLanguage    = document.getElementById('selectLanguage');
const selectVoice       = document.getElementById('selectVoice');
const text              = document.getElementById('textToSpeech');


function initLanguages() {
    languages = languages.concat(['pt-BR']);
    languages.forEach(lang => {
        option = new Option;
        option.value = lang;
        option.text  = lang;
        selectLanguage.add(option);
    });
    changeLanguage();
}

function changeLanguage() {
    languageDefault = languages[selectLanguage.selectedIndex];
    selectVoice.options.length = 0;
    initVoices();
}

function initVoices() {    
    let index = 0;
    voicesByLanguage  = speechSynthesis.getVoices().filter(voice => voice.lang.includes(languageDefault));
    voicesByLanguage.forEach(voice => {
        index++;
        option = new Option;
        option.value = index;
        option.text  = voice.name;
        selectVoice.add(option);
    });
}

function clearText() {
    text.value = '';
}

function textToSpeech() {
    const utterance  = new SpeechSynthesisUtterance(text.value);
    utterance.voice  = voicesByLanguage[selectVoice.selectedIndex];
    speechSynthesis.speak(utterance);
}


(function () {
    initLanguages();
})();

