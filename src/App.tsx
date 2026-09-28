import { useEffect, useMemo, useState } from 'react';

type LessonId = 'news' | 'adrenalin' | 'journey' | 'culture';

type ActivityKey =
  | 'overview'
  | 'listening'
  | 'verb-patterns'
  | 'reading'
  | 'passives'
  | 'headlines'
  | 'phrases'
  | 'writing'
  | 'vocabulary';

type SavedWord = {
  id: string;
  term: string;
  note: string;
  section: string;
};

type Lesson = {
  id: LessonId;
  title: string;
  unit: string;
  tone: string;
  sections: { key: ActivityKey; title: string; eyebrow: string }[];
};

const lessons: Lesson[] = [
  {
    id: 'news',
    title: 'News',
    unit: 'Unit 7',
    tone: 'Paparazzi, short news, passive voice and personal updates',
    sections: [
      { key: 'overview', title: 'Lesson map', eyebrow: 'Start' },
      { key: 'listening', title: 'Listening', eyebrow: '2.19' },
      { key: 'verb-patterns', title: 'Verb patterns', eyebrow: 'Grammar' },
      { key: 'reading', title: 'News in brief', eyebrow: 'Reading' },
      { key: 'passives', title: 'Passive voice', eyebrow: 'Grammar' },
      { key: 'headlines', title: 'Headline language', eyebrow: 'Vocabulary' },
      { key: 'phrases', title: 'Useful phrases', eyebrow: 'Speaking' },
      { key: 'writing', title: 'Personal email', eyebrow: 'Writing' },
      { key: 'vocabulary', title: 'My words', eyebrow: 'Notebook' },
    ],
  },
  {
    id: 'adrenalin',
    title: 'Adrenalin',
    unit: 'Coming next',
    tone: 'Risk, sport and survival stories',
    sections: [
      { key: 'overview', title: 'Lesson map', eyebrow: 'Draft' },
      { key: 'reading', title: 'Reading', eyebrow: 'Draft' },
      { key: 'verb-patterns', title: 'Grammar', eyebrow: 'Draft' },
      { key: 'listening', title: 'Listening', eyebrow: 'Draft' },
    ],
  },
  {
    id: 'journey',
    title: 'Journey',
    unit: 'Coming next',
    tone: 'Travel, directions and deduction',
    sections: [
      { key: 'overview', title: 'Lesson map', eyebrow: 'Draft' },
      { key: 'reading', title: 'Reading', eyebrow: 'Draft' },
      { key: 'passives', title: 'Grammar', eyebrow: 'Draft' },
      { key: 'phrases', title: 'Useful phrases', eyebrow: 'Draft' },
    ],
  },
  {
    id: 'culture',
    title: 'Culture',
    unit: 'Library',
    tone: 'Extra practice and teacher materials',
    sections: [
      { key: 'overview', title: 'Lesson map', eyebrow: 'Draft' },
      { key: 'writing', title: 'Writing bank', eyebrow: 'Draft' },
    ],
  },
];

const audio = {
  track219: './audio/track-2-19.mp3',
  track220: './audio/track-2-20.mp3',
  track221: './audio/track-2-21.mp3',
  track223: './audio/track-2-23.mp3',
  track224: './audio/track-2-24.mp3',
  track225: './audio/track-2-25.mp3',
};

const headlineOptions = [
  "DON'T ASK",
  'POLICE THEFT',
  'KIDNAPPED',
  'SLOW LANE',
  'UNFIT TO GUARD',
  'KIND JUDGE',
];

const newsStories = [
  {
    id: 1,
    answer: 'POLICE THEFT',
    text: 'A television set was stolen from a Liverpool police station, while police officers were out fighting crime.',
  },
  {
    id: 2,
    answer: "DON'T ASK",
    text: 'Fugitive James Sanders, who escaped from jail in 1975, was arrested in Texas after ringing the FBI to ask if he was still on its wanted list.',
  },
  {
    id: 3,
    answer: 'SLOW LANE',
    text: 'An 85-year-old man was stopped and escorted off the M4 motorway by the traffic police because he was riding in a wheelchair. The wheelchair was being pushed along the slow lane by his 65-year-old son.',
  },
  {
    id: 4,
    answer: 'KIND JUDGE',
    text: 'Burglar Frank Gort broke down in court and cried when he was sentenced to seven years in jail, claiming it was his unlucky number. An understanding judge took pity and gave him eight years instead.',
  },
  {
    id: 5,
    answer: 'KIDNAPPED',
    text: 'Police cars were involved in a dramatic chase after a notice was spotted in the back window of a car saying, "Help us, we have been kidnapped". It had been put there by four unhappy children.',
  },
  {
    id: 6,
    answer: 'UNFIT TO GUARD',
    text: 'Prison authorities in New Zealand have been embarrassed by the escape of convicted thief Cass Mei, who managed to run faster than guards at the prison hospital.',
  },
];

const verbPatternQuestions = [
  { prompt: 'People ___ seeing photos of celebrities doing ordinary things.', answer: 'enjoy' },
  { prompt: 'Kate Moss ___ us not to take photos of her daughter.', answer: 'asked' },
  { prompt: "We've ___ that we don't want to upset her.", answer: 'explained' },
  { prompt: 'Nicole Kidman always ___ to smile for the camera.', answer: 'agrees' },
  { prompt: "Celebrities ___ us that we're invading their privacy.", answer: 'tell' },
];

const verbPatternTableQuestions = [
  { prompt: 'Verb + -ing: ___ doing something', answer: 'enjoy' },
  { prompt: 'Verb + to-infinitive: ___ to do something', answer: 'agree' },
  { prompt: 'Verb + that-clause: ___ that ...', answer: 'explain' },
  { prompt: 'Verb + person + (not) to-infinitive: ___ somebody to do something', answer: 'ask' },
  { prompt: 'Verb + person + that-clause: ___ somebody that ...', answer: 'tell' },
];

const extraVerbPatternQuestions = [
  {
    prompt: "I don't mind ___ for a few minutes.",
    answer: 'waiting',
    options: ['waiting', 'to wait', 'that I wait'],
  },
  {
    prompt: 'The photographer agreed ___ the picture.',
    answer: 'to delete',
    options: ['deleting', 'to delete', 'that delete'],
  },
  {
    prompt: 'She explained ___ late because of the traffic.',
    answer: 'that she was',
    options: ['that she was', 'her to be', 'being'],
  },
  {
    prompt: 'They warned us ___ the private photos.',
    answer: 'not to publish',
    options: ['not publishing', 'that not publish', 'not to publish'],
  },
  {
    prompt: 'The editor suggested ___ a different headline.',
    answer: 'using',
    options: ['to use', 'using', 'us to use'],
  },
  {
    prompt: 'He promised ___ before the story went online.',
    answer: 'to call',
    options: ['calling', 'that call', 'to call'],
  },
  {
    prompt: 'The actor told the reporters ___ outside.',
    answer: 'to wait',
    options: ['waiting', 'that wait', 'to wait'],
  },
  {
    prompt: 'Many readers enjoy ___ about celebrity news.',
    answer: 'talking',
    options: ['to talk', 'talking', 'that they talk'],
  },
];

const impossibleVerbStatements = [
  {
    id: 'a',
    parts: [
      { before: 'I ', options: ['asked', 'told', 'said'], answer: 'said', after: ' him to stop, but he pushed the camera in my face and continued taking photos.' },
    ],
  },
  {
    id: 'b',
    parts: [
      { before: 'I just ', options: ['try', 'want', 'enjoy'], answer: 'enjoy', after: ' to lead a normal life, but these people are making it impossible.' },
    ],
  },
  {
    id: 'c',
    parts: [
      { before: 'When a celebrity gets aggressive, I ', options: ['tell', 'explain', 'say'], answer: 'tell', after: " that I'm just doing my job." },
    ],
  },
  {
    id: 'd',
    parts: [
      { before: 'I ', options: ['told', 'warned', 'suggested'], answer: 'suggested', after: " him to stop taking photos of my little girl or I'd take him to court." },
    ],
  },
  {
    id: 'e',
    parts: [
      { before: "If they don't enjoy the attention, I ", options: ['think', 'suggest', 'tell'], answer: 'tell', after: ' that they should change jobs.' },
    ],
  },
  {
    id: 'f',
    parts: [
      { before: "They're hypocritical. On the one hand they ", options: ['need', 'agree', "don't mind"], answer: "don't mind", after: ' to have their photos in the press, and on the other hand they ' },
      { before: '', options: ['warn', 'tell', 'explain'], answer: 'explain', after: " us that we're invading their privacy." },
    ],
  },
];

const passiveQuestions = [
  {
    prompt: 'Someone was treating him for asthma.',
    answer: 'He was being treated for asthma.',
    options: ['He treated asthma.', 'He was being treated for asthma.', 'Asthma was treating him.'],
  },
  {
    prompt: 'Someone has kidnapped us.',
    answer: 'We have been kidnapped.',
    options: ['We have been kidnapped.', 'We were kidnapping.', 'We had kidnapped them.'],
  },
  {
    prompt: 'The record company has released the album.',
    answer: 'The album has been released.',
    options: ['The album had released.', 'The album has been released.', 'The record company was released.'],
  },
  {
    prompt: 'The central bank will reduce interest rates.',
    answer: 'Interest rates will be reduced.',
    options: ['Interest rates will be reduced.', 'Interest rates will reduce the bank.', 'The bank is reduced.'],
  },
];

const headlineLanguage = [
  { word: 'hits', answer: 'has severely damaged' },
  { word: 'to wed', answer: 'is going to marry' },
  { word: 'quits', answer: 'has resigned' },
  { word: 'row', answer: 'an argument' },
  { word: 'soar', answer: 'have increased significantly' },
  { word: 'probe', answer: 'an investigation' },
];

const headlineMeanings = [
  'has severely damaged',
  'is going to marry',
  'has resigned',
  'an argument',
  'have increased significantly',
  'an investigation',
  'has excluded',
  'financial',
  'the unemployed',
  'negotiations',
];

const usefulPhraseQuestions = [
  {
    prompt: "I've just passed my driving test!",
    answer: 'Well done!',
    options: ["Oh no. That's terrible!", 'Well done!'],
  },
  {
    prompt: "I've won a holiday to Florida.",
    answer: 'You lucky thing!',
    options: ["I'm sorry to hear that.", 'You lucky thing!'],
  },
  {
    prompt: "I've failed all my exams.",
    answer: "Oh no, that's terrible!",
    options: ['Well done!', "Oh no, that's terrible!"],
  },
  {
    prompt: "My car's broken down again.",
    answer: 'How annoying!',
    options: ['How annoying!', 'Well done!'],
  },
];

function App() {
  const [lessonId, setLessonId] = useState<LessonId>('news');
  const [openLesson, setOpenLesson] = useState<LessonId>('news');
  const [activity, setActivity] = useState<ActivityKey>('overview');
  const [savedWords, setSavedWords] = useState<SavedWord[]>(() => {
    try {
      const stored = window.localStorage.getItem('interactive-english-news-words');
      return stored ? (JSON.parse(stored) as SavedWord[]) : [];
    } catch {
      return [];
    }
  });

  const lesson = useMemo(() => lessons.find((item) => item.id === lessonId) ?? lessons[0], [lessonId]);
  const currentSection = lesson.sections.find((section) => section.key === activity);

  useEffect(() => {
    window.localStorage.setItem('interactive-english-news-words', JSON.stringify(savedWords));
  }, [savedWords]);

  const addWord = (term: string, note: string, section: string) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) return;

    setSavedWords((current) => {
      const existing = current.find((item) => item.term.toLowerCase() === cleanTerm.toLowerCase());
      if (existing) {
        return current.map((item) =>
          item.id === existing.id
            ? { ...item, note: note.trim() || item.note, section }
            : item,
        );
      }

      return [
        ...current,
        {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          term: cleanTerm,
          note: note.trim(),
          section,
        },
      ];
    });
  };

  const chooseLesson = (nextLesson: Lesson, nextActivity = nextLesson.sections[0].key) => {
    setLessonId(nextLesson.id);
    setOpenLesson(nextLesson.id);
    setActivity(nextActivity);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Lesson navigation">
        <div className="brand">
          <span className="brand-mark">IE</span>
          <div>
            <strong>Interactive English</strong>
            <span>Lessons workspace</span>
          </div>
        </div>

        <nav className="lesson-tabs">
          {lessons.map((item) => {
            const isOpen = openLesson === item.id;
            const isActive = lessonId === item.id;
            return (
              <div className="lesson-tab" key={item.id}>
                <button
                  className={`lesson-trigger ${isActive ? 'active' : ''}`}
                  type="button"
                  onClick={() => {
                    if (isOpen) {
                      chooseLesson(item);
                    } else {
                      setOpenLesson(item.id);
                      setLessonId(item.id);
                      setActivity(item.sections[0].key);
                    }
                  }}
                  aria-expanded={isOpen}
                >
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.unit}</small>
                  </span>
                  <span className="chevron">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="accordion-panel">
                    {item.sections.map((section) => (
                      <button
                        key={section.key}
                        className={`section-link ${isActive && activity === section.key ? 'selected' : ''}`}
                        type="button"
                        onClick={() => chooseLesson(item, section.key)}
                      >
                        <span>{section.title}</span>
                        <small>{section.eyebrow}</small>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <main className="lesson-main">
        <header className="topbar">
          <div>
            <p className="kicker">{lesson.unit}</p>
            <h1>{lesson.title}</h1>
            <p>{lesson.tone}</p>
          </div>
          <div className="status-card">
            <span>Mode</span>
            <strong>Teacher-ready</strong>
          </div>
        </header>

        {lesson.id === 'news' ? (
          <>
            <NewsActivity
              activity={activity}
              savedWords={savedWords}
              onRemoveWord={(id) => setSavedWords((current) => current.filter((item) => item.id !== id))}
            />
            {activity !== 'vocabulary' && (
              <WordCollector
                section={currentSection?.title ?? 'News'}
                onAddWord={addWord}
              />
            )}
          </>
        ) : (
          <DraftLesson lesson={lesson} />
        )}
      </main>
    </div>
  );
}

function NewsActivity({
  activity,
  savedWords,
  onRemoveWord,
}: {
  activity: ActivityKey;
  savedWords: SavedWord[];
  onRemoveWord: (id: string) => void;
}) {
  switch (activity) {
    case 'listening':
      return <ListeningPage />;
    case 'verb-patterns':
      return <VerbPatternsPage />;
    case 'reading':
      return <ReadingPage />;
    case 'passives':
      return <PassivesPage />;
    case 'headlines':
      return <HeadlinesPage />;
    case 'phrases':
      return <UsefulPhrasesPage />;
    case 'writing':
      return <WritingPage />;
    case 'vocabulary':
      return <VocabularyPage words={savedWords} onRemoveWord={onRemoveWord} />;
    default:
      return <OverviewPage />;
  }
}

function OverviewPage() {
  return (
    <section className="content-grid">
      <article className="panel intro-panel">
        <p className="kicker">Lesson map</p>
        <h2>News: from paparazzi photos to personal updates</h2>
        <p>
          A complete interactive lesson for intermediate students. It combines listening,
          reading, grammar discovery, controlled practice and a short writing task.
        </p>
      </article>
      <article className="panel lesson-plan">
        <h3>Suggested flow</h3>
        <ol>
          <li>Warm-up discussion and listening 2.19.</li>
          <li>Verb patterns with celebrity-news examples.</li>
          <li>Reading: match six short news stories with headlines.</li>
          <li>Passive voice theory and practice.</li>
          <li>Headline vocabulary and mini broadcast.</li>
          <li>Useful phrases and personal email writing.</li>
        </ol>
      </article>
      <article className="panel">
        <h3>Teacher note</h3>
        <p>
          Grammar pages include compact theory blocks before practice, so students can work
          independently or use the site in class.
        </p>
      </article>
    </section>
  );
}

function ListeningPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Listening · 2.19" title="Paparazzi interview" />
      <AudioCard title="Audio 2.19" description="Listen and decide which views are OK or not OK." src={audio.track219} />
      <InteractiveCard title="Before listening">
        <ul className="discussion-list">
          <li>Who are the most photographed celebrities in your country?</li>
          <li>Which celebrities are in the news at the moment and why?</li>
          <li>How do you think celebrities feel about being photographed by paparazzi?</li>
        </ul>
      </InteractiveCard>
      <ChoiceGrid
        title="Exercise 2: choose Jack's view"
        questions={[
          {
            prompt: "Paparazzi taking photos of celebrities' glamorous lifestyles",
            answer: 'OK',
            options: ['OK', 'not OK'],
          },
          {
            prompt: 'Paparazzi taking unflattering photos of celebrities',
            answer: 'OK',
            options: ['OK', 'not OK'],
          },
          {
            prompt: 'Paparazzi taking photos of celebrities doing ordinary things',
            answer: 'OK',
            options: ['OK', 'not OK'],
          },
          {
            prompt: "Paparazzi taking photos of celebrities' children",
            answer: 'not OK',
            options: ['OK', 'not OK'],
          },
          {
            prompt: 'Paparazzi following celebrities everywhere',
            answer: 'OK',
            options: ['OK', 'not OK'],
          },
          {
            prompt: 'Celebrities refusing to cooperate with the paparazzi',
            answer: 'not OK',
            options: ['OK', 'not OK'],
          },
          {
            prompt: 'Celebrities complaining about the paparazzi',
            answer: 'not OK',
            options: ['OK', 'not OK'],
          },
        ]}
      />
    </section>
  );
}

function VerbPatternsPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Grammar" title="Verb patterns" />
      <TheoryBox
        title="Theory: verbs choose patterns"
        points={[
          'Some verbs are followed by an -ing form: enjoy doing, cannot stand doing, do not mind doing.',
          'Some verbs are followed by to + infinitive: agree to do, promise to do, want to do.',
          'Some verbs introduce a that-clause: explain that, say that, suggest that.',
          'Tell and ask often need a person: tell someone to do something, ask someone to do something.',
        ]}
      />
      <article className="language-hint">
        <h3>Подсказка ученику</h3>
        <dl>
          <div>
            <dt>Инфинитив</dt>
            <dd>Начальная форма глагола, обычно с <strong>to</strong>: <em>to take, to smile</em>. После некоторых глаголов нужен именно этот паттерн: <em>agree to help</em>.</dd>
          </div>
          <div>
            <dt>Герундий</dt>
            <dd>Форма глагола с окончанием <strong>-ing</strong>, которая называет действие: <em>taking, smiling</em>. Например: <em>enjoy taking photos</em>.</dd>
          </div>
          <div>
            <dt>That-clause</dt>
            <dd>Придаточная часть с <strong>that</strong>, после которого есть подлежащее и сказуемое: <em>She explained that she was busy</em>. В разговорной речи <em>that</em> иногда опускается.</dd>
          </div>
        </dl>
      </article>
      <GapSelect
        title="Exercise 1: complete the celebrity-news sentences"
        questions={verbPatternQuestions}
        options={['enjoy', 'asked', 'explained', 'agrees', 'tell']}
        randomizeOptions
      />
      <GapSelect
        title="Exercise 2: complete the verb-pattern table"
        questions={verbPatternTableQuestions}
        options={['enjoy', 'agree', 'explain', 'ask', 'tell']}
        randomizeOptions
      />
      <ImpossibleVerbExercise statements={impossibleVerbStatements} />
      <ChoiceGrid
        title="Extra practice: choose the correct verb form"
        questions={extraVerbPatternQuestions}
        randomizeOptions
      />
    </section>
  );
}

function ReadingPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Reading" title="News in brief" />
      <InteractiveCard title="Match each story with a headline">
        <MatchStories />
      </InteractiveCard>
    </section>
  );
}

function PassivesPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Grammar" title="Passive voice" />
      <div className="audio-row">
        <AudioCard title="Audio 2.20" description="Past participle endings: /t/, /d/ and /id/." src={audio.track220} />
        <AudioCard title="Audio 2.21" description="Listen, check and repeat." src={audio.track221} />
      </div>
      <TheoryBox
        title="Theory: why news often uses the passive"
        points={[
          'Form the passive with be + past participle: is stolen, was arrested, has been released.',
          'Use the passive when the action is more important than the person who did it.',
          'Mention the agent with by only when it is useful: It had been put there by four children.',
          'Match the tense of be to the original sentence: is being treated, has been announced, will be reduced.',
        ]}
      />
      <ChoiceGrid title="Choose the natural passive sentence" questions={passiveQuestions} />
    </section>
  );
}

function HeadlinesPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Vocabulary" title="Headline language" />
      <TheoryBox
        title="Theory: headlines compress grammar"
        points={[
          'Headlines often omit small grammar words: articles, auxiliary verbs and forms of be.',
          'Short verbs carry a lot of meaning: quit = resign, bar = exclude, wed = marry.',
          'Nouns are often packed together: cash probe means an investigation into missing money.',
        ]}
      />
      <GapSelect
        title="Match headline words with meanings"
        questions={headlineLanguage.map((item) => ({ prompt: item.word, answer: item.answer }))}
        options={headlineMeanings}
      />
      <InteractiveCard title="Mini broadcast">
        <div className="prompt-cards">
          <PromptCard headline="FANS BARRED FROM WORLD CUP FINAL" />
          <PromptCard headline="TEACHER QUITS IN EXAM ROW" />
          <PromptCard headline="FAMILIES HIT AS HOUSE PRICES SOAR" />
        </div>
      </InteractiveCard>
    </section>
  );
}

function UsefulPhrasesPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Speaking" title="Useful phrases for personal news" />
      <AudioCard title="Audio 2.23" description="Listen and check the appropriate responses." src={audio.track223} />
      <ChoiceGrid title="Choose the appropriate response" questions={usefulPhraseQuestions} />
      <div className="audio-row">
        <AudioCard title="Audio 2.24" description="Listen, check and repeat." src={audio.track224} />
        <AudioCard title="Audio 2.25" description="Respond appropriately to more pieces of news." src={audio.track225} />
      </div>
      <TheoryBox
        title="Language note"
        points={[
          'Use positive responses for good news: Well done! You lucky thing! Congratulations!',
          'Use sympathy for bad news: I am sorry to hear that. Oh no, that is terrible. How annoying!',
          'Follow the phrase with a short question to keep the conversation moving.',
        ]}
      />
    </section>
  );
}

function WritingPage() {
  const [text, setText] = useState('');
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <section className="stack">
      <PageTitle eyebrow="Writing" title="Reply to personal news" />
      <InteractiveCard title="Use the prompts to write Ian's reply">
        <div className="word-bank">
          {['Actually', 'Anyway', 'Apart from that', 'apparently', 'forward to', 'pleased', 'sorry', 'touch', 'Well done'].map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={`Dear Pia,\n\nIt was great ...\nI'm sorry ...\nI was so pleased ...\nBy the way, Giorgio phoned me. Apparently, ...\nApart from that, I'm looking forward to ...\nAnyway, ...\n\nLots of love,\nIan`}
        />
        <p className={wordCount >= 80 && wordCount <= 120 ? 'result ok' : 'result'}>
          {wordCount} words. Aim for 80-120 words.
        </p>
      </InteractiveCard>
    </section>
  );
}

function VocabularyPage({ words, onRemoveWord }: { words: SavedWord[]; onRemoveWord: (id: string) => void }) {
  return (
    <section className="stack">
      <PageTitle eyebrow="Notebook" title="My words" />
      <InteractiveCard title={`Saved vocabulary · ${words.length}`}>
        {words.length === 0 ? (
          <p className="empty-state">Add unfamiliar words in the field at the bottom of any lesson page. They will appear here.</p>
        ) : (
          <div className="saved-words">
            {words.map((word) => (
              <div className="saved-word" key={word.id}>
                <div>
                  <strong>{word.term}</strong>
                  <span>{word.note || 'No translation or note yet'}</span>
                </div>
                <small>{word.section}</small>
                <button
                  className="remove-word"
                  type="button"
                  onClick={() => onRemoveWord(word.id)}
                  aria-label={`Remove ${word.term}`}
                  title="Remove word"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </InteractiveCard>
    </section>
  );
}

function WordCollector({ section, onAddWord }: { section: string; onAddWord: (term: string, note: string, section: string) => void }) {
  const [term, setTerm] = useState('');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const submitWord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!term.trim()) return;
    onAddWord(term, note, section);
    setTerm('');
    setNote('');
    setSaved(true);
  };

  return (
    <aside className="word-collector" aria-label="Add a word to My words">
      <div>
        <p className="kicker">My words</p>
        <h3>Добавить новое слово</h3>
      </div>
      <form onSubmit={submitWord}>
        <label>
          <span>Слово или выражение</span>
          <input
            value={term}
            onChange={(event) => {
              setTerm(event.target.value);
              setSaved(false);
            }}
            placeholder="e.g. unflattering"
          />
        </label>
        <label>
          <span>Перевод или заметка</span>
          <input
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="нелестный, невыгодный"
          />
        </label>
        <button type="submit">Add word</button>
      </form>
      {saved && <p className="save-confirmation">Saved in My words.</p>}
    </aside>
  );
}

function DraftLesson({ lesson }: { lesson: Lesson }) {
  return (
    <section className="content-grid">
      <article className="panel intro-panel">
        <p className="kicker">{lesson.unit}</p>
        <h2>{lesson.title}</h2>
        <p>{lesson.tone}</p>
      </article>
      <article className="panel">
        <h3>Lesson shell</h3>
        <p>
          This section is ready for the same structure: reading, grammar theory,
          listening, vocabulary and writing. Add source pages and audio to expand it.
        </p>
      </article>
    </section>
  );
}

function PageTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="page-title">
      <p className="kicker">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function AudioCard({ title, description, src }: { title: string; description: string; src: string }) {
  return (
    <article className="panel audio-card">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <audio controls preload="none" src={src}>
        Your browser does not support audio playback.
      </audio>
    </article>
  );
}

function TheoryBox({ title, points }: { title: string; points: string[] }) {
  return (
    <article className="theory-box">
      <h3>{title}</h3>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}

function InteractiveCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="panel">
      <h3>{title}</h3>
      {children}
    </article>
  );
}

function shuffleOptions(options: string[]) {
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function GapSelect({
  title,
  questions,
  options,
  randomizeOptions = false,
}: {
  title: string;
  questions: { prompt: string; answer: string }[];
  options: string[];
  randomizeOptions?: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [optionOrders] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(
      questions.map((question) => [
        question.prompt,
        randomizeOptions ? shuffleOptions(options) : options,
      ]),
    ),
  );
  const correct = questions.filter((question) => answers[question.prompt] === question.answer).length;
  const checked = Object.keys(answers).length > 0;

  return (
    <InteractiveCard title={title}>
      <div className="question-list">
        {questions.map((question) => {
          const value = answers[question.prompt] ?? '';
          const isAnswered = value !== '';
          const isCorrect = value === question.answer;
          return (
            <label className={`question-row ${isAnswered ? (isCorrect ? 'correct' : 'wrong') : ''}`} key={question.prompt}>
              <span>{question.prompt}</span>
              <select value={value} onChange={(event) => setAnswers({ ...answers, [question.prompt]: event.target.value })}>
                <option value="">Choose</option>
                {(optionOrders[question.prompt] ?? options).map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>
      <p className="result">{checked ? `${correct}/${questions.length} correct` : 'Choose answers to start checking.'}</p>
    </InteractiveCard>
  );
}

function ChoiceGrid({
  title,
  questions,
  randomizeOptions = false,
}: {
  title: string;
  questions: { prompt: string; answer: string; options: string[] }[];
  randomizeOptions?: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [optionOrders] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(
      questions.map((question) => [
        question.prompt,
        randomizeOptions ? shuffleOptions(question.options) : question.options,
      ]),
    ),
  );
  const correct = questions.filter((question) => answers[question.prompt] === question.answer).length;
  const checked = Object.keys(answers).length > 0;

  return (
    <InteractiveCard title={title}>
      <div className="choice-grid">
        {questions.map((question) => (
          <div className="choice-card" key={question.prompt}>
            <p>{question.prompt}</p>
            <div className="choice-options">
              {(optionOrders[question.prompt] ?? question.options).map((option) => {
                const chosen = answers[question.prompt] === option;
                const answered = Boolean(answers[question.prompt]);
                const isCorrect = option === question.answer;
                return (
                  <button
                    className={`choice-button ${chosen ? 'chosen' : ''} ${answered && chosen ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                    type="button"
                    key={option}
                    onClick={() => setAnswers({ ...answers, [question.prompt]: option })}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="result">{checked ? `${correct}/${questions.length} correct` : 'Choose answers to start checking.'}</p>
    </InteractiveCard>
  );
}

function ImpossibleVerbExercise({ statements }: { statements: typeof impossibleVerbStatements }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const groups = statements.flatMap((statement) =>
    statement.parts.map((part, partIndex) => ({ ...part, key: `${statement.id}-${partIndex}` })),
  );
  const correct = groups.filter((group) => answers[group.key] === group.answer).length;

  return (
    <InteractiveCard title="Exercise 3: cross out the verb that is not possible">
      <p className="exercise-instruction">In each group, two verbs are possible. Select the one that does not fit the sentence.</p>
      <div className="impossible-list">
        {statements.map((statement) => (
          <div className="impossible-statement" key={statement.id}>
            <span className="statement-letter">{statement.id}</span>
            <p>
              {statement.parts.map((part, partIndex) => {
                const groupKey = `${statement.id}-${partIndex}`;
                const selected = answers[groupKey];
                return (
                  <span key={groupKey}>
                    {part.before}
                    <span className="inline-choices">
                      {part.options.map((option) => (
                        <button
                          className={`crossout-choice ${selected === option ? 'crossed' : ''} ${selected === option ? (option === part.answer ? 'correct' : 'wrong') : ''}`}
                          type="button"
                          key={option}
                          onClick={() => setAnswers((current) => ({ ...current, [groupKey]: option }))}
                        >
                          {option}
                        </button>
                      ))}
                    </span>
                    {part.after}
                  </span>
                );
              })}
            </p>
          </div>
        ))}
      </div>
      <p className="result">
        {Object.keys(answers).length > 0
          ? `${correct}/${groups.length} correct choices`
          : 'Select the impossible verb in each group.'}
      </p>
    </InteractiveCard>
  );
}

function MatchStories() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const correct = newsStories.filter((story) => answers[story.id] === story.answer).length;

  return (
    <>
      <div className="story-list">
        {newsStories.map((story) => {
          const value = answers[story.id] ?? '';
          const isAnswered = value !== '';
          const isCorrect = value === story.answer;
          return (
            <label className={`story-row ${isAnswered ? (isCorrect ? 'correct' : 'wrong') : ''}`} key={story.id}>
              <span className="story-number">{story.id}</span>
              <span>{story.text}</span>
              <select value={value} onChange={(event) => setAnswers({ ...answers, [story.id]: event.target.value })}>
                <option value="">Choose headline</option>
                {headlineOptions.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>
      <p className="result">{Object.keys(answers).length ? `${correct}/${newsStories.length} correct` : 'Read the stories and choose headlines.'}</p>
    </>
  );
}

function PromptCard({ headline }: { headline: string }) {
  return (
    <div className="prompt-card">
      <strong>{headline}</strong>
      <textarea placeholder="Write 2-3 lines for a radio news item." />
    </div>
  );
}

export default App;
