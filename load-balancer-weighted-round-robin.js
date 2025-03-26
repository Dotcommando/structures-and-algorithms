// interface Server {
//     name;
//     weight: number;
// }

class LoadBalancer {
    #servers;
    #weightAmount = 0;

    constructor(servers) {
        this.#servers = [];

        for (const s of servers) {
            this.#servers.push({ name: s.name, weight: s.weight, connections: 0, dead: false });
            this.#weightAmount += s.weight;
        }
    }

    next() {
        const aliveServers = this.#servers.filter(s => !s.dead);
        if (aliveServers.length === 0) {
            throw new Error('No alive servers available');
        }

        const targetServer = aliveServers.reduce((prev, curr) => {
            return (prev.connections / prev.weight <= curr.connections / curr.weight) ? prev : curr;
        });

        targetServer.connections++;

        return targetServer;
    }

    fail(serverName) {
        const found = this.#servers.find(s => s.name === serverName);

        if (found) {
            found.dead = true;
            found.connections = 0;
        }
    }

    recover(serverName) {
        const found = this.#servers.find(s => s.name === serverName);

        if (found) {
            found.dead = false;
        }
    }
}

const lb = new LoadBalancer([
    { name: 'S1', weight: 1 },
    { name: 'S2', weight: 2 },
    { name: 'S3', weight: 3 }
]);

console.log(lb.next()); // S1
console.log(lb.next()); // S2
console.log(lb.next()); // S2
console.log(lb.next()); // S3
console.log(lb.next()); // S3
console.log(lb.next()); // S3

lb.fail('S3');
console.log(lb.next()); // S1
console.log(lb.next()); // S2
console.log(lb.next()); // S2

lb.recover('S3');
console.log(lb.next()); // S3 (опять в балансе)

