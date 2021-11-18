import fetch from 'node-fetch';
import session from 'express-session';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';

import playback from './playback.mjs';

// const privateKey = fs.readFileSync('/etc/letsencrypt/live/muzzanet.com/privkey.pem');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/muzzanet.com/fullchain.pem');

// const credentials = {key: privateKey, cert: certificate};
const app = express()
const port = 3000
const secret = '6df25c9b-a5e5-4692-a1b0-081d92a7b62f';
const clientId = '5b7ca8b5-0ad9-4123-ab50-e654f508bc21';

let clients = [];
let events = [];
const SSE_RESPONSE_HEADER = {
  'Connection': 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no'
};
function initializeSSE(req, res) {
      res.writeHead(200, SSE_RESPONSE_HEADER);
      res.write(`:\n\n`);
      //res.flushHeaders();
      const client = Date.now();
    
      const newClient = {
        id: client,
        response: res
      };
    
      console.log(`adding ${client} connetion`);
      clients.push(newClient);
      req.on('close', () => {
        console.log(`${client} Connection closed`);
        clients = clients.filter(c => c.id !== client);
      });
}


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  next();
});

app.use(function(req, res, next) {
    res.locals.clients = clients;
    next();
  });
app.use(session({ secret: 'keyboard cat', saveUninitialized: false, resave: false, cookie: { secure: false, maxAge: 600000 }}));

app.use(express.json());

app.get('/api/updates', (req, res) => {
    initializeSSE(req, res);
});


app.use('/api/groups/:id/playback', playback);

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





app.post('/api/callbacks', (req, res) => {
    const {headers, body} = req;
    console.log(headers);
    console.log(body);
    console.log('---------------------------CALLBACK---------------------');
    console.log(`clients: ${clients.length}`);
    clients.forEach(client => {
	    
	    client.response.write('id:' +  Date.now() + '\n');

	    client.response.write('event: playback\n');
	    client.response.write('data:' + JSON.stringify(body) + ' \n\n');
	    
	    // client.response.flush();
	    });

});



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