import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    loaction: String,
    description: String,
    picturePath: String,
    userPicturePath: String,    //profile pic
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        types: Array,
        default: [],
    }
},
    { timestamps: true }
);

const Post = new mongoose.model("Post", postSchema);
export default Post;