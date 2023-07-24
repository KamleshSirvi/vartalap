import { createContext, useState, useEffect } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const chatContext = createContext();

// provider function
export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

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

    return <chatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
    }}>{children}</chatContext.Provider>

}