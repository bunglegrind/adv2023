import * as R from "ramda";

const parse = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty)
);
const findStart = function (map) {
    map = parse(map);
    console.log(map);
    const i = R.findIndex(R.includes("S"), map);
    const j = R.indexOf("S", map);

    return [i, j];
};

export default {
    findStart,
    exec: {
        a: R.pipe(R.identity
        ),
        b: R.pipe(R.identity
        ),
    }
};

