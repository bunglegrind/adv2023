import * as R from "ramda";

const isInRange = R.curry(([start, length], value) => (
    value >= start && value < start + length
));

const parseRule = R.pipe(
    R.match(/\d+/g),
    R.map(Number)
);

const applyRules = R.curry(function (rules, value) {
    if (!rules.length) {
        return value;
    }
    const rule = R.head(rules);

    return (
        isInRange(R.tail(rule), value)
        ? R.head(rule) + value - R.prop(1, rule)
        : applyRules(R.tail(rules), value)
    );
});

const mapFactory = function (rules) {
    const parsedRules = R.map(parseRule, rules)

    return (value) => applyRules(parsedRules, value);
};

const seedParser = R.pipe(R.head, R.match(/\d+/g), R.map(Number));
const extendedSeedParser = R.pipe(
    R.head,
    R.match(/\d+/g),
    R.map(Number),
    R.splitEvery(2),
);

const parser = (seedParser) => R.pipe(
    R.split("\n\n"),
    R.applySpec({
        seeds: seedParser,
        mappings: R.pipe(R.tail, R.map(R.pipe(
            R.split("\n"),
            R.tail
        )))
    })
);

const findLocation = R.curry((mappings, seed) => R.reduce(
    (value, mapping) => mapFactory(mapping)(value),
    seed,
    mappings
));

const findMinimumLocation = ({seeds, mappings}) => R.transduce(
    R.map(findLocation(mappings)),
    R.min,
    Infinity,
    seeds
);

const recursiveFindMinimumLocation = R.curry(
    (
        mappings,
        min,
        range,
    ) => (
        !range[1]
        ? min
        : iterativeFindMinimumLocation(
            mappings,
            Math.min(min, findLocation(mappings, range[0] + range[1] - 1)),
            [range[0], range[1] - 1]
        )
    )
);

const iterativeFindMinimumLocation = R.curry(function (
    mappings,
    min,
    range,
) {
    let [start, length] = range;
    while (length > 0) {
        min = Math.min(
            min,
            findLocation(mappings, start + length - 1)
        );
        length -= 1;

    }

    return min;
});

const sortRange = R.sort(([a], [b]) => a - b);

const singleMapping = R.curry((rule, {mapped, unmapped}) => {
    const [outStart, ruleStart, ruleLength] = parseRule(rule);

    function iterate({mapped, unmapped}, input) {
        const [start, length] = input;
        if (
            start + length - 1 < ruleStart
            || start > ruleStart + ruleLength - 1
        ) {
            return {unmapped: [...unmapped, [start, length]], mapped};
        }
        if (start >=  ruleStart) {
            if (start + length - 1 <= ruleStart + ruleLength - 1) {
                return {
                    mapped: [...mapped, [outStart + start - ruleStart, length]],
                    unmapped
                };
            }
            return {
                mapped: [...mapped, [
                    outStart + start - ruleStart,
                    ruleLength - start + ruleStart
                ]],
                unmapped: [
                    ...unmapped,
                    [ruleStart + ruleLength, length - ruleLength  + start - ruleStart]
                ]
            };
        }
        if (start + length - 1 <= ruleStart + ruleLength - 1) {
            return {
                unmapped: [...unmapped, [start, ruleStart - start]],
                mapped: [...mapped, [outStart, start + length - 1 - ruleStart]]
            };
        }
        return {
            unmapped: [
                ...unmapped,
                [start, ruleStart - start],
                [ruleStart + ruleLength, start + length - ruleStart - ruleLength]
            ],
            mapped: [...mapped, [outStart, ruleLength]]
        };
    };
    return R.reduce(iterate, {mapped, unmapped: []}, unmapped);
});

const map = (mappings, input) => R.pipe(
    R.applySpec({unmapped: R.identity, mapped: R.always([])}),
    (input) => R.reduce(
        (mapped, mapping) => singleMapping(mapping, mapped),
        input,
        mappings
    ),
    ({mapped, unmapped}) => sortRange([...mapped, ...unmapped])
)(input);

export default {
    mapFactory,
    map,
    exec: {
        a: R.pipe(
            parser(seedParser),
            findMinimumLocation
        ),
        b: R.pipe(
            parser(extendedSeedParser),
            ({seeds, mappings}) => R.reduce(
                (acc, mapping) => map(mapping, acc),
                seeds,
                mappings
            ),
            R.path([0, 0])
        )
    }
};
