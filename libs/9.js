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
    R.map(([y, x]) => y - x)
);

const calculateLastNumber = function (seq) {
    let differences = [];
    let diff = calculateDifference(seq);
    while (!isZeroArray(diff)) {
        differences.push(diff);
        diff = calculateDifferences(diff);
    }
    
    return R.transduce(R.map(R.last), R. add, 0, differences);
};

export default {
    parse,
    calculateLastNumber,
    exec: {
        a: R.identity,
        b: R.identity
    }
};
