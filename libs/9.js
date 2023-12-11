import * as R from "ramda";

const parse = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map(R.pipe(R.split(" "), R.map(Number)))
);

const isZeroArray = R.all(R.equals(0));

const calculateDifference = R.pipe(
    R.reverse,
    R.aperture(2),
    R.map(([y, x]) => y - x),
    R.reverse
);

function getDeltas(seq) {
    let differences = [seq];
    let diff = calculateDifference(seq);
    while (!isZeroArray(diff)) {
        differences.push(diff);
        diff = calculateDifference(diff);
    }

    return differences;
}

const calculateLastNumber = R.pipe(
    getDeltas,
    R.transduce(R.map(R.last), R.add, 0)
);

const calculateFirstNumber = R.pipe(
    getDeltas,
    R.reverse,
    R.transduce(
        R.map(R.head),
        (acc, item) => item - acc,
        0
    )
);

export default {
    parse,
    calculateLastNumber,
    calculateFirstNumber,
    exec: {
        a: R.pipe(
            parse,
            R.map(calculateLastNumber),
            R.reduce(R.add, 0)
        ),
        b: R.pipe(
            parse,
            R.map(calculateFirstNumber),
            R.reduce(R.add, 0)
        ),
    }
};
