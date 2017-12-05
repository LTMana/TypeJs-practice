const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const context = canvas.getContext('2d')
const FONT_HEIGHT = 15 // 文字高度
const MARGIN = 35 // 外间距
const HAND_TRUNCATION = canvas.width / 25 // 分针和秒针 
const HOUR_HAND_TRUNCATION = canvas.width / 10 // 时针
const NUMERAL_SPACING = 20 // 表盘文字距表盘距离 
const RADIUS = canvas.width / 2 - MARGIN // 描绘半径
const HAND_RADIUS = RADIUS + NUMERAL_SPACING // 表盘文字半径

function drawCircle () {
  context.beginPath()
  context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true)
  context.stroke()
}

function drawNumerals () {
  const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let angle = 0
  let numeralWidth = 0
  for (let numeral of numerals) {
    angle = Math.PI / 6 * (numeral - 3)
    numeralWidth = context.measureText(numeral).width
    context.fillText(numeral, canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2, canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3)
  }
}

function drawCenter () {
  context.beginPath()
  context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true)
  context.fill()
}

function drawHand (loc, isHour) {
  const angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2
  const handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION 
                            : RADIUS - HAND_TRUNCATION
  context.moveTo(canvas.width / 2, canvas.height / 2)
  context.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius, canvas.height / 2 + Math.sin(angle) * handRadius)
  context.stroke()
}

function drawHands () {
  const date = new Date()
  let hour = date.getHours()
  hour = hour > 12 ? hour - 12 : hour
  console.log(hour * 5 + (date.getMinutes() / 60) * 5)
  drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true)
  drawHand(date.getMinutes(), false)
  drawHand(date.getSeconds(), false)
}

function drawClock () {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawCircle()
  drawCenter()
  drawHands()
  drawNumerals()
}

context.font = FONT_HEIGHT + 'px Arial'
setInterval(drawClock, 1000)

