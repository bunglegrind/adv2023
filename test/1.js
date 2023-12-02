import * as R from "ramda";
import test from "tape";
import lib from "../libs/1.js";
import c from "../libs/common.js";

const sample = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

test("First line gives me 12", function (t) {
    t.equal(lib.getLineCalibration(c.firstLine(sample)), 12);
    t.end();
});

test("Second line gives me 38", function (t) {
    t.equal(lib.getLineCalibration(c.secondLine(sample)), 38);
    t.end();
});

test("Third line gives me 15", function (t) {
    t.equal(lib.getLineCalibration(c.thirdLine(sample)), 15);
    t.end();
});

test("Fourth line gives me 77", function (t) {
    t.equal(lib.getLineCalibration(c.fourthLine(sample)), 77);
    t.end();
});

test("Overall calibration is 142", function (t) {
    t.equal(lib.exec.a(sample), 142);
    t.end();
});

const advanced = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;


test("First line gives me 29", function (t) {
    t.equal(lib.getAdvancedLineCalibration(c.firstLine(advanced)), 29);
    t.end();
});

test("Second line gives me 83", function (t) {
    t.equal(lib.getAdvancedLineCalibration(c.secondLine(advanced)), 83);
    t.end();
});

test("Third line gives me 13", function (t) {
    t.equal(lib.getAdvancedLineCalibration(c.thirdLine(advanced)), 13);
    t.end();
});

test("Fourth line gives me 24", function (t) {
    t.equal(lib.getAdvancedLineCalibration(c.fourthLine(advanced)), 24);
    t.end();
});

test("Fifth line gives me 42", function (t) {
    t.equal(lib.getAdvancedLineCalibration(c.fifthLine(advanced)), 42);
    t.end();
});

test("Sixth line gives me 14", function (t) {
    t.equal(lib.getAdvancedLineCalibration(c.sixthLine(advanced)), 14);
    t.end();
});

test("Seventh line gives me 76", function (t) {
    t.equal(lib.getAdvancedLineCalibration(c.seventhLine(advanced)), 76);
    t.end();
});

test("Overall calibration is 281", function (t) {
    t.equal(lib.exec.b(advanced), 281);
    t.end();
});
