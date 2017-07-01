// You can code JavaScript here

function speak(){
    var voice = new SpeechSynthesisUtterance();
    voice.text = "Kathy, this is the shoreline at Shanghai, China";
    speechSynthesis.speak(voice);
}