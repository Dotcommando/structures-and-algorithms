// O(n * log(n))
const arrayLength = 100;
const maxNumberInArray = 1000;
const unsortedArray = [];

// Random integer in predefined range
function randomInteger(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

for (let i = 0; i < arrayLength; i++) {
    unsortedArray[i] = randomInteger(0, maxNumberInArray);
}

console.log('Unsorted array:');
console.log(unsortedArray);
console.log(``);

let rearrangements = 0;

function quickSort(unsortedArray) {
    const length = unsortedArray.length;
    if (length === 0) { return []; }

    const sortedArray = [ ...unsortedArray ];
    const a = [];
    const b = [];
    let p = sortedArray[0];

    for (let i = 1; i < length; i++) {
        if (sortedArray[i] < p) {
            a[a.length] = sortedArray[i];
            rearrangements++;
        }
        else {
            b[b.length] = sortedArray[i];
            rearrangements++;
        }
    }
    return quickSort(a).concat(p, quickSort(b));
}

console.time('Quick sort execution');
const sortedArray = quickSort(unsortedArray);
console.timeEnd('Quick sort execution');
console.log(``);

console.log(`Rearrangements: ${rearrangements}.`);

console.log(``);
console.log(`Result:`);
console.log(sortedArray);
