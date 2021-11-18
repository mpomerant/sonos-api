import express from 'express';
import fetch from 'node-fetch';
const router = express.Router({mergeParams: true});

router.post('/play', async(req, res) => {

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

router.post('/skipToNextTrack', async(req, res) => {

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

router.post('/skipToPreviousTrack', async(req, res) => {

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

router.post('/pause', async(req, res) => {

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
});

router.post('/subscription', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = req.params.id;
    console.log(`subscription: ${groupId}`);
    
    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback/subscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });
     const metadataResponse =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playbackMetadata/subscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });
    const currentState =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });

   const currentStateJson = await currentState.json();
   const mdJson = await metadataResponse.json();
   const json = await response.json();
   console.log(json);
   console.log('--------------------------');
   console.log(currentStateJson);

   res.json(currentStateJson);
});

router.delete('/subscription', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = req.params.id;
    
    if (groupId) {
        console.log(`unsubscribing from ${groupId}`);
        const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback/subscription`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        });
        const metadataResponse =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playbackMetadata/subscription`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        });
        const mdJson = await metadataResponse.json();
        const json = await response.json();
        console.log(json);
        console.log(`metadata: ${mdJson}`);
    
        res.json(json);
    }
    

  
})

router.get('/', async(req, res) => {

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

export default router;