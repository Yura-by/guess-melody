import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);
      const {question: {answers}} = props;

      this.state = {
        userAnswers: new Array(answers.length).fill(false)
      };

      this._answersChangeHandler = this._answersChangeHandler.bind(this);
      this._answersSubmitHandler = this._answersSubmitHandler.bind(this);
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
        onChange={(index) => {
          this._answersChangeHandler(index);
        }}
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
