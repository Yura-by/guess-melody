import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AuthorizationScreen extends PureComponent {
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
    const {badLoginData} = this.props;
    const {email, password} = this.state;
    return (
      <section className="login">
        <div className="login__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
        </div>
        <h2 className="login__title">Необходима авторизация</h2>
        <p className="login__text">Представтесь!</p>
        <form
          onSubmit={this._formSubmitHandler}
          className="login__form" action="">
          <p className="login__field">
            <label className="login__label" htmlFor="name">Логин</label>
            <input
              value={email}
              onChange={this._loginChangeHandler}
              className="login__input" type="text" name="name" id="name" />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">Пароль</label>
            <input
              value={password}
              onChange={this._passwordChangeHandler}
              className="login__input" type="text" name="password" id="password" />
            <span
              style={badLoginData ? {display: `flex`, position: `absolute`, top: `50px`, left: `50px`} : {}}
              className="login__error">Неверный пароль или неверная почта</span>
          </p>
          <button className="login__button button" type="submit">Войти</button>
        </form>
      </section>
    );
  }

}

AuthorizationScreen.propTypes = {
  onAuthFormSubmit: PropTypes.func.isRequired,
  badLoginData: PropTypes.bool.isRequired
};


export default AuthorizationScreen;
