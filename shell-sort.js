// O(n^2) || O(n^3/2) || O(n * (log(n))^2)
const arrayLength = 80;
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

function shellSort(unsortedArray) {
    const sortedArray = [ ...unsortedArray ];
    const length = unsortedArray.length;
    let i = Math.floor(length * 5 / 11);
    let counter = 0;

    while (i > 0) {
        for (let j = 0; j < length; j++) {
            let k = j;
            let t = sortedArray[j];

            while (k >= i && sortedArray[k - i] > t) {
                counter++;
                sortedArray[k] = sortedArray[k - i];
                k -= i;
            }

            sortedArray[k] = t;
        }

        console.log(`Iteration step: ${i}. Iterations: ${counter}.`);
        i = (i === 2) ? 1 : Math.floor(i * 5 / 11);
        counter = 0;
    }

    return sortedArray;
}

const sortedArray = shellSort(unsortedArray);

console.log(``);
console.log(`Result:`);
console.log(sortedArray);
