const axios = require("axios");
const cheerio = require("cheerio");
const play = require("play");

// URL that you would like to test.
const url =
  "https://www.currys.co.uk/gbuk/computing/pc-monitors/pc-monitors/dell-u2720q-4k-ultra-hd-27-led-monitor-black-10214086-pdt.html";

function checkMonitorStock() {
  axios
    /*
     * Use the URL variable to check the stock of an empty item.
     */
    // .get(url)
  
    // The URL below is to test what happens when the item is in stock. Comment it out when using the script properly.
    .get(
      "https://www.currys.co.uk/gbuk/computing/pc-monitors/pc-monitors/samsung-c24f396-full-hd-24-curved-led-monitor-10146138-pdt.html"
    )
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

// Use 10 second duration for testing the script works.
setInterval(checkMonitorStock, 10000); // Every 5 seconds for testing

// Uncomment below line of code when wanting to use the script properly.
// setInterval(checkMonitorStock, 1000 * 60 * 60); // Every hour
