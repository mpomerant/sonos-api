import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();


router.post('/', async(req, res, next) => {

    const accessToken = req.session.accessToken
    const groupId = res.locals.groupId;
    console.log(`subscription: ${groupId}`);
    
    const response =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback/subscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });
    await response.json();
    next();
});

router.post('/', async(req, res, next) => {

    const accessToken = req.session.accessToken
    const groupId = res.locals.groupId;
    console.log(`subscription: ${groupId}`);
    
    const metadataResponse =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playbackMetadata/subscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });
    await metadataResponse.json();
    next();
});
router.post('/', async(req, res, next) => {

    const accessToken = req.session.accessToken
    const groupId = res.locals.groupId;
    console.log(`subscription: ${groupId}`);
    
    const currentState =  await fetch(`https://api.ws.sonos.com/control/api/v1/groups/${groupId}/playback`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    });

   const currentStateJson = await currentState.json();
   console.log('--------------------------');
   console.log(currentStateJson);

   res.json(currentStateJson);
});

router.delete('/', async(req, res, next) => {

    const accessToken = req.session.accessToken
    const groupId = res.locals.groupId;
    
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



export default router;