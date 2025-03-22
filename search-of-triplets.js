const sequences = [
    {
        r: 2,
        seq: [ 1, 2, 2, 4 ],
    },
    {
        r: 3,
        seq: [ 1, 3, 9, 9, 27, 81 ],
    },
    {
        r: 5,
        seq: [ 1, 5, 5, 25, 125 ],
    },
];

// function countTriplets(arr, r) {
//     let triplets = 0;
//     const len = arr.length;
//
//     for (let i = 0; i < len - 2; i++) {
//         for (let j = i + 1; j < len - 1; j++) {
//             for (let k = j + 1; k < len; k++) {
//                 if (arr[i] * r === arr[j] && arr[j] * r === arr[k]) {
//                     triplets++;
//                 }
//             }
//         }
//     }
//
//     return triplets;
// }

function countTriplets(arr, r) {
    let count = 0;
    const potential = new Map();
    const pairs = new Map();

    for (const a of arr) {
        // Если a завершает один или несколько триплетов, добавляем их в ответ
        if (pairs.has(a)) {
            count += pairs.get(a);
        }

        // Если a может быть вторым элементом, обновляем pairs для a * r
        if (potential.has(a)) {
            pairs.set(a * r, (pairs.get(a * r) || 0) + potential.get(a));
        }

        // Каждый элемент может стать началом нового триплета:
        potential.set(a * r, (potential.get(a * r) || 0) + 1);
    }

    return count;
}

for (const couple of sequences) {
    console.log(countTriplets(couple.seq, couple.r));
}
