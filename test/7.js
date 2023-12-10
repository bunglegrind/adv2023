import test from "tape";
import lib from "../libs/7.js";
import c from "../libs/common.js";

const sample = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

test("parse sample input", function (t) {
    t.deepEqual(lib.parse(sample), [
        {cards: "32T3K", bid: 765},
        {cards: "T55J5", bid: 684},
        {cards: "KK677", bid: 28},
        {cards: "KTJJT", bid: 220},
        {cards: "QQQJA", bid: 483}
    ]);
    t.end();
});

test("Order different rank: two pairs vs three of a kind", function (t) {
    t.deepEqual(lib.orderHands([
        {cards: "TT3KK", bid: 666},
        {cards: "33T3K", bid: 666},
    ]), [
        {cards: "TT3KK", bid: 666},
        {cards: "33T3K", bid: 666},
    ]);
    t.end();
});

test("Order same rank: different cards", function (t) {
    t.deepEqual(lib.orderHands([
        {cards: "3T5KK", bid: 666},
        {cards: "33T5K", bid: 666},
    ]), [
        {cards: "33T5K", bid: 666},
        {cards: "3T5KK", bid: 666},
    ]);
    t.end();
});

test("Order same rank: different cards with Jocker", function (t) {
    t.deepEqual(lib.orderHandsWithJocker([
        {cards: "3J5K4", bid: 666},
        {cards: "33T5K", bid: 666},
    ]), [
        {cards: "3J5K4", bid: 666},
        {cards: "33T5K", bid: 666},
    ]);
    t.end();
});

test("Order different rank: one pair vs three of a kind", function (t) {
    t.deepEqual(lib.orderHands([
        {cards: "TTT3K", bid: 666},
        {cards: "32T3K", bid: 666},
    ]), [
        {cards: "32T3K", bid: 666},
        {cards: "TTT3K", bid: 666}
    ]);
    t.end();
});

test("Order different rank with Jocker: one pair vs three of a kind", function (t) {
    t.deepEqual(lib.orderHandsWithJocker([
        {cards: "32T3K", bid: 666},
        {cards: "KTJJT", bid: 666},
    ]), [
        {cards: "32T3K", bid: 666},
        {cards: "KTJJT", bid: 666},
    ]);
    t.end();

test("Order different rank with Jocker: full house vs three of a kind", function (t) {
    t.deepEqual(lib.orderHandsWithJocker([
        {cards: "3TT3J", bid: 666},
        {cards: "KTJ5T", bid: 666},
    ]), [
        {cards: "KTJ5T", bid: 666},
        {cards: "3TT3J", bid: 666},
    ]);
    t.end();
});
});

test("Order different rank with Jocker: five of a kind vs one pair", function (t) {
    t.deepEqual(lib.orderHandsWithJocker([
        {cards: "32J3K", bid: 666},
        {cards: "JJ8JJ", bid: 666},
        {cards: "JJJJJ", bid: 666},
    ]), [
        {cards: "32J3K", bid: 666},
        {cards: "JJJJJ", bid: 666},
        {cards: "JJ8JJ", bid: 666}
    ]);
    t.end();
});

test("Sample first part", function (t) {
    t.equal(lib.exec.a(sample), 6440);
    t.end();
});

test("Sample second part", function (t) {
    t.equal(lib.exec.b(sample), 5905);
    t.end();
});
