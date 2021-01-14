import React, { useState, useContext } from 'react';
import Modal from './Modal';
import './Modal.scss';
import './Upload.scss';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Upload = () => {
  const [title, setTitle] = useState('Enter your Name');
  const [mainPicture, setMainPicture] = useState(null);

  const { users, setUsers } = useContext(UserContext);
  const isModalOpen = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('main_picture', mainPicture);

    const res = await axios.post(
      'http://localhost:5000/uploaddufichier',
      formData
    );
    await setUsers([
      {
        name: res.data.name,
        avatar: `http://localhost:5000/${res.data.path}`,
        x: 0,
        y: 0,
      },
    ]);
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
        <button className='explanation' onClick={!isModalOpen}>
          <p>how does it work ?</p>
          <Modal showModal={isModalOpen}>
            <p>Here the instructions to have a nice time with your coworker</p>
          </Modal>
        </button>
      </form>
      <Link to='/board' className='join'>
        <div classname='a'>Join</div>
      </Link>
    </div>
  );
};

export default Upload;
