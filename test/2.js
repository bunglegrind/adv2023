import * as R from "ramda";
import test from "tape";
import c from "../libs/common.js";
import lib from "../libs/2.js";

const sample = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const input = {red: 12, green: 13, blue: 14};

test("Parse line #1", function (t) {
    t.deepEqual(lib.parseLine(c.firstLine(sample)), {
        id: 1,
        grabs: [
            {blue: 3, red: 4},
            {green: 2, red: 1},
            {blue: 6, green: 2},
        ]
    });
    t.end();
});
