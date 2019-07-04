import anime from 'animejs'

export default class ScoreAnimation {
  constructor(player, generator, screenWidth, screenHeight, audio, audioSrc, onComplete) {
    this.player = player
    this.isAuthorVisible = false
    this.generator = generator
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
    this.audio = audio
    this.audio.src = audioSrc
    this.timeline = anime.timeline({
      autoplay: false,
      complete: onComplete
    })

    this.setupEllipse()
    this.setupCircles()
    this.setupReveal()
    this.timeline.add({
      duration: 500
    })
  }

  ellipseRadius(a, b, theta) {
    return (a*b) / Math.sqrt(Math.pow(b*Math.cos(theta), 2) + Math.pow(a*Math.sin(theta), 2))
  }

  setupEllipse() {
    this.ellipse = { x: -100, y: this.screenHeight/2 }
    this.ellipseWidth = this.screenWidth / 3
    this.ellipseHeight = this.screenHeight / 3
    this.screenWidth !== window.innerWidth && console.log('not same!')
    this.ellipse.shape = this.generator.ellipse(0, 0, this.ellipseWidth, this.ellipseHeight, {
      roughness: 1.5,
      strokeWidth: 9,
    })
    this.timeline.add({
      targets: this.ellipse,
      x: this.screenWidth/2,
      duration: 3000,
    })
  }

  drawEllipse(ctx, rc) {
    ctx.beginPath()
    ctx.ellipse(0, 0, this.ellipseWidth/2, this.ellipseHeight/2, 0, 0, 2*Math.PI)
    ctx.fillStyle = '#db3a34'
    ctx.fill()
    rc.draw(this.ellipse.shape)
  }

  setupCircles() {
    this.pickerCircles = this.player.pickers.map((picker, i) => {
      const pickerCircle = {
        name: picker,
        x: this.screenWidth/2,
        y: this.screenHeight/2,
        isVisible: false
      }
      const a = this.screenWidth / 3
      const b = this.screenHeight / 3
      const angle = Math.PI + (Math.PI / this.player.pickers.length) * i
      this.timeline.add({
        targets: pickerCircle,
        x: this.screenWidth/2 + this.ellipseRadius(a, b, angle)*Math.cos(angle),
        y: this.screenHeight/2 + this.ellipseRadius(a, b, angle)*Math.sin(angle),
        begin: anim => {
          this.audio.play()
          pickerCircle.isVisible = true
        }
      })
      return pickerCircle
    })
  }

  drawCircles(ctx, rc) {
    ctx.fillStyle = '#ffc857'
    ctx.strokeStyle = '#ffc857'
    const diameter = this.screenHeight*2/9
    this.pickerCircles.forEach(pc => {
      if (pc.isVisible) {
        rc.circle(pc.x, pc.y, diameter, {
          strokeWidth: 5
        })
        this.fitText(pc.name, 80, diameter*.9, ctx)
        ctx.textBaseline = this.isAuthorVisible && this.player.isCurrPlayer ? 'bottom' : 'middle'
        ctx.fillText(pc.name, pc.x, pc.y)
        if (this.isAuthorVisible && this.player.isCurrPlayer) {
          ctx.textBaseline = 'top'
          ctx.strokeText(1000, pc.x, pc.y)
        }
      }
    })
  }

  fitText(text, maxFontSize, width, ctx) {
    let fontSize = maxFontSize+1
    do {
      ctx.font = `${--fontSize}px "Gloria Hallelujah"`
    } while(ctx.measureText(text).width > width)
  }

  drawTitle(ctx) {
    ctx.textBaseline = 'middle'
    const text = this.player.title ? this.player.title : this.player.prompt
    this.fitText(text, 80, this.ellipseWidth*.9, ctx)
    ctx.fillStyle = 'white'
    ctx.fillText(text, 0, this.isAuthorVisible ? -50 : 0)
  }

  setupReveal() {
    this.timeline.add({
      begin: anim => this.isAuthorVisible = true
    }, '+=500')
  }

  play() {
    this.timeline.play()
  }

  draw(ctx, rc) {
    ctx.textAlign = 'center'

    this.drawCircles(ctx, rc)
    ctx.translate(this.ellipse.x, this.ellipse.y)
    this.drawEllipse(ctx, rc)
    this.drawTitle(ctx)

    if (this.isAuthorVisible) {
      ctx.textBaseline = 'middle'
      ctx.font = '80px "Gloria Hallelujah"'
      const message = this.player.isCurrPlayer ?
        'actual title!' :
        `${this.player.name}'s answer`
      this.fitText(message, 80, this.ellipseWidth*.9, ctx)
      ctx.fillStyle = '#ffc857'
      ctx.fillText(message, 0, 70)

      const points = this.player.pickers.length * (this.player.isCurrPlayer ? 1000 : 500)
      ctx.fillText(`${points} points!`, 0, 250)
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
}