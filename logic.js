const body = document.getElementById('body')
const charImg = document.getElementById('charImg')
const charContain = document.getElementById('wrapChar')
const enterBtn = document.getElementById('EnterBtn')
const loading = document.getElementById('loading')
const inCityes = document.getElementById('inCityes')
const placeArrow = document.getElementById('placeArrow')
const imgBack = document.getElementById('background')
const MapCityes = document.getElementById('MapCityes')
const mainSection = document.getElementById('sec2')
const helloImg = document.getElementById('helloImg')
const helloText = document.getElementById('helloText')
const keyImg = document.getElementById('keyImg')
var index = -1
var animationImgNum = 0
var counter = 0
var characterDir = true
var isInCity = false
var actualCity = 0
var maxCity = 0
var canMoove = true
body.addEventListener('keypress', (key) => {
  console.log(index)
  stopChar()
  if (key.key == 'q' && isInCity && canMoove) {
    counter += 1
    if (charContain.offsetLeft > -70) {
      charContain.style.marginLeft = charContain.offsetLeft - 6 + 'px'
    }
    if (counter > 3) {
      counter = 0
      animationImgNum += 1
    }
    if (animationImgNum > 7) {
      animationImgNum = 0
    }
    if (counter == 0) {
      charImg.style.marginLeft = animationImgNum * -324 + 'px'
    }
    if (characterDir == true) {
      charImg.style.marginTop = '-0px'
      characterDir = false
      console.log('hi')
    }
  }
  if (key.key == 'd' && isInCity && canMoove) {
    counter += 1

    charContain.style.marginLeft = charContain.offsetLeft + 6 + 'px'

    if (counter > 3) {
      counter = 0
      animationImgNum += 1
    }
    if (animationImgNum > 7) {
      animationImgNum = 0
    }
    if (counter == 0) {
      charImg.style.marginLeft = animationImgNum * -324 + 'px'
    }
    if (characterDir == false) {
      charImg.style.marginTop = '-450px'
      characterDir = true
    }
  }
  outOfCity()
})

document.addEventListener('DOMContentLoaded', () => {
  preparTextImgs(0)
})
function preparTextImgs(index) {
  const textes = [
    `My mother sayed me that a long time ago, Humans and machines lived as a unique entity. Our encestors, with better technologies, knew to combine skin to iron. But everything collapsed. No one now why, but there ruine still alive, also if most of us are scared to explore them.
    Today, the world is divided in 5 big cityes. Every of them survived by it own way. I grewed up with the only people in Dustfield. Here, we take whatever we can and fix it. But we are on our guard in front of machines and the one's, that want to transforme use in something else.`,
    `I schould have paid more attention earlier. The pro-meca's wasn't just a fanatic groupe. They believed in one unique thing: évolution of humans, become stronger with machines, whatever it takes. Mr.X, there boss, he didn't just advise this ideology, he forced it. The night of the attack, i tried stop them. I was to weak. They burned my house, killed my family... And I ? Was just garented one mercy: They let me alive, but not entirely. My left arm was gone.`,
    `When I weaked up, i was somewhere else. A laboratory. And a man in white coat was watching me. He saved my life... Not without reason. The part of mine that was gone camed back, as an mechanical arm.
    After that i understood that, the implant didn't just replaced my arm.it could evolve. I rapidely learned to use it. The arm could be modified, upgraded with what i found on my way and in the ruines. for exemple: 
            - A retractable sword or knif
            - A grap to explor different places
            - even the this of the arm can change
    Every upgrade changed my way of fighting, of moving. But to get them, i needed to explore, recover ressources and somrtimes... fight with the peole on my may.`,
    `I wasn't the same one enymore? And had nothing to loose. My only reason to walk forward, was to find and kill Mr.X.
    Our wide world is dangerous.Each city have it own laws, it own conflicts. Some was dominated by fear, some by war. At each step of my travel, mr.X was here befor me. Every time i thought i would beat him, i just loose another part of mine. My arm. Then my leg. Then my eye...
    But more i was defeated, more i becamed stong. More... mechanical.`,
    `Finally i arrived in the last city. And Mr.X waited on me. But this time i didn't felt. This time he was on his knee.
    And took his mask off. Behind the armor, was the scientist that saved me so many times. The one that gived me that body. the one that transformed me.
    Since the beginning, he guided my steps, pushed me to evolve. He didn't tried to stop me. He tried to see how far i would go. So, yet that i'm more machine than human...What do i have left ? An acomplished reveng ? Or a futur that i didn't choosed ?`,
  ]
  const text = textes[index]
  const mesureContainer = document.getElementById('textMainCheck')
  const visibleContainer = document.getElementById('textMain')
  mesureContainer.innerHTML = ''
  visibleContainer.innerHTML = ''
  const words = text.split(/\s+/)
  console.log(words)

  let curentLine = ''
  let lastOffsetTop = 0
  let lines = []
  words.forEach((word, i) => {
    let span = document.createElement('span')
    span.textContent = i === word.length - 1 ? word : word + ' '
    mesureContainer.appendChild(span)

    if (i === 0) {
      lastOffsetTop = span.offsetTop
    }
    if (span.offsetTop !== lastOffsetTop) {
      lines.push(curentLine.trim())
      curentLine = word + ' '
      lastOffsetTop = span.offsetTop
    } else {
      curentLine += word + ' '
    }
  })
  if (curentLine.trim().length > 0) {
    lines.push(curentLine.trim())
  }
  var longest = 0
  mesureContainer.innerHTML = ''
  lines.forEach((lineText) => {
    let p = document.createElement('p')
    p.classList.add('line')
    p.textContent = lineText
    visibleContainer.appendChild(p)
    if (p.offsetWidth > longest) {
      longest = p.offsetWidth
    }
  })
  imgBack.style.marginLeft = -body.offsetWidth * actualCity + 'px'
}

enterBtn.addEventListener('onClick', () => {
  loading.style.animationName = 'load'
  loading.style.zIndex = 100
  console.log('hi')
})

function enterCity() {
  loading.style.animationName = 'load'
  loading.style.zIndex = 100
  if (actualCity == maxCity && maxCity != 0 && maxCity < 4) {
    maxCity++
  }
}
var animationEnter = true
var helloScreen = false
loading.onanimationend = () => {
  if (!isInCity) {
    if (maxCity == 0) {
      helloImg.style.opacity = 1
      loading.style.opacity = 1
      helloText.style.opacity = 1
      keyImg.style.opacity = 1
      helloScreen = true
    }
    if (animationEnter && maxCity != 0) {
      animationEnter = false
      loading.style.animationName = 'arrive'
      loading.style.opacity = 1
      inCityes.style.zIndex = 99
    } else if (!animationEnter) {
      animationEnter = true
      loading.style.animationName = ''
      loading.style.zIndex = -1

      loading.style.opacity = 0
      isInCity = true
    }
  } else {
    if (animationEnter) {
      animationEnter = false
      loading.style.animationName = 'arrive'
      loading.style.opacity = 1
      inCityes.style.zIndex = -1
      index = -1
    } else if (!animationEnter) {
      animationEnter = true
      loading.style.animationName = ''
      loading.style.zIndex = -1

      loading.style.opacity = 0
      isInCity = false

      charContain.style.marginLeft = -70 + 'px'
    }
  }

  console.log('hi')
}

function changeChossenCity(toLeft) {
  if (toLeft && actualCity > 0) {
    actualCity--
  }
  if (!toLeft && actualCity < maxCity) {
    actualCity++
  }
  arrowPos = [
    '-2vh',
    '54vh',
    '25vh',
    '55vh',
    '-5vh',
    '3vw',
    '73.3vw',
    '16.5vw',
    '20vw',
    '76.5vw',
  ]
  placeArrow.style.left = arrowPos[actualCity + 5]
  placeArrow.style.top = arrowPos[actualCity]
  preparTextImgs(actualCity)
}

function outOfCity() {
  if (
    charContain.offsetLeft + charContain.offsetWidth >
    body.offsetWidth + 50
  ) {
    canMoove = true
    loading.style.animationName = 'load'
    loading.style.zIndex = 100
    if (actualCity == maxCity - 1 && maxCity < 5) {
      MapCityes.src = 'images/mapCityes/backMap' + (4 - maxCity) + '.png'
    }
  }
}
var previourMargin = 0
function stopChar() {
  let allLines = document.querySelectorAll('.line')
  if (charContain.offsetLeft > 10 && index == -1) {
    canMoove = false
    index = 0
    mainSection.style.opacity = 1
    charImg.src = 'images/wait.png'
    previourMargin = charImg.offsetLeft
    charImg.style.marginLeft = 0 + 'px'
    charImg.style.marginTop = 0 + 'px'
    charImg.style.height = 450 + 'px'
    console.log(previourMargin)
  }
  if (charContain.offsetLeft < 10 && index == -2 && canMoove) {
    canMoove = false
    index = 0
    allLines.forEach((line) => {
      line.style.opacity = 0
    })
    mainSection.style.opacity = 1
    charImg.src = 'images/wait.png'
    previourMargin = charImg.marginLeft
    charImg.style.marginLeft = 0 + 'px'
    charImg.style.marginTop = 0 + 'px'
    charImg.style.height = 450 + 'px'
    console.log(previourMargin)
  }
}
document.addEventListener('keyup', (event) => {
  console.log(index)
  if (canMoove == false) {
    let allLines = document.querySelectorAll('.line')
    if (index == 0) {
      allLines.forEach((line) => {
        line.style.opacity = 0
      })
    }
    if (event.key == 'd') {
      if (index == allLines.length) {
        charImg.src = 'images/characcter.png'
        charImg.style.marginLeft = previourMargin + 'px'
        charImg.style.marginTop = -450 + 'px'
        charImg.style.height = 900 + 'px'
        mainSection.style.opacity = 0
        canMoove = true
        if (charContain.offsetLeft > 10 && index == allLines.length) {
          index = -2
          charContain.style.marginLeft = charContain.offsetLeft + 6 + 'px'
        }
      }
      if (index < allLines.length) {
        allLines[index].style.opacity = 1
        index++
      }
    }
    if (event.key == 'q') {
      if (index > 0) {
        allLines[index - 1].style.opacity = 0
        index--
      }
    }
  }
  if (helloScreen && event.key == 'd') {
    helloImg.style.opacity = 0
    helloText.style.opacity = 0
    keyImg.style.opacity = 0
    helloScreen = false
    animationEnter = false
    loading.style.animationName = 'arrive'
    inCityes.style.zIndex = 99
    maxCity++
  }
})
