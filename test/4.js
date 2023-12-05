import test from "tape";
import lib from "../libs/4.js";
import c from "../libs/common.js";

const sample = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

test("First line scored 8 points", function (t) {
    t.equal(lib.getScore(c.firstLine(sample)), 8);
    t.end();
});

test("Second line scored 2 points", function (t) {
    t.equal(lib.getScore(c.secondLine(sample)), 2);
    t.end();
});

test("Third line scored 2 points", function (t) {
    t.equal(lib.getScore(c.thirdLine(sample)), 2);
    t.end();
});

test("Fourth line scored 1 points", function (t) {
    t.equal(lib.getScore(c.fourthLine(sample)), 1);
    t.end();
});

test("Fifth line scored 0 points", function (t) {
    t.equal(lib.getScore(c.fifthLine(sample)), 0);
    t.end();
});

test("Sixth line scored 0 points", function (t) {
    t.equal(lib.getScore(c.sixthLine(sample)), 0);
    t.end();
});

test("Sample first part", function (t) {
    t.equal(lib.exec.a(sample), 13);
    t.end();
});

test("Sample second part", function (t) {
    t.equal(lib.exec.b(sample), 30);
    t.end();
});
