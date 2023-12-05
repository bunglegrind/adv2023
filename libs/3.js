import * as R from "ramda";

const getNumbers = R.pipe(
    R.match(/(\d+)/g),
    R.map(Number)
);

const forEachIndexed = R.addIndex(R.forEach);
let gears = [];

const getSet = R.curry(function (part, input) {
    gears = [];
    const result = [];
    const rows = R.pipe(
        R.split("\n"),
        R.reject(R.isEmpty)
    )(input);
    const grid = R.map(R.pipe(
        R.split(""),
        R.reject(R.test(/\s/))
        ), rows);
    const rowTotal = rows.length;
    const colTotal = rows[0].length;

    forEachIndexed(function (row, i) {
        const numbers = Array.from(row.matchAll(/\d+/g));
        R.forEach(function (capture) {
            const number = capture[0];
            const numLength = number.length;
            const index =  capture.index;
            let isPartNumber = false;
            let minCol = Math.max(0, index - 1);
            let maxCol = Math.min(index + numLength, colTotal - 1);
            let minRow = Math.max(0, i - 1);
            let maxRow = Math.min(rowTotal - 1, i + 1);
            let ii = minRow;

            while (ii <= maxRow) {
                let jj = minCol;
                while (jj <= maxCol) {
                    isPartNumber ||= R.test(/[^.\d]/, grid[ii][jj]);
                    if (grid[ii][jj] === "*") {
                        const gear = R.find(({i, j}) => i === ii && j === jj, gears);
                        if (gear) {
                            gear.pns.push(Number(number));
                        } else {
                            gears.push({i: ii, j: jj, pns: [Number(number)]});
                        }
                    }
                    jj += 1;
                }
                ii += 1;
            }
            if (part && isPartNumber) {
                result.push(Number(number));
            }
            if (!part && !isPartNumber) {
                result.push(Number(number));
            }
        }, numbers);
    }, rows);

    return result;
});

const getNonPartNumbers = getSet(false);
const getPartNumbers = getSet(true);

export default {
    getNonPartNumbers,
    getPartNumbers,
    getNumbers,
    exec: {
        a: R.pipe(
            getPartNumbers,
            R.reduce(R.add, 0)
        ),
        b: R.pipe(
            getPartNumbers,
            () => R.transduce(
                R.compose(
                    R.filter(({pns}) => pns.length === 2),
                    R.map(({pns}) => pns[0] * pns[1])
                ),
                R.add,
                0,
                gears
            )
        )
    }
};
