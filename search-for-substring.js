const maxLength = 1024;
const possibleSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ  ';
const sourceString = createString(possibleSymbols, maxLength);
const sub = 'ab';

// Random integer in predefined range
function randomInteger(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function createString(possibleSymbols, maxLength) {
    let str = '';
    let maxSymbol = possibleSymbols.length - 1;

    for (let i = 0; i < maxLength; i++) {
        str += possibleSymbols[randomInteger(0, maxSymbol)];
    }

    return str;
}

console.log(`String: ${sourceString}.`);

function substringSearch(sub, str) {
    let n = sub.length;
    let N = str.length - n + 1;

    for (let i = 0; i < N; i++) {
        let j = 0;

        while (j < n && sub.charAt(j) === str.charAt(i + j)) {
            j++;
        }

        if (j === n) {
            return i;
        }
    }

    return -1;
}

const shift = substringSearch(sub, sourceString);

console.log(`Shift: ${shift}.`);
