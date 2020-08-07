import * as React from 'react';
import {Subtract} from 'utility-types';

interface State {
  email: string;
  password: string;
}

interface Props {
  onAuthFormSubmit: (state: State) => void;
}

type FormSubmit = (evt: React.FormEvent<HTMLFormElement>) => void;
type LoginChange = (evt: React.ChangeEvent<HTMLInputElement>) => void;
type PasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => void;

interface InjectedProps {
  formSubmitHandler: FormSubmit;
  loginChangeHandler: LoginChange;
  passwordChangeHandler: PasswordChange;
  email: string;
  password: string;
}

const withAuthData = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithAuthData extends React.PureComponent<T, State> {

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

    private _formSubmitHandler(evt: React.FormEvent<HTMLFormElement>) {
      const {onAuthFormSubmit} = this.props;
      evt.preventDefault();
      onAuthFormSubmit(this.state);
    }

    private _loginChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
        email: evt.target.value
      });
    }

    private _passwordChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
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

  return WithAuthData;
};

export default withAuthData;
