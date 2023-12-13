import fs from "node:fs";
import * as R from "ramda";
import utils from "./utils.js";
import process from 'node:process';

const {day, phase} = utils.process(process.argv[2] || "");


fs.readFile(`./assets/${day}.txt`, "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    import(`./libs/${day}.js`).then(function (mod) {
        const start = process.hrtime.bigint();
        const result = mod.default.exec[phase](data);
        const end = process.hrtime.bigint();
        console.log(result);
        console.log(`Elapsed time ${(end - start)/1000n} us`);
    });
});
