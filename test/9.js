import test from "tape";
import lib from "../libs/9.js";
import c from "../libs/common.js";

const sample = ``;

test.skip("Sample first part", function (t) {
        t.equal(lib.exec.a(sample), 6);
        t.end();
});

test.skip("Sample second part", function (t) {
        t.equal(lib.exec.b(sample), 6);
        t.end();
});
