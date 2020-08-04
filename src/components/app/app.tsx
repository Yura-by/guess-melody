import * as React from 'react';
// import PropTypes from 'prop-types';

interface Props {
  renderScreen: () => React.ReactElement;
}

class App extends React.Component<Props, null>{
  render() {
    const {renderScreen} = this.props;
    return renderScreen();
  }
}

// App.propTypes = {
//   renderScreen: PropTypes.func.isRequired,
// };

export default App;

