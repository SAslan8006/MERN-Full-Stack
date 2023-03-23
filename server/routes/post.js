const express = require('express');
const { getPosts, createPost, updatePost, deletePost, searchPost } = require('../controllers/post.js');
const auth = require('../models/auth.js');
const router = express.Router();

router.get('/getPosts',getPosts);
router.post('/createPost',createPost);
router.patch('/updatePost/:id', updatePost);
router.delete('/deletePost/:id',deletePost);
router.get('/searchPost',searchPost);

module.exports=router
