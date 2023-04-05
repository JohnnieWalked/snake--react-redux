import { Fragment, useEffect } from 'react';
import GameField from './GameField';

import { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { scoreActions } from './store/scoreSlice';

import guidepng  from './assets/Map_Icon_Guide.png';
import classes from './styles/style.module.scss';


function App() {
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.score.score);
  const highScore = useSelector((state: RootState) => state.score.highScore);

  useEffect(() => {
    dispatch(scoreActions.setHighScore());
  }, [])
  
  return (
    <Fragment>
      <h1 className={classes.logo}>Terra Snake</h1>
      <div className={classes.container}>

        <section className={classes.game}>
          <div className={classes.gameHeader}>
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
          </div>
          <GameField />
        </section>

        <section className={classes.instructions}>
          <span className={classes.guide}>
            Hints from Guide
            <img src={guidepng} alt="guide-icon" />
          </span>
          <div>
            <ul>
              <li>
                <div>Control snake movement using WASD or Arrows.</div>
              </li>
              <li>
                <div>Eat food to increase size of the snake.</div>
              </li>
              <li>
                <div>Snake can pass through borders.</div>
              </li>
              <li>
                <div>Press 'Space' to start/pause the game.</div>
              </li>
              <li>
                <div>Don't play with Guide's voodoo doll near lava.</div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Fragment>   
  )
}

export default App