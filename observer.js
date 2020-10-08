class EventEmitter {
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return new EventEmitterSubscription(event, callback, this);
    }

    dispatch(event, data) {
        if (!this.events[event]) { return; }
        for (const callback of this.events[event]) {
            callback(data);
        }
    }
}

class EventEmitterSubscription {
    constructor(event, callback, context) {
        this.event = event;
        this.callback = callback;
        this.context = context;
    }

    unsubscribe() {
        if (!this.context || !this.context.events) {
            return 0;
        }
        if (!this.context.events[this.event]) {
            return -1;
        }
        const pos = this.context.events[this.event].indexOf(this.callback);
        if (pos === -1) {
            return -1;
        }
        this.context.events[this.event].splice(pos, 1);
        if (this.context.events[this.event].length === 0) {
            delete this.context.events[this.event];
        }
        return 1;
    }
}

const observer = new EventEmitter();

const subscription1 = observer.subscribe('random', (data) => {
    console.log('1st Subscriber', data);
});

const subscription2 = observer.subscribe('random', (data) => {
    console.log('2nd Subscriber', data);
});

setTimeout(() => {
    observer.dispatch('random', Math.round(Math.random() * 10000));
}, 2000);

setTimeout(() => {
    observer.dispatch('random', Math.round(Math.random() * 10000));
}, 4000);

setTimeout(() => {
    subscription1.unsubscribe();
    subscription2.unsubscribe();
}, 4001);
