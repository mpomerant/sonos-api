import fetch from 'node-fetch';
import session from 'express-session';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';

// const privateKey = fs.readFileSync('/etc/letsencrypt/live/muzzanet.com/privkey.pem');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/muzzanet.com/fullchain.pem');

// const credentials = {key: privateKey, cert: certificate};
const app = express()
const port = 3000
const secret = '6df25c9b-a5e5-4692-a1b0-081d92a7b62f';
const clientId = '5b7ca8b5-0ad9-4123-ab50-e654f508bc21';

let clients = [];
let facts = [];

function initializeSSE(req, res) {
    
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
      res.writeHead(200, headers);
    
      const data = `data: ${JSON.stringify(facts)}\n\n`;
    
      res.write(data);
    
      const clientId = Date.now();
    
      const newClient = {
        id: clientId,
        response
      };
    
      console.log(`adding ${clientId} connetion`);
      clients.push(newClient);
    
      req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
      });
}


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(session({ secret: 'keyboard cat', saveUninitialized: false, resave: false, cookie: { secure: false, maxAge: 600000 }}));

app.use(express.json());

app.get('/api/updates', (req, res) => {
    initializeSSE(req, res);
});


app.post('/api/groups/:id/groupVolume', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = req.params.id;
    console.log(req.body);

    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/groupVolume`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(req.body)
    });


   const json = await response.json();
   console.log(json);

    res.json(json);
})


app.post('/api/groups/:id/playback/play', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = req.params.id;
    console.log(groupId);
    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback/play`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });


   const json = await response.json();
   console.log(json);

    res.json(json);
})

app.post('/api/groups/:id/playback/skipToNextTrack', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = req.params.id;
    console.log(groupId);
    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback/skipToNextTrack`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });


   const json = await response.json();
   console.log(json);

    res.json(json);
})

app.post('/api/groups/:id/playback/skipToPreviousTrack', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = req.params.id;
    console.log(groupId);
    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback/skipToPreviousTrack`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });


   const json = await response.json();
   console.log(json);

    res.json(json);
})

app.post('/api/groups/:id/playback/pause', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = req.params.id;
    console.log(groupId);
    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback/pause`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });


   const json = await response.json();
   console.log(json);

    res.json(json);
})


app.post('/api/callbacks', (req, res) => {
    const {headers, body} = req;
    console.log(headers);
    console.log(body);
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))

});

app.post('/api/groups/:id/playback/subscription', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = req.params.id;
    console.log(groupId);
    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback/subscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });


   const json = await response.json();
   console.log(json);

   res.json(json);
})

app.get('/api/groups/:id/playback', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = req.params.id;
    console.log(groupId);
    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });


   const json = await response.json();
   console.log(json);

    res.json(json);
})

app.get('/api/households/:id/groups', async(req, res) => {

    const accessToken = req.session.accessToken
    const householdId = req.params.id;
    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/households/${householdId}/groups`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });


   const json = await response.json();
   console.log(json);

    res.json(json);
})


app.get('/api/households', async(req, res) => {

    const accessToken = req.session.accessToken
    console.log(accessToken);
    const response =  await fetch('https://api.ws.sonos.com/control/api/v1/households', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });


   const json = await response.json();
   console.log(json);
   const households = json.households || [];
    res.json({
        households
    })
})
app.get('/api/sonos/redirect', async (req, res) => {
    const code =  req.query.code;
    console.log(code);
    let buff =  Buffer.from(`${clientId}:${secret}`);;
    let base64data = buff.toString('base64');
    const data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://localhost:8082/api/sonos/redirect"

	    
    }

    var formBody = [];
    for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody);

    
    const response = await fetch("https://api.sonos.com/login/v3/oauth/access", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            Authorization: `Basic ${base64data}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            
        },
        body: formBody

    });
    const json = await response.json();
    console.log(json);
    req.session.accessToken = json.access_token;
    res.redirect(301, `/Page1?access_token=${json.access_token}`);
})

const httpServer = http.createServer(app);

httpServer.listen(3000);