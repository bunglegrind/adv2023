import * as R from "ramda";

const numbers = [
    {name: "1", value: 1},
    {name: "2", value: 2},
    {name: "3", value: 3},
    {name: "4", value: 4},
    {name: "5", value: 5},
    {name: "6", value: 6},
    {name: "7", value: 7},
    {name: "8", value: 8},
    {name: "9", value: 9}
];

const spelled = [
    {name: "one", value: 1},
    {name: "two", value: 2},
    {name: "three", value: 3},
    {name: "four", value: 4},
    {name: "five", value: 5},
    {name: "six", value: 6},
    {name: "seven", value: 7},
    {name: "eight", value: 8},
    {name: "nine", value: 9}
];

const retrieveFirstNumber = function (numbers, string) {
    return R.pipe(
        R.map(function ({name, value}) {
            return {position: string.indexOf(name), value};
        }),
        R.reduce((acc, {position, value}) => (
            position > -1 && (position < acc.position)
            ? ({position, value})
            : acc
        ), ({position: Infinity, value: Infinity})),
        R.prop("value"),
        Number
    )(numbers);
};

const retrieveLastNumber = function (numbers, string) {
    return R.pipe(
        R.map(function ({name, value}) {
            return {position: string.lastIndexOf(name), value};
        }),
        R.reduce((acc, {position, value}) => (
            position > -1 && (position > acc.position)
            ? ({position, value})
            : acc
        ), ({position: -Infinity, value: Infinity})),
        R.prop("value"),
        Number
    )(numbers);
};

const getLineCalibration = (line) => (
    10 * retrieveFirstNumber(numbers, line)
    + retrieveLastNumber(numbers, line)
);

const getAdvancedLineCalibration = (line) => (
    10 * retrieveFirstNumber(R.concat(numbers, spelled), line)
    + retrieveLastNumber(R.concat(numbers, spelled), line)
);

const formatInput = R.pipe(R.split("\n"), R.reject(R.isEmpty));

export default {
    retrieveFirstNumber,
    getLineCalibration,
    getAdvancedLineCalibration,
    exec: {
        a: R.pipe(
            formatInput,
            R.transduce(
                R.map(getLineCalibration),
                R.add,
                0
            )
        ),
        b: R.pipe(
            formatInput,
            R.transduce(
                R.map(getAdvancedLineCalibration),
                R.add,
                0
            )
        )
    }
};
