
var n=0;
let texts=document.querySelector("#txt").innerHTML.split("|");
let sts=new SpeechSynthesisUtterance();
sts.text="Bonjour";
window.speechSynthesis.speak(sts);
console.log(texts);
ecrire()
if("webkitSpeechRecognition" in window){
    console.log("recognized");
    let tts=new webkitSpeechRecognition();
    tts.continuous = true;
    tts.interimResults=true;
    tts.start();
    tts.onresult=(event)=>{
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
            if (event.results[i].isFinal) {
              console.log(event.results[i][0].transcript);
              
              if(event.results[i][0].transcript.trim()=="next"){
                  console.log("next");
                  n++;
                  ecrire();

              }else if(event.results[i][0].transcript.trim()=="fini"){
                document.querySelector(".po").innerHTML="Merci de nous avoir suivi";
                tts.stop();
              }
            } 
          }
    }
}else{
    console.log("not recognized");
}

function ecrire(){
document.querySelector(".po").innerHTML=texts[n];
}