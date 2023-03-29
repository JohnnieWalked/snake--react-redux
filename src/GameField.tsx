import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from './hooks/useInterval';

import { CANVAS_SIZE, APPLE_INITIAL, SCALE } from './constants';

import { RootState } from './store';
import { snakePosActions } from './store/snakeSlice';
import { speedActions } from './store/speedSlice';

// import snakeHead from './assets/Bone_Head.png';
// import snakeBody from './assets/Bone_Body.png';
// import snakeTail from './assets/Bone_Tail.png';

import classes from './styles/style.module.scss';

function GameField() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const snakePos = useSelector((state: RootState) => state.snakePos.snakePos);
  const direction = useSelector((state: RootState) => state.snakePos.direction);

  const speed = useSelector((state: RootState) => state.speed.speed);
  

  /* gets new canvas element every time snake-position changes, clear and draws new snake */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) { return }
    canvas.focus();
    const context = canvas.getContext('2d');
    if (!context) { return }

    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'pink';
    snakePos.forEach((item) => {
      context.fillRect(item[0], item[1], 1, 1);
    });


  }, [snakePos])

  /* receives the button use pressed on the keyboard */
  const getKeyCode = ({ keyCode }) => {
    if (keyCode === 32) {
      speed ? dispatch(speedActions.setSpeed(null)) : dispatch(speedActions.setSpeed(50));
    } else {
      keyCode >= 37 && keyCode <= 40 && dispatch(snakePosActions.setDirection(keyCode));
    }
  }

  /* 
    creates new array-item (snakehead), push it at the beggining of the array 
    and deletes last array element; Using this fucntion with useInterval-hook creates a loop,
    which represents movement of the snake; 
  */
  const snakeMove = (): void => {
    const copySnakePos = [...snakePos];
    const newSnakeHead = [copySnakePos[0][0] + direction[0], copySnakePos[0][1] + direction[1]];
    copySnakePos.unshift(newSnakeHead);
    copySnakePos.pop();
    dispatch(snakePosActions.setSnakePos(copySnakePos));
  }

  /* represents snake movement */
  useInterval(() => snakeMove(), speed)

  return (
    <div onKeyDown={(e) => getKeyCode(e)} className={classes.gameField}>
      <canvas tabIndex={0} ref={canvasRef} width={`${CANVAS_SIZE[0]}px`} height={`${CANVAS_SIZE[1]}px`} />
    </div>
  )
}

export default GameField