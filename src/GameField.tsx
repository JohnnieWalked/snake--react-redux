import { KeyboardEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from './hooks/useInterval';

import { CANVAS_SIZE, SCALE } from './constants';

import { RootState } from './store';
import { snakePosActions } from './store/snakeSlice';
import { appleActions } from './store/appleSlice';
import { speedActions } from './store/speedSlice';

import snakeHeadUp from './assets/Bone_HeadUp.png';
import snakeHeadRight from './assets/Bone_HeadRight.png';
import snakeHeadDown from './assets/Bone_HeadDown.png';
import snakeHeadLeft from './assets/Bone_HeadLeft.png';

import snakeBodyUp from './assets/Bone_BodyUp.png';
import snakeBodyRight from './assets/Bone_BodyRight.png';
import snakeBodyDown from './assets/Bone_BodyDown.png';
import snakeBodyLeft from './assets/Bone_BodyLeft.png';

import snakeTailUp from './assets/Bone_TailUp.png';
import snakeTailRight from './assets/Bone_TailRight.png';
import snakeTailDown from './assets/Bone_TailDown.png';
import snakeTailLeft from './assets/Bone_TailLeft.png';

import classes from './styles/style.module.scss';

const loadImage = (path: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject): void => {
    let image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = path;
  });
}

const snakeHeadImageUp = await loadImage(snakeHeadUp);
const snakeHeadImageRight = await loadImage(snakeHeadRight);
const snakeHeadImageDown = await loadImage(snakeHeadDown);
const snakeHeadImageLeft = await loadImage(snakeHeadLeft);

const snakeBodyImageUp = await loadImage(snakeBodyUp);
const snakeBodyImageRight = await loadImage(snakeBodyRight);
const snakeBodyImageDown = await loadImage(snakeBodyDown);
const snakeBodyImageLeft = await loadImage(snakeBodyLeft);

const snakeTailImageUp = await loadImage(snakeTailUp);
const snakeTailImageRight = await loadImage(snakeTailRight);
const snakeTailImageDown = await loadImage(snakeTailDown);
const snakeTailImageLeft = await loadImage(snakeTailLeft);

function GameField() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const applePos = useSelector((state: RootState) => state.applePos.applePos)
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

    context.fillStyle = 'red';
    context.fillRect(applePos.x, applePos.y, 1, 1);

    context.fillStyle = 'green';
    snakePos.forEach((item, i) => {
      if (i === snakePos.length - 1) {
        switch (item.directionImg) {
          case 'up':  context.drawImage(snakeTailImageUp, item.x, item.y, 1, 1);
                      break;
          case 'right': context.drawImage(snakeTailImageRight, item.x, item.y, 1, 1); 
                        break;
          case 'down': context.drawImage(snakeTailImageDown, item.x, item.y, 1, 1); 
                        break;
          case 'left': context.drawImage(snakeTailImageLeft, item.x, item.y, 1, 1); 
                        break;
        }
      } else if (i === 0) {
        switch (item.directionImg) {
          case 'up':  context.drawImage(snakeHeadImageUp, item.x, item.y, 1, 1);
                      break;
          case 'right': context.drawImage(snakeHeadImageRight, item.x, item.y, 1, 1); 
                        break;
          case 'down': context.drawImage(snakeHeadImageDown, item.x, item.y, 1, 1); 
                        break;
          case 'left': context.drawImage(snakeHeadImageLeft, item.x, item.y, 1, 1); 
                        break;
        }
      } else {
        switch (item.directionImg) {
          case 'up':  context.drawImage(snakeBodyImageUp, item.x, item.y, 1, 1);
                      break;
          case 'right': context.drawImage(snakeBodyImageRight, item.x, item.y, 1, 1); 
                        break;
          case 'down': context.drawImage(snakeBodyImageDown, item.x, item.y, 1, 1); 
                        break;
          case 'left': context.drawImage(snakeBodyImageLeft, item.x, item.y, 1, 1); 
                        break;
        }
      }
    });


  }, [snakePos, applePos])

  /* receives the button use pressed on the keyboard */
  const getKeyCode = (event: KeyboardEvent): void => {
    if (event.keyCode === 32) {
      speed ? dispatch(speedActions.setSpeed(null)) : dispatch(speedActions.setSpeed(50));
    } else {
      event.keyCode >= 37 && event.keyCode <= 40 && dispatch(snakePosActions.setDirection(event.keyCode));
    }
  }

  /* 
    creates new object (snakehead), push it at the beggining of the array 
    and deletes last array element; Using this fucntion with useInterval-hook creates a loop,
    which represents movement of the snake; 
  */
  const snakeMove = (): void => {
    const copySnakePos = [...snakePos];
    let temp = '';

    /* resposible for rotating an image-parts of snake */
    if (direction.x !== 0) {
      switch(direction.x) {
        case 1: temp = 'right'; break;
        case -1: temp = 'left'; break;
      }
    } else if (direction.y !== 0) {
      switch(direction.y) {
        case 1: temp = 'down'; break;
        case -1: temp = 'up'; break;
      }
    }

    const newSnakeHead = {
      x: copySnakePos[0].x + direction.x, 
      y: copySnakePos[0].y + direction.y,
      directionImg: temp
    };

    /* collide with apple */
    if (newSnakeHead.x === applePos.x && newSnakeHead.y == applePos.y) {
      dispatch(appleActions.setApple(snakePos));
      copySnakePos.unshift(newSnakeHead);
    }
    
    /* loop axis X */
    if (newSnakeHead.x >= CANVAS_SIZE.x / SCALE) {
      newSnakeHead.x = 0;
    } else if (newSnakeHead.x < 0) {
      newSnakeHead.x = CANVAS_SIZE.x / SCALE;
    } 

    /* loop axis Y */
    if (newSnakeHead.y >= CANVAS_SIZE.y / SCALE) {
      newSnakeHead.y = 0;
    } else if (newSnakeHead.y < 0) {
      newSnakeHead.y = CANVAS_SIZE.y / SCALE;
    }

    copySnakePos.unshift(newSnakeHead);
    copySnakePos.pop();
    
    /* update snake's position */
    dispatch(snakePosActions.setSnakePos(copySnakePos));
  }

  /* represents snake movement */
  useInterval(() => snakeMove(), speed)

  return (
    <div onKeyDown={(e: KeyboardEvent) => getKeyCode(e)} className={classes.gameField}>
      <canvas tabIndex={0} ref={canvasRef} width={`${CANVAS_SIZE.x}px`} height={`${CANVAS_SIZE.y}px`} />
    </div>
  )
}

export default GameField