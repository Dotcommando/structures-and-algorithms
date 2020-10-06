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

function bubbleSort(unsortedArray) {
    const sortedArray = [ ...unsortedArray ];
    const length = sortedArray.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                const t = sortedArray[j];
                sortedArray[j] = sortedArray[j + 1];
                sortedArray[j + 1] = t;
            }
        }
    }

    return sortedArray;
}

const sortedArray = bubbleSort(unsortedArray);

console.log(``);
console.log(`Result:`);
console.log(sortedArray);
