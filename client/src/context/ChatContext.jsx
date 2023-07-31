import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

// provider function
export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessageLoading, setIsMessageLoading] = useState(null);
    const [isMessagesError, setIsMessagesError] = useState(null);

    // console.log("message", messages);

    // console.log("current Chat", currentChat);


    useEffect(() => {
        const getUsers = async() => {
            const response = await getRequest(`${baseUrl}/users`);

            if(response.error){
                return console.log("Error fetching users", response);
            }

            const pChats = response.filter((u) => {
                // if chat is already created then no need to create again
                let isChatCreated = false;
                if(user._id === u._id) return false;

                if(userChats){
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }

                return !isChatCreated
            })
            setPotentialChats(pChats)
        }

        getUsers()
    }, [userChats])

    useEffect(() => {
        const getUserChats = async()=> {
            if(user?._id){
                setIsUserChatsLoading(true)
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)

                setIsUserChatsLoading(false);

                if(response.error){
                    return setUserChatsError(response)
                }
                setUserChats(response);
            }
        }
        getUserChats()
    }, [user]);


    useEffect(() => {
        const getMessages = async()=> {
            setIsMessageLoading(true)
            setIsMessagesError(null);

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)

            setIsMessageLoading(false);

            if(response.error){
                return setIsMessagesError(response)
            }
            setMessages(response);
        }
        getMessages()
    }, [currentChat]); 

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async(firstId, secondId) =>{
        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
            firstId,
            secondId,
        }));

        if(response.error){
            return console.log("Error creating chat", response)
        }

        setUserChats((prev) => [...prev, response]);
    }, [])

    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessageLoading,
        isMessagesError,
    }}>{children}</ChatContext.Provider>

}

// resume from 10:21