var EventEmitter = function() {
    this.listeners = {}
}
EventEmitter.prototype = {
    on: function(type, fn) {
        if(typeof this.listeners[type] === 'undefined') {
            this.listeners[type] = []
        }
        this.listeners[type].push(fn)
    },
    firstOn: function(type, fn) {
        if(typeof this.listeners[type] === 'undefined') {
            this.listeners[type] = []
        }
        this.listeners[type].unshift(fn)
    },
    once: function(type, fn) {
        var _this = this
        this.on(type, function f() {
            fn()
            _this.off(type, f)
        })
    },
    off: function(type, fn) {
        if (this.listeners[type]) {
            var arr = []
            for(var i = 0;i < this.listeners[type].length;i++) {
                var temp = this.listeners[type][i]
                if (temp !== fn) {
                    arr.push(temp)
                }
            }
            this.listeners[type] = arr
        }
    },
    trigger: function(type, args) {
        var _this = this
        if (this.listeners[type]) {
            var handle = function() {
                var fn = _this.listeners[type].shift()
                fn && Promise.resolve()
                .then(function() {
                    return fn.call(null, args)
                })
                .then(handle)
            }
            handle()
        }
    }
}
