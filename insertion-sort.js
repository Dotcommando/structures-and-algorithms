// O(n^2)
const arrayLength = 40;
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

function insertionSort(unsortedArray) {
    const sortedArray = [ ...unsortedArray ];
    const length = sortedArray.length;

    for (let i = 1; i < length; i++) {
        let j = i;
        const t = sortedArray[i];
        while (j >= 0 && sortedArray[j - 1] > t) {
            sortedArray[j] = sortedArray[j - 1];
            j--;
        }
        sortedArray[j] = t;
    }

    return sortedArray;
}

const sortedArray = insertionSort(unsortedArray);

console.log(``);
console.log(`Result:`);
console.log(sortedArray);
