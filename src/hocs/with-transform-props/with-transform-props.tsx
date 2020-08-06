import * as React from 'react';
import {Omit} from 'utility-types';

enum Render {
  ANSWER = `renderAnswer`,
  QUESTION = `renderQuestion`
};

const withTransformProps = (transformFunc: (props: object) => object) => (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Omit<P, Render.ANSWER | Render.QUESTION>;

  const WithTransformProps: React.FunctionComponent<T> = (props) => {
    const newProps = transformFunc(props);

    return <Component
      {...newProps}
    />;
  };

  // WithTransformProps.propTypes = {};

  return WithTransformProps;
};

export default withTransformProps;

