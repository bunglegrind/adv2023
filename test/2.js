import * as R from "ramda";
import test from "tape";
import c from "../libs/common.js";
import lib from "../libs/2.js";

const sample = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;


test("Parse line #1", function (t) {
    t.deepEqual(lib.parseLine(c.firstLine(sample)), {
        id: 1,
        grabs: [
            {blue: 3, red: 4},
            {green: 2, red: 1, blue: 6},
            {green: 2},
        ]
    });
    t.end();
});

test("First game is compatible with input", function (t) {
    t.equal(lib.isCompatible(c.firstLine(sample)), 1);
    t.end();
});

test("Second game is compatible with input", function (t) {
    t.equal(lib.isCompatible(c.secondLine(sample)), 2);
    t.end();
});

test("Third game is not compatible with input", function (t) {
    t.equal(lib.isCompatible(c.thirdLine(sample)), 0);
    t.end();
});

test("Fourth game is not compatible with input", function (t) {
    t.equal(lib.isCompatible(c.fourthLine(sample)), 0);
    t.end();
});

test("Fifth game is compatible with input", function (t) {
    t.equal(lib.isCompatible(c.fifthLine(sample)), 5);
    t.end();
});

test("Sample first part", function (t) {
    t.equal(lib.exec.a(sample), 8);
    t.end();
});

test("First game needs at least the following cubes", function (t) {
    t.deepEqual(lib.calcCubes(c.firstLine(sample)), {red: 4, green: 2, blue: 6});
    t.end();
});

test("Second game needs at least the following cubes", function (t) {
    t.deepEqual(lib.calcCubes(c.secondLine(sample)), {red: 1, green: 3, blue: 4});
    t.end();
});

test("Third game needs at least the following cubes", function (t) {
    t.deepEqual(lib.calcCubes(c.thirdLine(sample)), {red: 20, green: 13, blue: 6});
    t.end();
});

test("Fourth game needs at least the following cubes", function (t) {
    t.deepEqual(lib.calcCubes(c.fourthLine(sample)), {red: 14, green: 3, blue: 15});
    t.end();
});

test("Fifth game needs at least the following cubes", function (t) {
    t.deepEqual(lib.calcCubes(c.fifthLine(sample)), {red: 6, green: 3, blue: 2});
    t.end();
});

test("Sample second part", function (t) {
    t.equal(lib.exec.b(sample), 2286);
    t.end();
});
