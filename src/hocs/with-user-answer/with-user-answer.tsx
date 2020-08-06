import * as React from 'react';
import {Subtract} from 'utility-types';
import {ArtistQuestion, GenreQuestion, Question} from '../../types';

interface InjectedProps {
  userAnswers: boolean[];
  onChange: (index: number) => void;
  onAnswer: () => void;
};

interface Props {
  onAnswer: (answer: boolean[]) => void;
  question: Question;
};

interface State {
  userAnswers: boolean[];
};

const withUserAnswer = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithUserAnswer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      const {question: {answers}} = props;

      this.state = {
        userAnswers: new Array(answers.length).fill(false)
      };

      this._answersChangeHandler = this._answersChangeHandler.bind(this);
      this._answersSubmitHandler = this._answersSubmitHandler.bind(this);
    }

    componentDidUpdate(prevProps: Props) {
      const {question: {answers}, question} = this.props;
      if (prevProps.question !== question) {
        this.setState({
          userAnswers: new Array(answers.length).fill(false)
        });
      }
    }

    private _answersChangeHandler(index: number) {
      this.setState((prevState) => {
        const newAnswers = [...prevState.userAnswers];
        newAnswers[index] = !newAnswers[index];
        return {userAnswers: newAnswers};
      });
    }

    private _answersSubmitHandler() {
      const {onAnswer} = this.props;
      const {userAnswers} = this.state;
      onAnswer(userAnswers);
    }

    render() {
      return <Component
        {...this.props}
        userAnswers={this.state.userAnswers}
        onChange={this._answersChangeHandler}
        onAnswer={this._answersSubmitHandler}
      />;
    }
  }

  return WithUserAnswer;
};

export default withUserAnswer;
