import { useState, type ReactNode } from 'react';

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
    case 'vocabulary': return <Vocabulary words={savedWords} onRemoveWord={onRemoveWord} />;
    default: return <Overview />;
  }
}

function Overview() {
  return (
    <section className="content-grid">
      <article className="panel intro-panel">
        <p className="kicker">English File Elementary · PDF pages 5-15</p>
        <h2>Start speaking from the first lesson</h2>
        <p>Introductions, verb be, countries, numbers, practical English, everyday things, demonstratives and adjectives.</p>
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
        </ol>
      </article>
      <article className="panel">
        <h3>Audio note</h3>
        <p>All recordings used on PDF pages 5-15 are included beside their exercises. Combined activities have a separate player for every original track number.</p>
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

function LessonVisual({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="lesson-visual"><img src={src} alt={alt} /><figcaption>{caption}</figcaption></figure>;
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

function GapSelect({ title, questions, options }: { title: string; questions: GapQuestion[]; options: string[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const uniqueOptions = [...new Set(options)];
  const [optionOrders] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(questions.map((question) => [question.prompt, shuffleOptions(uniqueOptions)])),
  );
  const correct = questions.filter((question) => answers[question.prompt] === question.answer).length;
  return <InteractiveCard title={title}><div className="question-list">{questions.map((question) => {
    const value = answers[question.prompt] ?? '';
    return <label className={`question-row ${value ? (value === question.answer ? 'correct' : 'wrong') : ''}`} key={question.prompt}><span>{question.prompt}</span><select value={value} onChange={(event) => setAnswers((current) => ({ ...current, [question.prompt]: event.target.value }))}><option value="">Choose</option>{(optionOrders[question.prompt] ?? uniqueOptions).map((option) => <option value={option} key={option}>{option}</option>)}</select></label>;
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
