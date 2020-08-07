import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppRoute} from '../../const.js';

import {getIsRequireAuthorization} from '../../reducer/user/selectors.js';

interface Props {
  path: string;
  exact: boolean;
  render: () => React.ReactElement;
  isRequireAuthorization: boolean;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {path, exact, render, isRequireAuthorization} = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return isRequireAuthorization
          ? <Redirect to={AppRoute.LOGIN} />
          : render();
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isRequireAuthorization: getIsRequireAuthorization(state)
  };
};

export {PrivateRoute};

export default connect(mapStateToProps)(PrivateRoute);
