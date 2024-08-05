import ConversationItem from "@/Components/app/ConversationItem";
import TextInput from "@/Components/TextInput";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react"

const ChatLayout = ({children}) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [onlineUsers, setOnlineUsers] = useState({});
    const isUserOnline = (userId) => onlineUsers[userId];
    const [localConversations,  setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] =  useState([]);

    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalConversations(conversations.filter((conversation) => {
            return conversation.name.toLowerCase().includes(search);
        })
    );
    };
    console.log("conversations",  conversations);
    console.log("selectedConversations", selectedConversation);

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if(a.blocked_at && b.blocked_at){
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                }else if  (a.blocked_at){
                    return 1; 
                }else  if (b.blocked_at){
                    return -1;
                }
                if(a.last_message_date && b.last_message_date){
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    );
                }else if (a.last_message_date){
                    return -1;
                }else if (b.last_message_date){
                    return 1;
                }else {
                    return 0;
                }
            })
        );

    }, [localConversations])
    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations])
    useEffect(() => {
        Echo.join("online")
        .here((users) => {
            const onlineUsersObj = Object.fromEntries(users.map(
                (user) =>  [user.id, user]
            ));
            setOnlineUsers((prevOnlineUsers) => {
                return {...prevOnlineUsers,  ...onlineUsersObj};
            });
        })
        .joining((user) => {
            setOnlineUsers((prevOnlineUsers) => {
                const  updatedUsers = {...prevOnlineUsers};
                updatedUsers[user.id] = user;
                return updatedUsers;
            })
        })
        .leaving((user) => {
            setOnlineUsers((prevOnlineUsers) => {
                const  updatedUsers = {...prevOnlineUsers};
                delete updatedUsers[user.id];
                return updatedUsers;
            })
        })
        .error((error) => {
            console.log("error", error);
        });
        
        return () => {
            Echo.leave('online');
        }
    }, [])
    useEffect(() =>  {
        // console.log(onlineUsers)
    }, [onlineUsers])

    return (
   <>
   <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
    Obi-Wan Kenobi
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">You were the Chosen One!</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
    Anakin
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">Seen at 12:46</div>
</div>
   </>
    );
}

export default ChatLayout;