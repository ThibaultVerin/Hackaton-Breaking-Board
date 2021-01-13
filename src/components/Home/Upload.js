import React, { useState } from 'react';
/* import Modal from './Modal'; */
import './Upload.scss';
import axios from 'axios';

const Upload = () => {
  const [title, setTitle] = useState('Enter your Name');
  const [mainPicture, setMainPicture] = useState(null);
  const [users, setUsers] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('main_picture', mainPicture);

    axios.post('http://localhost:5000/uploaddufichier', formData).then((res) =>
      setUsers({
        name: res.data.name,
        avatar: `http://localhost:5000/${res.data.path}`,
      })
    );
  };

  console.log(users);
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
      <div>
        <img src={`${users.avatar}`} alt='coucou' />
      </div>
    </div>
  );
};

export default Upload;
