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

test.skip("Sample first part", function (t) {
        t.equal(lib.exec.a(sample), 114);
        t.end();
});

test.skip("Sample second part", function (t) {
        t.equal(lib.exec.b(sample), 6);
        t.end();
});
