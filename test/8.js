import test from "tape";
import lib from "../libs/8.js";
import c from "../libs/common.js";

const sample = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

test.skip("Sample first part", function (t) {
    t.equal(lib.exec.a(sample), 6440);
    t.end();
});

test.skip("Sample second part", function (t) {
    t.equal(lib.exec.b(sample), 5905);
    t.end();
});
