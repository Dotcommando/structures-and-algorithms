const samples = [
    {
        h1: [ 3, 2, 1, 1, 1 ],
        h2: [ 4, 3, 2 ],
        h3: [ 1, 1, 4, 1 ],
    }
];

function equalStacks(h1, h2, h3) {
    const height1Set = new Set();
    const height2Set = new Set();
    const height3Set = new Set();
    const commonHeight = new Set();
    const maxLength = Math.max(h1.length, h2.length, h3.length);
    let currHeight1 = 0;
    let currHeight2 = 0;
    let currHeight3 = 0;

    for (let i = maxLength - 1; i >= 0; i--) {
        currHeight1 += h1[i] || 0;
        currHeight2 += h2[i] || 0;
        currHeight3 += h3[i] || 0;

        height1Set.add(currHeight1);
        height2Set.add(currHeight2);
        height3Set.add(currHeight3);

        if (height2Set.has(currHeight1) && height3Set.has(currHeight1)) {
            commonHeight.add(currHeight1);
        }

        if (height1Set.has(currHeight2) && height3Set.has(currHeight2)) {
            commonHeight.add(currHeight2);
        }

        if (height1Set.has(currHeight3) && height2Set.has(currHeight3)) {
            commonHeight.add(currHeight3);
        }
    }

    return commonHeight.size ? Math.max(...commonHeight.values()) : 0;
}

for (const sample of samples) {
    console.log(equalStacks(sample.h1, sample.h2, sample.h3));
}
