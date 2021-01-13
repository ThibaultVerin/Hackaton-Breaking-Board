import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Upload.scss';
import axios from 'axios';

const Upload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('Enter your Name');
  const [mainPicture, setMainPicture] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/uploaddufichier')
  //     .then((res) => res.data)
  //     .then((data) => setPosts(data));
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append('title', title);
    formData.append('main_picture', mainPicture);
    console.log(formData.get('main_picture'));
    axios
      .post('http://localhost:5000/uploaddufichier', formData)
      .then((res) => res.data);
    // .then((data) =>
    //   setPosts([...posts, { title, main_picture_url: data.main_picture_url }])
    // );
  };

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    setMainPicture(e.target.files[0]);
  };

  return (
    <div className='formContainer'>
      <h2>Welcome On Board !</h2>
      <form
        onSubmit={handleSubmit}
        method='POST'
        encType='multipart/form-data'
        action='uploaddufichier'
        className='formBody'
      >
        <input
          type='text'
          placeholder='Enter your name'
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <p>Select your picture</p>
        <input type='file' name='main_picture' onChange={handleUpload} />
        <br />
        <input type='submit' value='Create Your Avatar' />
        <a onClick={() => setIsModalOpen(!isModalOpen)}>how does it work ?</a>
      </form>
      <div onClick={() => setIsModalOpen(!isModalOpen)}>
        <Modal showModal={isModalOpen}>
          <div className='modalHeader'>
            <h2>Lorem ipsum</h2>
          </div>
          <div className='modalBody'>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </h3>
          </div>
          <div className='modalFooter'>
            {' '}
            <button
              type='button'
              className='modalButton'
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Back
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Upload;
