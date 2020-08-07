import * as React from 'react';

interface Props {
  mistakes: number;
}

const Mistakes: React.FunctionComponent<Props> = (props: Props) => {
  const {mistakes} = props;
  const mistakesFullArray = new Array(mistakes).fill(``);
  return (
    <div className="game__mistakes">
      {mistakesFullArray.map((it, index) => <div key={`mistake-${index}`} className="wrong"/>)}
    </div>
  );
};

export default Mistakes;
