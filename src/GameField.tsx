
import { Fragment } from 'react';
import classes from './styles/style.module.scss';

function GameField() {
  return (
    <Fragment>
      GAME FIELD
      <div>
        <button>START/PAUSE</button>
      </div>
      <div className={classes.gameField}>
        <div className={classes.gameFieldBg}>
          <canvas  />
        </div>
      </div>
    </Fragment>
    
  )
}

export default GameField