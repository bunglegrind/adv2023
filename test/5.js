import test from "tape";
import lib from "../libs/5.js";
import c from "../libs/common.js";

const sample = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

test("default map is the identity", function (t) {
    const map = lib.mapFactory([]);
    t.equal(map(4), 4);
    t.equal(map(40), 40);
    t.equal(map(31), 31);
    t.equal(map(17), 17);
    t.end();
});

test("Single rule works", function (t) {
    const map = lib.mapFactory(["50 97 2"]);
    t.equal(map(4), 4);
    t.equal(map(99), 99);
    t.equal(map(97), 50);
    t.equal(map(98), 51);
    t.end();
});

test("Two rules work", function (t) {
    const map = lib.mapFactory(["50 97 2", "20 3 2"]);
    t.equal(map(4), 21);
    t.equal(map(99), 99);
    t.equal(map(97), 50);
    t.equal(map(98), 51);
    t.end();
});

test("Sample first part", function (t) {
    t.equal(lib.exec.a(sample), 35);
    t.end();
});

test("Remap a range", function (t) {
    t.deepEqual(lib.map(["50 82 2"], [[74, 14]]), [[50, 2], [74, 8], [84, 4]]);
    t.end();
});

test("Remap a range not included", function (t) {
    t.deepEqual(lib.map(["50 82 2"], [[84, 14]]), [[84, 14]]);
    t.end();
});

test("Two rules for remapping", function (t) {
    t.deepEqual(lib.map(["50 82 2", "20 84 1"], [[84, 14]]), [[20, 1], [85, 13]]);
    t.end();
});

test("Remap another range not included", function (t) {
    t.deepEqual(lib.map(["50 82 2"], [[12, 14]]), [[12, 14]]);
    t.end();
});

test("Remap an overlapping range", function (t) {
    t.deepEqual(lib.map(["50 72 15"], [[74, 3]]), [[52, 3]]);
    t.end();
});

test("Remap another overlapping range", function (t) {
    t.deepEqual(lib.map(["50 72 5"], [[74, 13]]), [[52, 3], [77, 10]]);
    t.end();
});

test("Sample second part", function (t) {
    t.equal(lib.exec.b(sample), 46);
    t.end();
});
