import test from "tape";
import lib from "../libs/8.js";
import c from "../libs/common.js";

const sample1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const sample2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const sample3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

test("Parse sample1", function (t) {
    t.deepEqual(lib.parse(sample1), {
        directions: ["R", "L"],
        map: [
            {node: "AAA", left: "BBB", right: "CCC"},
            {node: "BBB", left: "DDD", right: "EEE"},
            {node: "CCC", left: "ZZZ", right: "GGG"},
            {node: "DDD", left: "DDD", right: "DDD"},
            {node: "EEE", left: "EEE", right: "EEE"},
            {node: "GGG", left: "GGG", right: "GGG"},
            {node: "ZZZ", left: "ZZZ", right: "ZZZ"},
        ]
    });
    t.end();
});

test("Parse sample2", function (t) {
    t.deepEqual(lib.parse(sample2), {
        directions: ["L", "L", "R"],
        map: [
            {node: "AAA", left: "BBB", right: "BBB"},
            {node: "BBB", left: "AAA", right: "ZZZ"},
            {node: "ZZZ", left: "ZZZ", right: "ZZZ"},
        ]
    });
    t.end();
});

test("Sample first part", function (t) {
    t.equal(lib.exec.a(sample1), 2);
    t.equal(lib.exec.a(sample2), 6);
    t.end();
});

test("Sample second part", function (t) {
    t.equal(lib.exec.b(sample3), 6);
    t.end();
});
