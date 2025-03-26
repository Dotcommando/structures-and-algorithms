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

            return resolve(elements[key] ?? null);
        }, 3000);
    })
}

class Cache {
    #ttl = 10000;

    constructor() {
        this.cache = new Map();
    }

    set(key, value, ttl) {
        this.cache.set(key, {
            value,
            timeout: setTimeout(() => this.delete(key), ttl ?? this.#ttl),
        })
    }

    get(key) {
        const cacheEntry = this.cache.get(key);

        if (!cacheEntry) return null;

        return cacheEntry.value;
    }

    delete(key) {
        const cacheEntry = this.cache.get(key);

        if (!cacheEntry) return;

        clearTimeout(cacheEntry.timeout);

        this.cache.delete(key);
    }

    clear() {
        this.cache.forEach((val, key) => {
            this.delete(key);
        });
    }
}

class API {
    #cache;
    #apiCalls = new Map();

    constructor(ttl = 10000) {
        this.#cache = new Cache(ttl);
    }

    #callApi(key) {
        if (this.#apiCalls.has(key)) {
            return this.#apiCalls.get(key);
        }
        else {
            const apiCall = new Promise((resolve, reject) => {
                return fetchAPI(key)
                    .then((result) => {
                        this.#cache.set(key, result)

                        resolve(result);
                    })
                    .finally(() => {
                        this.#apiCalls.delete(key);
                    });
            });

            this.#apiCalls.set(key, apiCall);

            return apiCall;
        }
    }

    get(key) {
        const cacheData = this.#cache.get(key);

        if (cacheData !== null) {
            return Promise.resolve(cacheData);
        }

        return this.#callApi(key);
    }
}

const api = new API(10000);

api.get('f').then((result) => console.log(`Call #1`, result));
api.get('f').then((result) => console.log(`Call #2`, result));
api.get('f').then((result) => console.log(`Call #3`, result));
api.get('f').then((result) => console.log(`Call #4`, result));
