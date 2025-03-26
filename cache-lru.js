class Node {
    #prev = null;
    #next = null;

    constructor(key, value, prev = null, next = null) {
        this.key = key;
        this.value = value;
        this.#prev = prev;
        this.#next = next;
    }

    get prev() {
        return this.#prev;
    }

    set prev(node) {
        this.#prev = node;
    }

    get next() {
        return this.#next;
    }

    set next(node) {
        this.#next = node;
    }

    get() {
        return { key: this.key, value: this.value };
    }
}

class LinkedList {
    #elements = {};

    constructor() {
        this.head = null;
        this.tail = null;
    }

    addToHead(node) {
        if (!node) return;

        this.#elements[node.key] = node;
        node.prev = null;
        node.next = this.head;

        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }
    }

    removeNode(key) {
        const node = this.#elements[key];

        if (!node) return null;

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            // Если удаляем head
            this.head = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        } else {
            // Если удаляем tail
            this.tail = node.prev;
        }

        delete this.#elements[key];

        node.prev = null;
        node.next = null;

        return node;
    }

    moveToHead(key) {
        const node = this.#elements[key];

        if (!node || this.head === node) return;

        // Отсоединяем узел от текущего места
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (this.tail === node) {
            this.tail = node.prev;
        }

        // Вставляем узел в начало
        node.prev = null;
        node.next = this.head;
        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;
    }

    removeTail() {
        if (!this.tail) return null;

        const tailNode = this.tail;

        if (tailNode.prev) {
            tailNode.prev.next = null;
            this.tail = tailNode.prev;
        } else {
            this.head = null;
            this.tail = null;
        }

        delete this.#elements[tailNode.key];

        tailNode.prev = null;
        tailNode.next = null;

        return tailNode;
    }

    getNode(key) {
        return this.#elements[key] ?? null;
    }

    getSize() {
        return Object.keys(this.#elements).length;
    }
}

class LRUCache {
    #max = 10;
    #list = new LinkedList();

    constructor(max) {
        this.#max = max;
    }

    get(key) {
        const node = this.#list.getNode(key);

        if (!node) return null;

        this.#list.moveToHead(key);
        return node.value;
    }

    set(key, value) {
        let node = this.#list.getNode(key);

        if (node) {
            node.value = value;

            this.#list.moveToHead(key);
        } else {
            node = new Node(key, value);

            if (this.size() >= this.#max) {
                const removed = this.#list.removeTail();

                console.log(`Removed element with key: ${removed.key}`);
            }

            this.#list.addToHead(node);
        }
    }

    delete(key) {
        return this.#list.removeNode(key);
    }

    size() {
        return this.#list.getSize();
    }
}

const cache = new LRUCache(3);

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
console.log('Start state:');
console.log('a:', cache.get('a')); // 1
console.log('b:', cache.get('b')); // 2
console.log('c:', cache.get('c')); // 3

// Доступ к элементу 'a' перемещает его в начало
cache.get('a');
console.log('\nAfter access to "a":');
console.log('a:', cache.get('a')); // 1 (уже на head)
console.log('b:', cache.get('b')); // 2
console.log('c:', cache.get('c')); // 3

// Добавляем новый элемент 'd' - при этом должен удалиться наименее недавно использованный элемент (в данном случае 'b')
cache.set('d', 4);
console.log('\nAfter adding "d":');
console.log('a:', cache.get('a')); // 1
console.log('b:', cache.get('b')); // null, так как должен быть удален
console.log('c:', cache.get('c')); // 3
console.log('d:', cache.get('d')); // 4

// Проверка удаления элемента вручную
cache.delete('c');
console.log('\nAfter removing "c":');
console.log('a:', cache.get('a')); // 1
console.log('c:', cache.get('c')); // null
console.log('d:', cache.get('d')); // 4

// Добавляем ещё один элемент 'e' - так как вместимость кэша 3, в кэше сейчас 2 элемента, поэтому ничего не удалится
cache.set('e', 5);
console.log('\nAfter adding "e":');
console.log('a:', cache.get('a')); // 1
console.log('d:', cache.get('d')); // 4
console.log('e:', cache.get('e')); // 5

// Итоговый размер кэша должен быть 3
console.log('\nCache size:', cache.size()); // 3
