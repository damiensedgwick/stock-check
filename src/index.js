const axios = require("axios");
const cheerio = require("cheerio");
const play = require("play");

const url =
  "https://www.currys.co.uk/gbuk/computing/pc-monitors/pc-monitors/dell-u2720q-4k-ultra-hd-27-led-monitor-black-10214086-pdt.html";

function checkMonitorStock() {
  axios
    .get(url)
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);

      let item = $(".prd-channels").children().first().text();
      let match = item.match(/Sorry this item is out of stock/g);

      if (match) {
        console.log("Item is not in stock!");
      }

      if (!match) {
        console.log("Item is in stock :)");
        play.sound("src/alarm.mp3");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

setInterval(checkMonitorStock, 1000 * 60 * 60); // Every hour
