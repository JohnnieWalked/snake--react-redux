import { useDispatch } from 'react-redux';

import { scoreActions } from './store/scoreSlice';
import { snakePosActions } from './store/snakeSlice';

import classes from './styles/style.module.scss';
import { speedActions } from './store/speedSlice';

type Props = {
  children?: React.ReactNode,
  setEndGame: any
};

function Modal({setEndGame, children}: Props) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(scoreActions.setScore('restart'));
    dispatch(snakePosActions.setSnakePos(
      [{x: 8, y: 7, directionImg: 'up'},
      {x: 8, y: 8, directionImg: 'up'},
      {x: 8, y: 9, directionImg: 'up'}]
    ));
    dispatch(speedActions.restoreSpeed());
    setEndGame(false);
  }

  return (
    <div className={classes.gameFieldModal}>
      <h2>Game Over</h2>
      <div>Try again?</div>
      <div>
        <button onClick={handleClick}>Yes</button>
        <button onClick={() => setEndGame(false)}>No</button>
      </div>
    </div>
  );
}

export default Modal;