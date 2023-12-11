import test from "tape";
import lib from "../libs/9.js";
import c from "../libs/common.js";

const sample = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

test("parse sample", function (t) {
    t.deepEqual(lib.parse(sample), [
        [0, 3, 6, 9, 12, 15],
        [1, 3, 6, 10, 15, 21],
        [10, 13, 16, 21, 30, 45],
    ]);
    t.end();
});

test("Last number for first line is 18", function (t) {
    t.equal(lib.calculateLastNumber(c.asNumbers(c.firstLine)(sample)), 18);
    t.end();
});

test("Last number for second line is 28", function (t) {
    t.equal(lib.calculateLastNumber(c.asNumbers(c.secondLine)(sample)), 28);
    t.end();
});

test("Last number for third line is 68", function (t) {
    t.equal(lib.calculateLastNumber(c.asNumbers(c.thirdLine)(sample)), 68);
    t.end();
});

test.skip("Sample first part", function (t) {
        t.equal(lib.exec.a(sample), 114);
        t.end();
});

test.skip("Sample second part", function (t) {
        t.equal(lib.exec.b(sample), 6);
        t.end();
});
