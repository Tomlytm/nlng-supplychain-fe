import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWIndow";
import PageHeader from "@/components/PageHeader";
import React from "react";

export default function Home() {
    return (
        <>
            <div className="mb-3">
                <PageHeader title='Demand Planning Chat' />
            </div>
            <div className="flex h-[90vh] bg-white  rounded-tl-xl">
                <ChatSidebar />
                <ChatWindow />
            </div>
        </>
    );
}
