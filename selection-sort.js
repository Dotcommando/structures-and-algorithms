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

function selectionSort(unsortedArray) {
    const sortedArray = [ ...unsortedArray ];
    const length = sortedArray.length;
    for (let i = 0; i < length; i++) {
        let min = i;
        for (let j = i; j < length; j++) {
            if (sortedArray[j] < sortedArray[min]) {
                min = j;
            }
        }

        const t = sortedArray[min];
        sortedArray[min] = sortedArray[i];
        sortedArray[i] = t;
    }

    return sortedArray;
}

const sortedArray = selectionSort(unsortedArray);

console.log(``);
console.log(`Result:`);
console.log(sortedArray);
