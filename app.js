let mainGrid=document.querySelector(".gridder")
let mainButton=document.querySelector(".mainButton")
let mineInputElement=document.querySelector(".mines-box")
let bombArr = [];
let alreadyPlayed=false
let safeTileCounter=0;
let moneyInputElement=document.querySelector(".money-box")
const baseMultiplier = 1.1;
const growthRate = 1.15;
let betAmount;
generateGrid()
mainGrid.style.opacity=0.4
mainButton.addEventListener("click",()=>{
    if (alreadyPlayed){
        resetGame()
        alreadyPlayed=false
    }
    
     betAmount = Number(moneyInputElement.value);
    if (userMoney > betAmount) {
        console.log("money was enough starting the game");
        userMoney = userMoney - betAmount
        mainGrid.style.opacity = 1;
        cellListeners(Number(mineInputElement.value)<1?5:Number(mineInputElement.value),betAmount)}
    
    else{
        console.log("you dont have that much money");
        
    }
})


function generateGrid(){
    gridHtml=``

for (let id=1; id<26;id++){
    cellHtml=`<div class="cells" id="${id}"></div>`
    gridHtml+=cellHtml
}
document.querySelector(".gridder").innerHTML=gridHtml
}

function cellListeners(numOfBombs=5,betAmount=Number){
    bombArr = bombArrayGenerator(numOfBombs) 
    console.log(bombArr);
    mainButton.classList.add("isHidden")
    mineInputElement.disabled = true
    moneyInputElement.disabled = true
    
    document.querySelectorAll(".cells").forEach(cell => {
        cell.addEventListener("click",(event)=>{
            let currCell = event.srcElement
            
            if(currCell.classList.contains("diamond")||currCell.classList.contains("bomb")){
                console.log("this button was already pressd");
            }
            else{  
                    console.log("new button");
                    
                    let isDiamond=userPicked()
                    if (isDiamond)
                    {
                        console.log("it was a diamond")
                        currCell.classList.add("diamond")
                        safeTileCounter++
                        calculateProfit(safeTileCounter);
                    }
                    else
                    {
                        
                        mainButton.classList.remove("isHidden");
                        console.log("it was a bomb");
                        currCell.classList.add("bomb")
                        resetVairables();
                        
                        calculateProfit(safeTileCounter);
                    }  }  
})
});
}

function bombArrayGenerator(numOfBombs=5){
    for (let i=1;i<26;i++){
        if(i<numOfBombs+1){
            bombArr.push("bomb")
        }else{bombArr.push("diamond")}
    }
    console.log("new mines created with",numOfBombs,"mines");
    
    return bombArr
    
}


function userPicked(){
    let isDiamond=false
    let index = Math.floor(Math.random() * bombArr.length)
    console.log("this is the random index:",index);
    if(bombArr.length>=1){
    let userPicked =bombArr[index]
        bombArr.splice(index, 1)
        console.log(bombArr);

        if (userPicked=="bomb"){
            console.log("bomb");
        }else{
            console.log("diamond");
            isDiamond=true
        }
    } else {
        console.log("less than 0 elements in array game finished"); 
        console.log(bombArr);
    }
        return isDiamond
}

function resetGame(){
    
    document.querySelectorAll(".cells").forEach(cell => {
            cell.classList.remove("bomb")
            cell.classList.remove("diamond")
            })
    safeTileCounter=0
    console.log("game cleared");
    
}
function resetVairables() {
     safeTileCounter = 0;
     mainGrid.style.opacity = 0.5;
     mineInputElement.disabled = false;
     moneyInputElement.disabled = false;
     alreadyPlayed = true;
    betAmount = 0;
    console.log("all variables reset");
}


function calculateProfit(safeTileCounter) {
    if (safeTileCounter) {
        console.log("safetilecounter was not 0");

        let multipliers = Number(
          baseMultiplier * Math.pow(growthRate, safeTileCounter).toFixed(0)
        );

        betAmount = Number(betAmount * multipliers).toFixed(0);
        console.log("multiplier=", multipliers, " money :", betAmount);
        moneyInputElement.value = betAmount;
    } else {
        console.log("safetilecounter was 0");
        betAmount = 0;
        moneyInputElement.value = betAmount;
    }
}
