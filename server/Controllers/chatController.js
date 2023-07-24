// create chat api end points
// get user chats
// find chats

const chatModel = require("../Models/chatModel");

const createChat = async(req, res) => {
    // extract two id from body who want to conversation
    const {firstId, secondId} = req.body

    try{
        // if conversation of both user is already present then simply return that chat
        const chat = await chatModel.findOne({
            members: {
                $all: [firstId, secondId]
            }
        })

        if(chat) return res.status(200).json(chat);

        // if there is no chat available in between that create a new chat and save it to databse and send it to the body

        const newChat = new chatModel({
            members: [firstId, secondId]
        })

        const response = await newChat.save()

        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

const findUserChat = async(req, res) => {
    const userId = req.params.userId;

    try{
        const chats = await chatModel.find({
            members: {$in : [userId]},
        });

        res.status(200).json(chats);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};


const findChat = async(req, res) => {
    const {firstId, secondId} = req.params;

    try{
        const chat = await chatModel.findOne({
            members: {$all : [firstId, secondId]},
        });

        res.status(200).json(chat);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {createChat, findUserChat, findChat};