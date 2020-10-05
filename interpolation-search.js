const startNumber = 20;
const arrayLength = 5;
const arrayForSearch = [];
const endNumber = startNumber + arrayLength - 1;

for (let i = startNumber; i <= endNumber; i++) {
    arrayForSearch.push(i);
}

// Random integer in predefined range
function randomInteger(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const randomIndex = randomInteger(0, arrayLength - 1);
console.log(`Random index: ${randomIndex}.`);
const target = arrayForSearch[randomIndex];

console.log(arrayForSearch);
console.log(`Target: ${target}.`);
console.log(``);

function interpolationSearch(arrayForSearch, target) {
    const resultReport = { index: -1, steps: 0 };
    let mid;
    let low = 0;
    let high = arrayForSearch.length - 1;
    let counter = 0;

    while (arrayForSearch[low] < target && arrayForSearch[high] > target) {
        if (arrayForSearch[high] === arrayForSearch[low]) { break; } // Division by zero defending
        counter++;
        mid = low + ((target - arrayForSearch[low]) * (high - low)) / (arrayForSearch[high] - arrayForSearch[low]);
        resultReport.steps = counter;
        console.log(`Low: ${low}, middle: ${mid}, high: ${high}, target: ${target}.`);

        if (arrayForSearch[mid] < target) { low = mid + 1; }
        else if (arrayForSearch[mid] > target) { high = mid - 1; }
        else {
            resultReport.index = mid;
            return resultReport;
        }
    }

    if (arrayForSearch[low] === target) { resultReport.index = low; }
    if (arrayForSearch[high] === target) { resultReport.index = high; }

    return resultReport;
}

const searchResult = interpolationSearch(arrayForSearch, target);
console.log(``);
console.log(`Steps: ${searchResult.steps}, index: ${searchResult.index}.`);
