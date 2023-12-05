import * as R from "ramda";

const parseLine = R.pipe(
    R.split("|"),
    function (array) {
        return {
            id: R.pipe(
                R.match(/(\d+):/),
                R.prop(1),
                Number
            )(array[0]),
            luckies: R.pipe(
                R.match(/\d+ /g),
                R.map(Number)
            )(array[0]),
            extracted: R.pipe(
                R.match(/\d+/g),
                R.map(Number)
            )(array[1])
        };
    }
);

const getLuckyNumbers = R.converge(R.intersection(), [R.prop("luckies"), R.prop("extracted")]);


const getScore = R.pipe(
    parseLine,
    getLuckyNumbers,
    ({length}) => (
        length
        ? 2 ** (length - 1)
        : 0
    )
);

function calculateWins(games) {
    let wins = new Array(games.length).fill(1);
    R.forEach(function (game) {
        let i = 0;
        while (i < getLuckyNumbers(game).length) {
            wins[game.id + i] += wins[game.id - 1];
            i += 1;
        }
    }, games);

    return wins;
}

export default {
    getScore,
    exec: {
        a: R.pipe(
            R.split("\n"),
            R.reject(R.isEmpty),
            R.transduce(
                R.map(getScore),
                R.add,
                0
            )
        ),
        b: R.pipe(
            R.split("\n"),
            R.reject(R.isEmpty),
            R.map(parseLine),
            calculateWins,
            R.reduce(R.add, 0)
        ),
    }
};
