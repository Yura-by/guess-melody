import {Component} from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  render() {
    const {renderScreen} = this.props;
    return renderScreen();
  }
}

App.propTypes = {
  renderScreen: PropTypes.func.isRequired,
};

export default App;

