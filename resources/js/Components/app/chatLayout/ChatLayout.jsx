import TextInput from "@/Components/TextInput";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const ChatLayout = () => {
    const page  =  usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    console.log(selectedConversation);
    
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});
    // const {on}  = useEventBus();
    const isUserOnline = (userId) => onlineUsers[userId];
    
    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalConversations(conversations.filter((conversation) => {
            return conversation.name.toLowerCase().includes(search);
        })
    );
    };

    return(
        <>
        
        <div className="flex-1 w-full flex overflow-hidden">
             <div className={`transition-all w-full sm:w-[220px] md:w-[300px] bg-slate-800 flex flex-col overflow-hidden ${
             selectedConversation ? "-ml-[100%] sm:ml-0" : ""
     }`}>
         <div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
             My Conversations
             <div className="tooltip tooltip-left" data-tip="Create" new="">
                 <button className="text-gray-400 hover:text-gray-200">
                     <PencilSquareIcon className="w-4 h-4 inline-block ml-2"/>
                 </button>
             </div>
         </div>
         <div className="p-3">
             <TextInput onKeyUp={onSearch} placeholder="Filter users and groups" className="w-full"/>
         </div>
         {/* <div className="flex-1 overflow-auto">
                 {sortedConversations && sortedConversations.map((conversation) => (
                 <ConversationItem key={`${
                     conversation.is_group ? "group_" : "user_"
                 }${conversation.id}`}   
                 conversation={conversation}
                 online={!!isUserOnline(conversation.id)}      
                 selectedConversation={selectedConversation}
          />
             ))}
         </div> */}
         
         </div>
         {/* <div className="flex-1 flex flex-col overflow-hidden">{children}</div> */}
         </div> 
      </>   
    )
}
export default ChatLayout;