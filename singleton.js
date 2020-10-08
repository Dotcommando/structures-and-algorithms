class Singleton {
    constructor(data) {
        if (Singleton.instance) {
            return Singleton.instance;
        }

        Singleton.instance = this;
        this.data = data;

        return this;
    }

    showData() {
        console.log('Классовый синглтон', this.data);
    }
}

function SingletonFn(data) {
    if (SingletonFn.instance) {
        return SingletonFn.instance;
    }

    SingletonFn.instance = this;
    this.data = data;

    this.showData = () => console.log('Функциональный синглтон', this.data);

    return this;
}

const single1 = new Singleton('Экземпляр №1');
const single2 = new Singleton('Экземпляр №2');

const single3 = SingletonFn('Экземпляр №1');
const single4 = SingletonFn('Экземпляр №2');

single1.showData();
single2.showData();
single3.showData();
single4.showData();
