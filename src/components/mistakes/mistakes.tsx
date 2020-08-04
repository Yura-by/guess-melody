import * as React from 'react';
// import PropTypes from 'prop-types';

interface Props {
  mistakes: number;
};

const Mistakes: React.FunctionComponent<Props> = (props) => {
  const {mistakes} = props;
  const mistakesFullArray = new Array(mistakes).fill(``);
  return (
    <div className="game__mistakes">
      {mistakesFullArray.map((it, index) => <div key={`mistake-${index}`} className="wrong"/>)}
    </div>
  );
};

// Mistakes.propTypes = {
//   mistakes: PropTypes.number.isRequired
// };

export default Mistakes;
