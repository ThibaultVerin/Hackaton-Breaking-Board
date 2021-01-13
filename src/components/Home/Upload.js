import React, { useState, useContext } from 'react';
/* import Modal from './Modal'; */
import './Upload.scss';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Upload = () => {
  const [title, setTitle] = useState('Enter your Name');
  const [mainPicture, setMainPicture] = useState(null);

  const { users, setUsers } = useContext(UserContext);

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
    <div>
      <h2>Welcome On Board !</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <p>Select your picture</p>
        <input
          type='file'
          onChange={(e) => setMainPicture(e.target.files[0])}
        />
        <br />
        <input type='submit' value='Create Your Avatar' />
        <p>how does it work ?</p>
      </form>
      <Link to='/board'>Join</Link>
    </div>
  );
};

export default Upload;
