import * as React from 'react';
import {GenreQuestion, GenreAnswer, RenderPlayer} from '../../types';

interface Props {
  question: GenreQuestion;
  onAnswer: (ansers: boolean[]) => void;
  userAnswers: boolean[];
  renderAnswer: RenderPlayer;
  onChange: (indes: number) => void;
}

export default class GameGenre extends React.PureComponent<Props, null> {

  render() {
    const {question, onAnswer, userAnswers, renderAnswer, onChange} = this.props;
    const {genre, answers} = question;
    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer(userAnswers);
          }}
        >
          {answers.map((answer, index) => {
            const {id} = answer;
            return (
              <div className="track" key={id}>
                {renderAnswer<GenreAnswer>(answer, index)}
                <div className="game__answer">
                  <input
                    className="game__input visually-hidden"
                    type="checkbox" name="answer"
                    value={`answer-${index}`}
                    id={`answer-${index}`}
                    checked={userAnswers[index]}
                    onChange={() => {
                      onChange(index);
                    }}
                  />
                  <label className="game__check" htmlFor={`answer-${index}`}>Отметить</label>
                </div>
              </div>
            );
          })}

          <button
            className="game__submit button"
            type="submit"
          >Ответить
          </button>
        </form>
      </section>
    );
  }
}
