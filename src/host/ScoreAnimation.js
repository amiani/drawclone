import anime from 'animejs'

export default class ScoreAnimation {
  constructor(title, pickers, generator, screenWidth, screenHeight, audio, audioSrc, onComplete) {
    this.title = title
    this.pickers = pickers
    this.generator = generator
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
    this.audio = audio
    this.audio.src = audioSrc
    this.timeline = anime.timeline({
      autoplay: false,
      complete: onComplete
    })

    this.ellipse = { x: -100, y: screenHeight/2 }
    this.ellipse.shape = generator.ellipse(0, 0, this.screenWidth/3, this.screenHeight*.3, {
      roughness: .15,
      strokeWidth: 3,
    })
    this.timeline.add({
      targets: this.ellipse,
      x: screenWidth/2,
      duration: 3000,
    })

    this.pickerCircles = pickers.map((picker, i) => {
      const pickerCircle = {
        name: picker,
        x: screenWidth/2,
        y: screenHeight/2,
        isVisible: false
      }
      this.timeline.add({
        targets: pickerCircle,
        x: screenWidth/2 + 600*Math.cos((Math.PI/4)*(i + 4)),
        y: screenHeight/2 + 600*Math.sin((Math.PI/4)*(i + 4)),
        begin: anim => {
          this.audio.play()
          pickerCircle.isVisible = true
        }
      })
      return pickerCircle
    })
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
        ctx.textBaseline = 'bottom'
        ctx.strokeText(pc.name, pc.x, pc.y)
        ctx.textBaseline = 'top'
        ctx.strokeText(1000, pc.x, pc.y)
      }
    })

    ctx.translate(this.ellipse.x, this.ellipse.y)
    ctx.beginPath()
    ctx.ellipse(0 ,0, this.screenWidth*.4/2, this.screenHeight*.3/2, 0, 0, 2*Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()
    rc.draw(this.ellipse.shape)

    ctx.font = '100px "Gloria Hallelujah"'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.strokeText(this.title, 0, 0)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
}