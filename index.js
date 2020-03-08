const scGap = 0.02
const delay = 30
class StateAnimator {

    animated = false
    scale = 0
    interval

    start(cb) {
        if (!this.animated) {
            this.amimated = true
            this.interval = setInterval(() => {
                this.scale += scGap
                cb(Math.sin(this.scale * Math.PI))
                if (this.scale > 1) {
                    this.scale = 0
                    clearInterval(this.interval)
                    this.animated = false
                }
            }, delay)
        }
    }
}
