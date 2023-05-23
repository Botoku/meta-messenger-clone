import Pusher from 'pusher'

import ClientPusher from 'pusher-js'



export const serverPusher =  new Pusher({
    appId: "1604418",
    key: "2b41b77a4c06bcc715ac",
    secret: "fb2b46de899730101d67",
    cluster: "us2",
    useTLS: true
  });


export const clientPusher = new ClientPusher('2b41b77a4c06bcc715ac', {
    cluster: 'us2'
  });