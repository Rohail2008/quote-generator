const button = document.querySelector(".dice-bg");
const quoteElement = document.querySelector(".quote");
const counter = document.querySelector(".counter");

const displayQuote = (advice, id) => {
  quoteElement.innerText = '"' + advice + '"'
  counter.innerText = id
}

const getQuote = async () => {
  const url = "https://api.adviceslip.com/advice";
  fetch(url).then(response => {
    if(!response.ok) {
      throw new Error(response.status)
    }
    return response.json()
  }).then(data => {
    displayQuote(data.slip.advice, data.slip.id)
  }).catch(error => {
    console.log(error)
  })
}

// animation using gsap
const tween = gsap.to(".icon-dice", {
  rotate: '360deg',
  duration: 1,
  ease: 'back.out'
})

let hide = gsap.set(".counter", {
  opacity: 0
})
let show = gsap.to(".counter", {
  opacity: 1
})
  
let enabled = true;
button.addEventListener("click", function() {
  if(enabled) {
    getQuote()
    hide.restart();
    tween.restart();
    show.restart();
  }
  enabled = false;
}) 

// api caches advice for two seconds
setInterval(() => enabled = true, 2000);