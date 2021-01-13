import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Upload.scss';
import axios from 'axios';

const Upload = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('Enter your Name');
  const [mainPicture, setMainPicture] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/posts')
      .then((res) => res.data)
      .then((data) => setPosts(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('main_picture', mainPicture);

    axios
      .post('http://localhost:5000/posts', formData)
      .then((res) => res.data)
      .then((data) =>
        setPosts([...posts, { title, main_picture_url: data.main_picture_url }])
      );
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
    </div>
  );
};

export default Upload;
