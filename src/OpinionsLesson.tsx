import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

type SavedWord = {
  id: string;
  term: string;
  note: string;
  section: string;
  lessonId: string;
};

type ChoiceQuestion = { prompt: string; answer: string; options: string[] };
type GapQuestion = { prompt: string; answer: string };

const audio = Object.fromEntries(
  Array.from({ length: 8 }, (_, index) => {
    const track = index + 33;
    return [`track${track}`, `./audio/track-2-${track}.mp3`];
  }),
) as Record<string, string>;

function shuffleOptions(options: string[]) {
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function OpinionsActivity({
  activity,
  savedWords,
  onRemoveWord,
}: {
  activity: string;
  savedWords: SavedWord[];
  onRemoveWord: (id: string) => void;
}) {
  switch (activity) {
    case 'opinions-survey': return <SurveyPage />;
    case 'opinions-reporting': return <ReportedStatements />;
    case 'opinions-media': return <MediaPage />;
    case 'opinions-questions': return <ReportedQuestions />;
    case 'opinions-adjectives': return <AdjectivesPage />;
    case 'opinions-pride': return <PridePage />;
    case 'opinions-phrases': return <PhrasesPage />;
    case 'opinions-collocations': return <CollocationsPage />;
    case 'vocabulary': return <Vocabulary words={savedWords} onRemoveWord={onRemoveWord} />;
    default: return <Overview />;
  }
}

function Overview() {
  return (
    <section className="content-grid">
      <article className="panel intro-panel">
        <p className="kicker">Lesson map</p>
        <h2>Opinions: say what you think and report what others said</h2>
        <p>Pages 76-83 combine surveys, listening, reported speech, media vocabulary, a classic novel and a practical discussion.</p>
      </article>
      <article className="panel lesson-plan">
        <h3>Suggested flow</h3>
        <ol>
          <li>Compare attitudes in a relationship survey.</li>
          <li>Practise reported statements and questions.</li>
          <li>Build vocabulary for books, films and music.</li>
          <li>Contrast adjectives ending in -ed and -ing.</li>
          <li>Read and review Pride and Prejudice.</li>
          <li>Use natural phrases to agree, disagree and give an opinion.</li>
        </ol>
      </article>
      <article className="panel">
        <h3>Independent study</h3>
        <p>All answer menus are visible during screen sharing, and their choices are shuffled independently.</p>
      </article>
    </section>
  );
}

function SurveyPage() {
  const comments = [
    "Let's ask that woman for directions.",
    "I've just picked up that enormous spider in the bath.",
    "But I just don't need another pair of shoes.",
    "You drive, darling - you're so much better at it than me.",
    'Do you think I would look better if I put on a few kilos?',
    "Let's switch off the TV. I want to talk about our relationship.",
    "I'd love to have dinner with your sister. The only thing on TV tonight is football.",
    'Shall I check the tyre pressures when I go to the petrol station?',
  ];
  return (
    <section className="stack">
      <PageTitle eyebrow="Speaking & Reading · pages 76-77" title="Men and women: opinions and survey results" />
      <LessonVisual src="./images/opinions/survey-couple.jpg" alt="A bored couple sitting at opposite ends of a sofa" caption="Start by describing the relationship shown in the picture." />
      <UnscoredSelects title="Exercise 1: things people never say?" prompts={comments} options={['Women', 'Men', 'Neither / both']} />
      <OpenPrompts title="Add your own examples" prompts={['Write one more stereotypical comment for each column. Which examples feel old-fashioned or unfair?']} />
      <PersonalSurvey />
      <AudioCard title="Audio 2.33" description="Listen and check the completed survey report." src={audio.track33} />
      <GapSelect title="Page 77 · Complete the survey results" options={['men', 'women']} questions={[
        { prompt: '1. When asked their age, ___ tended to add a few years.', answer: 'men' },
        { prompt: '2. ___ were more likely to knock a few years off.', answer: 'women' },
        { prompt: '3. After a first date, most ___ expected a call the next day.', answer: 'women' },
        { prompt: '4. Most ___ thought a call within three days was acceptable.', answer: 'men' },
        { prompt: '5. ___ attached greater importance to birthdays.', answer: 'women' },
        { prompt: '6. ___ were less upset when a birthday was forgotten.', answer: 'men' },
        { prompt: '7. More ___ were in favour of marriage.', answer: 'women' },
        { prompt: '8. More ___ had no strong feelings about marriage.', answer: 'men' },
        { prompt: '9. More ___ considered marriage unnecessary.', answer: 'men' },
        { prompt: '10. Four in five ___ intended to get married.', answer: 'women' },
        { prompt: '11. Most ___ supported fathers staying at home.', answer: 'women' },
        { prompt: '12. Most ___ said this arrangement was not appropriate.', answer: 'men' },
      ]} />
      <OpenPrompts title="Discuss the results" prompts={['Which result surprised you most?', 'How might the answers be different today or in your country?']} />
    </section>
  );
}

function PersonalSurvey() {
  const questions = [
    ['Have you ever done any of these to attract somebody?', 'Bought new clothes', 'Dieted', 'Lied about your age'],
    ['After a first date, when do you expect a call?', 'The next day', 'Within three days', 'Within a fortnight'],
    ["If a date is late, how long will you wait?", 'Five minutes', 'Fifteen minutes', 'Half an hour or more'],
    ['If your partner forgets your birthday, how do you feel?', 'Upset', 'Angry', "I don't care"],
    ['What is your attitude to marriage?', "I'm in favour", 'No strong feelings', 'It is unnecessary'],
    ['What about fathers staying at home with children?', 'A good idea', "Not ideal, but OK", 'Not appropriate'],
  ];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [orders] = useState(() => questions.map((question) => shuffleOptions(question.slice(1))));
  return (
    <InteractiveCard title="Exercise 2: relationship survey">
      <div className="choice-grid">
        {questions.map((question, index) => (
          <div className="choice-card" key={question[0]}>
            <p>{index + 1}. {question[0]}</p>
            <div className="choice-options">
              {orders[index].map((option) => <button className={`choice-button ${answers[index] === option ? 'chosen' : ''}`} type="button" key={option} onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}>{option}</button>)}
            </div>
          </div>
        ))}
      </div>
      <p className="result">Personal answers: there are no right or wrong choices.</p>
    </InteractiveCard>
  );
}

function ReportedStatements() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Grammar · page 77" title="Reported statements" />
      <TheoryBox title="Theory" points={[
        'Present simple usually moves to past simple: “I feel confident.” → He said he felt confident.',
        'Present perfect usually moves to past perfect: “I have dieted.” → She admitted she had dieted.',
        'will → would; can → could; past simple often → past perfect.',
        'say + clause, but tell + person + clause: She said that... / She told us that...',
      ]} />
      <article className="language-hint"><h3>Подсказка ученику</h3><p>В косвенной речи мы передаём смысл слов, а не точную цитату. Если глагол сообщения стоит в прошедшем времени, время внутри сообщения обычно сдвигается на один шаг назад. <strong>That</strong> часто можно опустить.</p></article>
      <GapSelect title="Exercise 1: choose the reporting verb" options={['admitted', 'claimed', 'explained', 'insisted', 'replied', 'said', 'suggested', 'told']} questions={[
        { prompt: 'Just over half of women ___ us that they had dieted.', answer: 'told' },
        { prompt: 'He ___ that the survey result was surprising.', answer: 'said' },
        { prompt: 'She ___ that she had lied about her age.', answer: 'admitted' },
        { prompt: 'They ___ that marriage was unnecessary.', answer: 'claimed' },
        { prompt: 'He ___ that the question was difficult to answer.', answer: 'explained' },
      ]} />
      <ChoiceGrid title="Exercise 2: identify the original words" questions={[
        { prompt: 'She admitted that she had dieted.', answer: 'Yes, I have dieted.', options: ['Yes, I have dieted.', 'Yes, I diet.', 'Yes, I will diet.'] },
        { prompt: 'He said that he would wait for half an hour.', answer: 'I will wait for half an hour.', options: ['I waited for half an hour.', 'I will wait for half an hour.', 'I wait for half an hour.'] },
      ]} />
      <GapSelect title="Exercise 3: complete the direct speech" options={['have bought', 'have lied', 'will wait', 'get', 'forgets', "don't mind", 'isn’t']} questions={[
        { prompt: 'a. “I ___ new clothes to attract somebody.”', answer: 'have bought' },
        { prompt: 'b. “I ___ about my age.”', answer: 'have lied' },
        { prompt: 'c. “I ___ for thirty minutes.”', answer: 'will wait' },
        { prompt: 'd1. “I ___ upset if my partner ...”', answer: 'get' },
        { prompt: 'd2. “... ___ my birthday.”', answer: 'forgets' },
        { prompt: 'e. “I ___ if fathers stay at home.”', answer: "don't mind" },
        { prompt: 'f. “Marriage ___ necessary.”', answer: 'isn’t' },
      ]} />
      <ChoiceGrid title="Extra practice: report the statement" questions={[
        { prompt: '“I can call tomorrow,” Maya said.', answer: 'Maya said that she could call the next day.', options: ['Maya said that she could call the next day.', 'Maya told that she can call tomorrow.', 'Maya said me she called tomorrow.'] },
        { prompt: '“We have finished,” they told me.', answer: 'They told me that they had finished.', options: ['They told me that they had finished.', 'They said me that they finished.', 'They told that they have finished.'] },
        { prompt: '“I will not change my opinion,” Ben insisted.', answer: 'Ben insisted that he would not change his opinion.', options: ['Ben insisted that he would not change his opinion.', 'Ben suggested he does not change it.', 'Ben replied that I will not change it.'] },
      ]} />
    </section>
  );
}

function MediaPage() {
  const categoryWords = [
    { prompt: 'acting · photography · special effects · tearjerker', answer: 'Films' },
    { prompt: 'album · lyrics · performing live · techno · track', answer: 'Music' },
    { prompt: "bestseller · can't put it down · chapters · difficult to get into", answer: 'Books' },
    { prompt: 'director · plot · premiere · subtitles', answer: 'Films' },
    { prompt: 'band · blues · gig · hip-hop · reggae', answer: 'Music' },
    { prompt: 'novel · paperback · short story', answer: 'Books' },
  ];
  return (
    <section className="stack">
      <PageTitle eyebrow="Listening & Vocabulary · page 78" title="Books, films and music" />
      <LessonVisual src="./images/opinions/media-habits.jpg" alt="People reading, listening to music and watching a film" caption="Which activity do you do most often?" />
      <OpenPrompts title="Speaking: find out who..." prompts={[
        'is reading a novel at the moment or enjoys biographies and autobiographies.',
        'still listens to the same music as ten years ago or has been to a concert recently.',
        'has a favourite place to read or prefers a film to a book.',
        'has recently seen a film they did not enjoy.',
      ]} />
      <AudioCard title="Audio 2.34" description="Listen to seven conversations. Mark B for books, F for films or M for music." src={audio.track34} />
      <UnscoredSelects title="Exercise 1: listening log" prompts={Array.from({ length: 7 }, (_, index) => `Conversation ${index + 1}`)} options={['B · books', 'F · films', 'M · music']} />
      <GapSelect title="Exercise 2: complete the table headings" options={['Books', 'Films', 'Music']} questions={categoryWords} />
      <TheoryBox title="Words that can cross categories" points={['fantasy, horror and science fiction can describe books or films.', 'musical can be a film, a stage production or an adjective connected with music.', 'soundtrack and a hit connect films and music.']} />
      <AudioCard title="Audio 2.35" description="Listen to soundtrack extracts and decide which film genre each one suggests." src={audio.track35} />
      <UnscoredSelects title="Exercise 3: soundtrack genres" prompts={Array.from({ length: 6 }, (_, index) => `Extract ${index + 1}`)} options={['action', 'comedy', 'gangster', 'horror', 'love story', 'romantic comedy', 'science fiction', 'spy', 'thriller', 'war', 'western']} />
      <OpenPrompts title="Film discussion" prompts={['Name one film for five different genres.', 'Which genres do you like best? Give examples.']} />
    </section>
  );
}

function ReportedQuestions() {
  const article = [
    "In an online interview, Tom Hanks said he was happy to be known as 'Mr Nice Guy' and felt he lived up to that reputation.",
    'He thought the reputation came from always cooperating with the press. He said he had respected photographers even when he did not like them.',
    'Asked why he rarely played villains, he reminded the interviewer that he had played an executioner in The Green Mile.',
    'He wanted to direct again, but said he could not do it then because it would take him away from his children.',
  ];
  return (
    <section className="stack">
      <PageTitle eyebrow="Reading & Grammar · page 79" title="Mr Nice Guy and reported questions" />
      <LessonVisual src="./images/opinions/tom-hanks.jpg" alt="Tom Hanks" caption="Why might Tom Hanks have a 'nice guy' reputation?" />
      <ReadingText title="Mr Nice Guy" paragraphs={article} />
      <TheoryBox title="Reported questions" points={[
        'Keep the question word: “Where did it come from?” → They asked where it had come from.',
        'For yes/no questions use if or whether.',
        'Use statement word order: subject + verb. Do not use do / does / did.',
        'The tense usually moves back when the reporting verb is in the past.',
      ]} />
      <article className="language-hint"><h3>Подсказка ученику</h3><p>Косвенный вопрос больше не имеет порядка слов вопроса: <strong>He asked where I was</strong>, а не <s>where was I</s>. Для вопросов без вопросительного слова добавляем <strong>if / whether</strong>.</p></article>
      <ChoiceGrid title="Exercise 2: reconstruct the interview questions" questions={[
        { prompt: 'They asked him how he felt about his persona.', answer: "How do you feel about your 'nice guy' persona?", options: ["How do you feel about your 'nice guy' persona?", 'How did he feel about his persona?', 'How you feel about your persona?'] },
        { prompt: 'They asked where the reputation had come from.', answer: 'Where has this reputation come from?', options: ['Where has this reputation come from?', 'Where this reputation came from?', 'Where had his reputation come from?'] },
        { prompt: 'They asked whether he had had problems with photographers.', answer: 'Have you ever had problems with the paparazzi?', options: ['Have you ever had problems with the paparazzi?', 'Did you had problems with photographers?', 'Whether have you had problems?'] },
        { prompt: 'They asked why he always played the nice guy.', answer: 'Why do you always play the nice guy and never the villain?', options: ['Why do you always play the nice guy and never the villain?', 'Why you always play the nice guy?', 'Why did he always played nice guys?'] },
        { prompt: 'They asked what his current plans were.', answer: 'What are your current plans?', options: ['What are your current plans?', 'What your plans are?', 'What were his plans?'] },
      ]} />
      <ChoiceGrid title="Exercise 3: true or false?" questions={[
        { prompt: 'The tense usually moves back.', answer: 'True', options: ['True', 'False'] },
        { prompt: 'Whether or if report yes/no questions.', answer: 'True', options: ['True', 'False'] },
        { prompt: 'Reported questions use subject + verb order.', answer: 'True', options: ['True', 'False'] },
      ]} />
      <AudioCard title="Audio 2.36" description="Listen to Alice talking about Forrest Gump. Tick the statements she gives correctly and correct the others." src={audio.track36} />
      <UnscoredSelects title="Exercise 1: tick the correct details" prompts={[
        'a. The title is Forrest Gump.',
        'b. Alice saw it the other night at the cinema.',
        'c. The cast includes Tom Hanks, Robin Wright and Sally Field.',
        "d. She can't remember who directed it.",
        'e. It is based on a true story.',
        'f. It is a thriller.',
        'g. The main story is about the life of Forrest Gump.',
        'h. She especially likes the scenes where he meets famous people.',
        'i. She says the soundtrack is great.',
        'j. It has a happy ending.',
        'k. She would not recommend the film.',
      ]} options={['Correct', 'Incorrect - make a correction']} />
      <LessonVisual src="./images/opinions/forrest-gump.jpg" alt="Forrest Gump sitting on a bench" caption="Use the prompts below to retell Alice's film anecdote." />
      <OpenPrompts title="Speaking: film anecdote" prompts={[
        'Title, when and where you saw it, cast and director.',
        'Source, genre and main storyline.',
        'What you liked, the soundtrack and the ending.',
        'Would you recommend it? Why?',
      ]} />
    </section>
  );
}

function AdjectivesPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Vocabulary & Pronunciation · page 80" title="Adjectives ending in -ed and -ing" />
      <TheoryBox title="How the endings work" points={['-ed describes how somebody feels: I am bored.', '-ing describes the person or thing that causes the feeling: The book is boring.']} />
      <article className="language-hint"><h3>Подсказка ученику</h3><p><strong>-ed</strong> отвечает на вопрос «что я чувствую?», а <strong>-ing</strong> - «какой человек или предмет вызывает это чувство?»</p></article>
      <ChoiceGrid title="Exercise 1: choose the correct adjective" questions={[
        { prompt: '1. The title looked interesting / interested.', answer: 'interesting', options: ['interesting', 'interested'] },
        { prompt: '2. I was disappointed / disappointing by the ending.', answer: 'disappointed', options: ['disappointed', 'disappointing'] },
        { prompt: '3. The central character was interesting / interested.', answer: 'interesting', options: ['interesting', 'interested'] },
        { prompt: '4. I was excited / exciting when I started it.', answer: 'excited', options: ['excited', 'exciting'] },
        { prompt: '5. In the end I felt disappointed / disappointing.', answer: 'disappointed', options: ['disappointed', 'disappointing'] },
        { prompt: '6. The middle section was boring / bored.', answer: 'boring', options: ['boring', 'bored'] },
        { prompt: '7. I was fascinated / fascinating by the setting.', answer: 'fascinated', options: ['fascinated', 'fascinating'] },
        { prompt: '8. It was an inspiring / inspired story.', answer: 'inspiring', options: ['inspiring', 'inspired'] },
        { prompt: '9. The review was interesting / interested.', answer: 'interesting', options: ['interesting', 'interested'] },
      ]} />
      <AudioCard title="Audio 2.37" description="Listen and check the adjective choices." src={audio.track37} />
      <GapSelect title="Exercise 2: complete the adjective pairs" options={['annoyed', 'annoying', 'challenged', 'challenging', 'confused', 'confusing', 'exhausted', 'exhausting', 'relaxed', 'relaxing', 'tired', 'tiring', 'worried', 'worrying']} questions={[
        { prompt: 'A difficult task makes you feel ___.', answer: 'challenged' },
        { prompt: 'A task that tests your ability is ___.', answer: 'challenging' },
        { prompt: 'After a long day, you feel ___.', answer: 'exhausted' },
        { prompt: 'A long, demanding journey is ___.', answer: 'exhausting' },
        { prompt: 'A quiet weekend can be ___.', answer: 'relaxing' },
        { prompt: 'After it, you feel ___.', answer: 'relaxed' },
      ]} />
      <AudioCard title="Audio 2.38" description="Listen, mark the stressed syllable and repeat." src={audio.track38} />
      <GapSelect title="Pronunciation: which syllable is stressed?" options={['1st', '2nd', '3rd']} questions={[
        { prompt: 'annoying', answer: '2nd' }, { prompt: 'challenging', answer: '1st' }, { prompt: 'disappointing', answer: '3rd' },
        { prompt: 'entertaining', answer: '3rd' }, { prompt: 'exciting', answer: '2nd' }, { prompt: 'exhausting', answer: '2nd' },
        { prompt: 'interesting', answer: '1st' }, { prompt: 'overwhelming', answer: '3rd' }, { prompt: 'worrying', answer: '1st' },
      ]} />
      <OpenPrompts title="Speaking" prompts={['How do you feel today? Why?', 'What makes you feel annoyed, challenged, confused, exhausted, relaxed, tired or worried?']} />
    </section>
  );
}

function PridePage() {
  const synopsis = [
    'Pride and Prejudice is a classic romantic novel set in late eighteenth-century England. Mrs Bennet is determined to find wealthy husbands for her five daughters.',
    'Elizabeth, the lively and rebellious second daughter, dislikes the proud Mr Darcy. He first sees her family as socially inferior, but gradually becomes interested in her.',
    'Although Elizabeth and Darcy seem not to like each other, fate repeatedly brings them together. In the end, love overcomes class, family, pride and prejudice.',
  ];
  return (
    <section className="stack">
      <PageTitle eyebrow="Reading, Vocabulary & Writing · page 81" title="Pride and Prejudice" />
      <LessonVisual src="./images/opinions/pride-prejudice.jpg" alt="A synopsis of Pride and Prejudice with Elizabeth Bennet" caption="A classic romantic novel by Jane Austen." />
      <ReadingText title="Synopsis" paragraphs={synopsis} />
      <OpenPrompts title="Exercise 1" prompts={['What kind of book is it?', 'Would you be interested in reading it? Why or why not?']} />
      <ReadingText title="Exercise 2: five readers respond" paragraphs={[
        'Jan loves the novel: the characters are engaging and believable, the storyline is brilliant, and she could hardly put it down. Score: 9/10.',
        'Will did not particularly enjoy it, although he found the writing witty and amusing in places.',
        'Frank does not usually read romantic novels, but admired the picture of eighteenth-century society. He thinks the novels appeal more to women.',
        'Agnes bought the book after enjoying the film. She loved the dialogue but was still relieved when the story ended happily.',
        'Mico calls it the most boring book he has read: he could not relate to the characters and thought the storyline was weak.',
      ]} />
      <OpenPrompts title="Exercise 2: infer the reviewers' scores" prompts={['Jan gives 9/10. What scores from 1-10 would Will, Frank, Agnes and Mico probably give? Explain each score.']} />
      <GapSelect title="Exercise 3: replace the italicised expressions" options={['central', 'engaging', 'gripping', 'is set', 'storyline', 'thought-provoking']} questions={[
        { prompt: 'The story takes place in New York.', answer: 'is set' },
        { prompt: 'One of the main characters is a spy.', answer: 'central' },
        { prompt: 'The characters are believable and appealing.', answer: 'engaging' },
        { prompt: 'The plot is complex and full of twists.', answer: 'storyline' },
        { prompt: 'It was really exciting from start to finish.', answer: 'gripping' },
        { prompt: 'It was stimulating and intriguing.', answer: 'thought-provoking' },
      ]} />
      <OpenPrompts title="Writing: review a book" prompts={[
        'Title, author and type of book.',
        'Where it is set and who the central characters are.',
        'Summarise the plot in the present tense.',
        'Explain what you liked or did not like and give a score.',
      ]} />
    </section>
  );
}

function PhrasesPage() {
  const phraseGroups = [
    { prompt: "Don't you think...?", answer: 'Ask for an opinion' },
    { prompt: 'Do you know what I think?', answer: 'Ask for an opinion' },
    { prompt: 'What do you think of...?', answer: 'Ask for an opinion' },
    { prompt: 'As far as I am concerned...', answer: 'Give an opinion' },
    { prompt: 'If you ask me...', answer: 'Give an opinion' },
    { prompt: "Well, that's true, but...", answer: 'Agree / partly agree' },
    { prompt: 'I agree with...', answer: 'Agree / partly agree' },
    { prompt: "I'm not so sure about that.", answer: 'Disagree' },
    { prompt: "That's rubbish!", answer: 'Disagree' },
    { prompt: 'OK, I take your point, but...', answer: 'Disagree' },
  ];
  return (
    <section className="stack">
      <PageTitle eyebrow="Useful phrases · page 82" title="Giving your opinion" />
      <LessonVisual src="./images/opinions/opinion-discussion.jpg" alt="Three friends having a discussion at a front door" caption="Three friends discuss whether owning a car is worthwhile." />
      <OpenPrompts title="Exercise 1: owning a car" prompts={['List advantages and disadvantages of owning a car.']} />
      <AudioCard title="Audio 2.39" description="Listen to three friends discussing car ownership. Which of your points do they mention?" src={audio.track39} />
      <GapSelect title="Exercise 3: complete the conversation" options={['think', 'but', 'sure', "Don't", 'far', 'me', "That's", 'agree', 'but', 'know', 'that', 'right', 'What']} questions={[
        { prompt: '1. I ___ there are too many cars.', answer: 'think' },
        { prompt: "2. Well, that's true, ___ a car is useful.", answer: 'but' },
        { prompt: "3. I'm not so ___ about that.", answer: 'sure' },
        { prompt: '4. ___ you think bicycles are dangerous?', answer: "Don't" },
        { prompt: '5. As ___ as I am concerned...', answer: 'far' },
        { prompt: '6. If you ask ___, children do not get enough exercise.', answer: 'me' },
        { prompt: "7. ___ rubbish!", answer: "That's" },
        { prompt: '8. I ___ with Jess.', answer: 'agree' },
        { prompt: '9. I take your point, ___ are you not worried about pollution?', answer: 'but' },
        { prompt: '10. Do you ___ what I think?', answer: 'know' },
        { prompt: "11. But ___'s nonsense!", answer: 'that' },
        { prompt: "12. You're ___!", answer: 'right' },
        { prompt: '13. ___ do you think of my new television?', answer: 'What' },
      ]} />
      <GapSelect title="Exercise 4: classify the useful phrases" options={['Ask for an opinion', 'Give an opinion', 'Agree / partly agree', 'Disagree']} questions={phraseGroups} />
      <AudioCard title="Audio 2.40" description="Listen and repeat the phrases. Copy the stress and intonation." src={audio.track40} />
      <OpenPrompts title="Exercise 5: write a short discussion" prompts={['Choose one topic: living abroad, being a woman or a man, public transport, living with parents, or working from home.', 'Write a discussion between three friends. Use at least six phrases from Exercise 4.']} />
    </section>
  );
}

function CollocationsPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Vocabulary Extra · page 83" title="Collocations with opinion, advice and mistake" />
      <TheoryBox title="Collocations" points={['A collocation is a pair or group of words that frequently occur together.', 'Learning give advice or make a decision as one unit makes your English sound more natural.']} />
      <GapSelect title="Exercise 1: give, make or take?" options={['give', 'make', 'take']} questions={[
        { prompt: '___ advice', answer: 'give' }, { prompt: '___ an opinion', answer: 'give' },
        { prompt: '___ a comment', answer: 'make' }, { prompt: '___ a decision', answer: 'make' },
        { prompt: '___ a mistake', answer: 'make' }, { prompt: '___ action', answer: 'take' },
        { prompt: '___ advice from somebody', answer: 'take' },
      ]} />
      <GapSelect title="Exercise 3: opinion and highly" options={['gave their opinions', 'high opinion', 'differences of opinion', 'opinion of', 'highly unlikely', 'spoke very highly']} questions={[
        { prompt: 'The reviewers ___ of the new film.', answer: 'gave their opinions' },
        { prompt: 'I have a very ___ of her work.', answer: 'high opinion' },
        { prompt: 'There were serious ___ in the group.', answer: 'differences of opinion' },
        { prompt: 'What is your ___ the new album?', answer: 'opinion of' },
        { prompt: 'It is ___ that they will agree.', answer: 'highly unlikely' },
        { prompt: 'She ___ of the director.', answer: 'spoke very highly' },
      ]} />
      <GapSelect title="Exercise 4: advice and mistakes" options={['offered', 'accept', 'ignored', 'expensive']} questions={[
        { prompt: 'When did you last ___ advice to someone?', answer: 'offered' },
        { prompt: 'Is it easy for you to ___ advice?', answer: 'accept' },
        { prompt: 'Have you ever ___ good advice?', answer: 'ignored' },
        { prompt: 'Have you ever made an ___ mistake?', answer: 'expensive' },
      ]} />
      <OpenPrompts title="Discuss" prompts={['Answer the questions in Exercise 4 with real examples.', 'Make five new collocations with give, make or take.']} />
    </section>
  );
}

function PageTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="page-title"><p className="kicker">{eyebrow}</p><h2>{title}</h2></div>;
}

function InteractiveCard({ title, children }: { title: string; children: ReactNode }) {
  return <article className="panel"><h3>{title}</h3>{children}</article>;
}

function LessonVisual({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="lesson-visual"><img src={src} alt={alt} /><figcaption>{caption}</figcaption></figure>;
}

function ReadingText({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return <InteractiveCard title={title}><div className="reading-sheet">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></InteractiveCard>;
}

function AudioCard({ title, description, src }: { title: string; description: string; src: string }) {
  return <article className="panel audio-card"><div><h3>{title}</h3><p>{description}</p></div><audio controls preload="none" src={src}>Your browser does not support audio playback.</audio></article>;
}

function TheoryBox({ title, points }: { title: string; points: string[] }) {
  return <article className="theory-box"><h3>{title}</h3><ul>{points.map((point) => <li key={point}>{point}</li>)}</ul></article>;
}

function ChoiceGrid({ title, questions }: { title: string; questions: ChoiceQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [orders] = useState(() => Object.fromEntries(questions.map((question) => [question.prompt, shuffleOptions(question.options)])));
  const correct = questions.filter((question) => answers[question.prompt] === question.answer).length;
  return (
    <InteractiveCard title={title}>
      <div className="choice-grid">{questions.map((question) => <div className="choice-card" key={question.prompt}><p>{question.prompt}</p><div className="choice-options">{orders[question.prompt].map((option) => {
        const chosen = answers[question.prompt] === option;
        return <button className={`choice-button ${chosen ? 'chosen' : ''} ${chosen ? (option === question.answer ? 'correct' : 'wrong') : ''}`} type="button" key={option} onClick={() => setAnswers((current) => ({ ...current, [question.prompt]: option }))}>{option}</button>;
      })}</div></div>)}</div>
      <p className="result">{Object.keys(answers).length ? `${correct}/${questions.length} correct` : 'Choose answers to start checking.'}</p>
    </InteractiveCard>
  );
}

function ScreenShareSelect({ value, options, onChange, ariaLabel }: { value: string; options: string[]; onChange: (value: string) => void; ariaLabel: string }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listId = useId();

  useEffect(() => {
    const close = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  useEffect(() => { if (open) optionRefs.current[activeIndex]?.focus(); }, [activeIndex, open]);

  const openMenu = (index?: number) => {
    const selected = options.indexOf(value);
    setActiveIndex(index ?? (selected >= 0 ? selected : 0));
    setOpen(true);
  };
  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };
  return (
    <span className="screen-select" ref={rootRef}>
      <button aria-controls={listId} aria-expanded={open} aria-haspopup="listbox" aria-label={ariaLabel} className="screen-select-trigger" onClick={() => open ? setOpen(false) : openMenu()} ref={triggerRef} role="combobox" type="button">
        <span className={value ? '' : 'screen-select-placeholder'}>{value || 'Choose'}</span><span className="screen-select-chevron" aria-hidden="true" />
      </button>
      {open && <span className="screen-select-menu" id={listId} role="listbox" aria-label={ariaLabel}>{options.map((option, index) => <button aria-selected={option === value} className={`screen-select-option ${option === value ? 'selected' : ''}`} key={option} onClick={() => choose(option)} onKeyDown={(event) => {
        if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index + 1) % options.length); }
        if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index - 1 + options.length) % options.length); }
        if (event.key === 'Escape') { setOpen(false); triggerRef.current?.focus(); }
      }} ref={(element) => { optionRefs.current[index] = element; }} role="option" type="button">{option}</button>)}</span>}
    </span>
  );
}

function GapSelect({ title, questions, options }: { title: string; questions: GapQuestion[]; options: string[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [orders] = useState(() => Object.fromEntries(questions.map((question) => [question.prompt, shuffleOptions(options)])));
  const correct = questions.filter((question) => answers[question.prompt] === question.answer).length;
  return (
    <InteractiveCard title={title}>
      <div className="question-list">{questions.map((question) => {
        const value = answers[question.prompt] ?? '';
        return <div className={`question-row ${value ? (value === question.answer ? 'correct' : 'wrong') : ''}`} key={question.prompt}><span>{question.prompt}</span><ScreenShareSelect value={value} options={orders[question.prompt]} ariaLabel={`Answer for ${question.prompt}`} onChange={(answer) => setAnswers((current) => ({ ...current, [question.prompt]: answer }))} /></div>;
      })}</div>
      <p className="result">{Object.keys(answers).length ? `${correct}/${questions.length} correct` : 'Choose answers to start checking.'}</p>
    </InteractiveCard>
  );
}

function UnscoredSelects({ title, prompts, options }: { title: string; prompts: string[]; options: string[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [orders] = useState(() => Object.fromEntries(prompts.map((prompt) => [prompt, shuffleOptions(options)])));
  return <InteractiveCard title={title}><div className="question-list">{prompts.map((prompt) => <div className="question-row" key={prompt}><span>{prompt}</span><ScreenShareSelect value={answers[prompt] ?? ''} options={orders[prompt]} ariaLabel={`Choice for ${prompt}`} onChange={(answer) => setAnswers((current) => ({ ...current, [prompt]: answer }))} /></div>)}</div><p className="result">Discuss or check your choices with the audio.</p></InteractiveCard>;
}

function OpenPrompts({ title, prompts }: { title: string; prompts: string[] }) {
  return <InteractiveCard title={title}><div className="open-prompts">{prompts.map((prompt, index) => <label key={prompt}><span>{index + 1}. {prompt}</span><textarea placeholder="Write your answer here." /></label>)}</div></InteractiveCard>;
}

function Vocabulary({ words, onRemoveWord }: { words: SavedWord[]; onRemoveWord: (id: string) => void }) {
  return (
    <section className="stack">
      <PageTitle eyebrow="Notebook" title="My Opinions words" />
      <InteractiveCard title={`Saved vocabulary · ${words.length}`}>
        {words.length === 0 ? <p className="empty-state">Add unfamiliar words at the bottom of any Opinions page. They will appear here.</p> : <div className="saved-words">{words.map((word) => <div className="saved-word" key={word.id}><div><strong>{word.term}</strong><span>{word.note || 'No translation or note yet'}</span></div><small>{word.section}</small><button className="remove-word" type="button" onClick={() => onRemoveWord(word.id)} aria-label={`Remove ${word.term}`} title="Remove word">×</button></div>)}</div>}
      </InteractiveCard>
    </section>
  );
}
