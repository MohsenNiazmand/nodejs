import {load} from "cheerio";

const response =await fetch('https://en.wikipedia.org/wiki/Node.js');
const data = await response.text();

const $ = load(data)


const summary = $('#mw-content-text > div.mw-parser-output > table + p:first-of-type').text();

console.log('Wiki summary : ',summary);