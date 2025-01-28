import React from "react";

export default function InputBox() {
  return (
    <div className="p-4 border-t ">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 border border-[#1C1C1E7A] rounded-lg p-3 placeholder:text-sm"
        />
        <button className="ml-2 px-5 py-2 bg-[#006A20] text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}
