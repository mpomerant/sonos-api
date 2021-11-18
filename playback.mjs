import express from 'express';
import fetch from 'node-fetch';
import subscription from './subscription.mjs';

const router = express.Router();

router.post('/play', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = res.locals.groupId;
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
    const groupId = res.locals.groupId;
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
    const groupId = res.locals.groupId;
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
    const groupId = res.locals.groupId;
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

router.use('/subscription', subscription);


router.get('/', async(req, res) => {

    const accessToken = req.session.accessToken
    const groupId = res.locals.groupId;
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