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
type MatrixRow = { label: string; answers: boolean[] };

function shuffleOptions(options: string[]) {
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function ElementaryActivity({
  activity,
  savedWords,
  onRemoveWord,
}: {
  activity: string;
  savedWords: SavedWord[];
  onRemoveWord: (id: string) => void;
}) {
  switch (activity) {
    case 'elementary-greetings': return <GreetingsPage />;
    case 'elementary-foundations': return <FoundationsPage />;
    case 'elementary-world': return <WorldPage />;
    case 'elementary-questions': return <QuestionsPage />;
    case 'elementary-classroom': return <ClassroomPage />;
    case 'elementary-personal': return <PersonalPage />;
    case 'elementary-hotel': return <HotelPage />;
    case 'elementary-hotel-episode': return <HotelEpisodePage />;
    case 'elementary-things': return <ThingsPage />;
    case 'elementary-demonstratives': return <DemonstrativesPage />;
    case 'elementary-adjectives': return <AdjectivesPage />;
    case 'elementary-feelings': return <FeelingsPage />;
    case 'elementary-imperatives': return <ImperativesPage />;
    case 'elementary-review': return <ReviewPage />;
    case 'elementary-review-reading': return <ReviewReadingPage />;
    case 'elementary-britain-grammar': return <BritainGrammarPage />;
    case 'elementary-britain-reading': return <BritainReadingPage />;
    case 'elementary-work-play': return <WorkPlayPage />;
    case 'elementary-uniforms': return <UniformsPage />;
    case 'vocabulary': return <Vocabulary words={savedWords} onRemoveWord={onRemoveWord} />;
    default: return <Overview />;
  }
}

function Overview() {
  return (
    <section className="content-grid">
      <article className="panel intro-panel">
        <p className="kicker">English File Elementary · PDF pages 5-24</p>
        <h2>Start speaking from the first lesson</h2>
        <p>Introductions, verb be, countries, practical English, everyday things, adjectives, feelings, instructions and review.</p>
      </article>
      <article className="panel lesson-plan">
        <h3>Lesson sequence</h3>
        <ol>
          <li>Meet people and exchange names and phone numbers.</li>
          <li>Build affirmative, negative and question forms of verb be.</li>
          <li>Practise countries, nationalities, days and numbers 0-100.</li>
          <li>Use classroom language and spell words with the alphabet.</li>
          <li>Ask for personal information and complete a form.</li>
          <li>Check into a hotel using practical English.</li>
          <li>Offer a drink and use social phrases on the phone.</li>
          <li>Name everyday things and form regular plurals.</li>
          <li>Use this, that, these and those.</li>
          <li>Describe things with colours and adjectives.</li>
          <li>Describe feelings and follow a family road-trip story.</li>
          <li>Use positive and negative imperatives and make suggestions with let’s.</li>
          <li>Review the grammar, vocabulary and pronunciation from Units 1-2.</li>
          <li>Compare British and American English.</li>
          <li>Use present simple affirmative and negative forms.</li>
          <li>Ask present simple questions and talk about jobs.</li>
          <li>Read and discuss opinions about uniforms.</li>
        </ol>
      </article>
      <article className="panel">
        <h3>Audio note</h3>
        <p>All recordings used on PDF pages 5-24 are included beside their exercises. Combined activities have a separate player for every original track number.</p>
      </article>
    </section>
  );
}

function GreetingsPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="1A · PDF page 5" title="My name's Hannah, not Anna" />
      <TrackTask tracks={['1.2']} title="Listening: four first meetings">Number the four situations while you listen: outside a club, at home, at a party and at a front door.</TrackTask>
      <OpenPrompts title="Exercise 1a: listening order" prompts={['Scene A', 'Scene B', 'Scene C', 'Scene D']} compact />
      <GapSelect title="Exercise 1b: complete the conversations" options={[
        'name', 'Sorry', 'number', 'Thanks', 'Hi', 'Hello', 'meet', 'My', 'Mum', 'you', 'thank', 'Fine',
      ]} questions={[
        { prompt: "1. Hi, I'm Mike. What's your ___?", answer: 'name' },
        { prompt: '2. ___? - Hannah!', answer: 'Sorry' },
        { prompt: "3. What's your phone ___?", answer: 'number' },
        { prompt: '4. ___. See you on Saturday.', answer: 'Thanks' },
        { prompt: '5. ___, Mum. This is Hannah.', answer: 'Hi' },
        { prompt: '6. ___. Nice to meet you.', answer: 'Hello' },
        { prompt: '7. Nice to ___ you, Anna.', answer: 'meet' },
        { prompt: "8. ___ name's Hannah.", answer: 'My' },
        { prompt: "9. Hi, ___. You're early!", answer: 'Mum' },
        { prompt: '10. How are ___?', answer: 'you' },
        { prompt: '11. I’m very well, ___ you, Anna.', answer: 'thank' },
        { prompt: '12. ___, thanks.', answer: 'Fine' },
      ]} />
      <MatchPairs title="Exercise 1c: match phrases with the same meaning" pairs={[
        ['Hello', 'Hi'], ["My name's", "I'm"], ['Very well', 'Fine'], ['Thank you', 'Thanks'], ['Goodbye', 'Bye'],
      ]} />
      <TrackTask tracks={['1.3', '1.4']} title="Pronunciation and speaking">Listen, repeat and copy the rhythm. Then practise the four dialogues in groups of three.</TrackTask>
      <OpenPrompts title="Exercise 1f: introduce yourself" prompts={["Hello, I'm ... What's your name?", 'Nice to meet you.']} />
    </section>
  );
}

function FoundationsPage() {
  const categories = ['food', 'technology', 'sports', 'places'];
  return (
    <section className="stack">
      <PageTitle eyebrow="1A · PDF page 6" title="Grammar, sounds, days and numbers" />
      <TheoryBox title="Verb be: affirmative" points={[
        'I am Mike. → I’m Mike.', 'My name is Hannah. → My name’s Hannah.', 'You are early. → You’re early.', 'It is 7894 132 456. → It’s 7894 132 456.',
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p><strong>am</strong> используется только с I, <strong>is</strong> - с he, she, it, а <strong>are</strong> - с you, we, they. В разговорной речи обычно используются сокращения I’m, you’re, he’s.</p></article>
      <GapSelect title="Grammar 2a: complete with am, is or are" options={['am', 'is', 'are']} questions={[
        { prompt: 'I ___ Mike.', answer: 'am' }, { prompt: 'My name ___ Hannah.', answer: 'is' }, { prompt: 'You ___ early.', answer: 'are' }, { prompt: 'It ___ 7894 132 456.', answer: 'is' },
      ]} />
      <TrackTask tracks={['1.6', '1.7']} title="Pronouns and contractions">Repeat the pronouns and contractions, then say the contracted form you hear.</TrackTask>
      <OpenPrompts title="Speaking 2e-f" prompts={['Write three classmates’ names using He’s / She’s.', 'Write a short greeting dialogue: Hi ... How are you?']} />
      <TheoryBox title="Pronunciation: vowel sounds" points={[
        'fish /ɪ/: it, this', 'tree /iː/: he, we, meet', 'cat /æ/: am, thanks', 'egg /e/: very, well', 'train /eɪ/: they, name', 'bike /aɪ/: I, Hi, Bye',
      ]} />
      <TrackTask tracks={['1.8', '1.9']} title="Vowel sounds and word stress">Listen and repeat the sounds, then underline the stressed syllable in each word.</TrackTask>
      <ChoiceGrid title="Exercise 3c: mark the stressed syllable" questions={[
        stress('airport', 'first'), stress('computer', 'second'), stress('email', 'first'), stress('karate', 'second'), stress('hotel', 'second'), stress('museum', 'second'), stress('salad', 'first'), stress('tennis', 'first'), stress('pasta', 'first'), stress('internet', 'first'), stress('basketball', 'first'), stress('sandwich', 'first'),
      ]} />
      <GapSelect title="Exercise 3d: put the words into categories" options={categories} questions={[
        { prompt: 'pasta', answer: 'food' }, { prompt: 'salad', answer: 'food' }, { prompt: 'sandwich', answer: 'food' },
        { prompt: 'computer', answer: 'technology' }, { prompt: 'email', answer: 'technology' }, { prompt: 'internet', answer: 'technology' },
        { prompt: 'karate', answer: 'sports' }, { prompt: 'tennis', answer: 'sports' }, { prompt: 'basketball', answer: 'sports' },
        { prompt: 'airport', answer: 'places' }, { prompt: 'hotel', answer: 'places' }, { prompt: 'museum', answer: 'places' },
      ]} />
      <InteractiveCard title="Vocabulary 4: numbers 0-20"><NumberBoard start={0} end={20} /></InteractiveCard>
      <OpenPrompts title="Vocabulary 4: practise days and numbers" prompts={['What day is it today? And tomorrow?', "What's your phone number?"]} compact />
      <TrackTask tracks={['1.12', '1.13', '1.14']} title="Listening and responding">Say the next day or number, complete the six location notes, and respond to the greetings.</TrackTask>
      <OpenPrompts title="Listening 5: notes" prompts={['Airport: gate number', 'Sandwich bar: euros and cents', 'Hotel: room number', 'Museum: closed on', 'Taxi: number and street', 'School: class days']} compact />
    </section>
  );
}

function WorldPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="1B · PDF page 7" title="All over the world" />
      <OpenPrompts title="Vocabulary 1a" prompts={['Name three countries in English. Add their nationalities.']} />
      <ChoiceGrid title="The World Quiz 1: capital cities" questions={[
        world('Canberra', 'Australia', ['Australia', 'Austria', 'Canada']), world('Prague', 'the Czech Republic', ['Poland', 'the Czech Republic', 'Hungary']), world('Warsaw', 'Poland', ['Poland', 'Russia', 'Turkey']), world('Ankara', 'Turkey', ['Turkey', 'Greece', 'Egypt']), world('Edinburgh', 'Scotland', ['Ireland', 'Scotland', 'England']),
      ]} />
      <ChoiceGrid title="The World Quiz 2: currencies" questions={[
        world('the dollar', 'the USA', ['the USA', 'China', 'Japan']), world('the yuan', 'China', ['China', 'Russia', 'the UK']), world('the rouble', 'Russia', ['Japan', 'Russia', 'Brazil']), world('the pound', 'the UK', ['the UK', 'the USA', 'Switzerland']), world('the yen', 'Japan', ['China', 'Japan', 'Argentina']),
      ]} />
      <ChoiceGrid title="The World Quiz 3: food" questions={[
        world('tapas', 'Spain', ['Spain', 'Italy', 'Mexico']), world('goulash', 'Hungary', ['Hungary', 'France', 'Poland']), world('pasta', 'Italy', ['Italy', 'Spain', 'Brazil']), world('tacos', 'Mexico', ['Mexico', 'Argentina', 'Portugal']),
      ]} />
      <ChoiceGrid title="The World Quiz 4: nationalities" questions={[
        world('Japan', 'Japanese', ['Japan', 'Japanese', 'Japanish']), world('Argentina', 'Argentinian', ['Argentina', 'Argentinian', 'Argentine']), world('Switzerland', 'Swiss', ['Switzerland', 'Swedish', 'Swiss']), world('Brazil', 'Brazilian', ['Brazil', 'Brazilish', 'Brazilian']),
      ]} />
      <TrackTask tracks={['1.17', '1.18', '1.19']} title="Nationalities, anthems and languages">Say the nationality, identify four national anthems, and mark the language you hear: Turkish, Russian, Chinese or Irish.</TrackTask>
      <TheoryBox title="Pronunciation" points={[
        'The /ə/ sound is the most common vowel sound in English: American, Saturday, Britain.', '/tʃ/: chess, Czech, French.', '/ʃ/: shower, Polish, Russian.', '/dʒ/: jazz, German, Japanese.',
      ]} />
      <TrackTask tracks={['1.20', '1.21']} title="Country and nationality sounds">Listen and repeat the words, sound pictures and example sentences.</TrackTask>
      <ChoiceGrid title="Exercise 2: choose the sound" questions={[
        sound('computer', '/ə/'), sound('American', '/ə/'), sound('Argentinian', '/ə/'), sound('chess', '/tʃ/'), sound('Czech', '/tʃ/'), sound('French', '/tʃ/'), sound('shower', '/ʃ/'), sound('Polish', '/ʃ/'), sound('Russian', '/ʃ/'), sound('jazz', '/dʒ/'), sound('German', '/dʒ/'), sound('Japanese', '/dʒ/'),
      ]} />
    </section>
  );
}

function QuestionsPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="1B · PDF page 8" title="Verb be questions, negatives and numbers 21-100" />
      <TheoryBox title="Verb be: questions and negatives" points={[
        'Question: Are you English? Is it near Sydney?', 'Negative: I’m not English. It isn’t near Sydney. We aren’t on holiday.', 'Short answers: Yes, I am. / No, I’m not. Yes, it is. / No, it isn’t.',
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p>В вопросе глагол <strong>be</strong> ставится перед подлежащим: <strong>Are you...?</strong> В отрицании добавляется <strong>not</strong>: I’m not, isn’t, aren’t.</p></article>
      <GapSelect title="Grammar 3b: complete the interviews" options={["I'm", "I'm not", 'are', "aren't", 'is', "isn't"]} questions={[
        { prompt: '1. Are you English? - No, ___ English.', answer: "I'm not" },
        { prompt: '2. ___ Scottish.', answer: "I'm" },
        { prompt: '3. Where ___ you from in Scotland?', answer: 'are' },
        { prompt: '4. ___ from Glasgow.', answer: "I'm" },
        { prompt: '5. Where ___ you from?', answer: 'are' },
        { prompt: '6. ___ from Australia, from Darwin.', answer: "I'm" },
        { prompt: '7. ___ it near Sydney?', answer: 'is' },
        { prompt: "8. No, it ___. It's in the north.", answer: "isn't" },
        { prompt: '9. ___ it nice?', answer: 'is' },
        { prompt: "10. Yes, it ___. It's beautiful.", answer: 'is' },
        { prompt: '11. Where ___ you from?', answer: 'are' },
        { prompt: '12. ___ you on holiday?', answer: 'are' },
        { prompt: "13. No, we ___. We're students.", answer: "aren't" },
      ]} />
      <TrackTask tracks={['1.22', '1.24', '1.25']} title="Interviews and sentence stress">Listen to three interviews, check the gaps, respond with short answers, and copy the sentence rhythm.</TrackTask>
      <OpenPrompts title="Speaking" prompts={['Write three questions beginning Is...?', 'Write three questions beginning Are...?', 'Where are you from?']} />
      <InteractiveCard title="Vocabulary 5: numbers 21-100"><NumberBoard start={21} end={100} step={10} /></InteractiveCard>
      <TrackTask tracks={['1.27']} title="Numbers 21-100">Listen and write the numbers you hear.</TrackTask>
      <ChoiceGrid title="Read the road signs" questions={[
        numberQuestion('Brighton', 71), numberQuestion('Oxford', 43), numberQuestion('Bath', 95), numberQuestion('Cambridge', 30), numberQuestion('London', 23),
      ]} />
      <TrackTask tracks={['1.28', '1.29']} title="Listening 6: distinguish -teen and -ty">Repeat 13/30, 14/40, 15/50, 16/60, 17/70, 18/80 and 19/90. Then circle the number you hear.</TrackTask>
      <OpenPrompts title="Listening 6: your answers" prompts={['13 or 30', '14 or 40', '15 or 50', '16 or 60', '17 or 70', '18 or 80', '19 or 90']} compact />
      <TrackTask tracks={['1.30']} title="Song: All Over the World">Listen and write three countries or nationalities you hear.</TrackTask>
    </section>
  );
}

function ClassroomPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="1C · PDF page 9" title="Open your books, please" />
      <GapSelect title="Vocabulary 1a: match classroom words to numbers" options={['1', '2', '3', '4', '5', '6', '7', '8', '9']} questions={[
        { prompt: 'door', answer: '1' }, { prompt: 'window', answer: '2' }, { prompt: 'picture', answer: '3' }, { prompt: 'board', answer: '4' }, { prompt: 'wall', answer: '5' }, { prompt: 'chair', answer: '6' }, { prompt: 'computer', answer: '7' }, { prompt: 'table', answer: '8' }, { prompt: 'desk', answer: '9' },
      ]} />
      <TrackTask tracks={['1.31', '1.34']} title="Classroom language">Check the classroom objects, then listen and follow the teacher’s instructions.</TrackTask>
      <TheoryBox title="Alphabet sounds" points={[
        '/eɪ/ train: A, H, J, K', '/iː/ tree: B, C, D, E, G, P, T, V', '/e/ egg: F, L, M, N, S, X, Z', '/aɪ/ bike: I, Y', '/əʊ/ phone: O', '/uː/ boot: Q, U, W', '/ɑː/ car: R',
      ]} />
      <GapSelect title="Exercise 2c: put the letters into sound groups" options={['train', 'tree', 'egg', 'bike', 'phone', 'boot', 'car']} questions={[
        ...'AHJK'.split('').map((letter) => ({ prompt: letter, answer: 'train' })),
        ...'BCDEGPTV'.split('').map((letter) => ({ prompt: letter, answer: 'tree' })),
        ...'FLMNSXZ'.split('').map((letter) => ({ prompt: letter, answer: 'egg' })),
        ...'IY'.split('').map((letter) => ({ prompt: letter, answer: 'bike' })),
        { prompt: 'O', answer: 'phone' }, ...'QUW'.split('').map((letter) => ({ prompt: letter, answer: 'boot' })), { prompt: 'R', answer: 'car' },
      ]} />
      <TrackTask tracks={['1.35', '1.36', '1.37', '1.38']} title="Alphabet practice">Repeat the sounds, say the abbreviations, complete the alphabet chart and circle the letter you hear.</TrackTask>
      <MatchPairs title="Common abbreviations" pairs={[
        ['PC', 'Personal Computer'], ['UK', 'United Kingdom'], ['EU', 'European Union'], ['DJ', 'Disc Jockey'], ['VIP', 'Very Important Person'], ['USA', 'United States of America'], ['PDF', 'Portable Document Format'], ['NBA', 'National Basketball Association'],
      ]} />
    </section>
  );
}

function PersonalPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="1C · PDF page 10" title="Personal information" />
      <TrackTask tracks={['1.39']} title="Listening: a student registration">Listen to the interview and complete the student’s form.</TrackTask>
      <PersonalForm title="Exercise 3a: student form" />
      <GapSelect title="Exercise 3b: complete the receptionist's questions" options={['first', "What's", 'How', 'from', 'email', 'phone number']} questions={[
        { prompt: "1. What's your ___ name?", answer: 'first' }, { prompt: '2. ___ your surname?', answer: "What's" }, { prompt: '3. ___ do you spell it?', answer: 'How' }, { prompt: '4. Where are you ___?', answer: 'from' }, { prompt: '5. ___ old are you?', answer: 'How' }, { prompt: '6. ___ your address?', answer: "What's" }, { prompt: '7. ___ your postcode?', answer: "What's" }, { prompt: "8. What's your ___ address?", answer: 'email' }, { prompt: "9. What's your ___?", answer: 'phone number' },
      ]} />
      <TrackTask tracks={['1.40']} title="Questions and rhythm">Listen again, check the questions and repeat them with the same rhythm.</TrackTask>
      <OpenPrompts title="Exercise 3d: interview a partner" prompts={['First name and surname', 'Country and city', 'Age', 'Address and postcode', 'Email address', 'Phone number']} compact />
      <TheoryBox title="Possessive adjectives" points={[
        'I → my: I’m Richard. My name’s Richard.', 'you → your: Where are you from? What’s your name?', 'he → his; she → her; it → its; we → our; they → their.',
      ]} />
      <TrackTask tracks={['1.42']} title="Possessive adjectives">Listen and change each sentence, for example I’m Richard → My name’s Richard.</TrackTask>
      <ChoiceGrid title="Grammar 4a: choose the correct word" questions={[
        { prompt: 'Where are ___ from?', answer: 'you', options: ['I', 'you', 'my', 'your'] }, { prompt: '___ am from Rio.', answer: 'I', options: ['I', 'you', 'my', 'your'] }, { prompt: "What's ___ name?", answer: 'your', options: ['I', 'you', 'my', 'your'] }, { prompt: "___ name's Darly.", answer: 'My', options: ['I', 'You', 'My', 'Your'] },
      ]} />
      <OpenPrompts title="Speaking and writing" prompts={['Choose an actor or singer. Is their professional name their real name?', 'Complete the form with your own details, then write a short paragraph about yourself.']} />
    </section>
  );
}

function HotelPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Practical English · PDF page 11" title="Arriving in London" />
      <GapSelect title="Vocabulary 1: match hotel words and symbols" options={['1', '2', '3', '4', '5', '6']} questions={[
        { prompt: 'a single room', answer: '1' }, { prompt: 'the ground floor', answer: '2' }, { prompt: 'reception', answer: '3' }, { prompt: 'the bar', answer: '4' }, { prompt: 'a double room', answer: '5' }, { prompt: 'the lift', answer: '6' },
      ]} />
      <TrackTask tracks={['1.43']} title="Hotel vocabulary">Listen and check the six hotel words.</TrackTask>
      <TrackTask tracks={['1.44']} title="Introduction: Jenny and Rob">Watch or listen, mark the statements true or false, and explain the false statements.</TrackTask>
      <ChoiceGrid title="Introduction: true or false?" questions={[
        tf('Rob lives and works in London.', true), tf("He's a writer for a magazine.", true), tf('The name of his magazine is London 20seven.', true), tf('Jenny is British.', false), tf("She's an assistant editor.", true), tf("It's her second time in the UK.", false),
      ]} />
      <TrackTask tracks={['1.45']} title="Checking in">Watch or listen to Jenny checking into a hotel. Complete her surname and note her room number.</TrackTask>
      <ChoiceGrid title="Exercise 3a: key details" questions={[
        { prompt: "Jenny's surname", answer: 'Zielinski', options: ['Zielinski', 'Zelinski', 'Zielenska'] }, { prompt: 'Room number', answer: '306', options: ['306', '360', '316'] },
      ]} />
      <GapSelect title="Exercise 3b: complete the You Hear phrases" options={['spell', 'please', 'key', 'lift']} questions={[
        { prompt: 'Can you ___ that, please?', answer: 'spell' }, { prompt: 'Can you sign here, ___? Thank you.', answer: 'please' }, { prompt: "Here's your ___. It's room 306.", answer: 'key' }, { prompt: 'The ___ is over there.', answer: 'lift' },
      ]} />
      <TheoryBox title="British and American English" points={[
        'British English: lift; American English: elevator.', 'British z /zed/; American z /ziː/.', 'Good morning: before 12.00. Good afternoon: 12.00-18.00. Good evening: after 18.00.', 'Madam and Sir are polite forms of address.',
      ]} />
      <TrackTask tracks={['1.46']} title="You Say phrases">Listen and repeat the guest’s phrases. Copy the rhythm.</TrackTask>
      <OpenPrompts title="Role-play: check into a hotel" prompts={['Write the receptionist’s first question.', 'Say that you have a reservation and spell your surname.', 'Ask for the room number and the lift.']} />
    </section>
  );
}

function HotelEpisodePage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Practical English · PDF page 12" title="Jenny talks to Rob" />
      <TheoryBox title="Asking politely with Can" points={[
        'Can you sign here? = Please do it.',
        'Can you spell that? = Please spell it.',
        'Can I have my key, please? = Please give it to me.',
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p><strong>Can you...?</strong> просит человека что-то сделать. <strong>Can I have...?</strong> вежливо просит дать вам предмет. Добавляйте <strong>please</strong>, чтобы просьба звучала естественно.</p></article>
      <TrackTask tracks={['1.47']} title="Exercise 3g: Can you...? / Can I have...?">Listen and repeat the polite requests, then practise them with the hotel objects.</TrackTask>
      <OpenPrompts title="Exercise 3h: ask the receptionist" prompts={[
        'Ask for your key.', 'Ask for your passport.', 'Ask for a map of London.', 'Ask for a pen.',
      ]} compact />
      <TrackTask tracks={['1.48']} title="Exercise 4a: Jenny in the hotel bar">Listen and decide whether each sentence is true or false. Correct the false sentences.</TrackTask>
      <ChoiceGrid title="Jenny talks to Rob: true or false?" questions={[
        tf('Jenny has a coffee.', false), tf('She is in London on business.', true), tf('The waitress is German.', false),
        tf('Jenny phones Rob Walker.', false), tf('Jenny is tired.', true), tf('Their meeting is at 10.00.', false),
      ]} />
      <OpenPrompts title="Exercise 4b: correct the false sentences" prompts={[
        'What does Jenny have?', 'Where is the waitress from?', 'Who phones whom?', 'What time is the meeting?',
      ]} compact />
      <TheoryBox title="Offering with Would you like...?" points={[
        'Would you like a coffee? - Yes, please.',
        'Would you like another tea? - No, thanks.',
        'Use Would you like...? to offer something. Do not answer with only Yes or No.',
      ]} />
      <TrackTask tracks={['1.49']} title="Exercise 4c: offering drinks">Listen, repeat and practise offering tea, coffee, water and other drinks.</TrackTask>
      <GapSelect title="Exercise 4d-e: who says each Social English phrase?" options={['Jenny', 'Rob', 'the waitress']} questions={[
        { prompt: "I'm here on business.", answer: 'Jenny' },
        { prompt: "I'm from New York. What about you?", answer: 'Jenny' },
        { prompt: 'No problem.', answer: 'the waitress' },
        { prompt: 'Is that Jennifer?', answer: 'Rob' },
        { prompt: 'This is Rob. Rob Walker.', answer: 'Rob' },
        { prompt: "That's perfect.", answer: 'Jenny' },
        { prompt: "It's time for bed.", answer: 'Jenny' },
      ]} />
      <TrackTask tracks={['1.50']} title="Social English phrases">Listen, check and repeat the phrases with natural rhythm.</TrackTask>
      <OpenPrompts title="Speaking: build the scene" prompts={[
        'Offer somebody a drink and accept or refuse.',
        'Start a phone call: ask who is speaking and introduce yourself.',
        'Say why you are in London and arrange a meeting time.',
      ]} />
    </section>
  );
}

function ThingsPage() {
  const roomThings = [
    ['a table', false], ['a lamp', true], ['a computer', false], ['a chair', true], ['pencils', false],
    ['photos', true], ['a window', false], ['a printer', false], ['a phone', true], ['pieces of paper', true],
  ] as const;
  return (
    <section className="stack">
      <PageTitle eyebrow="2A · PDF page 13" title="A writer's room" />
      <LessonVisual src="./images/elementary/writers-room.jpg" alt="Roald Dahl working in his writing room" caption="Roald Dahl's writing room" />
      <ChoiceGrid title="Vocabulary 1b: what can you see in the room?" questions={roomThings.map(([item, answer]) => tf(item, answer))} />
      <OpenPrompts title="Vocabulary 1a-c: things" prompts={[
        'Do you know any books by Roald Dahl?',
        'Is the room tidy or untidy? Explain.',
        'Name five more everyday things in English.',
      ]} />
      <TheoryBox title="a / an and plural nouns" points={[
        'Use a before a consonant sound: a pen, a watch.',
        'Use an before a vowel sound: an umbrella, an identity card.',
        'Most plurals add -s: pen - pens. After s, sh, ch, x and some other endings, add -es: watch - watches.',
        'A consonant + y usually changes to -ies: diary - diaries.',
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p><strong>a/an</strong> означает «один какой-то предмет» и используется только с существительным в единственном числе. Для множественного числа артикль не нужен: <strong>a pen - pens</strong>. Выбор <strong>a</strong> или <strong>an</strong> зависит от первого звука, а не только от буквы.</p></article>
      <GapSelect title="Grammar 2a: complete the singular and plural forms" options={['a', 'an', 'umbrella', 'umbrellas', 'watch', 'a watch', 'diary', 'a diary']} questions={[
        { prompt: '___ umbrella', answer: 'an' },
        { prompt: 'Plural of umbrella', answer: 'umbrellas' },
        { prompt: '___ watch', answer: 'a' },
        { prompt: 'Singular of watches', answer: 'a watch' },
        { prompt: '___ diary', answer: 'a' },
        { prompt: 'Singular of diaries', answer: 'a diary' },
      ]} />
      <TheoryBox title="Final -s and -es" points={[
        '/s/: books, lamps, tickets.', '/z/: photos, keys, pens.', '/ɪz/: glasses, watches, purses.',
        'Final -es is pronounced /ɪz/ after sounds such as /s/, /z/, /ʃ/, /tʃ/ and /dʒ/.',
      ]} />
      <TrackTask tracks={['1.53']} title="Pronunciation 3a: final -s and -es">Listen and repeat the three sound groups.</TrackTask>
      <ChoiceGrid title="Pronunciation 3b: is -es pronounced /ɪz/?" questions={[
        world('classes', '/ɪz/', ['/ɪz/', 'not /ɪz/']), world('files', 'not /ɪz/', ['/ɪz/', 'not /ɪz/']),
        world('headphones', 'not /ɪz/', ['/ɪz/', 'not /ɪz/']), world('boxes', '/ɪz/', ['/ɪz/', 'not /ɪz/']),
        world('pieces', '/ɪz/', ['/ɪz/', 'not /ɪz/']), world('tissues', 'not /ɪz/', ['/ɪz/', 'not /ɪz/']),
        world('pages', '/ɪz/', ['/ɪz/', 'not /ɪz/']), world('mobiles', 'not /ɪz/', ['/ɪz/', 'not /ɪz/']),
      ]} />
      <TrackTask tracks={['1.54']} title="Pronunciation 3b: check and repeat">Listen, check the /ɪz/ words and repeat all eight nouns.</TrackTask>
    </section>
  );
}

function DemonstrativesPage() {
  const deskRows: MatrixRow[] = [
    { label: 'a computer / a laptop', answers: [true, true, true] },
    { label: 'a printer', answers: [true, false, false] },
    { label: 'a lamp', answers: [true, true, true] },
    { label: 'a phone', answers: [false, true, false] },
    { label: 'books', answers: [false, true, false] },
    { label: 'a dictionary', answers: [false, false, true] },
    { label: 'a diary', answers: [false, false, true] },
    { label: 'photos', answers: [true, true, false] },
    { label: 'pieces of paper', answers: [true, true, false] },
    { label: 'pens', answers: [true, true, true] },
    { label: 'DVDs', answers: [false, false, true] },
    { label: 'tissues', answers: [false, false, true] },
  ];
  return (
    <section className="stack">
      <PageTitle eyebrow="2A · PDF page 14" title="Things on a table" />
      <TrackTask tracks={['1.55']} title="Listening 4b-c: three work tables">First decide whose tables are tidy. Listen again and select the things each speaker has.</TrackTask>
      <ListeningMatrix title="Exercise 4c: tick the things they have" rows={deskRows} />
      <OpenPrompts title="Speaking 4d-e" prompts={[
        'Describe the table where you work or study. Is it tidy?',
        'Choose an object. Ask a partner What is it? or What are they?',
      ]} />
      <LessonVisual src="./images/elementary/demonstratives.jpg" alt="Four dialogues showing this, these, that and those" caption="Near or far? Singular or plural?" />
      <TheoryBox title="this / that / these / those" points={[
        'this: one thing near you - this credit card.',
        'that: one thing farther away - that lamp.',
        'these: several things near you - these headphones.',
        'those: several things farther away - those photos.',
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p><strong>this/that</strong> используются с одним предметом, <strong>these/those</strong> - с несколькими. <strong>this/these</strong> указывают на предметы рядом, <strong>that/those</strong> - на предметы дальше от говорящего.</p></article>
      <GapSelect title="Grammar 5a: complete the picture dialogues" options={['a credit card', 'headphones', 'a lamp', 'photos']} questions={[
        { prompt: "1. What's this? - It's ___ .", answer: 'a credit card' },
        { prompt: "2. What are these? - They're ___ .", answer: 'headphones' },
        { prompt: "3. What's that? - It's ___ .", answer: 'a lamp' },
        { prompt: "4. What are those? - They're ___ .", answer: 'photos' },
      ]} />
      <TrackTask tracks={['1.56']} title="Grammar 5a: listen and check">Check the four dialogues, then repeat and practise them.</TrackTask>
      <TheoryBox title="Pronunciation: two th sounds" points={[
        'Voiced /ð/: mother, this, that, these, the, they.',
        'Unvoiced /θ/: thumb, thanks, thing, thirty, three, Thursday.',
      ]} />
      <TrackTask tracks={['1.58', '1.59']} title="Pronunciation 6a-b: th">Listen and repeat the words, then practise the seven phrases from this Thursday to I’m thirty-three this Thursday.</TrackTask>
      <ChoiceGrid title="Pronunciation 6a: choose the th sound" questions={[
        world('this', '/ð/', ['/ð/', '/θ/']), world('that', '/ð/', ['/ð/', '/θ/']), world('these', '/ð/', ['/ð/', '/θ/']),
        world('they', '/ð/', ['/ð/', '/θ/']), world('thanks', '/θ/', ['/ð/', '/θ/']), world('thing', '/θ/', ['/ð/', '/θ/']),
        world('thirty', '/θ/', ['/ð/', '/θ/']), world('Thursday', '/θ/', ['/ð/', '/θ/']),
      ]} />
    </section>
  );
}

function AdjectivesPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="2B · PDF page 15" title="Stars and Stripes" />
      <GapSelect title="Vocabulary 1a-b: complete the colours" options={['red', 'white', 'blue', 'black', 'yellow', 'grey', 'pink', 'orange', 'brown', 'green']} questions={[
        { prompt: 'The American flag: r_d', answer: 'red' }, { prompt: 'The American flag: wh_te', answer: 'white' },
        { prompt: 'The American flag: bl_e', answer: 'blue' }, { prompt: 'bl_ck', answer: 'black' },
        { prompt: 'y_ll_w', answer: 'yellow' }, { prompt: 'gr_y', answer: 'grey' }, { prompt: 'p_nk', answer: 'pink' },
        { prompt: '_r_ng_', answer: 'orange' }, { prompt: 'br_wn', answer: 'brown' }, { prompt: 'gr__n', answer: 'green' },
      ]} />
      <ChoiceGrid title="Vocabulary 1c: colours of national flags" questions={[
        world('Brazil', 'green, yellow, blue and white', ['green, yellow, blue and white', 'green, white and orange', 'black, red and yellow']),
        world('Ireland', 'green, white and orange', ['green, white and orange', 'green, white and red', 'red, white and blue']),
        world('Germany', 'black, red and yellow', ['black, red and yellow', 'green, white and red', 'blue and white']),
        world('Italy', 'green, white and red', ['green, white and red', 'green, white and orange', 'black, red and yellow']),
      ]} />
      <OpenPrompts title="Vocabulary 1d-e: colours and adjectives" prompts={[
        'What colours are in your national flag?',
        'Describe a famous place with two adjectives.',
      ]} />
      <MatchPairs title="Vocabulary 1e: match the adjective opposites" pairs={[
        ['bad', 'good'], ['big', 'small'], ['dangerous', 'safe'], ['dirty', 'clean'],
        ['easy', 'difficult'], ['empty', 'full'], ['expensive', 'cheap'], ['far', 'near'],
        ['fast', 'slow'], ['high', 'low'], ['hot', 'cold'], ['long', 'short'],
        ['old', 'new'], ['rich', 'poor'], ['strong', 'weak'], ['wrong', 'right'],
      ]} />
      <LessonVisual src="./images/elementary/usa-quiz.jpg" alt="Eight photographs in a USA adjective and noun quiz" caption="USA quiz: combine one adjective and one noun" />
      <GapSelect title="Grammar 2a-b: complete the USA quiz" options={['American Airlines', 'New York', 'a nice day', 'fast food', 'The White House', 'a high school', 'blue jeans', 'yellow taxis']} questions={[
        { prompt: '1. Airline logo', answer: 'American Airlines' }, { prompt: '2. City', answer: 'New York' },
        { prompt: '3. Have ___!', answer: 'a nice day' }, { prompt: '4. Burger and fries', answer: 'fast food' },
        { prompt: '5. The president’s home', answer: 'The White House' }, { prompt: '6. A school for teenagers', answer: 'a high school' },
        { prompt: '7. Denim trousers', answer: 'blue jeans' }, { prompt: '8. New York cars', answer: 'yellow taxis' },
      ]} />
      <TrackTask tracks={['1.62']} title="Grammar 2b: listen and check">Check the eight adjective + noun phrases and repeat them.</TrackTask>
      <TheoryBox title="Adjectives in English" points={[
        'An adjective normally comes before a noun: a nice day, blue jeans.',
        'Adjectives do not change before a plural noun: a yellow taxi - yellow taxis.',
        'Use an article before adjective + singular noun when needed: a high school, the White House.',
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p>В английском прилагательное ставится <strong>перед существительным</strong>: <strong>a fast car</strong>. Оно не получает окончание множественного числа: <strong>fast cars</strong>, не <strong>fasts cars</strong>.</p></article>
      <ChoiceGrid title="Grammar practice: adjective position and form" questions={[
        world('1. big / city', 'a big city', ['a big city', 'a city big', 'a big cities']),
        world('2. new / books', 'new books', ['news books', 'new books', 'books new']),
        world('3. expensive / phone', 'an expensive phone', ['a expensive phone', 'an phone expensive', 'an expensive phone']),
        world('4. white / houses', 'white houses', ['whites houses', 'white houses', 'houses white']),
      ]} />
    </section>
  );
}

function FeelingsPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="2C · PDF page 17 · Student's Book page 16" title="After 300 metres, turn right" />
      <LessonVisual src="./images/elementary/feelings.png" alt="Eleven faces showing different feelings" caption="Match each feeling to a numbered picture" showFull />
      <GapSelect title="Vocabulary 1a: match the feelings and pictures" options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']} questions={[
        { prompt: 'hungry', answer: '6' }, { prompt: 'hot', answer: '4' }, { prompt: 'angry', answer: '5' },
        { prompt: 'tired', answer: '7' }, { prompt: 'sad', answer: '10' }, { prompt: 'thirsty', answer: '3' },
        { prompt: 'cold', answer: '8' }, { prompt: 'bored', answer: '11' }, { prompt: 'happy', answer: '2' },
        { prompt: 'stressed', answer: '9' }, { prompt: 'worried', answer: '1' },
      ]} />
      <TheoryBox title="Feelings with be" points={[
        'Use be + adjective: I am hungry. She is tired. They are worried.',
        'Do not use have: say I am thirsty, not I have thirsty.',
        'Add very, quite or not to change the meaning: very tired, quite hungry, not cold.',
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p>Слова о самочувствии и эмоциях здесь являются прилагательными, поэтому перед ними нужен глагол <strong>be</strong>: <strong>I’m hungry</strong>, <strong>she’s worried</strong>, <strong>we aren’t cold</strong>.</p></article>
      <TrackTask tracks={['1.68']} title="Vocabulary 1b: listen, check and repeat">Check the eleven feelings, then repeat the complete phrases with I’m.</TrackTask>
      <OpenPrompts title="Vocabulary 1c: how do you feel?" prompts={[
        'Write two true positive sentences about how you feel now.',
        'Write two true negative sentences about how you feel now.',
        'Tell a partner using very, quite or not.',
      ]} />
      <LessonVisual src="./images/elementary/carter-family-story.png" alt="Five pictures of the Carter family travelling by car in Ireland" caption="The Carter family road trip: pictures A-E" showFull />
      <TrackTask tracks={['1.69']} title="Listening 2a: the Carter family in Ireland">Listen and number pictures A-E from 1 to 5.</TrackTask>
      <GapSelect title="Listening 2a: put the pictures in order" options={['1', '2', '3', '4', '5']} questions={[
        { prompt: 'Picture A', answer: '2' }, { prompt: 'Picture B', answer: '4' }, { prompt: 'Picture C', answer: '1' },
        { prompt: 'Picture D', answer: '5' }, { prompt: 'Picture E', answer: '3' },
      ]} />
      <OpenPrompts title="Before you read the dialogues" prompts={[
        'What makes Mum worried in picture C?',
        'Why are Tim and Suzy uncomfortable in picture A?',
        'What do you think happens before the family reaches the hotel?',
      ]} compact />
    </section>
  );
}

function ImperativesPage() {
  const roadTripDialogues = [
    '<strong>1</strong> Satnav: After 100 metres turn right. Turn right!<br/>Mum: Please slow down! This road is very dangerous.<br/>Dad: Don’t worry. You know I’m a good driver.<br/>Mum: Be careful!',
    '<strong>2</strong> Suzy: Dad, this music is terrible. Can you turn it off?<br/>Dad: OK.<br/>Tim: Dad, I’m very hot. Turn the air conditioning on, please.<br/>Dad: Are you hot, Suzy?<br/>Suzy: No, I’m cold.<br/>Mum: Open your window, Tim.',
    '<strong>3</strong> Suzy: I’m thirsty. Where’s the water?<br/>Mum: Here you are.<br/>Tim: I’m hungry. Can we stop soon?<br/>Mum: Let’s stop at that service station.<br/>Dad: OK.',
    '<strong>4</strong> Tim: Give me my iPod.<br/>Suzy: This is my iPod!<br/>Dad: Be quiet!<br/>Tim: Are we there yet? I’m bored.<br/>Dad: It’s not far now. Only 80 kilometres.<br/>Tim: Can you turn the radio on please, Mum?<br/>Mum: OK.<br/>Dad: Oh no!',
    '<strong>5</strong> Suzy: Where are we?<br/>Dad: We’re here. At the hotel.<br/>Tim: Great!<br/>Mum: Don’t park here. Look at that sign. No parking.<br/>Dad: Don’t worry. It’s OK. Come on. Let’s go.',
  ];
  return (
    <section className="stack">
      <PageTitle eyebrow="2C · PDF page 18 · Student's Book page 17" title="Imperatives and let's" />
      <InteractiveCard title="Listening and Reading 2b: the Carter family">
        <p className="exercise-instruction">Read the five dialogues. Find the highlighted-style phrases that give instructions or make suggestions and guess their meaning.</p>
        <div className="reading-sheet">{roadTripDialogues.map((dialogue) => <p key={dialogue} dangerouslySetInnerHTML={{ __html: dialogue }} />)}</div>
      </InteractiveCard>
      <MatchPairs title="Reading 2b: match the key phrases and meanings" pairs={[
        ['slow down', 'drive more slowly'], ['don’t worry', 'stay calm'], ['be careful', 'pay attention to danger'],
        ['turn it off', 'stop the device'], ['turn the air conditioning on', 'start the air conditioning'],
        ['let’s stop', 'a suggestion to stop'], ['be quiet', 'stop making noise'], ['come on', 'encouragement to move'],
      ]} />
      <TrackTask tracks={['1.70']} title="Listening 2c: the end of the story">Listen to the end. What two problems does the family have?</TrackTask>
      <LessonVisual src="./images/elementary/car-problem.png" alt="The Carter family car stopped on a dark road" caption="Predict the two problems before you listen" />
      <OpenPrompts title="Listening 2c: your answers" prompts={[
        'Problem 1', 'Problem 2', 'How do you think the family feels at the end?',
      ]} compact />
      <TheoryBox title="Imperatives and let's" points={[
        'Positive imperative: use the base verb without a subject - Turn right. Be careful. Open the window.',
        'Negative imperative: use don’t + base verb - Don’t turn right. Don’t park here.',
        'Use please to make an instruction more polite - Open your window, please.',
        'Use let’s + base verb for a suggestion that includes the speaker - Let’s stop. Let’s go.',
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p><strong>Imperative</strong> - команда, инструкция или просьба. Подлежащее <strong>you</strong> не пишется: <strong>Turn right</strong>. Для запрета добавьте <strong>don’t</strong>. <strong>Let’s</strong> означает «давай/давайте» и предлагает совместное действие.</p></article>
      <GapSelect title="Grammar 3a: complete the chart" options={['Park', "Don't turn", "Let's", 'go']} questions={[
        { prompt: 'Positive imperative: ___ here!', answer: 'Park' },
        { prompt: 'Negative imperative: ___ right!', answer: "Don't turn" },
        { prompt: 'Suggestion: ___ stop at that service station.', answer: "Let's" },
        { prompt: "Come on. Let's ___ .", answer: 'go' },
      ]} />
      <ChoiceGrid title="Grammar 3b: choose the correct form" questions={[
        world('1. The road is dangerous. ___ careful!', 'Be', ['Are', 'Be', 'You be']),
        world('2. The baby is asleep. ___ quiet!', 'Be', ['Do', 'Be', 'Let’s']),
        world('3. This is the wrong road. ___ left here.', "Don't turn", ['Not turn', "Don't turn", "Let's not turning"]),
        world('4. We’re tired. ___ at the next hotel.', "Let's stop", ['Let’s stop', 'We stop', 'Let’s stopping']),
        world('5. Please ___ the music off.', 'turn', ['turn', 'to turn', 'turning']),
        world('6. ___ your mobile here.', "Don't use", ['No use', 'Not use', "Don't use"]),
      ]} />
      <LessonVisual src="./images/elementary/imperative-signs.png" alt="Nine road and public information signs" caption="Use a positive or negative imperative for each sign" />
      <GapSelect title="Grammar 3d-e: what do the signs mean?" options={[
        'Turn left', "Don't smoke here", "Don't eat or drink here", 'Turn off your mobile', "Don't take photos",
        "Don't go in here", 'Cross the road now', 'Be careful', "Don't listen to music here",
      ]} questions={[
        { prompt: 'Sign 1', answer: 'Turn left' }, { prompt: 'Sign 2', answer: "Don't smoke here" },
        { prompt: 'Sign 3', answer: "Don't eat or drink here" }, { prompt: 'Sign 4', answer: 'Turn off your mobile' },
        { prompt: 'Sign 5', answer: "Don't take photos" }, { prompt: 'Sign 6', answer: "Don't go in here" },
        { prompt: 'Sign 7', answer: 'Cross the road now' }, { prompt: 'Sign 8', answer: 'Be careful' },
        { prompt: 'Sign 9', answer: "Don't listen to music here" },
      ]} />
      <TheoryBox title="Connected speech" points={[
        'In natural speech, words are not always separated.',
        'A final consonant often links to the next vowel: turn_off, open_it, stop_at.',
        'Listen for the whole phrase, not one word at a time.',
      ]} />
      <TrackTask tracks={['1.72']} title="Pronunciation 4a-b: connected speech">Listen and write the six sentences. Then practise saying them with the same linking and rhythm.</TrackTask>
      <OpenPrompts title="Pronunciation 4a: write the six sentences" prompts={['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4', 'Sentence 5', 'Sentence 6']} compact />
      <OpenPrompts title="Speaking 5: What's the matter?" prompts={[
        'Student A: say how you feel. Student B: give an imperative or a let’s suggestion.',
        'Change roles and use a different feeling.',
        'Create a short dialogue with one positive imperative, one negative imperative and one let’s suggestion.',
      ]} />
      <TrackTask tracks={['1.73']} title="Song 6: Please Don't Go">Listen for imperatives and repeated phrases. Write three phrases you hear.</TrackTask>
      <OpenPrompts title="Song: phrases" prompts={['Phrase 1', 'Phrase 2', 'Phrase 3']} compact />
    </section>
  );
}

function ReviewPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Units 1-2 · PDF page 19 · Student's Book page 18" title="Revise and Check" />
      <ChoiceGrid title="Grammar: choose a, b or c" questions={[
        world('1. Hello. ___ your name?', "What's", ['What', 'What are', "What's"]),
        world('2. Maria is German. ___ a student.', "She's", ["She's", "He's", "It's"]),
        world('3. A: Where ___ from? B: He’s from Turkey.', 'is he', ['he is', 'is', 'is he']),
        world('4. They ___ English, they’re Scottish.', "aren't", ["isn't", "aren't", 'not are']),
        world('5. A: Are you from Paris? B: Yes, ___.', 'I am', ['I am', "I'm", 'I are']),
        world('6. She’s Brazilian. ___ name’s Daniela.', 'Her', ['His', 'Her', 'Your']),
        world('7. We’re from the USA. ___ surname is Mackay.', 'Our', ['Your', 'Their', 'Our']),
        world('8. A: What are they? B: They’re ___.', 'watches', ['watches', 'a watch', 'watchs']),
        world('9. A: What is it? B: It’s ___.', 'an umbrella', ['a umbrella', 'an umbrella', 'umbrella']),
        world('10. Look at those ___.', 'women', ['womans', 'women', 'womens']),
        world('11. A: What are ___ in English? B: They’re keys.', 'these', ['that', 'this', 'these']),
        world('12. These are very ___.', 'difficult exercises', ['difficult exercises', 'exercises difficult', 'difficults exercises']),
        world('13. ___ careful! That dog’s dangerous.', 'Be', ['Are', 'Be you', 'Be']),
        world('14. Please ___ in the library.', "don't eat", ['not eat', "don't eat", 'no eat']),
        world('15. I’m hungry. ___ stop at the café.', "Let's", ["Let's", 'We', "Don't"]),
      ]} />
      <GapSelect title="Vocabulary a: complete with a preposition" options={['at', 'from', 'in', 'off', 'to']} questions={[
        { prompt: '1. I’m ___ Japan.', answer: 'from' }, { prompt: '2. Nice ___ meet you.', answer: 'to' },
        { prompt: '3. What’s bonjour ___ English?', answer: 'in' }, { prompt: '4. Look ___ the board.', answer: 'at' },
        { prompt: '5. Please turn ___ your mobile phone.', answer: 'off' },
      ]} />
      <GapSelect title="Vocabulary b: complete the classroom phrases" options={['Answer', 'Stand', 'Open', 'Read', 'Work']} questions={[
        { prompt: '1. ___ the text.', answer: 'Read' }, { prompt: '2. ___ in pairs.', answer: 'Work' },
        { prompt: '3. ___ up.', answer: 'Stand' }, { prompt: '4. ___ the door.', answer: 'Open' },
        { prompt: '5. ___ the questions.', answer: 'Answer' },
      ]} />
      <ChoiceGrid title="Vocabulary c: choose the word that is different" questions={[
        world('1. Numbers', 'file', ['eight', 'two', 'seven', 'file']),
        world('2. Countries', 'Chinese', ['Brazil', 'Chinese', 'Hungary', 'Switzerland']),
        world('3. Nationalities', 'France', ['Polish', 'Italian', 'Japanese', 'France']),
        world('4. Continents', 'Ireland', ['Africa', 'Asia', 'Ireland', 'Europe']),
        world('5. Tens', 'sixteen', ['sixteen', 'forty', 'ninety', 'eighty']),
        world('6. Days', 'Italy', ['Wednesday', 'Italy', 'Friday', 'Monday']),
        world('7. Plural nouns', 'purse', ['glasses', 'purse', 'headphones', 'scissors']),
        world('8. Parts of a room', 'school', ['door', 'window', 'wall', 'school']),
        world('9. Reading things', 'wallet', ['wallet', 'newspaper', 'book', 'magazine']),
        world('10. Negative feelings', 'happy', ['happy', 'tired', 'angry', 'stressed']),
      ]} />
      <GapSelect title="Vocabulary d: write the opposite adjective" options={['bad', 'cheap', 'clean', 'short', 'full']} questions={[
        { prompt: '1. good', answer: 'bad' }, { prompt: '2. expensive', answer: 'cheap' },
        { prompt: '3. dirty', answer: 'clean' }, { prompt: '4. tall', answer: 'short' }, { prompt: '5. empty', answer: 'full' },
      ]} />
      <ChoiceGrid title="Pronunciation a: choose the word or letter with a different sound" questions={[
        world('1. tree sound', 'A', ['A', 'B', 'C', 'D']),
        world('2. bike sound', 'day', ['Hi', 'day', 'my', 'nice']),
        world('3. final /ɪz/', 'files', ['watches', 'boxes', 'files', 'glasses']),
        world('4. /dʒ/ sound', 'good', ['Japan', 'German', 'good', 'page']),
        world('5. cat sound', 'dangerous', ['dangerous', 'stamps', 'bad', 'laptop']),
      ]} />
      <ChoiceGrid title="Pronunciation b: underline the stressed syllable" questions={[
        stress('address', 'second'), stress('Italy', 'first'), stress('expensive', 'second'), stress('newspaper', 'first'), stress('thirteen', 'second'),
      ]} />
    </section>
  );
}

function ReviewReadingPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Units 1-2 · PDF page 20 · Student's Book page 19" title="British and American English" />
      <InteractiveCard title="Can you understand this text?">
        <article className="reading-sheet">
          <h3>British & American English - the same, but different</h3>
          <p>British and American people speak the same language - English, but with some small differences.</p>
          <h4>Vocabulary</h4>
          <p>Some words are different in American English. For example, Americans say <strong>zip code</strong>, not <strong>postcode</strong>, <strong>vacation</strong>, not <strong>holiday</strong>, and <strong>cell phone</strong>, not <strong>mobile phone</strong>. Some words have different meanings. In British English a <strong>purse</strong> is a thing where women have their money and credit cards. In American English a <strong>purse</strong> is a woman's bag.</p>
          <h4>Spelling</h4>
          <p><strong>Colour</strong>, <strong>favour</strong>, and other words that end in <strong>-our</strong> in British English end with <strong>-or</strong> in American English, for example <strong>color</strong> and <strong>favor</strong>. <strong>Centre</strong> and <strong>theatre</strong> end with <strong>-ter</strong> in American English: <strong>center</strong>, <strong>theater</strong>.</p>
          <h4>Grammar</h4>
          <p>American grammar is very similar to British grammar, but there are some small differences, especially prepositions. Americans say <strong>See you Friday</strong>, but British people say <strong>See you on Friday</strong>.</p>
          <h4>Pronunciation</h4>
          <p>The most important difference is pronunciation. American and British accents are quite different, and speakers usually recognize the other accent quickly.</p>
        </article>
      </InteractiveCard>
      <MatchPairs title="Reading b: match the highlighted language with its meaning" pairs={[
        ['for example', 'one example of something'], ['meanings', 'the ideas words express'], ['end in', 'have these final letters'],
        ['similar', 'almost the same'], ['accents', 'ways of pronouncing a language'], ['vice versa', 'the reverse is also true'],
      ]} />
      <ChoiceGrid title="Reading c: true or false?" questions={[
        tf('1. American English and British English are very different.', false),
        tf('2. Holiday and postcode are the same in British and American English.', false),
        tf('3. Purse has different meanings in American and British English.', true),
        tf('4. Kilometer is British spelling.', false),
        tf('5. British and American grammar are not very different.', true),
        tf("6. It's difficult to know from an accent if a person is English or American.", false),
      ]} />
      <LessonVisual src="./images/elementary/review-street-interviews.jpg" alt="Five people interviewed in the street" caption="Listening 1.74: speakers 1-5" showFull />
      <TrackTask tracks={['1.74']} title="Can you understand these people?">Listen to five people in the street and choose the correct answer.</TrackTask>
      <ChoiceGrid title="Listening 1.74: choose the answer" questions={[
        world('1. Her name is ...', 'Cecile', ['Cecilia', 'Cecil', 'Cecile']),
        world("2. Andy's from Newcastle in the ... of England.", 'North East', ['North East', 'North West', 'South East']),
        world('3. David is ...', 'French', ['Italian', 'French', 'Spanish']),
        world('4. Her name is ...', 'Arja', ['Arya', 'Aria', 'Arja']),
        world('5. Karin is ...', 'Swiss', ['Swiss', 'Brazilian', 'Hungarian']),
      ]} />
      <OpenPrompts title="Can you say this in English?" prompts={[
        'Count from 0 to 20.', 'Count from 20 to 100 in tens.', 'Say the days of the week.',
        'Give three instructions: two positive and one negative.', 'Introduce yourself and another person.',
        "Answer: What's your first name and surname? How do you spell it? Where are you from?",
      ]} compact />
    </section>
  );
}

function BritainGrammarPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="3A · PDF page 21 · Student's Book page 20" title="Things I love about Britain" />
      <GapSelect title="Vocabulary 1a: complete the verb phrases" options={['go', 'read', 'work', 'have', 'listen']} questions={[
        { prompt: '1. ___ a newspaper', answer: 'read' }, { prompt: '2. ___ to the radio', answer: 'listen' },
        { prompt: '3. ___ children', answer: 'have' }, { prompt: '4. ___ to the cinema', answer: 'go' },
        { prompt: '5. ___ in an office', answer: 'work' },
      ]} />
      <TrackTask tracks={['2.3']} title="Vocabulary 1c: verb phrases">Listen. Say the complete phrase after each cue.</TrackTask>
      <LessonVisual src="./images/elementary/britain-stereotypes.jpg" alt="Four comments about British habits with a Union Jack umbrella" caption="Read the four opinions and decide if they are true" showFull />
      <InteractiveCard title="Grammar 2a: four opinions about Britain">
        <article className="reading-sheet">
          <p><strong>British people drink tea at 5.00. Kati from Hungary:</strong> It's true that British people drink a lot of tea and coffee, but they don't drink tea at a special time. I work for a British company and my boss drinks tea all the time.</p>
          <p><strong>It rains a lot. Nicolai from Russia:</strong> It rains a lot, but it doesn't rain every day. The weather changes quickly. I always take an umbrella when I go out.</p>
          <p><strong>British people like animals. Norma from Mexico:</strong> My friends all have a dog or a cat. One family that I know has two dogs and five cats. British people love animals!</p>
          <p><strong>The food in Britain isn't very good. Hasan from Turkey:</strong> The restaurants are quite expensive, but they are great. I share a flat with a Scottish boy, and he cooks every night. He watches cooking programmes and makes great curries.</p>
        </article>
      </InteractiveCard>
      <TheoryBox title="Present simple: affirmative and negative" points={[
        'Use the base verb with I, you, we and they: I work. They drink tea.',
        'With he, she and it, add -s or -es: he works, she watches, it rains.',
        "Use don't + base verb with I, you, we and they: They don't drink tea at 5.00.",
        "Use doesn't + base verb with he, she and it: It doesn't rain every day. The main verb has no -s after doesn't.",
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p>В Present Simple окончание <strong>-s/-es</strong> появляется только после <strong>he, she, it</strong>. В отрицании его забирает вспомогательный глагол: <strong>he doesn't cook</strong>, а не <strong>he doesn't cooks</strong>.</p></article>
      <GapSelect title="Grammar 2b: write the he / she / it form" options={['changes', 'has', 'cooks', 'goes', 'makes', 'watches']} questions={[
        { prompt: 'change', answer: 'changes' }, { prompt: 'have', answer: 'has' }, { prompt: 'cook', answer: 'cooks' },
        { prompt: 'go', answer: 'goes' }, { prompt: 'make', answer: 'makes' }, { prompt: 'watch', answer: 'watches' },
      ]} />
      <ChoiceGrid title="Grammar 2b: find the correct negative form" questions={[
        world('It ___ every day.', "doesn't rain", ["doesn't rain", "don't rain", "doesn't rains"]),
        world('They ___ tea at a special time.', "don't drink", ["don't drink", "doesn't drink", "don't drinks"]),
      ]} />
      <ChoiceGrid title="Grammar practice: choose the correct form" questions={[
        world('1. My sister ___ in a bank.', 'works', ['work', 'works', "doesn't works"]),
        world('2. We ___ TV in the morning.', "don't watch", ["doesn't watch", "don't watch", "don't watches"]),
        world('3. Tom ___ two children.', 'has', ['have', 'haves', 'has']),
        world('4. The supermarket ___ at 9.00.', 'opens', ['open', 'opens', 'opening']),
        world('5. I ___ fast food.', "don't eat", ["doesn't eat", "don't eat", 'not eat']),
        world('6. She ___ to music at work.', 'listens', ['listen', 'listens', 'listenes']),
      ]} />
      <TheoryBox title="Third person -s: pronunciation" points={[
        '/s/ after an unvoiced sound: speaks, drinks, cooks.',
        '/z/ after a vowel or voiced sound: rains, has, does, goes.',
        '/ɪz/ after s, z, sh, ch, x or ge: watches, finishes, changes.',
      ]} />
      <TrackTask tracks={['2.5']} title="Pronunciation 3b: third person -s">Listen and repeat the three groups: /s/, /z/ and /ɪz/.</TrackTask>
      <TrackTask tracks={['2.6']} title="Pronunciation 3c: change the sentence">Listen to each sentence and change the subject to she or he.</TrackTask>
      <OpenPrompts title="Speaking 3d-e: true things" prompts={[
        'Write three true positive sentences about yourself.', 'Write three true negative sentences about yourself.',
        'Tell a partner. Then write two sentences about your partner using he or she.',
      ]} />
    </section>
  );
}

function BritainReadingPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="3A · PDF page 22 · Student's Book page 21" title="Starbucks, summer, and other things I love about Britain" />
      <LessonVisual src="./images/elementary/britain-reading.jpg" alt="Six numbered photos and an article about life in Britain" caption="Photos 1-6: find the people, places and objects" showFull />
      <GapSelect title="Reading 4a: match the items to photos 1-6" options={['1', '2', '3', '4', '5', '6']} questions={[
        { prompt: 'a cash machine / ATM', answer: '3' }, { prompt: 'a cup of coffee', answer: '6' },
        { prompt: 'a zebra crossing', answer: '2' }, { prompt: 'a driver', answer: '4' },
        { prompt: 'a chemist', answer: '5' }, { prompt: 'a cyclist', answer: '1' },
        { prompt: 'a waiter', answer: '6' }, { prompt: 'a pedestrian', answer: '2' },
      ]} />
      <TrackTask tracks={['2.7']} title="Reading and listening 4b">Read and listen to Mark Vanhoenacker's article, then answer the true-or-false questions.</TrackTask>
      <InteractiveCard title="The article">
        <article className="reading-sheet">
          <p>Mark Vanhoenacker, an American journalist who lives in London, says the UK's not just OK - it's paradise. These are some of his reasons.</p>
          <p><strong>Walking.</strong> Britain isn't a good place for cyclists. But for pedestrians it is wonderful. When you walk on a zebra crossing, all the drivers stop.</p>
          <p><strong>Banks.</strong> British banks are great. You do everything online, and you don't pay when you take money out of an ATM. If you want to change banks, the banks do all the work, not you.</p>
          <p><strong>Drivers.</strong> The British are very polite when they drive. They don't hoot, and they are patient with other drivers. They always say thank you when you let them pass.</p>
          <p><strong>Boots the Chemist.</strong> Chemists in the UK are friendly shops and completely different from US pharmacies. Boots sells everything you want, not just medicine, and the shop assistants give you good advice.</p>
          <p><strong>No ID Cards.</strong> Britain is one of the only places where people don't have ID cards. In the US you need ID when you buy a drink, go to a club, use a credit card, or take an intercity train.</p>
          <p><strong>Summers.</strong> A good summer day in Britain is dry and warm, but not very hot.</p>
          <p><strong>Starbucks.</strong> Starbucks isn't British, but Mark prefers the Starbucks in Britain. They are friendly places where people read the newspaper and drink good coffee. The waiters don't write your name on the cups.</p>
        </article>
      </InteractiveCard>
      <ChoiceGrid title="Reading 4b: true or false?" questions={[
        tf('1. Britain is a good country for cyclists and pedestrians.', false),
        tf("2. It's expensive to use ATMs in Britain.", false),
        tf('3. British drivers are nice to other drivers.', true),
        tf('4. Boots the Chemist only has medicine.', false),
        tf("5. In Britain people don't have ID cards.", true),
        tf('6. Summers in Britain are very hot.', false),
        tf("7. In Starbucks in Britain waiters don't use your first name.", true),
      ]} />
      <MatchPairs title="Reading 4c: verbs from the article" pairs={[
        ['walk', 'move on foot'], ['pay', 'give money for something'], ['drive', 'control a car'], ['sell', 'give something for money'],
        ['give', 'hand something to another person'], ['need', 'require something'], ['buy', 'get something by paying'],
        ['use', 'do something with a tool or service'], ['prefer', 'like one thing more'], ['feel', 'experience an emotion'], ['call', 'say or announce a name'],
      ]} />
      <OpenPrompts title="Reading 4d: compare with your country or city" prompts={[
        'Is your city good for cyclists and pedestrians? Why?', 'Are banks and ATMs similar or different?',
        'How do drivers behave?', 'What are chemists like?', 'What are summers and coffee shops like?',
      ]} />
    </section>
  );
}

function WorkPlayPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="3B · PDF page 23 · Student's Book page 22" title="Work and play" />
      <GapSelect title="Vocabulary 1a: order the letters to make jobs" options={['teacher', 'actor', 'waiter', 'taxi driver', 'receptionist']} questions={[
        { prompt: 'ACTEHRE', answer: 'teacher' }, { prompt: 'ROCAT', answer: 'actor' }, { prompt: 'TRIEWA', answer: 'waiter' },
        { prompt: 'AXTIRREDIV', answer: 'taxi driver' }, { prompt: 'PTIREONICEST', answer: 'receptionist' },
      ]} />
      <OpenPrompts title="Vocabulary 1c: jobs around you" prompts={[
        'What do you do?', 'Write the jobs of five people you know.',
      ]} compact />
      <LessonVisual src="./images/elementary/his-job-her-job.jpg" alt="His job, her job game board with work questions" caption="Use the question board while you listen" showFull />
      <TrackTask tracks={['2.10', '2.11']} title="Listening 2a-b: His job, her job">For each question, choose who it is about and then choose Wayne's answer.</TrackTask>
      <JobShowExercise />
      <OpenPrompts title="Listening 2c: guess the jobs" prompts={[
        "What do you think Wayne's job is? Give two reasons.", "What do you think Tanya's job is? Give two reasons.",
      ]} />
      <TrackTask tracks={['2.12']} title="Listening 2d: the end of the programme">Listen and check Wayne's and Tanya's jobs.</TrackTask>
      <ChoiceGrid title="Listening 2d: choose the jobs" questions={[
        world("Wayne's job", 'footballer', ['footballer', 'police officer', 'taxi driver', 'pilot']),
        world("Tanya's job", 'model', ['model', 'flight attendant', 'receptionist', 'journalist']),
      ]} />
      <TheoryBox title="Present simple questions" points={[
        'Use Do + subject + base verb with I, you, we and they: Do you work in an office?',
        'Use Does + subject + base verb with he, she and it: Does she work at the weekend?',
        "Short answers: Yes, I do. No, I don't. Yes, she does. No, she doesn't.",
        'The main verb stays in the base form after does: Does she work? not Does she works?',
      ]} />
      <article className="language-hint"><h3>Подсказка</h3><p><strong>Do</strong> и <strong>does</strong> - вспомогательные глаголы для вопросов. После <strong>does</strong> основной глагол теряет окончание <strong>-s</strong>: <strong>Does she work?</strong></p></article>
      <TrackTask tracks={['2.13']} title="Grammar 3a: complete and check">Complete the four questions and short answers, then listen and check.</TrackTask>
      <GapSelect title="Grammar 3a: complete the questions and answers" options={['Do', 'Does', 'do', "don't", 'does', "doesn't"]} questions={[
        { prompt: '1a. ___ you work with other people?', answer: 'Do' }, { prompt: '1b. Yes, I ___.', answer: 'do' },
        { prompt: '2a. ___ you work in an office?', answer: 'Do' }, { prompt: "2b. No, I ___ .", answer: "don't" },
        { prompt: '3a. ___ she work with computers?', answer: 'Does' }, { prompt: "3b. No, she ___ .", answer: "doesn't" },
        { prompt: '4a. ___ she work at the weekend?', answer: 'Does' }, { prompt: '4b. Yes, she ___.', answer: 'does' },
      ]} />
      <ChoiceGrid title="Grammar practice: make present simple questions" questions={[
        world('1. ___ he like his job?', 'Does', ['Do', 'Does', 'Is']),
        world('2. ___ they work at night?', 'Do', ['Are', 'Does', 'Do']),
        world('3. Does Anna ___ foreign languages?', 'speak', ['speaks', 'speak', 'speaking']),
        world('4. Do you ___ a uniform?', 'wear', ['wear', 'wears', 'wearing']),
        world('5. ___ your brother drive?', 'Does', ['Do', 'Does', 'Is']),
        world('6. Does the shop ___ at 9.00?', 'open', ['opens', 'open', 'opening']),
      ]} />
      <OpenPrompts title="Grammar 3c: play His job, her job" prompts={[
        'Choose a job. Write four yes/no questions to help your partner guess it.',
        'Answer your partner only with Yes, No or It depends.',
      ]} />
    </section>
  );
}

function UniformsPage() {
  return (
    <section className="stack">
      <PageTitle eyebrow="3B · PDF page 24 · Student's Book page 23" title="Pronunciation, routines and uniforms" />
      <TheoryBox title="Pronunciation /ɜː/" points={[
        'The stressed spellings ur, ir and er often have /ɜː/: nurse, thirty, her.',
        'After w, or often has /ɜː/: work, word, world.',
        'Some similarly spelled words use another sound, so listen before choosing.',
      ]} />
      <TrackTask tracks={['2.15']} title="Pronunciation 4a: /ɜː/">Listen and repeat: bird, nurse, thirty, her, work, journalist.</TrackTask>
      <TrackTask tracks={['2.16']} title="Pronunciation 4b: odd sound out">Listen. Choose the word that does not have the /ɜː/ sound.</TrackTask>
      <ChoiceGrid title="Pronunciation 4b: choose the different sound" questions={[
        world('1. thirsty · dirty · thirteen · tired', 'tired', ['thirsty', 'dirty', 'thirteen', 'tired']),
        world('2. earn · here · prefer · service', 'here', ['earn', 'here', 'prefer', 'service']),
        world('3. Thursday · sure · turn · Turkey', 'sure', ['Thursday', 'sure', 'turn', 'Turkey']),
        world('4. worry · word · worker · world', 'worry', ['worry', 'word', 'worker', 'world']),
      ]} />
      <OpenPrompts title="Pronunciation 4c: practise the sentences" prompts={[
        'I prefer Turkish coffee.', 'Journalists work all over the world.', 'Shirley is thirty on Thursday.',
      ]} compact />
      <GapSelect title="Speaking 5a: complete the weekly routines" options={['do', 'eat', 'go', 'listen', 'read', 'use', 'walk', 'watch']} questions={[
        { prompt: 'In the week: ___ to work / school', answer: 'walk' }, { prompt: '___ a computer at work / school', answer: 'use' },
        { prompt: '___ in English', answer: 'read' }, { prompt: '___ in a café or restaurant', answer: 'eat' },
        { prompt: '___ housework', answer: 'do' }, { prompt: 'At the weekend: ___ TV in the morning', answer: 'watch' },
        { prompt: '___ to music', answer: 'listen' }, { prompt: '___ sport or exercise', answer: 'do' },
        { prompt: '___ homework', answer: 'do' }, { prompt: '___ to the cinema', answer: 'go' },
      ]} />
      <OpenPrompts title="Speaking 5b-c: interview and report" prompts={[
        'Ask your partner questions about each routine. Add one follow-up question.',
        'Write three sentences about your partner using he or she.',
      ]} />
      <LessonVisual src="./images/elementary/uniforms-reading.jpg" alt="Jon, Marie and Sarah in three different uniforms with their opinions" caption="Uniforms - for or against? Match texts 1-3 to the people" showFull />
      <GapSelect title="Reading 6a: match each text to a person" options={['Jon', 'Marie', 'Sarah']} questions={[
        { prompt: 'Text 1', answer: 'Sarah' }, { prompt: 'Text 2', answer: 'Marie' }, { prompt: 'Text 3', answer: 'Jon' },
      ]} />
      <MatchPairs title="Reading 6b: highlighted clothes and phrases" pairs={[
        ['tie', 'formal cloth worn around the neck'], ['skirt', 'clothing from the waist without separate legs'],
        ['get dressed', 'put on clothes'], ['trousers', 'clothing with two legs'], ['nylon top', 'upper-body clothing made from nylon'],
        ['jacket', 'short outer coat'], ['shirt and tie', 'a formal top and neckwear'], ['comfortable', 'pleasant and easy to wear'],
      ]} />
      <ChoiceGrid title="Reading 6c: who says it?" questions={[
        world("1. Thinks uniforms are a good idea, but doesn't like their own uniform.", 'Marie', ['Jon', 'Marie', 'Sarah']),
        world("2. Likes their uniform, but doesn't discuss uniforms in general.", 'Jon', ['Jon', 'Marie', 'Sarah']),
        world('3. Thinks uniforms are a good idea and quite likes their uniform.', 'Sarah', ['Jon', 'Marie', 'Sarah']),
      ]} />
      <OpenPrompts title="Reading 6d: your opinion" prompts={[
        'Do you wear a uniform at work or school?', 'Do you like it? Why or why not?', 'Do you think uniforms are a good idea?',
      ]} />
    </section>
  );
}

function JobShowExercise() {
  const rows = [
    ['work outside', 'Tanya', 'It depends'], ['work in the street', 'Not asked', 'Not asked'],
    ['work inside', 'Not asked', 'Not asked'], ['work in an office', 'Wayne', 'No'],
    ['work in the evening', 'Wayne', 'It depends'], ['work at night', 'Not asked', 'Not asked'],
    ['work at the weekend', 'Tanya', 'Yes'], ['work with computers', 'Tanya', 'No'],
    ['work with other people', 'Wayne', 'Yes'], ['work long hours', 'Not asked', 'Not asked'],
    ['have special qualifications', 'Wayne', 'No'], ['speak foreign languages', 'Wayne', 'No'],
    ['travel', 'Tanya', 'Yes'], ['drive', 'Wayne', 'No'], ['make things', 'Wayne', 'No'],
    ['wear a uniform or special clothes', 'Both', 'Yes'], ['earn a lot of money', 'Both', 'Yes'],
  ] as const;
  const [people, setPeople] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [personOptions] = useState(() => Object.fromEntries(rows.map(([prompt]) => [prompt, shuffleOptions(['Wayne', 'Tanya', 'Both', 'Not asked'])])));
  const [answerOptions] = useState(() => Object.fromEntries(rows.map(([prompt]) => [prompt, shuffleOptions(['Yes', 'No', 'It depends', 'Not asked'])])));
  const score = rows.reduce((total, [prompt, person, answer]) => total + Number(people[prompt] === person) + Number(answers[prompt] === answer), 0);
  const answered = Object.keys(people).length + Object.keys(answers).length;
  return (
    <InteractiveCard title="Listening 2a-b: complete the game board">
      <div className="job-show-grid">
        <strong>Question</strong><strong>About</strong><strong>Answer</strong>
        {rows.map(([prompt, person, answer]) => (
          <div className="job-show-row" key={prompt}>
            <span>{prompt}</span>
            <div className={people[prompt] ? (people[prompt] === person ? 'correct' : 'wrong') : ''}>
              <ScreenShareSelect ariaLabel={`Who: ${prompt}`} value={people[prompt] ?? ''} options={personOptions[prompt]} onChange={(value) => setPeople((current) => ({ ...current, [prompt]: value }))} />
            </div>
            <div className={answers[prompt] ? (answers[prompt] === answer ? 'correct' : 'wrong') : ''}>
              <ScreenShareSelect ariaLabel={`Answer: ${prompt}`} value={answers[prompt] ?? ''} options={answerOptions[prompt]} onChange={(value) => setAnswers((current) => ({ ...current, [prompt]: value }))} />
            </div>
          </div>
        ))}
      </div>
      <p className="result">{answered ? `${score}/${rows.length * 2} correct` : 'Listen and complete both columns.'}</p>
    </InteractiveCard>
  );
}

function PageTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="page-title"><p className="kicker">{eyebrow}</p><h2>{title}</h2></div>;
}

function InteractiveCard({ title, children }: { title: string; children: ReactNode }) {
  return <article className="panel"><h3>{title}</h3>{children}</article>;
}

function TrackTask({ tracks, title, children }: { tracks: string[]; title: string; children: ReactNode }) {
  return (
    <article className="panel track-task">
      <div className="track-copy"><h3>{title}</h3><p>{children}</p></div>
      <div className="track-players">
        {tracks.map((track) => (
          <div className="track-player" key={track}>
            <span className="track-badge">Audio {track}</span>
            <audio controls preload="none" src={`./audio/elementary/track-${track.replace('.', '-')}.mp3`}>
              Your browser does not support audio playback.
            </audio>
          </div>
        ))}
      </div>
    </article>
  );
}

function LessonVisual({ src, alt, caption, showFull = false }: { src: string; alt: string; caption: string; showFull?: boolean }) {
  return <figure className={`lesson-visual ${showFull ? 'full-image' : ''}`}><img src={src} alt={alt} /><figcaption>{caption}</figcaption></figure>;
}

function ListeningMatrix({ title, rows }: { title: string; rows: MatrixRow[] }) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [checked, setChecked] = useState(false);
  const total = rows.length * 3;
  const score = rows.reduce((sum, row, rowIndex) => sum + row.answers.filter((answer, speakerIndex) => selected.has(`${rowIndex}-${speakerIndex}`) === answer).length, 0);
  const toggle = (key: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
    setChecked(false);
  };
  return (
    <InteractiveCard title={title}>
      <div className="matrix-scroll">
        <table className="listening-matrix">
          <thead><tr><th>Thing</th><th>1</th><th>2</th><th>3</th></tr></thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={row.label}><th>{row.label}</th>{row.answers.map((answer, speakerIndex) => {
            const key = `${rowIndex}-${speakerIndex}`;
            const isSelected = selected.has(key);
            const state = checked ? (isSelected === answer ? 'correct' : 'wrong') : '';
            return <td key={key}><button className={`matrix-toggle ${state}`} type="button" aria-pressed={isSelected} aria-label={`${row.label}, speaker ${speakerIndex + 1}`} onClick={() => toggle(key)}>{isSelected ? '✓' : ''}</button></td>;
          })}</tr>)}</tbody>
        </table>
      </div>
      <button className="secondary-action" type="button" onClick={() => setChecked(true)}>Check answers</button>
      <p className="result">{checked ? `${score}/${total} correct` : 'Select the things each speaker has.'}</p>
    </InteractiveCard>
  );
}

function TheoryBox({ title, points }: { title: string; points: string[] }) {
  return <article className="theory-box"><h3>{title}</h3><ul>{points.map((point) => <li key={point}>{point}</li>)}</ul></article>;
}

function ChoiceGrid({ title, questions }: { title: string; questions: ChoiceQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [optionOrders] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(questions.map((question) => [question.prompt, shuffleOptions(question.options)])),
  );
  const correct = questions.filter((question) => answers[question.prompt] === question.answer).length;
  return <InteractiveCard title={title}><div className="choice-grid">{questions.map((question) => <div className="choice-card" key={question.prompt}><p>{question.prompt}</p><div className="choice-options">{(optionOrders[question.prompt] ?? question.options).map((option) => {
    const chosen = answers[question.prompt] === option;
    return <button className={`choice-button ${chosen ? 'chosen' : ''} ${chosen ? (option === question.answer ? 'correct' : 'wrong') : ''}`} type="button" key={option} onClick={() => setAnswers((current) => ({ ...current, [question.prompt]: option }))}>{option}</button>;
  })}</div></div>)}</div><p className="result">{Object.keys(answers).length ? `${correct}/${questions.length} correct` : 'Choose answers to start checking.'}</p></InteractiveCard>;
}

function ScreenShareSelect({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listId = useId();

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, open]);

  const openMenu = (index?: number) => {
    const selectedIndex = options.indexOf(value);
    setActiveIndex(index ?? (selectedIndex >= 0 ? selectedIndex : 0));
    setOpen(true);
  };
  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };
  const moveFocus = (offset: number) => {
    setActiveIndex((current) => (current + offset + options.length) % options.length);
  };

  return (
    <span className="screen-select" ref={rootRef}>
      <button
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className="screen-select-trigger"
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            openMenu();
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            openMenu(value ? options.indexOf(value) : options.length - 1);
          }
        }}
        ref={triggerRef}
        role="combobox"
        type="button"
      >
        <span className={value ? '' : 'screen-select-placeholder'}>{value || 'Choose'}</span>
        <span className="screen-select-chevron" aria-hidden="true" />
      </button>
      {open && (
        <span className="screen-select-menu" id={listId} role="listbox" aria-label={ariaLabel}>
          {options.map((option, index) => (
            <button
              aria-selected={option === value}
              className={`screen-select-option ${option === value ? 'selected' : ''}`}
              key={option}
              onClick={() => choose(option)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  moveFocus(1);
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  moveFocus(-1);
                } else if (event.key === 'Home') {
                  event.preventDefault();
                  setActiveIndex(0);
                } else if (event.key === 'End') {
                  event.preventDefault();
                  setActiveIndex(options.length - 1);
                } else if (event.key === 'Escape') {
                  event.preventDefault();
                  setOpen(false);
                  triggerRef.current?.focus();
                }
              }}
              ref={(element) => { optionRefs.current[index] = element; }}
              role="option"
              type="button"
            >
              {option}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

function GapSelect({ title, questions, options }: { title: string; questions: GapQuestion[]; options: string[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const uniqueOptions = [...new Set(options)];
  const [optionOrders] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(questions.map((question) => [question.prompt, shuffleOptions(uniqueOptions)])),
  );
  const correct = questions.filter((question) => answers[question.prompt] === question.answer).length;
  return <InteractiveCard title={title}><div className="question-list">{questions.map((question) => {
    const value = answers[question.prompt] ?? '';
    return <div className={`question-row ${value ? (value === question.answer ? 'correct' : 'wrong') : ''}`} key={question.prompt}><span>{question.prompt}</span><ScreenShareSelect ariaLabel={`Answer for ${question.prompt}`} value={value} options={optionOrders[question.prompt] ?? uniqueOptions} onChange={(answer) => setAnswers((current) => ({ ...current, [question.prompt]: answer }))} /></div>;
  })}</div><p className="result">{Object.keys(answers).length ? `${correct}/${questions.length} correct` : 'Choose answers to start checking.'}</p></InteractiveCard>;
}

function MatchPairs({ title, pairs }: { title: string; pairs: [string, string][] }) {
  const options = pairs.map((pair) => pair[1]);
  return <GapSelect title={title} options={options} questions={pairs.map(([prompt, answer]) => ({ prompt, answer }))} />;
}

function OpenPrompts({ title, prompts, compact = false }: { title: string; prompts: string[]; compact?: boolean }) {
  return <InteractiveCard title={title}><div className={`open-prompts ${compact ? 'compact-prompts' : ''}`}>{prompts.map((prompt, index) => <label key={prompt}><span>{index + 1}. {prompt}</span>{compact ? <input placeholder="Your answer" /> : <textarea placeholder="Write your answer here." />}</label>)}</div></InteractiveCard>;
}

function NumberBoard({ start, end, step = 1 }: { start: number; end: number; step?: number }) {
  const values: number[] = [];
  for (let value = start; value <= end; value += step) values.push(value);
  return <div className="number-board">{values.map((value) => <span key={value}>{value}</span>)}</div>;
}

function PersonalForm({ title }: { title: string }) {
  return <InteractiveCard title={title}><div className="personal-form">{['First name', 'Surname', 'Country', 'City', 'Age', 'Address', 'Postcode', 'Email', 'Phone number', 'Mobile phone'].map((label) => <label key={label}><span>{label}</span><input placeholder={label} /></label>)}</div><p className="exercise-instruction">Spelling help: RR = double R · @ = at · . = dot</p></InteractiveCard>;
}

function Vocabulary({ words, onRemoveWord }: { words: SavedWord[]; onRemoveWord: (id: string) => void }) {
  return <section className="stack"><PageTitle eyebrow="Notebook" title="My Elementary words" /><InteractiveCard title={`Saved vocabulary · ${words.length}`}>{words.length === 0 ? <p className="empty-state">Add unfamiliar words at the bottom of any Elementary page.</p> : <div className="saved-words">{words.map((word) => <div className="saved-word" key={word.id}><div><strong>{word.term}</strong><span>{word.note || 'No translation or note yet'}</span></div><small>{word.section}</small><button className="remove-word" type="button" onClick={() => onRemoveWord(word.id)} aria-label={`Remove ${word.term}`} title="Remove word">×</button></div>)}</div>}</InteractiveCard></section>;
}

function stress(word: string, answer: string): ChoiceQuestion {
  return { prompt: word, answer, options: ['first', 'second', 'third'] };
}

function world(prompt: string, answer: string, options: string[]): ChoiceQuestion {
  return { prompt, answer, options };
}

function sound(prompt: string, answer: string): ChoiceQuestion {
  return { prompt, answer, options: ['/ə/', '/tʃ/', '/ʃ/', '/dʒ/'] };
}

function numberQuestion(place: string, answer: number): ChoiceQuestion {
  return { prompt: place, answer: String(answer), options: [String(answer), String(Math.floor(answer / 10) + answer % 10), String(answer + 10)] };
}

function tf(prompt: string, answer: boolean): ChoiceQuestion {
  return { prompt, answer: answer ? 'True' : 'False', options: ['True', 'False'] };
}
