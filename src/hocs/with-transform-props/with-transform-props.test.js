import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withTransformProps from './with-transform-props.jsx';

Enzyme.configure({adapter: new Adapter()});

const mockFunc = (props) => {
  return {
    once: props.foo,
    twice: props.bar
  };
};

const MockComponent = () => <div></div>;

it(`with-transform-props work correctly`, () => {
  const WithTransformProps = withTransformProps(mockFunc)(MockComponent);

  const tree = shallow(<WithTransformProps
    foo={`Hello`}
    bar={`World`}
  />);

  expect(tree.props().foo).toBe(undefined);
  expect(tree.props().bar).toBe(undefined);

  expect(tree.props().once).toBe(`Hello`);
  expect(tree.props().twice).toBe(`World`);
});
