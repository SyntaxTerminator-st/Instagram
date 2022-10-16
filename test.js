const express = require("express");
const colors = require("colors");
const cors = require("cors");
const axios = require("axios");
const base64 = require("image-to-base64");
const { json } = require("express");
require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
  })
);
app.use(json());
const PORT = process.env.PORT || 5000;

console.clear();

app.listen(PORT, () =>
  console.log(
    `Server is running on ${
      process?.env?.DEV_ENV ? `http://localhost:${PORT}` : PORT
    }`
  )
);

// utils
const imgUrlToBase64 = async (url) => {
  const res = await base64(url);
  return `data:image/jpeg;base64,${res}`;
};

// instagram api

// home
app.get("/", async (req, res) => {
  res.send("Server is working!");
let url = "https://www.instagram.com/reel/CjhAuBPNHEo/?igshid=YmMyMTA2M2Y="
const shortcodeFormatter = (url) => {
    const re = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com(?:\/.+?)?\/(p|reel|tv)\/)([\w-]+)(?:\/)?(\?.*)?$/gim.exec(url) || '';
    return {
        type: re[1],
        shortcode: re[2],
        url: 'https://www.instagram.com/' + re[1] + '/' + re[2],
    };
};
let short = shortcodeFormatter(url)
let shortcode = short.shortcode

 
  console.log( shortcode);
});

// instagram post

const cookie = 'csrftoken=BGWa6cqu8eGFvMKIK49li28ElXDn0FrW; rur="ODN\05456173402427\0541697443984:01f7a3f7cfa900a739f3ba7d40e7ae79cc9d280e507a435fb36a0abceb77cf055f8dac43"; sessionid=56173402427%3AbDEiq46NArz9wz%3A24%3AAYcu8nN2tctG-hQ5QesQ3OvWN6wp_uGZSa1Hs3ELfg; ds_user_id=56173402427';
app.get("/p", async (req, res) => {
  try {
    const igurl = req?.query.url
    const shortcodeFormatter = (url) => {
        const re = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com(?:\/.+?)?\/(p|reel|tv)\/)([\w-]+)(?:\/)?(\?.*)?$/gim.exec(url) || '';
        return {
            type: re[1],
            shortcode: re[2],
            url: 'https://www.instagram.com/' + re[1] + '/' + re[2],
        };
    };
    let short = shortcodeFormatter(igurl)
    let shortcode = short.shortcode
    const url = `https://www.instagram.com/p/${shortcode}/?__a=1&__d=dis`;
    const { data } = await axios({
      url,
      method: "get",
      headers: {
        "user-agent":
          "Instagram 22.0.0.15.68 Android (23/6.0.1; 640dpi; 1440x2560; samsung; SM-G935F; hero2lte; samsungexynos8890; en_US)",
        cookie,
      },
      validateStatus: false,
    });

    if (data) {
      const jsonData = async () => {
        return {
          isVideo: data?.items[0]?.video_versions ? true : false,
          singleMedia: data?.items[0]?.carousel_media
            ? null
            : {
                resources: data?.items[0]?.image_versions2?.candidates?.map(
                  (item) => ({
                    src: item.url,
                    width: item.width,
                    height: item.height,
                  })
                ),
                videoResources: data?.items[0]?.video_versions
                  ? data?.items[0]?.video_versions?.map((item) => ({
                      src: item.url,
                      width: item.width,
                      height: item.height,
                    }))
                  : null,
              },
        };
      };
      res.status(200).json(await jsonData());
    } else {
      res.status(200).json({
        error: "No data found",
      });
    }
  } catch (error) {
    console.log(colors.red(error.message));
    res.status(500).json({
      ...error,
      message: error.message,
    });
  } finally {
    console.log(colors.green(`Ended at: ${new Date().toLocaleString()}`));
  }
});
