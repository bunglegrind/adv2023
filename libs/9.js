import * as R from "ramda";

const parse = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map(R.pipe(R.split(" "), R.map(Number)))
);

export default {
    parse,
    exec: {
        a: R.identity,
        b: R.identity
    }
};
