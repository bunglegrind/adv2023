import test from "tape";
import lib from "../libs/7.js";
import c from "../libs/common.js";

const sample = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

test.skip("Sample first part", function (t) {
    t.equal(lib.exec.a(sample), 288);
    t.end();
});

test.skip("Sample second part", function (t) {
    t.equal(lib.exec.b(sample), 71503);
    t.end();
});
