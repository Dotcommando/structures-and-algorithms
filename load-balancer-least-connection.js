class LoadBalancer {
    #servers;

    constructor(servers) {
        this.#servers = [];
        this.#init(servers);
    }

    #init(servers) {
        for (const s of servers) {
            this.#servers.push({
                url: s,
                connections: 0,
            });
        }
    }

    handleRequest() {
        const targetServer = this.#servers.reduce((prev, curr) => {
            return (prev.connections < curr.connections) ? prev : curr;
        }, this.#servers[0]);

        console.log(targetServer);

        targetServer.connections++;

        return targetServer.url;
    }

    completeRequest(server) {
        const targetServer = this.#servers.find(s => s.url === server);

        if (!targetServer) return;
        if (targetServer.connections === 0) return;

        targetServer.connections--;
    }
}

const lb = new LoadBalancer([ 'A', 'B', 'C' ]);

console.log(lb.handleRequest()); // A
console.log(lb.handleRequest()); // B
console.log(lb.handleRequest()); // C
console.log(lb.handleRequest()); // A (all have 1 connection)
lb.completeRequest('B');
console.log(lb.handleRequest()); // B (not it has 0 connections)
