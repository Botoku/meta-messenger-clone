"use client";

import { Message } from "@/typings";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import useSWR from 'swr'
import fetcher from "@/utils/fetchmessages";



const ChatInput = () => {
  const [input, setInput] = useState("");
  const {data, error, mutate } = useSWR('/api/getMessages', fetcher)

  console.log(data)
 
  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    const messageToSend = input;

    setInput("");
    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "Arsene Wenger",
      profilePic:
        "https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/wenger_23.jpg?itok=ZxLuhL4d",
      email: "jbotoku@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const res = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json()
      console.log(' MESSAGE ADDED >>>>', data)
    };


    uploadMessageToUpstash()
    

    // await mutate()
  };
  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabñed:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
