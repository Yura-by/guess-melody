import * as React from 'react';

interface Props {
  isBadLoginData: boolean;
  email: string;
  password: string;
  formSubmitHandler: (evt: React.FormEvent<HTMLFormElement>) => void;
  loginChangeHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  passwordChangeHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthorizationScreen: React.FunctionComponent<Props> = (props: Props) => {

  const {isBadLoginData, email, password, formSubmitHandler, loginChangeHandler, passwordChangeHandler} = props;
  return (
    <section className="login">
      <div className="login__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="login__title">Необходима авторизация</h2>
      <p className="login__text">Представьтесь!</p>
      <form
        onSubmit={formSubmitHandler}
        className="login__form" action="">
        <p className="login__field">
          <label className="login__label" htmlFor="name">Логин</label>
          <input
            value={email}
            onChange={loginChangeHandler}
            className="login__input" type="text" name="name" id="name" />
        </p>
        <p className="login__field">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input
            value={password}
            onChange={passwordChangeHandler}
            className="login__input" type="text" name="password" id="password" />
          <span
            style={isBadLoginData ? {display: `flex`, position: `absolute`, top: `50px`, left: `50px`} : {}}
            className="login__error">Неверный пароль или неверная почта</span>
        </p>
        <button className="login__button button" type="submit">Войти</button>
      </form>
    </section>
  );

};

export default AuthorizationScreen;
