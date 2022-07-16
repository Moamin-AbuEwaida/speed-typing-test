const typingText = document.querySelector('.typing-text p'),
inputFiled= document.querySelector('.wrapper .input-field'),
mistakeTag = document.querySelector('.mistake span'),
timeTag = document.querySelector('.time span b'),
wpmTag = document.querySelector('.wpm span'),
cpmTag = document.querySelector('.cpm span'),
tryAgainBtn = document.querySelector('.content button');

let timer,
maxTime= 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;


function randomParagraph(){
    let randIndex= Math.floor(Math.random() * paragraphs.length);
    // console.log(paragraphs[randIndex]);
    paragraphs[randIndex].split('').forEach(span=>{
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll('span')[0].classList.add('active');
    //focusing input field on keydown or click events
    document.addEventListener('keydown',()=> inputFiled.focus());
    typingText.addEventListener('click',()=> inputFiled.focus());
};

function initTyping(){
    const characters = typingText.querySelectorAll('span');
    let typedChar = inputFiled.value.split('')[charIndex];
    if (charIndex < characters.length -1 && timeLeft > 0){
        if(!isTyping){
        timer = setInterval(initTimer, 1000)
        isTyping = true;
    }

    if(typedChar == null){
        charIndex--;
        if(characters[charIndex].classList.contains('incorrect')){
            mistakes--;
        }
        characters[charIndex].classList.remove('correct','incorrect');
    } else {
        if (characters[charIndex].innerText === typedChar) {
            // console.log('correct');
            characters[charIndex].classList.add('correct');
        } else {
            // console.log('incorrect');
            mistakes++
            characters[charIndex].classList.add('incorrect');
        }
        charIndex++;
    }
    characters.forEach(span=> span.classList.remove('active'));
    characters[charIndex].classList.add('active');

    let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    // if wpm value - o, empty or infinity then set it's value to 0
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes; 
    } else{
        inputFiled.value = "";
        clearInterval(timer);
    }
};

function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
};

function resetGame(){
    randomParagraph();
    inputFiled.value = '';
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
};

randomParagraph();
inputFiled.addEventListener('input', initTyping);
tryAgainBtn.addEventListener('click', resetGame);