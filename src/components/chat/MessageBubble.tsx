import React from "react";

interface MessageBubbleProps {
  type: "sent" | "received";
  text: string;
  time: string;
}

export default function MessageBubble({ type, text, time }: MessageBubbleProps) {
  const isSent = type === "sent";
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-lg p-3 rounded-t-3xl ${
          isSent ? " bg-[#FAFAFA] text-gray-900 rounded-bl-3xl rounded-br-md" : "bg-[#ECF0FF] text-gray-800  rounded-bl-md rounded-br-3xl"
        }`}
      >
        <p className="text-sm">{text}</p>
        <p className="text-[10px] text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}
