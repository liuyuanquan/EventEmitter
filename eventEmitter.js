class EventEmitter {
    constructor() {
        this.listeners = {}
    }
    on(type, fn) {
        if(typeof this.listeners[type] === 'undefined') {
            this.listeners[type] = []
        }
        this.listeners[type].push(fn)
    }
    firstOn(type, fn) {
        if(typeof this.listeners[type] === 'undefined') {
            this.listeners[type] = []
        }
        this.listeners[type].unshift(fn)
    }
    once(type, fn) {
        const _this = this
        this.on(type, function f() {
            fn()
            _this.off(type, f)
        })
    }
    off(type, fn) {
        if (this.listeners[type]) {
            this.listeners[type] = this.listeners[type].filter(item => item !== fn)
        }
    }
    trigger(type, args) {
        const _this = this
        if (this.listeners[type]) {
            const handle = function() {
                const fn = _this.listeners[type].shift()
                fn && Promise.resolve().then(() => fn.call(null, args)).then(handle)
            }
            handle()
        }
    }
}
