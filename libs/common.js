import * as R from "ramda";

const getLine = (n) => R.pipe(R.split("\n"), R.prop(n));
const firstLine = getLine(0);
const secondLine = getLine(1);
const thirdLine = getLine(2);
const fourthLine = getLine(3);
const fifthLine = getLine(4);
const sixthLine = getLine(5);
const seventhLine = getLine(6);

const asNumbers = (f) => R.pipe(f, R.split(" "), R.map(Number));

export default {
    firstLine,
    secondLine,
    thirdLine,
    fourthLine,
    fifthLine,
    sixthLine,
    seventhLine,
    asNumbers
};
