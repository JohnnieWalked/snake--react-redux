import { KeyboardEvent, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInterval from './hooks/useInterval';

/* import redux-slices */
import { RootState } from './store';
import { snakePosActions } from './store/snakeSlice';
import { appleActions } from './store/appleSlice';
import { speedActions } from './store/speedSlice';

/* import img files */
import { 
  CANVAS_SIZE, SCALE,
  snakeHeadUpImgPath, snakeHeadRightImgPath, snakeHeadDownImgPath, snakeHeadLeftImgPath,
  snakeBodyUpImgPath, snakeBodyRightImgPath, snakeBodyDownImgPath, snakeBodyLeftImgPath,
  snakeTailUpImgPath, snakeTailRightImgPath, snakeTailDownImgPath, snakeTailLeftImgPath, guideVoodooDollImgPath, lavaBatImgPath, lavaSlimeImgPath
} from './utilities/constants';

/* import classes */
import classes from './styles/style.module.scss';

function GameField() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const applePos = useSelector((state: RootState) => state.applePos.applePos);
  const snakePos = useSelector((state: RootState) => state.snakePos.snakePos);
  const direction = useSelector((state: RootState) => state.snakePos.direction);
  const speed = useSelector((state: RootState) => state.speed.speed);

  /* fetch images from files and change img only when apple was eaten */
  const fetchAppleImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    const appleImages = [guideVoodooDollImgPath, lavaBatImgPath, lavaSlimeImgPath];
    return appleImages[randomIndex];
  }, [applePos]);

/* gets new canvas element every time snake-position changes, clear and draws new snake */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) { return }
    canvas.focus();
    const context = canvas.getContext('2d');
    if (!context) { return }

    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* draw apple img */
    fetchAppleImage.then(data => context.drawImage(data, applePos.x, applePos.y, 1, 1));    

    /* draw snake imgs */
    snakePos.forEach(async (snakePosItem, index) => {
       /* SNAKE HEAD ------------------------------------------------------------ */
      if (index === 0) {
        switch (snakePosItem.directionImg) {
          case 'up': context.drawImage(await snakeHeadUpImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
          case 'right': context.drawImage(await snakeHeadRightImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
          case 'down': context.drawImage(await snakeHeadDownImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
          case 'left': context.drawImage(await snakeHeadLeftImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
        }
      }
      /* SNAKE TAIL ------------------------------------------------------------ */
      else if (index === snakePos.length - 1) {
        switch (snakePosItem.directionImg) {
          case 'up': context.drawImage(await snakeTailUpImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
          case 'right': context.drawImage(await snakeTailRightImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
          case 'down': context.drawImage(await snakeTailDownImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
          case 'left': context.drawImage(await snakeTailLeftImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break; 
        }
      } 
      /* SNAKE BODY ------------------------------------------------------------ */
      else {
        switch (snakePosItem.directionImg) {
          case 'up': context.drawImage(await snakeBodyUpImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
          case 'right': context.drawImage(await snakeBodyRightImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
          case 'down': context.drawImage(await snakeBodyDownImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
          case 'left': context.drawImage(await snakeBodyLeftImgPath, snakePosItem.x, snakePosItem.y, 1, 1); 
            break;
        }
      }
    });
  }, [snakePos])


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

    /* collide with apple */
    if (newSnakeHead.x === applePos.x && newSnakeHead.y == applePos.y) {
      copySnakePos.unshift(newSnakeHead);
      dispatch(appleActions.setApple(copySnakePos));
    }
    
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