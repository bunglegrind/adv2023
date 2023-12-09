import test from "tape";
import lib from "../libs/6.js";
import c from "../libs/common.js";

const sample = `Time:      7  15   30
Distance:  9  40  200`;

test("Parse sample data", function (t) {
    t.deepEqual(lib.parse(sample), [
        {time: 7, distance: 9},
        {time: 15, distance: 40},
        {time: 30, distance: 200}
    ]);
    t.end();
});

test("first race has 4 solutions", function (t) {
    t.equal(lib.countWins({time: 7, distance: 9}), 4);
    t.end();
});

test("second race has 8 solutions", function (t) {
    t.equal(lib.countWins({time: 15, distance: 40}), 8);
    t.end();
});

test("third race has 9 solutions", function (t) {
    t.equal(lib.countWins({time: 30, distance: 200}), 9);
    t.end();
});

test("Sample first part", function (t) {
    t.equal(lib.exec.a(sample), 288);
    t.end();
});

test("Sample second part", function (t) {
    t.equal(lib.exec.b(sample), 71503);
    t.end();
});
