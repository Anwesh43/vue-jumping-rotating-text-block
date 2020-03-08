const scGap = 0.02
const delay = 30
const w = window.innerWidth
const h = window.innerHeight

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

Vue.component('jumping-text-block', {

    data() {
        const stateAnimator = new StateAnimator()
        const sf = 0
        return {
            stateAnimator,
            sf
        }
    },

    computed: {
        objStyle() {
            const size = Math.min(w, h) / 6
            const position = 'absolute'
            const left = `${w / 2 - size / 2}px`
            const top = `${h / 2 - size / 2 - (h / 3) * this.sf}px`
            const width = `${size}px`
            const height = `${size}px`
            const background = '#3F51B5'
            const textAlign = 'center'
            const WebkitTransform = `rotate(${180 * this.sf}deg)`
            const color = 'white'
            const style = {
                position,
                left,
                top,
                width,
                height,
                background,
                WebkitTransform,
                textAlign,
                color
            }
            return style
        }
    },

    methods: {
        start() {
            this.stateAnimator.start((sf) => {
                this.sf = sf
            })
        }
    },

    template : '<div :style = "objStyle" @click="start"><slot></slot></div>'
})

const vueInstance = new Vue({
    el : '#app',
})
