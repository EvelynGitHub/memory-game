console.log("INICIO do Jogo")

let cardId = 0
let divId = ""
let cont = 0
let points = 0;

let amountCard = document.getElementById("numberCards")
let btnStart = document.getElementById("btnStart")
let game = document.getElementById("game")


btnStart.addEventListener("click", function(){
	btnStart.hidden = true ;
	amountCard.hidden = true ;
	console.log("Que o jogo começe");
	console.log("Qtd.: ", amountCard.value);
	// Buscar as imagens
	let obj = {
		data: amountCard.value,
		success: function(urls){

			urls = urls.map((v, i) => {return {id: i, img: v}; })

			let cardsOfGame = shuffle ([...urls, ...urls]);

			for(let i=0; i < cardsOfGame.length; i++){
				createCard(i, cardsOfGame[i].id, cardsOfGame[i].img)
			}

		},
		error: function(e){
			console.log(e)
		}
	}
	ajax(obj);
	// http://shibe.online/api/shibes?count=1
	// Gerar Cards

	// Adicionar Cards na div.game
})

// Gerar Cards
function createCard (id, name ,urlImg) {
	const html = `
		${game.innerHTML}
		 <div class="card" name="nameCard-${name}" onclick="clickCard(this)" id="${id}">
			<div class="back">?</div>
			<div class="front"><img src="${urlImg}"></div>
		</div>`

	game.innerHTML = html;
}

function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {

		// Index randomico de 0 a tamanho da array
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// Uso copo para trocar as posições
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


function ajax(param){
	urls = [
		"https://cdn.shibe.online/shibes/04ad3e052255ca4f5f2b5d97c27b24ebd1b9f75c.jpg",
		"https://cdn.shibe.online/shibes/c82ab7c7b9f2b7dde90f015a3faacfe39961607c.jpg",
		"https://cdn.shibe.online/shibes/bc1c0accd8288f6cb6dc8746213f9ab63da38461.jpg"
	]

	param.success(urls);

	return;
}

function clickCard(element){
	cont++

	let id = element.getAttribute("id")
	let card = element.getAttribute("name")

	element.classList.add("card-selected")

	if(cont == 1){
		divId = id
		cardOne = card
	}else{
		cont = 0

		if (card == cardOne) {
			console.log("Cartas Iguais")
			// Cartas iguais, ganha ponto, add css, desabilita
			clearClass(id, divId)
			equalsCards(card)
		} else {
			console.log("Vira o card para baixo")
			clearClass(id, divId)
		}

	}

}

function equalsCards(card){
	let disableCards = document.querySelectorAll("[name='"+card+"']")

	disableCards[0].onclick = null
	disableCards[0].classList.add("card-disable")
	disableCards[1].onclick = null
	disableCards[1].classList.add("card-disable")

	points++;

	if(points != amountCard.value){
		document.getElementById("points").innerHTML = "Pontos: "+points;
		return
	}

	setTimeout(() => {
		game.innerHTML = '';
		btnStart.hidden = false
		amountCard.hidden = false
		cardId = 0
		divId = ""
		cont = 0
		alert("Parabens, você venceu com "+points+" pontos!")
		points = 0;    
		document.getElementById("points").innerHTML = "Pontos: "+points;
	}, 1000)
}

function clearClass(divNow, divBefore){
	setTimeout(()=>{
		document.getElementById(divNow).classList.remove("card-selected")
		document.getElementById(divBefore).classList.remove("card-selected")
	}, 1500)    

}

