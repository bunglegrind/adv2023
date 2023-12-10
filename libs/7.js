import * as R from "ramda";

const parse = R.pipe(
    R.split("\n"),
    R.reject(R.isEmpty),
    R.map(R.pipe(
        R.split(" "),
        R.applySpec({
            cards: R.head,
            bid: R.pipe(R.last, Number)
        })
    ))
);

const histogram = R.pipe(
    R.split(""),
    R.reduce(
        (acc, item) => ({...acc, [item]: acc[item] + 1 || 1}),
        {}
    )
);

const isFiveOfAKind = R.pipe(R.length, R.equals(1));

const isFourOfAKind = R.both(
    R.pipe(R.length, R.equals(2)),
    R.includes(4)
);
const isFullHouse = R.both(
    R.pipe(R.length, R.equals(2)),
    R.includes(3)
);

const isThreeOfAKind = R.both(
    R.pipe(R.length, R.equals(3)),
    R.includes(3),
);

const isTwoPairs = R.both(
    R.pipe(R.length, R.equals(3)),
    R.includes(2)
);

const isOnePair = R.pipe(R.length, R.equals(4));

function getRank(hist) {
    if (isFiveOfAKind(hist)) {
        return 6;
    }
    if (isFourOfAKind(hist)) {
        return 5;
    }
    if (isFullHouse(hist)) {
        return 4;
    }
    if (isThreeOfAKind(hist)) {
        return 3;
    }
    if (isTwoPairs(hist)) {
        return 2;
    }
    if (isOnePair(hist)) {
        return 1;
    }
    return 0;
}

const getSimpleRank = R.pipe(
    histogram,
    R.values,
    getRank
);

function getRankWithJocker(hand) {
    const numJockers = R.length(R.match(/J/g, hand));
    let hist = R.values(histogram(R.replace(/J/g, "", hand)));
    if (hist.length) {
        const res = R.addIndex(R.reduce)(
            ([max, index], v, i) => (
                v > max
                ? [v, i]
                : [max, index]
            ),
            [-Infinity, -1],
            hist
        );
        if (R.isNil(res[1]) || res[1] < 0) {
            throw new Error(hand);
        }
        hist[res[1]] = res[0] + numJockers;
    } else {
        hist = [5];
    }

    return getRank(hist);
}

const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const cardsWithJocker = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
const getCardRank = (cards) => R.flip(R.indexOf)(cards);

const compareHandCardRank = (c) => R.unapply(R.pipe(
    R.apply(R.zip),
    R.reduce(function (ignore, [card1, card2]) {
        const getActualCardRank = getCardRank(c);
        const v1 = getActualCardRank(card1);
        const v2 = getActualCardRank(card2);
        if (v1 === v2) {
            return "";
        }

        return R.reduced(v1 - v2);
    }, ""),
));

const orderHands = R.sort(function (a, b) {
    return (
        (getSimpleRank(a.cards) - getSimpleRank(b.cards))
        || compareHandCardRank(cards)(a.cards, b.cards)
    );
});

const orderHandsWithJocker = R.sort(function (a, b) {
    return (
        (getRankWithJocker(a.cards) - getRankWithJocker(b.cards))
        || compareHandCardRank(cardsWithJocker)(a.cards, b.cards)
    );
});

export default {
    orderHands,
    orderHandsWithJocker,
    parse,
    exec: {
        a: R.pipe(
            parse,
            orderHands,
            R.addIndex(R.reduce)(
                (acc, {bid}, index) => acc + (index + 1) * bid,
                0
            )
        ),
        b: R.pipe(
            parse,
            orderHandsWithJocker,
            R.addIndex(R.reduce)(
                (acc, {bid}, index) => acc + (index + 1) * bid,
                0
            )
        ),
    }
};

