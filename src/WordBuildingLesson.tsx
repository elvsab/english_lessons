import { useState } from 'react';

type ChoiceQuestion = {
  prompt: string;
  hint?: string;
  answer: string;
  options: string[];
};

const prefixes = [
  { form: 'un-', meaning: 'не, противоположность', examples: 'unhappy, unfair' },
  { form: 'dis-', meaning: 'не, обратное действие', examples: 'disagree, disconnect' },
  { form: 're-', meaning: 'снова', examples: 'rewrite, rebuild' },
  { form: 'mis-', meaning: 'неверно', examples: 'misunderstand, misspell' },
  { form: 'over-', meaning: 'слишком, чрезмерно', examples: 'overcook, overwork' },
  { form: 'under-', meaning: 'недостаточно', examples: 'underpay, underestimate' },
  { form: 'in- / im- / il- / ir-', meaning: 'не', examples: 'incorrect, impossible, illegal, irregular' },
];

const suffixes = [
  { form: '-er / -or', role: 'noun', meaning: 'человек или предмет', examples: 'teacher, actor' },
  { form: '-ness / -ment', role: 'noun', meaning: 'состояние или результат', examples: 'happiness, development' },
  { form: '-tion / -ity', role: 'noun', meaning: 'действие или качество', examples: 'information, ability' },
  { form: '-ful / -less', role: 'adjective', meaning: 'наличие / отсутствие качества', examples: 'careful, careless' },
  { form: '-ous / -able / -ive', role: 'adjective', meaning: 'признак или возможность', examples: 'famous, reliable, creative' },
  { form: '-ly', role: 'adverb', meaning: 'как выполняется действие', examples: 'quickly, politely' },
];

const prefixMeaningQuestions: ChoiceQuestion[] = [
  { prompt: 'rewrite', hint: 'What does re- mean?', answer: 'again', options: ['again', 'wrongly', 'not enough'] },
  { prompt: 'misunderstand', hint: 'What does mis- mean?', answer: 'wrongly', options: ['too much', 'wrongly', 'opposite'] },
  { prompt: 'overcook', hint: 'What does over- mean?', answer: 'too much', options: ['again', 'not', 'too much'] },
  { prompt: 'underpay', hint: 'What does under- mean?', answer: 'not enough', options: ['not enough', 'wrongly', 'before'] },
  { prompt: 'disagree', hint: 'What does dis- mean?', answer: 'not / opposite', options: ['again', 'not / opposite', 'too much'] },
  { prompt: 'illegal', hint: 'What does il- mean?', answer: 'not', options: ['not', 'after', 'together'] },
];

const wordFormationQuestions = [
  { prompt: 'possible', clue: 'not possible', answer: 'impossible' },
  { prompt: 'regular', clue: 'not regular', answer: 'irregular' },
  { prompt: 'legal', clue: 'not legal', answer: 'illegal' },
  { prompt: 'patient', clue: 'not patient', answer: 'impatient' },
  { prompt: 'agree', clue: 'have a different opinion', answer: 'disagree' },
  { prompt: 'understand', clue: 'understand incorrectly', answer: 'misunderstand' },
  { prompt: 'write', clue: 'write again', answer: 'rewrite' },
  { prompt: 'cook', clue: 'cook for too long', answer: 'overcook' },
];

const suffixQuestions: ChoiceQuestion[] = [
  { prompt: 'teach + ?', hint: 'a person who teaches', answer: '-er', options: ['-er', '-ness', '-ful'] },
  { prompt: 'happy + ?', hint: 'the state of being happy', answer: '-ness', options: ['-ly', '-ness', '-able'] },
  { prompt: 'develop + ?', hint: 'the process of developing', answer: '-ment', options: ['-ment', '-ous', '-er'] },
  { prompt: 'care + ?', hint: 'showing attention and thought', answer: '-ful', options: ['-less', '-ful', '-ity'] },
  { prompt: 'hope + ?', hint: 'without hope', answer: '-less', options: ['-tion', '-less', '-ive'] },
  { prompt: 'comfort + ?', hint: 'pleasant and relaxing', answer: '-able', options: ['-able', '-or', '-ness'] },
  { prompt: 'quick + ?', hint: 'in a quick way', answer: '-ly', options: ['-ity', '-ly', '-ment'] },
  { prompt: 'create + ?', hint: 'having original ideas', answer: '-ive', options: ['-ive', '-ful', '-er'] },
];

const contextQuestions: ChoiceQuestion[] = [
  { prompt: 'The instructions were very ___. (help)', answer: 'helpful', options: ['helpful', 'helpless', 'helpfully'] },
  { prompt: 'She answered the question ___. (polite)', answer: 'politely', options: ['politeness', 'politely', 'impolite'] },
  { prompt: 'His ___ surprised everyone. (decide)', answer: 'decision', options: ['decisive', 'decision', 'decideful'] },
  { prompt: 'This website is simple and ___. (use)', answer: 'useful', options: ['uselessly', 'useful', 'usage'] },
  { prompt: 'Please ___ the last paragraph. (write)', answer: 'rewrite', options: ['unwrite', 'miswrite', 'rewrite'] },
  { prompt: 'It was a complete ___. (understand)', answer: 'misunderstanding', options: ['understander', 'misunderstanding', 'understandable'] },
];

function shuffle(options: string[]) {
  const result = [...options];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const next = Math.floor(Math.random() * (index + 1));
    [result[index], result[next]] = [result[next], result[index]];
  }
  return result;
}

export function WordBuildingLesson() {
  return (
    <section className="stack word-building-page">
      <div className="page-title">
        <p className="kicker">Vocabulary toolkit</p>
        <h2>Prefixes & suffixes</h2>
        <p>Научитесь узнавать значение новых слов и строить слова разных частей речи.</p>
      </div>

      <section className="word-building-intro">
        <div>
          <p className="kicker">Prefix</p>
          <h3>Приставка стоит перед корнем</h3>
          <p><strong>happy → unhappy</strong>. Приставка обычно меняет значение, но не меняет часть речи.</p>
        </div>
        <div>
          <p className="kicker">Suffix</p>
          <h3>Суффикс стоит после корня</h3>
          <p><strong>happy → happiness</strong>. Суффикс часто меняет часть речи: adjective → noun.</p>
        </div>
      </section>

      <AffixReference title="Common prefixes" items={prefixes} />
      <ChoiceExercise title="1. Match the prefix with its meaning" questions={prefixMeaningQuestions} />
      <WordFormationExercise />
      <AffixReference title="Common suffixes" items={suffixes} showRole />
      <ChoiceExercise title="3. Choose the correct suffix" questions={suffixQuestions} />
      <ChoiceExercise title="4. Complete the sentences with the correct form" questions={contextQuestions} />

      <article className="panel word-building-note">
        <h3>Важно запомнить</h3>
        <ul>
          <li>Перед <strong>p, b, m</strong> часто используется <strong>im-</strong>: impossible, imbalance, immature.</li>
          <li>Перед <strong>l</strong> используется <strong>il-</strong>, перед <strong>r</strong> используется <strong>ir-</strong>: illegal, irregular.</li>
          <li>При добавлении суффикса написание может меняться: happy → happiness, possible → possibility.</li>
          <li>Выучивайте не только аффикс, но и целое слово: не каждый корень сочетается с любым префиксом или суффиксом.</li>
        </ul>
      </article>
    </section>
  );
}

function AffixReference({
  title,
  items,
  showRole = false,
}: {
  title: string;
  items: Array<{ form: string; meaning: string; examples: string; role?: string }>;
  showRole?: boolean;
}) {
  return (
    <article className="panel affix-reference">
      <h3>{title}</h3>
      <div className="affix-table" role="table" aria-label={title}>
        <div className={`affix-row affix-head ${showRole ? 'with-role' : ''}`} role="row">
          <span role="columnheader">Form</span>
          {showRole && <span role="columnheader">Makes a</span>}
          <span role="columnheader">Meaning</span>
          <span role="columnheader">Examples</span>
        </div>
        {items.map((item) => (
          <div className={`affix-row ${showRole ? 'with-role' : ''}`} role="row" key={item.form}>
            <strong role="cell">{item.form}</strong>
            {showRole && <span className="word-class" role="cell">{item.role}</span>}
            <span role="cell">{item.meaning}</span>
            <span role="cell">{item.examples}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function ChoiceExercise({ title, questions }: { title: string; questions: ChoiceQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [orders] = useState(() => questions.map((question) => shuffle(question.options)));
  const correct = questions.filter((question, index) => answers[index] === question.answer).length;

  return (
    <article className="panel">
      <h3>{title}</h3>
      <div className="word-choice-grid">
        {questions.map((question, index) => (
          <section className="word-choice-item" key={question.prompt}>
            <div>
              <strong>{question.prompt}</strong>
              {question.hint && <small>{question.hint}</small>}
            </div>
            <div className="choice-options">
              {orders[index].map((option) => {
                const chosen = answers[index] === option;
                return (
                  <button
                    className={`choice-button ${chosen ? 'chosen' : ''} ${chosen ? (option === question.answer ? 'correct' : 'wrong') : ''}`}
                    type="button"
                    key={option}
                    onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <p className="result">{Object.keys(answers).length ? `${correct}/${questions.length} correct` : 'Choose answers to start checking.'}</p>
    </article>
  );
}

function WordFormationExercise() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const correct = wordFormationQuestions.filter((question, index) => answers[index]?.trim().toLowerCase() === question.answer).length;

  return (
    <article className="panel">
      <h3>2. Add a prefix and make a new word</h3>
      <div className="word-input-grid">
        {wordFormationQuestions.map((question, index) => {
          const value = answers[index] ?? '';
          const isCorrect = value.trim().toLowerCase() === question.answer;
          return (
            <label className={`word-input-item ${checked && value ? (isCorrect ? 'correct' : 'wrong') : ''}`} key={question.prompt}>
              <span><strong>{question.prompt}</strong><small>{question.clue}</small></span>
              <input
                aria-label={`New word from ${question.prompt}`}
                autoComplete="off"
                value={value}
                onChange={(event) => {
                  setChecked(false);
                  setAnswers((current) => ({ ...current, [index]: event.target.value }));
                }}
                placeholder="Type the new word"
              />
              {checked && value && !isCorrect && <small className="answer-hint">Answer: {question.answer}</small>}
            </label>
          );
        })}
      </div>
      <div className="exercise-actions">
        <button className="primary-action" type="button" onClick={() => setChecked(true)}>Check answers</button>
        <button className="secondary-action" type="button" onClick={() => { setAnswers({}); setChecked(false); }}>Try again</button>
      </div>
      <p className="result">{checked ? `${correct}/${wordFormationQuestions.length} correct` : 'Complete the words, then check your answers.'}</p>
    </article>
  );
}
