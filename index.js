const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;
const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
process.setMaxListeners(Infinity);

const username = 'hypertext099'; // your temp instagram username for session cookie
const password = '#temp#temp'; // your password for session coookie

const cookiee = 'csrftoken=ftyCVlmpMgIvK9mCPYjj0weR6Sh3zg1Y; rur=\"NCG\\05455142279910\\0541695450072:01f7b850591e0f1deb3c5482179ca6d8aeb07628b484424c24567cb08e9e84ca7195e136\"; ds_user_id=55142279910; sessionid=55142279910%3A6iBCiBHUEW8lC3%3A11%3AAYcC_je9GTMaQDH6BAuE9E6Hr3ZHo9w1I_JSVH9JVA';
/* How To Get Cookie 
Deploy Your App On Server The Visit Bellow Link

https://yourdomain.com/session

*/

const { igApi, getCookie } = require("insta-fetcher");
// This Code Use insta-fetcher I respect The owner

let ig = new igApi(cookiee);

app.get("/api", async (req, res) => {
  const url = req.query.url
  if (url == '' || url == null) {
    return res.status(400).send({
      success: false,
      message: "Query Can't Be Empty!",
      creator: "ts"
    });
  }
  ig.fetchPost(url).then((response) => {
    //console.log("Response Data");
    res.status(200).json({ 
      post_type: response["postType"], 
      url: response["links"][0]["url"], 
      type: response["links"][0]["type"] 
    })
  });

})
app.get("/session", async (req, res) => {
  // this rout for get session id Make In Private for your Account Safety Chnage Rout Adresssss
  (async () => {
    try {
      const cookie = await getCookie(username, password);
      res.status(200).json({ cookie })
    } catch (error) {
      res.status(400).json({ error })
    }
  })();
})

app.get("/", (req, res) => {
  res.setHeader("Cache-Control", "public,max-age=0");
  res.status(200).json({

    telegram: 'https://telegram.me/'
  })
})


app.listen(port, function () {
  console.log("Your App Running on", port);
  /* This File Created By TechnoStone.xyz */
});
