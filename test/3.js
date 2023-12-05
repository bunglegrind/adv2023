import test from "tape";
import lib from "../libs/3.js";

const sample = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

test("Give me all the numbers",  function (t) {
    t.deepEqual(lib.getNumbers(sample), [
        467,
        114,
        35,
        633,
        617,
        58,
        592,
        755,
        664,
        598
    ]);
    t.end();
});

test("Give me non part numbers",  function (t) {
    t.deepEqual(lib.getNonPartNumbers(sample), [
        114,
        58
    ]);
    t.end();
});

test("Sample first part", function (t) {
    t.equal(lib.exec.a(sample), 4361);
    t.end();
});

test("Sample second part", function (t) {
    t.equal(lib.exec.b(sample), 467835);
    t.end();
});
