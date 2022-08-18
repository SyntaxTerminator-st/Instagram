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

const cookiee = 'csrftoken=gCOg4ozcPAWp8LWP5wuxMQUxzVvByLwR; rur=VLL; ds_user_id=52969164045; sessionid=52969164045%3AU5XD8unSSCXBo9%3A1%3AAYcIrxtTAvRr7U-2uGqn6DpdZ_iabcXTq5pHiHVhTA';
/* How To Get Cookie 
Deploy Your App On Server The Visit Bellow Link

https://yourdomain.com/session

*/

const { igApi ,getCookie } = require("insta-fetcher");
// This Code Use insta-fetcher I respect The owner

let ig = new igApi(cookiee);


//Added
let results = {
    url: data.links[0].url,
    type: data.links[0].type
}

app.get("/api", async(req, res) => {
  const url = req.query.url
  if(url == '' || url == null){
    return res.status(400).send({
      success: false,
      message: "Query Can't Be Empty!",
      creator: "ts"
    });
  }
    ig.fetchPost(url).then((data) => {
      console.log("Response Data");
  console.log(data);
  res.status(200).json({results})
});

//Added
let results = {
    url: data.url,
    type: data.type
}


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

        telegram: 'https://telegram.me/'
    })
})


app.listen(port, function(){
    console.log("Your App Running on", port);
/* This File Created By TechnoStone.xyz */
});
