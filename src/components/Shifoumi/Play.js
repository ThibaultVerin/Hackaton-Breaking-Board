import React, { useState, useEffect, useContext } from 'react';
import './Play.css';
import paper from './Images/paper.png';
import cisors from './Images/cisors.png';
import rock from './Images/rock.png';
import paperReverse from './Images/paperReverse.png';
import cisorsReverse from './Images/cisorsReverse.png';
import rockReverse from './Images/rockReverse.png';
import jesus from './Images/jesus.jpg';
import doctor from './Images/doctor.jpg';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Play = () => {
  const { socket, currentUser } = useContext(UserContext);

  const [player1, setPlayer1] = useState(currentUser);
  const [player2, setPlayer2] = useState();
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [isWinner, setIsWinner] = useState('');
  const [playerCounter, setPlayerCounter] = useState(0);
  const [computerCounter, setComputerCounter] = useState(0);
  const [victorious, setVictorious] = useState();

  useEffect(() => {
    socket.emit('joinShifoumi', 'room1');
    socket.emit('notification', `${currentUser.name} is playing Shi Fu Mi `);

    socket.on('welcome', (data) => {
      console.log(data);
      socket.emit('userJoin', currentUser);
    });

    socket.on('player2', (player2) => {
      setPlayer2(player2);
    });

    socket.on('player2Choice', (player2Choice) => {
      setComputerChoice(player2Choice);
    });

    socket.on('player2Score', (score) => {
      setComputerCounter(score);
    });
  }, []);

  useEffect(() => {
    if (playerChoice) {
      socket.emit('player1Choice', playerChoice);
    }
  }, [playerChoice]);

  useEffect(() => {
    if (playerCounter) {
      socket.emit('player1Score', playerCounter);
    }
  }, [playerCounter]);

  useEffect(() => {
    if (playerCounter === 3) {
      setVictorious(player1);
    } else if (computerCounter === 3) {
      setVictorious(player2);
    }
  }, [playerCounter, computerCounter]);

  const comparePick = () => {
    if (playerChoice === computerChoice) {
      setIsWinner('Draw');
      console.log('Draw');
    } else if (
      (playerChoice === 1 && computerChoice === 3) ||
      (playerChoice === 2 && computerChoice === 1) ||
      (playerChoice === 3 && computerChoice === 2)
    ) {
      setIsWinner('You win');
      setPlayerCounter(playerCounter + 1);
      console.log('You win');
    } else {
      setIsWinner('You loose');
      //   setComputerCounter(computerCounter + 1);
      console.log('You loose');
    }
    setPlayerChoice();
    setComputerChoice();
  };

  useEffect(() => {
    if (playerChoice && computerChoice) {
      comparePick();
    }
  }, [playerChoice, computerChoice]);

  const showWinner = () => {
    if (!victorious) {
      return (
        <div className='playBody'>
          <h1>Challenge me if you dare !</h1>
          <h2>{isWinner}</h2>
          <div className='playPart'>
            <div className='playerChoice'>
              <img
                src={paper}
                alt={paper}
                className='playerWeapon'
                onClick={() => {
                  setPlayerChoice(1);
                }}
              />
              <img
                src={cisors}
                alt={cisors}
                onClick={() => {
                  setPlayerChoice(2);
                }}
              />
              <img
                src={rock}
                alt={rock}
                onClick={() => {
                  setPlayerChoice(3);
                }}
              />
            </div>
            <img
              src={player1.avatar}
              alt={player1.name}
              className='avatarimg'
              style={{
                width: 150,
                height: 150,
                position: 'absolute',
                left: 150,
                bottom: 100,
                borderRadius: '50%',
              }}
            />
            <div className='scorePartDoctor'>
              <p>{player1 && player1.name}</p>
              <h2>Score : {playerCounter}</h2>
            </div>
            <div className='computerChoice'>
              <img src={paperReverse} alt={paperReverse} />
              <img src={cisorsReverse} alt={cisorsReverse} />
              <img src={rockReverse} alt={rockReverse} />
            </div>
            <img
              src={player2 && player2.avatar}
              alt={player2 && player2.name}
              style={{
                width: 150,
                height: 150,
                position: 'absolute',
                right: 150,
                bottom: 100,
                borderRadius: '50%',
              }}
            />
            <div className='scorePartJesus'>
              <p>{player2 && player2.name}</p>

              <h2>Score : {computerCounter}</h2>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <img
            src={doctor}
            alt='aa'
            style={{
              width: 300,
              height: 400,
              position: 'absolute',
              right: 50,
              bottom: 150,
              borderRadius: 20,
            }}
          />
          {/* {victorious.name} */}
          Player 1 won the game !
          <div>
            <input type='button' value='Play again' onClick={reset} />
            <Link to={'/board'}>Back</Link>
          </div>
        </div>
      );
    }
  };

  const reset = () => {
    setVictorious();
    setPlayerCounter(0);
    setComputerCounter(0);
  };

  return <>{showWinner()}</>;
};

export default Play;

// Step 1 : Reconnaitre le click:
// -> creation state choix du player
// -> onClick={() => setPlayerChoice()} pour mettre à jour le state.

// Step 2 : Au click donner un state d'une valeur aléatoire pour l'ordi
// -> creer state computer
// -> creer un random number entre 0 et 2 pour le choix de l'ordi --> console.log en premier puis mettre à jour le state.
// -> Math.floor(Math.random() * Math.floor(3))

// Step 3 : définir en fonction des 2 states liés aux choix
// -> création d'un state isWinner pour savoir si l'utilisateur gagne
// -> création conditions

// Step 4 : créer counter:
// -> creer state pour player et computer
// -> incrémente de 1 dans les conditions
// -> affichage h2 dans le return
