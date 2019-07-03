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

  setupEllipse() {
    this.ellipse = { x: -100, y: this.screenHeight/2 }
    this.ellipse.shape = this.generator.ellipse(0, 0, this.screenWidth/3, this.screenHeight*.3, {
      roughness: 1.5,
      strokeWidth: 9,
    })
    this.timeline.add({
      targets: this.ellipse,
      x: this.screenWidth/2,
      duration: 3000,
    })
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
      const radius = theta => (a*b) / Math.sqrt(Math.pow(b*Math.cos(theta), 2) + Math.pow(a*Math.sin(theta), 2))
      const angle = Math.PI + (Math.PI / this.player.pickers.length) * i
      this.timeline.add({
        targets: pickerCircle,
        x: this.screenWidth/2 + radius(angle)*Math.cos(angle),
        y: this.screenHeight/2 + radius(angle)*Math.sin(angle),
        begin: anim => {
          this.audio.play()
          pickerCircle.isVisible = true
        }
      })
      return pickerCircle
    })
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

    this.pickerCircles.forEach(pc => {
      if (pc.isVisible) {
        rc.circle(pc.x, pc.y, 170)
        ctx.font = '40px "Gloria Hallelujah"'
        ctx.textBaseline = this.isAuthorVisible && this.player.isCurrPlayer ? 'bottom' : 'middle'
        ctx.strokeText(pc.name, pc.x, pc.y)
        if (this.isAuthorVisible && this.player.isCurrPlayer) {
          ctx.textBaseline = 'top'
          ctx.strokeText(1000, pc.x, pc.y)
        }
      }
    })

    ctx.translate(this.ellipse.x, this.ellipse.y)
    ctx.beginPath()
    ctx.ellipse(0 ,0, this.screenWidth*.4/2, this.screenHeight*.3/2, 0, 0, 2*Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()
    rc.draw(this.ellipse.shape)

    ctx.font = '80px "Gloria Hallelujah"'
    ctx.textAlign = 'center'
    ctx.textBaseline = this.isAuthorVisible ? 'bottom' : 'middle'
    ctx.strokeText(this.player.title ? this.player.title : this.player.prompt, 0, 0)

    if (this.isAuthorVisible) {
      ctx.textBaseline = 'top'
      ctx.font = '80px "Gloria Hallelujah"'
      const message = this.player.isCurrPlayer ?
        'actual title!' :
        `${this.player.name}'s answer`
      ctx.strokeText(message, 0, 0)

      ctx.textBaseline = 'middle'
      const points = this.player.pickers.length * (this.player.isCurrPlayer ? 1000 : 500)
      ctx.strokeText(`${points} points!`, 0, 250)
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
}