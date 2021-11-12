import fetch from 'node-fetch';
import session from 'express-session';
import express from 'express';
const app = express()
const port = 3000
const secret = '6df25c9b-a5e5-4692-a1b0-081d92a7b62f';
const clientId = '5b7ca8b5-0ad9-4123-ab50-e654f508bc21';

app.use(session({ secret: 'keyboard cat', saveUninitialized: false, resave: false, cookie: { maxAge: 600000 }}));

app.use(express.json());

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
        "redirect_uri": "http://localhost:3000/api/sonos/redirect"
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
    res.redirect(301, `http://localhost:8082/Page1?access_token=${json.access_token}`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})