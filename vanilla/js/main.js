console.log("INICIO do Jogo")

let cardId = 0
let divId = ""
let cont = 0

console.clear()
function clickCard(element){
 	cont++

	let id = element.getAttribute("id")
	let card = element.getAttribute("name")

    element.classList.add("card-selected")
	
	if(cont==1){
		divId = id
		cardOne = card
	}else{
		cont = 0

		if(card == cardOne){
			console.log("Cartas Iguais")
			// Cartas iguais, ganha ponto, add css, desabilita
			let disableCards = document.querySelectorAll("[name='"+card+"']")
			disableCards[0].onclick = null
			disableCards[1].onclick = null
			clearClass(id, divId)
		}else{
			console.log("Vira o card para baixo")
			clearClass(id, divId)
		}

	}

}

function clearClass(id, div){
	setTimeout(()=>{
		document.getElementById(id).classList.remove("card-selected")
		document.getElementById(div).classList.remove("card-selected")
	}, 1500)    

}

//document.querySelectorAll("[name='3-myId']").innerHtml = "oiiiiii"
//document.querySelectorAll("[name='3-myId']").classList.add("card-selected")
