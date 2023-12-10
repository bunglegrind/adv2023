import * as R from "ramda";


const start = "AAA";
const end = "ZZZ";

const parse = R.pipe(
    R.split("\n\n"),
    R.reject(R.isEmpty),
    R.applySpec({
        directions: R.pipe(
            R.head,
            R.split(""),
            R.filter((c) => R.flip(R.includes)("RL", c))
        ),
        map: R.pipe(
            R.last,
            R.split("\n"),
            R.reject(R.isEmpty),
            R.map(
                R.pipe(
                    R.match(/((\w+) = \((\w+), (\w+)\))/),
                    R.tail,
                    R.applySpec({
                        node: R.prop(1),
                        left: R.prop(2),
                        right: R.prop(3)
                    })
                )
            )
        )
    })
);

const path = function ({map, directions}) {
    const findStart = R.filter(R.propSatisfies(R.test(/\w\wA/), "node"));
    const isEnd = R.test(/\w\wZ/);

    const findPlace = (place) => R.find(R.propEq(place, "node"), map);
    const findPlaces = (places) => R.map(findPlace, places);

    function move(place) {
        let step = 0;
        let count = 0;
        let next;
        while (next !== end) {
            next = (
                directions[step] === "L"
                ? place.left
                : place.right
            );
            step = (step + 1) % directions.length;
            place = findPlace(next);
            count += 1;
        }

        return count;
    }

    const run = () => move(findPlace(start));
    const ghostRun = () => R.map(toEnd, findStart(map));

    function toEnd(place) {
        let step = 0;
        let count = 0;
        let next = "";
        while (!isEnd(next)) {
            next = (
                directions[step % directions.length] === "L"
                ? place.left
                : place.right
            );
            step += 1;
            place = findPlace(next);
            count += 1;
        }

        return count;
    }

    return {run, ghostRun};
};

export default {
    parse,
    exec: {
        a: R.pipe(
            parse,
            path,
            R.invoker(0, "run")
        ),
        b: R.pipe(
            parse,
            path,
            R.invoker(0, "ghostRun"),
            //calculate HCF...wait...why???
        )
    }
};

