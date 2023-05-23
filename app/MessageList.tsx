'use client'

import { Message } from '@/typings'
import fetcher from '@/utils/fetchmessages'
import useSWR from 'swr'
import MessageComponent from './MessageComponent'
import { useEffect } from 'react'
import { clientPusher } from '@/pusher'

type Props = {
  initialMessages: Message[]
}
const MessageList = ({initialMessages}: Props) => {

  const {data:messages, error, mutate} =  useSWR<Message[]>('/api/getMessages', fetcher)


  useEffect(()=>{
    const channel = clientPusher.subscribe('messages')
    channel.bind('new-message', async(data: Message)=>{


      // if I sent the message no need to update cache
      if(messages?.find(message => message.id === data.id)) return


      if(!messages){
        mutate(fetcher)
      } else{
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true
        })
      }
      

      return () =>{
        channel.unbind_all()
        channel.unsubscribe()
      }
    })
  }, [messages, mutate])
  return (
    <div className='space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto'>
      {(messages || initialMessages).map(message=>(
        <MessageComponent message={message} key={message?.id}/>
      ))}
      
     
      </div>
  )
}

export default MessageList