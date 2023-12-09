import * as R from "ramda";

const parse = R.pipe(
    R.split("\n"),
    R.map(R.match(/\d+/g)),
    R.apply(R.zip),
    R.map(R.applySpec({
        time: R.pipe(R.head, Number),
        distance: R.pipe(R.last, Number)
    }))
);

const parseWithKerning = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map(R.match(/\d+/g)),
    R.applySpec({
        time: R.pipe(R.head, R.reduce(R.concat, ""), Number),
        distance: R.pipe(R.last, R.reduce(R.concat, ""), Number)
    })
);

const calculateTime = R.curry((t, n) => (t - n) * n);

const countWins = function ({time, distance}) {
    let n = 1;
    let count = 0;
    while (n < time) {
        count += (
            calculateTime(time, n) > distance
            ? 1
            : 0
        );
        n += 1;
    }

    return count;
};

export default {
    countWins,
    parse,
    exec: {
        a: R.pipe(
            parse,
            R.transduce(
                R.map(countWins),
                R.multiply,
                1
            )
        ),
        b: R.pipe(
            parseWithKerning,
            countWins
        ),
    }
};

