const elements = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
};

function fetchAPI(key) {
    const requestKey = Math.round(Math.random() * 100000000);

    console.log(`Request init, key "${key}", req ${requestKey}`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Request completed, key "${key}", req ${requestKey}`);
            resolve(elements[key] ?? null);
        }, 3000);
    });
}

class Cache {
    #ttl;
    #elements = {};
    #requests = {};

    constructor(ttl = 10000) {
        this.#ttl = ttl;
    }

    #fetchAPI(key) {
        return fetchAPI(key)
            .then((result) => {
                this.set(key, result);

                return result;
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                delete this.#requests[key];
            });
    }

    set(key, value) {
        this.#elements[key] = {
            value,
            expiredAt: Date.now() + this.#ttl,
        };
    }

    get(key) {
        const now = Date.now();
        const cacheData = this.#elements[key];

        if (cacheData) {
            if (now < cacheData.expiredAt) {
                return Promise.resolve(cacheData.value);
            } else {
                if (!this.#requests[key]) {
                    this.#requests[key] = this.#fetchAPI(key);
                }

                return Promise.resolve(cacheData.value);
            }
        } else {
            if (this.#requests[key]) {
                return this.#requests[key];
            } else {
                this.#requests[key] = this.#fetchAPI(key);

                return this.#requests[key];
            }
        }
    }
}

// Создаем кэш с TTL = 5000 мс (5 секунд)
const cache = new Cache(5000);

// Первый вызов: данных в кэше нет, поэтому нужно дождаться выполнения fetchAPI (~3 сек)
cache.get('f').then((result) => console.log(`Call #1 result:`, result));

// Через 2 секунды данные должны быть уже закэшированы и свежими
setTimeout(() => {
    cache.get('f').then((result) => console.log(`Call #2 result:`, result));
}, 2000);

// Через 6 секунд TTL истечет, поэтому get вернет устаревшие данные и запустит обновление в фоне
setTimeout(() => {
    cache.get('f').then((result) => console.log(`Call #3 result (stale, triggers refresh):`, result));
}, 6000);

// Через 9 секунд данные уже должны обновиться (фоновое обновление завершится)
setTimeout(() => {
    cache.get('f').then((result) => console.log(`Call #4 result (after refresh):`, result));
}, 9000);

