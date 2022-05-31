const axios = require("axios");
const cheerio = require("cheerio");
const config = require("../config.json");
var fs = require('fs');

/// Scrape Reddit url
async function scrapeReddit() {
    try {
        var mainUrl = config.rediitURL;
        let response = await axios.get(mainUrl);
        const $ = cheerio.load(response.data);
        const urlMeme = $("._2_tDEnGMLxpM6uOa2kaDB3.ImageBox-image.media-element._1XWObl-3b9tPy64oaG6fax");

        const title = $("._eYtD2XCVieq6emjKBH3m");

        await downloadImage(urlMeme[0].attribs.src)

        const postModel = {
            title: title[0].children[0].data,
            url: urlMeme[0].attribs.src
        };
        return postModel;
    }
    catch (err) {
        console.error(err.message);
        throw err.message;
    }
}

// download image 
// NOTE: if "EISDIR: illegal operation on a directory, open './images/'" then run "sudo nano npmrc" to add file on mac
async function downloadImage(url) {

    var filepath = config.imagePath;

    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
    }

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
    });
}



exports.scrapeReddit = scrapeReddit;