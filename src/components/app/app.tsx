import * as React from 'react';

interface Props {
  renderScreen: () => React.ReactElement;
}

class App extends React.Component<Props, null>{
  render() {
    const {renderScreen} = this.props;
    return renderScreen();
  }
}

export default App;

