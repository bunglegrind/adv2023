import * as R from "ramda";

const getNumbers = R.pipe(
    R.match(/(\d+)/g),
    R.map(Number)
);

const mapIndexed = R.addIndex(R.map);

function grid(data) {
    const grid = R.pipe(
        R.split("\n"),
        R.map(function (row) {
            const chars = R.split("", row);
            let characters = [];
            let accum = ""
            R.forEach(function (c) {
                if (R.test(/\d/, c)) {
                    accum = R.concat(accum, c);
                    return;
                }
                if (accum.length && R.test(/\D/, c)) {
                    characters = R.concat(
                        characters,
                        R.map(function (cc) {
                            return {value: Number(accum), char: cc};
                        }, R.split("", accum))
                    );
                    accum = "";
                }
                if (!accum.length && R.test(/\D/, c)) {
                    characters = R.concat(characters, {value: c});
                    return;
                }
            }, chars);
            return characters;
        })
    )(data);

    return {};
}

const getNonPartNumbers = R.identity;

export default {
    getNonPartNumbers,
    getNumbers,
    exec: {
        a: R.identity,
        b: R.identity
    }
};
