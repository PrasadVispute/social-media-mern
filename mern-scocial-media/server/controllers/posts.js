import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find();
    res.status(201).json(posts); //shows all posts including new one
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//update like

export const likePost = async (Req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = Post.findById();
    const isliked = post.likes.get(userId);
    //if userId exist in that post's like then post is liked by userId
    if (isliked) {
      //remove like
      post.likes.delete(userId);
    } else {
      //add like
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { like: post.likes },
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
