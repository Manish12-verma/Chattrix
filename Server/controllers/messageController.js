import Message from "../models/message.js";
import User from "../models/User.js";

//Get all user except the logged-in user
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //count number of unseen msg
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    res.status(200).json({
      success: true,
      users: filteredUsers,
      unseenMessages,
    });
  } catch (error) {
     console.log("Error in getUsersForSidebar:", error);
    res.status(500).json({
      success: false,
      message: error.message,   
    });
  }
};
 
//Get all messages between two users
export const getMessages = async(req,res)=>{
    try {
        const {id:selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[{
                senderId: myId,
                receiverId: selectedUserId
            },{
                senderId: selectedUserId,
                receiverId: myId
            }]
        })
        await Message.updateMany({
             senderId: selectedUserId,
             receiverId: myId,
            },{
                seen:true
            })
            res.status(200).json({
                success:true,
                messages
            })
    } catch (error) {
        console.log("Error in getMessages:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//api to mark messages as seen using messageId

export const markMessageAsSeen  = async(req,res)=>{
    try {
         const {id} = req.params;
         await Message.findByIdAndUpdate(id,{seen:true});
         res.status(200).json({
                success:true,
                message:"Message marked as seen"
             })
    }catch(error) {
     console.log(error.message);
     res.status(500).json({
         success: false,
         message: error.message,
     });   
    }
}
