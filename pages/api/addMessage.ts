import type { NextApiRequest, NextApiResponse } from "next";

import redis from "@/redis";
import { Message } from "@/typings";
import { serverPusher } from "@/pusher";


type Data = {
    message: Message
}

type ErrorData = {
    body: string
}

export default async function handler(req:NextApiRequest, res: NextApiResponse<Data | ErrorData>){
    if(req.method !== 'POST'){
        res.status(405).json({body: 'Method Not Allowed'})
        return
    }

    const {message} = req.body


    // replace user time stamp with server timestamp

    const newMessage = {
        ...message,
        created_at: Date.now(),
    }

    // push to upstash redis db
    await redis.hset('messages', message.id, JSON.stringify(newMessage))
    await serverPusher.trigger('messages', 'new-message', newMessage)

    res.status(200).json({message: newMessage})
}