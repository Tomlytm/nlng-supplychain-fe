import React from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

interface MessageBubbleProps {
    type: "sent" | "received";
    text: string;
    time: string;
  }
export default function ChatWindow() {
  const messages: MessageBubbleProps[] = [
    { type: "received", text: "Demand Plan for NV8989761499 lead time is greater than RoS", time: "7:51 PM" },
    { type: "sent", text: "Hello FP, System flagged some item because the lead time is greater than RoS, let's discuss how best to move forward.", time: "7:51 PM" },
    { type: "received", text: "Demand Plan for NV8989761499 lead time is greater than RoS", time: "7:51 PM" },
    { type: "received", text: "Demand Plan for NV8989761499 lead time is greater than RoS", time: "7:51 PM" },
    { type: "sent", text: "Hello FP, System flagged some item because the lead time is greater than RoS, let's discuss how best to move forward.", time: "7:51 PM" },
    { type: "sent", text: "Hello FP, System flagged some item because the lead time is greater than RoS, let's discuss how best to move forward.", time: "7:51 PM" },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <header className="px-4 pt-4 pb-5 border-b border-gray-200">
        <h1 className=" font-semibold">Potential delay flagged for DM_PMN 2025</h1>
        <p className="text-sm text-gray-500">8126860173</p>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} {...msg} />
        ))}
      </div>
      <InputBox />
    </div>
  );
}
