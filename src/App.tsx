import { Fragment } from 'react';
import GameField from './GameField';

import guidepng  from './assets/Map_Icon_Guide.png';
import classes from './styles/style.module.scss';


function App() {





  
  return (
    <Fragment>
      <h1 className={classes.logo}>Terra Snake</h1>
      <div className={classes.container}>

        <section className={classes.game}>
          <div className={classes.gameHeader}>
            <div>Score: 0</div>
            <div>High Score: 0</div>
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
                <div></div>
              </li>
              <li>
                <div></div>
              </li>
              <li>
                <div></div>
              </li>
              <li>
                <div></div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Fragment>   
  )
}

export default App