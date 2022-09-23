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

const cookiee = 'csrftoken=SWQQHchtVZlCG7XqxRLC4jaTb87NnFUq; rur=\"VLL\\05455142279910\\0541695491833:01f7186936f41053cf1d2161892cb7922becac00a32effd726eeaf23a1fd439825e12e72\"; ds_user_id=55142279910; sessionid=55142279910%3A80LlcAMKpPkrWP%3A19%3AAYfoE_SWrtBSlz8sTgCLLrIx9bzcoaEY5YFo7XtegA';
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
