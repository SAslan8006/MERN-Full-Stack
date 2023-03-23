import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux';

const Modal = () => {
  const [postData,setPostData]=useState ({user:"",title:"",description:""});
  const dispatch=useDispatch();
  const onchangeFunc=(e)=>{
    setPostData({...postData,[e.target.name]:e.target.value})
  }
  return (
    <div className='w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'>
      <div className='bg-white w-1/3 p-2 rounded-md'>
      <div onClick={()=> dispatch({type:'MODAL',payload:false})} className='flex items-center justify-between cursor-pointer'>
          <h1 className='font-bold text-2xl'>Post Paylaş</h1>
          <AiOutlineClose size={25}/>

        </div>
        <div className='my-4 flex flex-col space-y-3'>
          <input value={postData.user} name='user' onChange={onchangeFunc} className='input-style' type='text' placeholder='User'/>
          <input value={postData.title} name='title' onChange={onchangeFunc} className='input-style' type='text' placeholder='Title' />
          <input value={postData.description} name='description' onChange={onchangeFunc} className='input-style' type='text' placeholder='Description' />

        </div>
        <div className='w-full p-2 text-center bg-indigo-600 text-white cursor-pointer hover:bg-indigo-800'>Paylaş</div>
      </div>
    </div>
  )
}

export default Modal