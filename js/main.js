let items = document.getElementsByClassName('item')
let list = document.getElementsByClassName('list')[0]
let container = document.getElementsByClassName('container')[0]
let points = document.getElementsByClassName('point-item')
  // 根据Index来切换active类名
let _setIndex = function() {
  let index = state.index
  for (let i = 0; i < points.length; i++) {
    points[i].classList.remove('active')
  }
  points[index].classList.add('active')
}

// 兼容图片数量
list.style.width = items.length * window.innerWidth + 'px'

let state = {
  beginX: 0,
  endX: 0,
  nowX: 0,
  index: 0
}

let _slice = () => {
  let deltaX = state.nowX - state.beginX
  list.style.marginLeft = -(state.index * window.innerWidth) + deltaX + 'px'
}

let _reset = () => {
  // 需要一个过渡让复位效果更自然
  list.style.transition = 'all .3s'
    // 在第几张就要复位到第几张
  list.style.marginLeft = (-state.index * window.innerWidth + 'px')
}

let _goPrev = () => {
  if (state.index > 0) {
    list.style.transition = 'all .3s'
    state.index--
      list.style.marginLeft = -state.index * window.innerWidth + 'px'
      // 小点
    _setIndex()
  } else {
    // 复位
    _reset()
  }
}

let _goNext = () => {
  if (state.index < items.length - 1) {
    state.index++
      list.style.transition = 'all .3s'
    list.style.marginLeft = -state.index * window.innerWidth + 'px'
      // 小点
    _setIndex()

  } else {
    // 复位
    _reset()
  }
}

let _judgeMove = () => {
  let deltaX = state.endX - state.beginX

  if (deltaX <= -window.innerWidth * 2 / 5) {
    _goNext()

  } else if (deltaX >= window.innerWidth * 2 / 5) {
    _goPrev()

  } else {
    //不动
    _reset()

  }
}

// touchstart 触摸开始
//当你的手指摸到屏幕的时候触发
//click
container.addEventListener('touchstart', e => {
  // 去除过渡，获得良好的跟手反馈
  list.style.transition = 'none'
  state.beginX = e.targetTouches[0].clientX
})

//touchmove 触摸移动
container.addEventListener('touchmove', e => {
  var nowX = e.changedTouches[0].clientX
    // 记录nowX
  state.nowX = nowX

  _slice()
})

//touchend触摸取消
container.addEventListener('touchend', e => {
  //记录endX
  state.endX = e.changedTouches[0].clientX
  _judgeMove()
})

// 点击跳转图片
for (let i = 0; i < points.length; i++) {
  points[i].onclick = () => {
    state.index = i
    _setIndex()
    list.style.marginLeft = -(state.index * window.innerWidth) + 'px'
  }
}

// 实现轮播效果
let change = setInterval(() => {
  if (state.index === 2) {
    state.index = -1
  }
  list.style.transition = 'none'
  state.index += 1
  _setIndex()
  list.style.marginLeft = -(state.index * window.innerWidth) + 'px'
}, 4000)