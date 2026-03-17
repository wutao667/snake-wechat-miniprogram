Page({
  data: {
    score: 0,
    highestScore: 0
  },

  canvas: null,
  ctx: null,
  gridSize: 20,
  gridCount: 0,
  snake: [],
  direction: { x: 1, y: 0 },
  nextDirection: { x: 1, y: 0 },
  food: null,
  gameLoop: null,
  gameSpeed: 200,
  isGameRunning: false,
  isGameOver: false,

  onLoad() {
    const highestScore = wx.getStorageSync('highestScore') || 0
    this.setData({ highestScore })
  },

  onReady() {
    this.initCanvas()
  },

  initCanvas() {
    const query = wx.createSelectorQuery()
    query.select('#gameCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (res[0]) {
          const { node, width } = res[0]
          this.canvas = node
          this.ctx = node.getContext('2d')
          
          const dpr = wx.getSystemInfoSync().pixelRatio
          this.canvas.width = width * dpr
          this.canvas.height = width * dpr
          this.ctx.scale(dpr, dpr)
          
          this.gridCount = Math.floor(width / this.gridSize)
          
          this.bindTouch()
        }
      })
  },

  bindTouch() {
    let startX, startY
    let startTime
    const minSwipeDistance = 20 // 最小滑动距离 (px)

    this.canvas.on('touchstart', (e) => {
      const touch = e.touches[0]
      startX = touch.clientX
      startY = touch.clientY
      startTime = Date.now()
      
      // 触摸反馈：轻微震动
      wx.vibrateShort({ type: 'light' })
    })

    this.canvas.on('touchmove', (e) => {
      e.preventDefault()
    })

    this.canvas.on('touchend', (e) => {
      const touch = e.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY
      const endTime = Date.now()
      const duration = endTime - startTime

      const diffX = endX - startX
      const diffY = endY - startY
      const absDiffX = Math.abs(diffX)
      const absDiffY = Math.abs(diffY)

      // 判断是否为有效滑动（避免误触）
      if (Math.max(absDiffX, absDiffY) < minSwipeDistance) {
        return
      }

      // 快速滑动检测（避免过慢的滑动）
      if (duration > 500) {
        return
      }

      // 判断滑动方向：以水平/垂直中较大的为准
      if (absDiffX > absDiffY) {
        // 水平方向
        if (diffX > 0 && this.direction.x !== -1) {
          this.nextDirection = { x: 1, y: 0 }
          console.log('向右滑动')
        } else if (diffX < 0 && this.direction.x !== 1) {
          this.nextDirection = { x: -1, y: 0 }
          console.log('向左滑动')
        }
      } else {
        // 垂直方向
        if (diffY > 0 && this.direction.y !== -1) {
          this.nextDirection = { x: 0, y: 1 }
          console.log('向下滑动')
        } else if (diffY < 0 && this.direction.y !== 1) {
          this.nextDirection = { x: 0, y: -1 }
          console.log('向上滑动')
        }
      }

      // 重置起始点
      startX = null
      startY = null
      startTime = null
    })
  },

  startGame() {
    if (this.isGameRunning) return

    this.isGameRunning = true
    this.isGameOver = false
    this.direction = { x: 1, y: 0 }
    this.nextDirection = { x: 1, y: 0 }
    this.snake = [
      { x: 5, y: 10 },
      { x: 4, y: 10 },
      { x: 3, y: 10 }
    ]
    this.setData({ score: 0 })
    this.generateFood()
    
    if (this.gameLoop) {
      clearInterval(this.gameLoop)
    }
    
    this.gameLoop = setInterval(() => {
      this.update()
      this.render()
    }, this.gameSpeed)
  },

  generateFood() {
    let newFood
    let isOnSnake

    do {
      isOnSnake = false
      newFood = {
        x: Math.floor(Math.random() * this.gridCount),
        y: Math.floor(Math.random() * this.gridCount)
      }

      for (let segment of this.snake) {
        if (segment.x === newFood.x && segment.y === newFood.y) {
          isOnSnake = true
          break
        }
      }
    } while (isOnSnake)

    this.food = newFood
  },

  update() {
    this.direction = this.nextDirection

    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    }

    if (
      head.x < 0 || head.x >= this.gridCount ||
      head.y < 0 || head.y >= this.gridCount
    ) {
      this.gameOver()
      return
    }

    for (let segment of this.snake) {
      if (segment.x === head.x && segment.y === head.y) {
        this.gameOver()
        return
      }
    }

    this.snake.unshift(head)

    if (this.food && head.x === this.food.x && head.y === this.food.y) {
      const newScore = this.data.score + 10
      this.setData({ score: newScore })
      this.generateFood()
    } else {
      this.snake.pop()
    }
  },

  render() {
    if (!this.ctx) return

    const canvasSize = this.gridCount * this.gridSize

    this.ctx.fillStyle = '#1a1a2e'
    this.ctx.fillRect(0, 0, canvasSize, canvasSize)

    for (let i = 0; i < this.gridCount; i++) {
      this.ctx.strokeStyle = '#2a2a3e'
      this.ctx.lineWidth = 0.5
      this.ctx.beginPath()
      this.ctx.moveTo(i * this.gridSize, 0)
      this.ctx.lineTo(i * this.gridSize, canvasSize)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(0, i * this.gridSize)
      this.ctx.lineTo(canvasSize, i * this.gridSize)
      this.ctx.stroke()
    }

    if (this.food) {
      this.ctx.fillStyle = '#e74c3c'
      this.ctx.beginPath()
      this.ctx.arc(
        this.food.x * this.gridSize + this.gridSize / 2,
        this.food.y * this.gridSize + this.gridSize / 2,
        this.gridSize / 2 - 2,
        0,
        Math.PI * 2
      )
      this.ctx.fill()
    }

    this.snake.forEach((segment, index) => {
      if (index === 0) {
        this.ctx.fillStyle = '#2ecc71'
      } else {
        this.ctx.fillStyle = '#27ae60'
      }
      
      this.ctx.fillRect(
        segment.x * this.gridSize + 1,
        segment.y * this.gridSize + 1,
        this.gridSize - 2,
        this.gridSize - 2
      )
    })
  },

  gameOver() {
    clearInterval(this.gameLoop)
    this.gameLoop = null
    this.isGameRunning = false
    this.isGameOver = true

    const currentScore = this.data.score
    const highestScore = this.data.highestScore

    if (currentScore > highestScore) {
      wx.setStorageSync('highestScore', currentScore)
      this.setData({ highestScore: currentScore })
    }

    wx.showModal({
      title: '游戏结束',
      content: `得分：${currentScore}`,
      showCancel: false,
      confirmText: '重新开始'
    })
  },

  onStartTap() {
    this.startGame()
  },

  // 方向按钮控制（备用方案）
  onDirectionTap(e) {
    const direction = e.currentTarget.dataset.dir
    
    switch(direction) {
      case 'up':
        if (this.direction.y !== 1) {
          this.nextDirection = { x: 0, y: -1 }
        }
        break
      case 'down':
        if (this.direction.y !== -1) {
          this.nextDirection = { x: 0, y: 1 }
        }
        break
      case 'left':
        if (this.direction.x === 1) {
          this.nextDirection = { x: -1, y: 0 }
        }
        break
      case 'right':
        if (this.direction.x === -1) {
          this.nextDirection = { x: 1, y: 0 }
        }
        break
    }
    
    // 按钮点击反馈
    wx.vibrateShort({ type: 'light' })
  },

  onUnload() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop)
    }
  }
})
