let   indexVoicesByLanguage = 0;
let   languages         = window.navigator.languages;
let   languageDefault   = window.navigator.language;
const voices            = speechSynthesis.getVoices();
let   voiceDefault      = voices.filter(voice => voice.lang.includes(languageDefault))[indexVoicesByLanguage];
let   voicesByLanguage  = null;
const selectLanguage    = document.getElementById('selectLanguage');
const selectVoice       = document.getElementById('selectVoice');


function initLanguages() {
    languages = languages.concat(['pt-BR']);
    languages.forEach(lang => {
        option = new Option;
        option.value = lang;
        option.text  = lang;
        selectLanguage.add(option);
    });
}

function changeLanguage() {
    languageDefault = languages[selectLanguage.selectedIndex];
    selectVoice.options.length = 0;
    initVoices();
}

function initVoices() {    
    voicesByLanguage      = voices.filter(voice => voice.lang.includes(languageDefault))
    
    let index = 0;
    voicesByLanguage.forEach(voice => {
        index++;
        option = new Option;
        option.value = index;
        option.text  = voice.name;
        selectVoice.add(option);
    });

}

function textToSpeech() {
    const text = document.getElementById('textToSpeech').value;
    const utterance  = new SpeechSynthesisUtterance(text);
    utterance.voice  = voicesByLanguage[selectVoice.selectedIndex];
    speechSynthesis.speak(utterance);
}


(function () {
    initLanguages();
    initVoices();
})();

