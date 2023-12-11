import * as R from "ramda";

const parse = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map(R.pipe(R.split(" "), R.map(Number)))
);

const isZeroArray = R.all(R.equals(0));

const calculateLastNumber = R.pipe(
    R.reverse,
    R.aperture(2),
    R.map(([y, x]) => y - x)
);

export default {
    parse,
    calculateLastNumber,
    exec: {
        a: R.identity,
        b: R.identity
    }
};
