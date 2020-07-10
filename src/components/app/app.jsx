import {PureComponent} from 'react';
import PropTypes from 'prop-types';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import GameScreen from '../game-screen/game-screen.jsx';
import {connect} from 'react-redux';

import {getStep} from '../../reducer/game/selectors.js';
import {getIsRequireAuthorization, getIsBadLoginData} from '../../reducer/user/selectors.js';


class App extends PureComponent {
  render() {
    const {renderScreen, step} = this.props;
    return renderScreen(step);
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/">
    //       {this._renderGameScreen()}
    //     </Route>
    //     <Route exact path="/artist">
    //       <GameArtist
    //         question={questions[1]}
    //         onAnswer={() => {}}
    //       />
    //     </Route>
    //     <Route path="/genre">
    //       <GameGenre
    //         question={questions[0]}
    //         onAnswer={() => {}}
    //       />
    //     </Route>
    //   </Switch>
    // </BrowserRouter>
    // );
  }
}

App.propTypes = {
  renderScreen: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  isRequireAuthorization: PropTypes.bool.isRequired,
  isBadLoginData: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    step: getStep(state),
    isRequireAuthorization: getIsRequireAuthorization(state),
    isBadLoginData: getIsBadLoginData(state)
  };
};

export {App};

export default connect(mapStateToProps)(App);

