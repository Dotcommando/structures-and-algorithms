const startNumber = 0;
const startRange = 10;
const rangeMultiplier = 1.25;
const arrayLength = 21;

// Random integer in predefined range
function randomInteger(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function createSortedArray(startNumber, startRange, rangeMultiplier, arrayLength) {
    const resultArray = [];
    const maxElementNumber = arrayLength;
    let start = startNumber;
    let end = startNumber + startRange;
    let range = startRange;

    for (let i = 0; i < maxElementNumber; i++) {
        resultArray[i] = randomInteger(start, end);
        // console.log(`Step ${i}, range: ${range}, start: ${start}, end: ${end}, number: ${resultArray[i]}.`);
        start = resultArray[i];
        range = Math.round(range * rangeMultiplier);
        end = start + range;
    }

    return resultArray;
}

const arrayForSearch = createSortedArray(startNumber, startRange, rangeMultiplier, arrayLength);
const target = arrayForSearch[randomInteger(startNumber + 1, arrayLength - 2)];

console.log(arrayForSearch);
console.log(`Target: ${target}.`);
console.log(``);

function binarySearch(startIndex, endIndex, target, arrayForSearch) {
    let resultReport = { index: -1, steps: 0 };
    let start = startIndex;
    let end = endIndex;
    let pivot = Math.round((start + end) / 2);

    if (arrayForSearch[pivot] === target) {
        resultReport.index = pivot;
        return resultReport;
    }

    let counter = 0;

    while (resultReport.index === -1 && counter <= arrayLength) {
        counter++;

        console.log(`Step: ${counter}, start: ${start}, pivot: ${pivot}, end: ${end}, pivot element: ${arrayForSearch[pivot]}, target: ${target}.`);

        if (target > arrayForSearch[pivot]) {
            start = pivot;
            pivot = Math.round((start + end) / 2);
        } else {
            if (target === arrayForSearch[pivot]) {
                resultReport.index = pivot;
                resultReport.steps = counter;
                return resultReport;
            }

            const prevPivot = pivot;

            end = pivot;
            pivot = Math.round((start + end) / 2);

            if (pivot === prevPivot) {
                pivot = start;
            }
        }

        resultReport.steps = counter;
    }

    return resultReport;
}

const searchResult = binarySearch(startNumber, arrayLength - 1, target, arrayForSearch);
console.log(``);
console.log(`Steps: ${searchResult.steps}, index: ${searchResult.index}.`);
