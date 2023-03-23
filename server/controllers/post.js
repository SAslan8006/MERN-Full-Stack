const PostSchema = require('../models/post.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find();
    res.status(200).json({ getPosts});
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    res.status(201).json(newPost );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await PostSchema.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ update});
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostSchema.findByIdAndRemove(id);
    res.status(201).json({
      msg: 'Silme işleminiz başarılıdır....',
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const searchPost = async (req, res) => {
  try {
    const { search, tag } = req.query;
    const title = new RegExp(search, 'i');

    const posts = await PostSchema.find({ $or: [{ title }], tag: { $in: tag.splite(',') } });
    res.status(200).json({
      posts,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost, searchPost };
