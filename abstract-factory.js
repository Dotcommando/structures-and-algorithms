class AbstractDrinkFactory {
    createAlcoholDrink(composition) {
        return new AbstractAlcoholDrink(composition);
    }

    createNonAlcoholDrink(composition) {
        return new AbstractNonAlcoholDrink(composition);
    }
}

class AbstractAlcoholDrink {
    constructor(composition) {
        this.isFull = true;
        this.containsAlcohol = true;
        this.composition = composition;
    }

    drink() {
        this.isFull = false;
    }

    showComposition() {
        console.dir(this.composition);
    }
}

class AbstractNonAlcoholDrink {
    constructor(composition) {
        this.isFull = true;
        this.containsAlcohol = false;
        this.composition = composition;
    }

    drink() {
        this.isFull = false;
    }

    showComposition() {
        console.dir(this.composition);
    }
}

// Example
class BarDrinkFactory extends AbstractDrinkFactory {
    createAlcoholDrink(composition) {
        return new BlackRussian(composition);
    }

    createNonAlcoholDrink(composition) {
        return new Cappuccino(composition);
    }
}

class BlackRussian extends AbstractAlcoholDrink {
    constructor(composition) {
        super(composition);
        console.log('Black Russian is completed.');
    }
}

class Cappuccino extends AbstractNonAlcoholDrink {
    constructor(composition) {
        super(composition);
        console.log('Cappuccino is completed.');
    }
}

const bar = new BarDrinkFactory();
const blackRussian = bar.createAlcoholDrink({
    vodka: {
        parts: 5
    },
    coffeeLiqueur: {
        parts: 2
    }
});
const cappuccino = bar.createNonAlcoholDrink({
    espresso: {
        parts: 1
    },
    milk: {
        parts: 1
    },
    milkFoam: {
        parts: 1
    }
});

blackRussian.showComposition();
cappuccino.showComposition();
