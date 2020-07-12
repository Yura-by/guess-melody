import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withAuthData = (Component) => {
  class WithAuthData extends PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``
      };

      this._formSubmitHandler = this._formSubmitHandler.bind(this);
      this._loginChangeHandler = this._loginChangeHandler.bind(this);
      this._passwordChangeHandler = this._passwordChangeHandler.bind(this);
    }

    _formSubmitHandler(evt) {
      const {onAuthFormSubmit} = this.props;
      evt.preventDefault();
      onAuthFormSubmit(this.state);
    }

    _loginChangeHandler(evt) {
      this.setState({
        email: evt.target.value
      });
    }

    _passwordChangeHandler(evt) {
      this.setState({
        password: evt.target.value
      });
    }

    render() {
      return <Component
        {...this.props}
        formSubmitHandler={this._formSubmitHandler}
        loginChangeHandler={this._loginChangeHandler}
        passwordChangeHandler={this._passwordChangeHandler}
        email={this.state.email}
        password={this.state.password}
      />;
    }
  }

  WithAuthData.propTypes = {
    onAuthFormSubmit: PropTypes.func.isRequired
  };

  return WithAuthData;
};

export default withAuthData;
