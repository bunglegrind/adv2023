import test from "tape";
import lib from "../libs/10.js";
import c from "../libs/common.js";

const sample1 = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const sample2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

test("find starting poing", function (t) {
        t.deepEqual(lib.findStart(sample1), [1, 1]);
        t.deepEqual(lib.findStart(sample2), [2, 0]);
        t.end();
});
test.skip("Sample first part", function (t) {
        t.equal(lib.exec.a(sample1), 4);
        t.equal(lib.exec.a(sample2), 8);
        t.end();
});

test.skip("Sample second part", function (t) {
        t.equal(lib.exec.b(sample), 2);
        t.end();
});
