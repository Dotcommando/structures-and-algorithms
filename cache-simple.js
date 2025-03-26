class Cache {
    constructor() {
        this.cache = new Map();
    }

    set(key, value, ttl) {
        this.cache.set(key, {
            value,
            timeout: setTimeout(() => this.delete(key), ttl),
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

const cache = new Cache();

// Добавляем элементы с разными TTL (в миллисекундах)
cache.set('a', 'alpha', 1000);   // Истекает через 1 секунду
cache.set('b', 'bravo', 3000);   // Истекает через 3 секунды
cache.set('c', 'charlie', 5000); // Истекает через 5 секунд
cache.set('d', 'delta', 2000);   // Истекает через 2 секунды
cache.set('e', 'echo', 4000);    // Истекает через 4 секунды

// Вывод начального состояния
console.log('Initial state:');
console.log('a:', cache.get('a')); // alpha
console.log('b:', cache.get('b')); // bravo
console.log('c:', cache.get('c')); // charlie
console.log('d:', cache.get('d')); // delta
console.log('e:', cache.get('e')); // echo

// Через 1.5 секунды: элемент 'a' должен исчезнуть (TTL = 1 сек)
setTimeout(() => {
    console.log('After 1.5 seconds:');
    console.log('a:', cache.get('a')); // null
    console.log('b:', cache.get('b')); // bravo
    console.log('c:', cache.get('c')); // charlie
    console.log('d:', cache.get('d')); // delta
    console.log('e:', cache.get('e')); // echo
}, 1500);

// Через 2 секунды: демонстрация ручного удаления - удаляем 'b'
setTimeout(() => {
    console.log('Manually deleting key "b" at 2000ms.');
    cache.delete('b');
    console.log('b:', cache.get('b')); // null
}, 2000);

// Через 2.5 секунды: элемент 'd' (TTL = 2 сек) уже должен быть удалён
setTimeout(() => {
    console.log('After 2.5 seconds:');
    console.log('a:', cache.get('a')); // null
    console.log('b:', cache.get('b')); // null (удалён вручную)
    console.log('c:', cache.get('c')); // charlie
    console.log('d:', cache.get('d')); // null
    console.log('e:', cache.get('e')); // echo
}, 2500);

// Через 3.5 секунды: проверяем состояние кэша
setTimeout(() => {
    console.log('After 3.5 seconds:');
    console.log('a:', cache.get('a')); // null
    console.log('b:', cache.get('b')); // null
    console.log('c:', cache.get('c')); // charlie
    console.log('d:', cache.get('d')); // null
    console.log('e:', cache.get('e')); // echo
}, 3500);

// Через 5.5 секунд: элементы 'c' (TTL = 5 сек) и 'e' (TTL = 4 сек) должны исчезнуть
setTimeout(() => {
    console.log('After 5.5 seconds:');
    console.log('a:', cache.get('a')); // null
    console.log('b:', cache.get('b')); // null
    console.log('c:', cache.get('c')); // null
    console.log('d:', cache.get('d')); // null
    console.log('e:', cache.get('e')); // null
}, 5500);
