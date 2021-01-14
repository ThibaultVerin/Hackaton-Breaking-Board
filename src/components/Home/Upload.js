import React, { useState, useContext } from 'react';
import Modal from './Modal';
import './Modal.scss';
import './Upload.scss';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [mainPicture, setMainPicture] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, setUsers, currentUser, setCurrentUser } = useContext(
    UserContext
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('main_picture', mainPicture);

    const res = await axios.post(
      'http://localhost:5000/uploaddufichier',
      formData
    );

    const newUser = {
      name: res.data.name,
      avatar: `http://localhost:5000/${res.data.path}`,
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
      id: uuid(),
    };
    await setCurrentUser(newUser);
    await setUsers([newUser]);
  };

  return (
    <div className='main'>
      <div className='title'>
        <h2>Welcome On Board !</h2>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          className='name'
          placeholder='Enter your Name'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <div className='select'>
          <p>Select your picture</p>
        </div>

        <input
          type='file'
          className='upload'
          onChange={(e) => setMainPicture(e.target.files[0])}
        />
        <br />
        <input type='submit' className='submit' value='Create Your Avatar' />
        <div
          className='explanation'
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <p>how does it work ?</p>
        </div>
      </form>
      <div onClick={() => setIsModalOpen(!isModalOpen)}>
        <Modal showModal={isModalOpen}>
          <div className='modalHeader'>
            <h2>Here how to play</h2>
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
      <Link to='/board' className='join'>
        <div classname='a'>Join</div>
      </Link>
    </div>
  );
};

export default Upload;
