var EventEmitter = require('events');

class MyEmitter extends EventEmitter {
    emit(type, ...args) {
            super.emit('*', type, ...args);
            return super.emit(type, ...args) || super.emit('', ...args);

    }
}

Events.bus.emit = MyEmitter.prototype.emit;
Events.bus.on('*', (type, args) => {
        console.log('---------------')
        console.log(`Event: '${type}'`)
        console.log(args)
        console.log('---------------')
    }
)
