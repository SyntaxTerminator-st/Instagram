const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;
const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
process.setMaxListeners(Infinity);

const username = ''; // your temp instagram username for session cookie
const password = ''; // your password for session coookie

const cookiee = 'csrftoken=gCOg4ozcPAWp8LWP5wuxMQUxzVvByLwR; rur="CLN/05452969164045\0541692264538:01f7683147ef02591ba620ed4d0047353fc901a00217d8bf41d05018f32455f13e03f3da"; ds_user_id=52969164045; sessionid=52969164045%3AAlzhDGrQnTNPy0%3A1%3AAYe1OuJ5lv6YzTyiGJ3NYW_B9e3UXie41Pqqy4KTbQ';
/* How To Get Cookie 
Deploy Your App On Server The Visit Bellow Link

https://yourdomain.com/session

*/

const { igApi ,getCookie } = require("insta-fetcher");
// This Code Use insta-fetcher I respect The owner

let ig = new igApi(cookiee);


app.get("/api", async(req, res) => {
  const url = req.query.url
  if(url == '' || url == null){
    return res.status(400).send({
      success: false,
      message: "Query Can't Be Empty!",
      creator: "technostoneyt"
    });
  }
    ig.fetchPost(url).then((data) => {
  console.log(data);
  res.status(200).json({data})
});

})
app.get("/session", async(req, res) => {
    // this rout for get session id Make In Private for your Account Safety Chnage Rout Adresssss
(async () => {
  try {
    const cookie = await getCookie(username, password);
    res.status(200).json({cookie})
  } catch (error) {
    res.status(400).json({error})
  }
})();
})

app.get("/", (req, res) => {
    res.setHeader("Cache-Control", "public,max-age=0");
    res.status(200).json({
        "ST"
    })
})


app.listen(port, function(){
    console.log("Your App Running on", port);
/* This File Created By TechnoStone.xyz */
});
