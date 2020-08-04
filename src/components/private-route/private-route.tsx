import * as React from 'react';
// import PropTypes from 'prop-types';
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

const PrivateRoute: React.FunctionComponent<Props> = ({path, exact, render, isRequireAuthorization}) => {
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

// PrivateRoute.propTypes = {
//   path: PropTypes.string.isRequired,
//   exact: PropTypes.bool.isRequired,
//   render: PropTypes.func.isRequired,
//   isRequireAuthorization: PropTypes.bool.isRequired
// };

const mapStateToProps = (state) => {
  return {
    isRequireAuthorization: getIsRequireAuthorization(state)
  };
};

export {PrivateRoute};

export default connect(mapStateToProps)(PrivateRoute);
