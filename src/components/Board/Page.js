import addNotification from 'react-push-notification';

const Page = () => {
  const buttonClick = () => {
    addNotification({
      title: 'Ping',
      subtitle: 'Les CHINCHILLAS',
      message: 'You got a notification',
      native: true,
    });
  };

  return (
    <div className='page'>
      <button onClick={buttonClick} className='button'>
        Hello world.
      </button>
    </div>
  );
};

export default Page;
