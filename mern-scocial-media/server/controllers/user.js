import User from '../models/User.js';

//getUSer
export const getUser = async (req, res) =>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

// gethis frnds
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.find(id);
        const friends = Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) =>{
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );

        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

//add rem frnds
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id != friendId);
            friend.friends = friend.friends.filter((id)=> id != id);
        }else{
            user.frinds.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await frind.save();

        const friends = Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) =>{
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        );

        res.json(200).json(formattedFriends);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}