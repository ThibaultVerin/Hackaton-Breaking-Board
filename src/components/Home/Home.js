import React from 'react';
import './Home.scss';
import Upload from './Upload.js';
import Background from './Background';

import { SoundEffectContextProvider } from './SoundEffectContext';

const Home = () => {
  return (
    <SoundEffectContextProvider>
      <Background />
      <div className='home'>
        <Upload />
      </div>
    </SoundEffectContextProvider>
  );
};

export default Home;
