import React from "react";
import { useState, useEffect } from "react";
import { useChat } from 'ai/react';


export default function GPT() {

    const { messages, input, handleInputChange, handleSubmit } = useChat() //code i just copy paste from docs
    const [chatHistory, setChatHistory] = useState([])

    return(
        <div className="">
            <div className="">
            {messages.length > 0
                ? messages.map(m => (
                    <div key={m.id} className="">
                        {m.role === 'user' ? 'User: ' : 'Miran*: '}
                        {m.content}
                    </div>
                    ))
                : null}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    className="rounded-b-md border border-gray-400 px-4 py-2 w-full "
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                    />
            </form>
        </div>
    );
}