let userMoney=10000


let userMoneyDisplay=document.querySelector(".userMoney")
setInterval(() => {
    userMoneyDisplay.innerText=`$${userMoney}`    
}, 1000);