import * as R from "ramda";

const input = {red: 12, green: 13, blue: 14};

const parseId = R.pipe(
    R.match(/(\d+):/),
    R.prop(1),
    Number
);

const parseGame = R.pipe(
    R.split(","),
    R.map(R.match(/(\d+) (\w+)/)),
    function (v) {
        const obj = {};
        v.forEach(function (cubes) {
            obj[cubes[2]] = Number(cubes[1]);
        });

        return obj;
    }
);

const parseLine = function (line) {
    const obj = {};
    obj.id = parseId(line);
    obj.grabs = R.pipe(
        R.split(";"),
        R.map(parseGame)
    )(line);

    return obj;
}

const isCompatible = R.pipe(
    parseLine,
    (game) => (
        R.all((extraction) => R.all(
            (color) => extraction[color] <= (input[color] ?? 0),
            Object.keys(extraction)
        ), game.grabs)
        ? game.id
        : 0
    )
);

const calcCubes = R.pipe(
    parseLine,
    function (game) {
        const obj = {};
        R.forEach(function (extraction) {
            R.forEach(function (color) {
                obj[color] = Math.max(extraction[color], obj[color] ?? 0);
            }, Object.keys(extraction));
        }, game.grabs);
        return obj;
    }
);

export default {
    parseLine,
    isCompatible,
    calcCubes,
    exec: {
        a: R.pipe(
            R.split("\n"),
            R.transduce(
                R.compose(
                    R.reject(R.isEmpty),
                    R.map(isCompatible)
                ),
                R.add,
                0
            )
        ),
        b: R.pipe(
            R.split("\n"),
            R.transduce(
                R.compose(
                    R.reject(R.isEmpty),
                    R.map(calcCubes),
                    R.map(R.values),
                    R.map(R.product)
                ),
                R.add,
                0
            )
        )
    }
};
