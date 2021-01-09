//GAME TEXT
var mainText = "This function accepts two parameters as mentioned above and described below"
var words = mainText.split(" ")
var n = words.length

//HTML ELEMENTS
var mainBut = document.getElementById('submitButton')
var text = document.getElementById('text')
var typer = document.getElementById('typePhrase')
var accuracyBox = document.getElementById('accuracy')
var errorBox = document.getElementById('errors')
var bestAccuracyBox = document.getElementById('bestAccuracy')
var wmpBox = document.getElementById('bestWmp')
var wordBoxes = document.getElementsByClassName("labels")
var triangle = document.getElementById('triangle')

//EVENTS
mainBut.addEventListener('mousedown', handleMouseClick)
typer.addEventListener('keydown', handleKeyPress);

//VARIABLE INITIALIZER
var accuracy = null
var error = 0
var bestAccuracy = null
var bestWmp = 0
var wmp = 0
var trgPos = -250
var counter = -1
var tries = 0
var gameStatus = "off"
var startTime
var endTime
var time
var timer = setInterval(moveAll, 30);
var textX = 550

//MAIN FUNCTION
function handleMouseClick(evt){
    //GAME START
    if (counter ===-1) {
        textX = 550
        text.innerHTML = "";    
        for (let i=0; i<n;i++){
            text.innerHTML += "<span id = 'box"+i+"' class='labels'>&nbsp&nbsp" + words[i] + "&nbsp&nbsp</span> &nbsp&nbsp"
        };
        counter++
        mainBut.innerHTML = 'Enter'
        gameStatus = "on"
        text.style.left = 550 + "px"
        trgPos = -250 + wordBoxes[0].offsetWidth/2
        accuracy = null
        error = 0
        tries = 0
        startTime = new Date()

    //GAME NEXT STEP
    } else{
        tries++
        //WIN
        if (typer.value.trim() === wordBoxes[counter].textContent.trim()){
        wordBoxes[counter].style.backgroundColor = "green"
        wordBoxes[counter].classList.add("typed")
        counter++
        accuracy = Math.max((1 - error/tries)*100,0)
        accuracyBox.innerHTML = Math.round(accuracy) + '%'
            // GAMEWIN
            if (counter === n){
                endTime = new Date()
                time = (endTime - startTime)/1000
                wmp = Math.round(n/time*60)
                if (accuracy > bestAccuracy){
                    bestAccuracy = accuracy
                    bestAccuracyBox.innerHTML = Math.round(bestAccuracy)+'%'
                }
                if (wmp > bestWmp){
                    bestWmp = wmp
                    wmpBox.innerHTML = bestWmp
                    alert("You broke your previous record! You've done it in "+ Math.round(time*100)/100+" seconds, which is : "+wmp+" words per minute")
                } else{
                    alert("Yeah ! You've done it in "+ Math.round(time*100)/100+" seconds, which is : "+wmp+" words per minute")
                }
                
                mainBut.innerHTML = 'Restart'
                counter=-1
                gameStatus = "off"
                accuracyBox.innerHTML = '%'
                errorBox.innerHTML = '0'
            }
            else {
                //TRIANGLE GOES TO NEXT WORD
                trgPos = -250 + wordBoxes[counter].offsetLeft + wordBoxes[counter].offsetWidth/2
            }
        //ERROR
        } else {
        error++
        errorBox.innerHTML = error
        accuracy = Math.max((1 - error/tries)*100,0)
        accuracyBox.innerHTML = Math.round(accuracy) + '%'

        // wordBoxes[counter].style.backgroundColor = "orange"
        wordBoxes[counter].classList.add("mistake")
        }    
    }
    typer.value=''
}   

// ALLOW USER TO USE ENTER OR SPACE INSTEAD OF MAIN BUTTON
function handleKeyPress(evt){
    if (evt.key === 'Enter') {
        handleMouseClick()
    }    
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            handleMouseClick()
        }
    }
}  

//MOVE ALL
function moveAll(){
    if (gameStatus === "on") {
        textX-=2
        text.style.left = textX +"px";
        triangle.style.left = textX + trgPos + "px";
        if (counter ===0) {
            triangle.style.visibility = "visible"
        }    
        
        for (let i=0; i<n;i++){
            if ((parseInt(text.style.left) + wordBoxes[i].offsetLeft <= 0) && !(wordBoxes[i].classList.contains("typed")) && !(wordBoxes[i].classList.contains("missed"))){

                wordBoxes[i].style.backgroundColor = "red"
                wordBoxes[i].classList.add("missed")
                error++
                errorBox.innerHTML = error
                Math.max((1 - error/tries)*100,0)
                accuracyBox.innerHTML = Math.round(accuracy) + '%'
                counter++
                if (counter === n) {
                    alert("Game End")
                    counter=-1     
                    gameStatus = "off"
                    mainBut.innerHTML = 'Restart'
                } else {
                    trgPos = -250 + wordBoxes[i+1].offsetLeft + wordBoxes[i+1].offsetWidth/2
                }
                typer.value=''
            }
        }
    }
}

