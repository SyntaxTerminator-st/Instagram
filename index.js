const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;
const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
process.setMaxListeners(Infinity);

const username = 'hyperboolean76981'; // your temp instagram username for session cookie
const password = '#temp#temp'; // your password for session coookie

const cookiee = 'sessionid=55142279910%3ABkDs3GrSDwf1Gb%3A18%3AAYc8tEFesuecBa2AjzykIcZWLHr3FmdU9to2_rvAIg; ds_user_id=55142279910; csrftoken=ESad2W5FUhAP3DiyAsAd0Ama9RhhrUF4';
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
