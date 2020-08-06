import * as React from 'react';
// import PropTypes from 'prop-types';
import {ArtistQuestion, GenreQuestion} from '../../types';

interface InjectedProps {
};

type Question = ArtistQuestion | GenreQuestion;

interface Props {
  onAnswer: (answer: boolean[]) => void;
  question: Question;
};

interface State {
  userAnswers: boolean[];
}

const withUserAnswer = (Component) => {
  class WithUserAnswer extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);
      const {question: {answers}} = props;

      this.state = {
        userAnswers: new Array(answers.length).fill(false)
      };

      this._answersChangeHandler = this._answersChangeHandler.bind(this);
      this._answersSubmitHandler = this._answersSubmitHandler.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {question: {answers}, question} = this.props;
      if (prevProps.question !== question) {
        this.setState({
          userAnswers: new Array(answers.length).fill(false)
        });
      }
    }

    _answersChangeHandler(index) {
      this.setState((prevState) => {
        const newAnswers = [...prevState.userAnswers];
        newAnswers[index] = !newAnswers[index];
        return {userAnswers: newAnswers};
      });
    }

    _answersSubmitHandler() {
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

  WithUserAnswer.propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
  };

  return WithUserAnswer;
};

export default withUserAnswer;
