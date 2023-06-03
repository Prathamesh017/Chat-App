import chatModel from '../Models/chatsModel.js'

// @descirption - create one and one chat  or return existing chat
//@route  api/chat POST
export const createChat = async (req, res) => {
  try {
    //id of the sender/reciever(not the current user)
    let { userId } = req.body
  

    if (!userId) {
      res.status(400).json({
        status: 'failure',
        message: 'UserId not available',
      })
      return
    }

    //check if chat already exists or not;
    let existingChat = await chatModel
      .find({
        isGroupChat: false,
        $and: [
          {
            usersInChat: {
              $elemMatch: { $eq: userId },
            },
          },
          { usersInChat: { $elemMatch: { $eq: req.user.user_id } } },
        ],
      })
      .populate('usersInChat', '-password')
      .populate('lastestMessage')

    if (existingChat.length > 0) {
      res.status(200).json({
        status: 'Success',
        data: existingChat,
        message: 'Chat Exists',
      })
      return
    }
    let new_chat = await chatModel.create({
      chatName: 'Sender',
      isGroupChat: false,
      usersInChat: [userId, req.user.user_id],
    })

    let fullChat = await chatModel
      .findOne({ _id: new_chat._id })
      .populate('usersInChat', '-password')

    res.status(201).json({
      status: 'Success',
      data: [fullChat],
      message: 'New Chat Created',
    })
  } catch (error) {
    console.log(error)
  }
}

//@description - get all chats of a particular user
//@route api/chat  GET
export const getAllChats = async (req, res) => {
  try {
    let AllExistingChat = await chatModel
      .find({
        isGroupChat: false,
        usersInChat: { $elemMatch: { $eq: req.user.user_id } },
      })

      .populate('usersInChat', '-password')
      .populate('lastestMessage')

    res.status(200).json({
      status: 'success',
      data: AllExistingChat,
      message: 'All Chats',
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
