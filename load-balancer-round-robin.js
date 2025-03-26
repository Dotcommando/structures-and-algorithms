class LoadBalancer {
    #servers;
    #index = 0;

    constructor(servers) {
        this.servers = servers;
    }

    next() {
        const server = this.#servers[this.index];
        this.index = (this.#index + 1) % this.#servers.length;
        return server;
    }
}
