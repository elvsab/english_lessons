import { useState } from 'react';

type SavedWord = {
  id: string;
  term: string;
  note: string;
  section: string;
  lessonId: string;
};

const audio = {
  track226: './audio/track-2-26.mp3',
  track227: './audio/track-2-27.mp3',
  track228: './audio/track-2-28.mp3',
  track229: './audio/track-2-29.mp3',
  track230: './audio/track-2-30.mp3',
  track231: './audio/track-2-31.mp3',
  track232: './audio/track-2-32.mp3',
};

const escapeText = [
  `A few years ago I was going through the process of splitting up with my first serious girlfriend. She went away to Greece for the summer and when she came back she'd had a holiday romance with some Belgian guy. As if that wasn't enough, it seemed that the guy in question was going to show up in London some time over the next few weeks. After three hellish days and nights, I realised that I was dangerously close to losing my head. I biked over to my dad's flat and emotionally blackmailed him into lending me enough cash to leave the country.`,
  `On that trip I learnt something very important. Escape through travel works. Almost from the moment I boarded my flight, life in England became meaningless. Seat-belt signs lit up, problems switched off. Broken armrests took precedence over broken hearts. By the time the plane was airborne I'd forgotten England even existed.`,
];

const beachText = `Think about a lagoon, hidden from the sea and passing boats by a high, curving wall of rock. Then imagine white sands and coral gardens never damaged by dynamite fishing or trawling nets. Freshwater falls scatter the island, surrounded by jungle - not the forests of inland Thailand, but jungle. Canopies three levels deep, plants untouched for a thousand years, strangely coloured birds and monkeys in the trees. On the white sands, fishing in the coral gardens, a select community of travellers pass the months. They leave if they want to, they return, the beach never changes.`;

const coastText = [
  `Nick Campbell sat at the side of the road and wondered what to do next. He looked at the second-hand Harley-Davidson he'd bought from a back-street garage in Miami at the beginning of his trip six weeks before.`,
  `For years he had dreamt of crossing the United States from east to west by motorbike and he'd finally decided that it was now or never. He'd given up his job, sold his car and set off for the journey of his dreams. He'd been lucky, or so he thought, to find this old Harley-Davidson and had bought it for a very reasonable price - it had cost him just $600. But five kilometres from Atlanta, he had run out of luck. The motorbike had broken down.`,
  `He pushed the bike into town and found a garage. The young mechanic told him to leave the bike overnight and come back the next day. The following morning, to his surprise, the man asked if the bike was for sale. "Certainly not," he replied, paid his bill and hit the road.`,
  `When he got to Kansas the old machine ran out of steam again. This time Nick thought about selling it and buying something more reliable, but decided to carry on. When the bike was going well, he loved it.`,
  `However, in Denver, Colorado the bike broke down yet again, so he decided to take it to a garage and offer it for sale. The mechanic told him to come back in the morning.`,
  `The next day, to his amazement, the man offered him $2,000. Realising the man must be soft in the head, but clearly not short of money, Nick asked for $3,000. The man agreed, and they signed the papers. Then the mechanic started laughing. In fact it was several minutes before he could speak, and when he could he said, "That's the worst deal you'll ever make, boy." The mechanic ...`,
];

type ChoiceQuestion = { prompt: string; answer: string; options: string[] };
type GapQuestion = { prompt: string; answer: string };

export function JourneyActivity({
  activity,
  savedWords,
  onRemoveWord,
}: {
  activity: string;
  savedWords: SavedWord[];
  onRemoveWord: (id: string) => void;
}) {
  switch (activity) {
    case 'journey-reading': return <JourneyReading />;
    case 'journey-listening': return <JourneyListening />;
    case 'deduction': return <Deduction />;
    case 'coast-to-coast': return <CoastToCoast />;
    case 'past-perfect': return <PastPerfect />;
    case 'journey-anecdote': return <JourneyAnecdote />;
    case 'directions': return <Directions />;
    case 'dictionary-labels': return <DictionaryLabels />;
    case 'vocabulary': return <Vocabulary words={savedWords} onRemoveWord={onRemoveWord} />;
    default: return <JourneyOverview />;
  }
}

function JourneyOverview() {
  return (
    <section className="content-grid">
      <article className="panel intro-panel">
        <p className="kicker">Lesson map</p>
        <h2>Journey: reasons to travel and stories from the road</h2>
        <p>Pages 68-75 combine two readings, listening, grammar, pronunciation, directions and travel anecdotes.</p>
      </article>
      <article className="panel lesson-plan">
        <h3>Suggested flow</h3>
        <ol>
          <li>Discuss reasons for travelling and read two extracts from The Beach.</li>
          <li>Identify places from travel descriptions and practise geographical names.</li>
          <li>Use modals of deduction to make confident and tentative guesses.</li>
          <li>Read and listen to the coast-to-coast motorcycle story.</li>
          <li>Study the past perfect and prepare a journey anecdote.</li>
          <li>Ask for directions and work with dictionary labels.</li>
        </ol>
      </article>
      <article className="panel">
        <h3>Independent study</h3>
        <p>Grammar sections include short explanations in Russian, and every activity page has its own vocabulary collector.</p>
      </article>
    </section>
  );
}

function JourneyReading() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Reading & Speaking · pages 68-69" title="Escape and the perfect beach" />
      <OpenPrompts
        title="Page 68 · Exercise 1: why do people travel?"
        prompts={[
          'Which reasons are important to you: broaden your experience, take a career break, escape a broken heart, visit historical sites, learn something new or get a suntan?',
          'What other reasons can you add?',
        ]}
      />
      <ReadingText title="The Beach · extract 1" paragraphs={escapeText} />
      <ChoiceGrid title="Exercise 2: why did the author go travelling?" questions={[{
        prompt: 'Choose the best summary.',
        answer: 'To escape after a painful break-up',
        options: ['To escape after a painful break-up', 'To study Greek history', 'To meet a Belgian friend'],
      }]} />
      <ChoiceGrid title="Exercise 3: true or false?" questions={[
        { prompt: "The author's girlfriend had a holiday romance in Belgium.", answer: 'False', options: ['True', 'False'] },
        { prompt: 'The author was extremely upset.', answer: 'True', options: ['True', 'False'] },
        { prompt: 'His father lent him some money.', answer: 'True', options: ['True', 'False'] },
        { prompt: 'He left England by train.', answer: 'False', options: ['True', 'False'] },
        { prompt: 'At first he missed England.', answer: 'False', options: ['True', 'False'] },
      ]} />
      <TheoryBox title="Glossary" points={[
        'split up = end a relationship; show up = arrive',
        'lose your head = become unable to think calmly',
        'emotionally blackmail = use emotions to manipulate someone',
        'take precedence over = become more important than something else',
      ]} />
      <OpenPrompts title="Speaking: places you have travelled to" prompts={[
        'List the places you have travelled to.',
        'Choose five and locate them precisely: in the north/south-west, on the coast, in the mountains, not far from, or between two places.',
      ]} />

      <ReadingText title="Page 69 · The Beach: a hidden lagoon" paragraphs={[beachText]} />
      <OpenPrompts title="Page 69 · Exercise 1: before reading" prompts={['Have you ever been to a beach like one of these? What was it like?', 'Which type of beach would you most like to visit, and why?']} />
      <ChoiceGrid title="Exercise 1: which place does the extract describe?" questions={[{
        prompt: 'Choose the matching photo description.',
        answer: 'Photo b · a hidden tropical lagoon with white sand and jungle',
        options: ['Photo a · a busy resort beach', 'Photo b · a hidden tropical lagoon with white sand and jungle', 'Photo c · a wide city beach'],
      }]} />
      <ChoiceGrid title="Exercise 2: true or false?" questions={[
        { prompt: 'The lagoon is visible from the sea.', answer: 'False', options: ['True', 'False'] },
        { prompt: 'A wall of rock overlooks the beach.', answer: 'True', options: ['True', 'False'] },
        { prompt: 'The beach is unspoilt by fishermen.', answer: 'True', options: ['True', 'False'] },
        { prompt: 'There are waterfalls in different parts of the island.', answer: 'True', options: ['True', 'False'] },
        { prompt: 'There are forests all around the island.', answer: 'False', options: ['True', 'False'] },
        { prompt: 'Large groups of tourists visit the beach.', answer: 'False', options: ['True', 'False'] },
      ]} />
      <GapSelect title="Exercise 3: complete the descriptions of Bondi and Portinatx" options={[
        'white sands', 'beach community', 'popular with tourists', 'southern', 'spectacular views', 'overlooking', 'sandy', 'hidden', 'surrounded by', 'sun loungers',
      ]} questions={[
        { prompt: 'Bondi: The ___ stretch for roughly a kilometre between two headlands.', answer: 'white sands' },
        { prompt: "Bondi: It is the heart and soul of Sydney's ___.", answer: 'beach community' },
        { prompt: 'Bondi: It is not only ___.', answer: 'popular with tourists' },
        { prompt: 'Bondi: Local people walk at the ___ end of the beach.', answer: 'southern' },
        { prompt: 'Bondi: The most ___ of the coast can be seen from the cliffs.', answer: 'spectacular views' },
        { prompt: 'Bondi: The cliffs are ___ the bay.', answer: 'overlooking' },
        { prompt: 'Portinatx: Ibiza has long ___ stretches packed with bars and watersports.', answer: 'sandy' },
        { prompt: 'Portinatx: It also has delightful ___ coves.', answer: 'hidden' },
        { prompt: 'Portinatx: The white-sand bay is ___ pine forests.', answer: 'surrounded by' },
        { prompt: 'Portinatx: There are ___ for hire.', answer: 'sun loungers' },
      ]} />
      <OpenPrompts title="Exercise 4: talk about your city or country" prompts={[
        'Which places are still unspoilt? Which beaches are packed with bars and restaurants?',
        'Where are the views spectacular? Where do young people hang out?',
        'Which places are popular with tourists, and which are usually quiet?',
      ]} />
    </section>
  );
}

function JourneyListening() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Listening · page 70" title="Four journeys, four landscapes" />
      <InteractiveCard title="Exercise 1: look at the four travel scenes">
        <div className="scene-grid">
          {[
            ['a', 'A horse rider crossing wide grasslands below snow-capped mountains'],
            ['b', 'A dense skyline of modern high-rise buildings'],
            ['c', 'Green forests and powerful waterfalls'],
            ['d', 'Buddhist temples among ancient ruins'],
          ].map(([label, description]) => <div className="scene-card" key={label}><strong>{label}</strong><p>{description}</p></div>)}
        </div>
      </InteractiveCard>
      <OpenPrompts title="Before listening" prompts={['Where do you think each of the four photos was taken? Explain the clues you used.']} />
      <AudioCard title="Audio 2.26" description="Listen and put the scenes in the order you hear them." src={audio.track226} />
      <GapSelect title="Exercise 1: listening order" options={['1', '2', '3', '4']} questions={[
        { prompt: 'Scene a · grasslands and snow-capped mountains', answer: '4' },
        { prompt: 'Scene b · built-up skyline and high-rise buildings', answer: '2' },
        { prompt: 'Scene c · forests and waterfalls', answer: '1' },
        { prompt: 'Scene d · ancient ruins and Buddhist temples', answer: '3' },
      ]} />
      <ChoiceGrid title="Exercise 2: match each scene to a possible country" questions={[
        { prompt: 'Scene a', answer: 'Argentina', options: ['Argentina', 'Singapore', 'Vietnam', 'Thailand'] },
        { prompt: 'Scene b', answer: 'Singapore', options: ['Argentina', 'Singapore', 'Vietnam', 'Thailand'] },
        { prompt: 'Scene c', answer: 'Vietnam', options: ['Argentina', 'Singapore', 'Vietnam', 'Thailand'] },
        { prompt: 'Scene d', answer: 'Thailand', options: ['Argentina', 'Singapore', 'Vietnam', 'Thailand'] },
      ]} />
      <ChoiceGrid title="Exercise 2: match the landscape words to the photos" questions={[
        { prompt: 'Photo a', answer: 'grasslands · snow-capped mountains', options: ['grasslands · snow-capped mountains', 'built-up skyline · high-rise buildings', 'forests · waterfalls', 'ancient ruins · Buddhist temples'] },
        { prompt: 'Photo b', answer: 'built-up skyline · high-rise buildings', options: ['grasslands · snow-capped mountains', 'built-up skyline · high-rise buildings', 'forests · waterfalls', 'ancient ruins · Buddhist temples'] },
        { prompt: 'Photo c', answer: 'forests · waterfalls', options: ['grasslands · snow-capped mountains', 'built-up skyline · high-rise buildings', 'forests · waterfalls', 'ancient ruins · Buddhist temples'] },
        { prompt: 'Photo d', answer: 'ancient ruins · Buddhist temples', options: ['grasslands · snow-capped mountains', 'built-up skyline · high-rise buildings', 'forests · waterfalls', 'ancient ruins · Buddhist temples'] },
      ]} />
      <OpenPrompts title="Speaking" prompts={['Which scene would you most like to visit? Explain why.', 'Describe a memorable landscape from one of your journeys.']} />
    </section>
  );
}

function Deduction() {
  const countryOptions = ['Angola', 'Argentina', 'Brazil', 'Cuba', 'Mexico', 'Mozambique', 'Peru', 'Portugal', 'Spain', 'Uruguay'];
  return (
    <section className="stack">
      <PageTitle eyebrow="Grammar & Pronunciation · page 71" title="Modals of deduction" />
      <TheoryBox title="Theory: how certain are you?" points={[
        'must + infinitive: you are almost certain something is true. It must be Spain.',
        "can't + infinitive: you are almost certain something is impossible. It can't be Peru.",
        'might / may / could + infinitive: something is possible, but you are not sure. It might be Portugal.',
      ]} />
      <article className="language-hint"><h3>Подсказка ученику</h3><p><strong>Must</strong> здесь означает уверенный вывод, а не обязанность. <strong>Can’t</strong> выражает уверенность, что догадка неверна. <strong>Might, may, could</strong> показывают возможность.</p></article>
      <ChoiceGrid title="Exercise 1: choose the modal" questions={[
        { prompt: 'I am certain it is this place. It ___ be Spain.', answer: 'must', options: ['must', 'might', "can't"] },
        { prompt: 'Perhaps it is this place. It ___ be Portugal.', answer: 'might / may / could', options: ['must', 'might / may / could', "can't"] },
        { prompt: 'I am certain it is not this place. It ___ be Peru.', answer: "can't", options: ['must', 'might / may / could', "can't"] },
      ]} />
      <GapSelect title="Exercise 2: identify the countries from the clues" options={countryOptions} questions={[
        { prompt: 'a · over 40m people · biggest city about 4m · Spanish · highest mountain 3,718m · exports chemicals, fruit, cars', answer: 'Spain' },
        { prompt: 'b · nearly 11m people · biggest city over 0.5m · Portuguese · 2,351m · chemicals, cork, leather', answer: 'Portugal' },
        { prompt: 'c · over 186m people · biggest city nearly 18m · Portuguese · 3,014m · animal feed, chemicals, coffee', answer: 'Brazil' },
        { prompt: 'd · over 108m people · biggest city over 18m · Spanish · 5,700m · chemicals, coffee, cotton', answer: 'Mexico' },
        { prompt: 'e · over 40m people · biggest city over 12m · Spanish · 6,962m · animal oils, meat', answer: 'Argentina' },
        { prompt: 'f · over 12m people · biggest city nearly 3m · Portuguese · 2,619m · oil, diamonds', answer: 'Angola' },
      ]} />
      <OpenPrompts title="Exercise 2: explain your deductions" prompts={[
        "Write a sentence with must be for one country and explain your evidence.",
        "Write a sentence with might be for a possible country.",
        "Write a sentence with can't be to eliminate one country.",
      ]} />
      <AudioCard title="Audio 2.27" description="Listen to the geographical names and mark the stressed syllable." src={audio.track227} />
      <AudioCard title="Audio 2.28" description="Listen, check the groups and repeat." src={audio.track228} />
      <GapSelect title="Pronunciation: classify the names" options={['continent', 'mountain range', 'ocean', 'river']} questions={[
        { prompt: 'Asia', answer: 'continent' }, { prompt: 'Antarctica', answer: 'continent' }, { prompt: 'Europe', answer: 'continent' },
        { prompt: 'Himalayas', answer: 'mountain range' }, { prompt: 'Andes', answer: 'mountain range' }, { prompt: 'Pyrenees', answer: 'mountain range' },
        { prompt: 'Pacific', answer: 'ocean' }, { prompt: 'Atlantic', answer: 'ocean' }, { prompt: 'Indian Ocean', answer: 'ocean' },
        { prompt: 'Nile', answer: 'river' }, { prompt: 'Amazon', answer: 'river' }, { prompt: 'Danube', answer: 'river' },
      ]} />
    </section>
  );
}

function CoastToCoast() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Reading & Listening · page 72" title="Coast to coast" />
      <ReadingText title="A motorcycle journey across the USA" paragraphs={coastText} />
      <OpenPrompts title="Exercise 1: understand the story" prompts={['What problems did Nick have during the journey?']} />
      <ChoiceGrid title="Exercise 1: check the key figures" questions={[
        { prompt: 'How much did Nick pay for the Harley-Davidson?', answer: '$600', options: ['$600', '$2,000', '$3,000'] },
        { prompt: 'How much did the mechanic first offer?', answer: '$2,000', options: ['$600', '$2,000', '$3,000'] },
        { prompt: 'How much did Nick ask for?', answer: '$3,000', options: ['$600', '$2,000', '$3,000'] },
      ]} />
      <OpenPrompts title="Exercise 1d: predict the ending" prompts={['Why do you think the mechanic later called it the worst deal he had ever made?']} />
      <AudioCard title="Audio 2.29" description="Listen to the end of the story and compare it with your prediction." src={audio.track229} />
      <OpenPrompts title="After listening" prompts={['Do you think the mechanic was fair?', 'How do you think Nick felt when he heard the full story?']} />
      <ChoiceGrid title="Vocabulary 1: now or never" questions={[{
        prompt: 'What does now or never mean?', answer: 'This is the only chance; it may not be possible later', options: ['Do it immediately without thinking', 'This is the only chance; it may not be possible later', 'Wait until a better time'],
      }]} />
      <GapSelect title="Vocabulary 2: complete the fixed expressions" options={[
        'take it or leave it', 'peace and quiet', 'clean and tidy', 'give or take', 'sooner or later', 'all or nothing', 'come and go',
      ]} questions={[
        { prompt: 'a · The price is final: ___.', answer: 'take it or leave it' },
        { prompt: 'b · I need some ___.', answer: 'peace and quiet' },
        { prompt: 'c · Please keep the room ___.', answer: 'clean and tidy' },
        { prompt: 'd · It takes an hour, ___ ten minutes.', answer: 'give or take' },
        { prompt: 'e · ___, you will have to make a decision.', answer: 'sooner or later' },
        { prompt: 'f · For him, the trip was ___.', answer: 'all or nothing' },
        { prompt: 'g · Travellers ___, but the beach stays the same.', answer: 'come and go' },
      ]} />
    </section>
  );
}

function PastPerfect() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Grammar · page 73" title="Past perfect" />
      <TheoryBox title="Theory: looking back from a past moment" points={[
        'Form: had + past participle. The bike had broken down. He had paid $600.',
        'Use it for an action completed before another past action or time.',
        'The later event normally uses the past simple: The engine had failed before Nick reached Denver.',
        'Negative: had not / hadn’t left. Question: Had he travelled far?',
      ]} />
      <article className="language-hint"><h3>Подсказка ученику</h3><p>Past perfect помогает показать «прошлое до прошлого». Сначала произошло действие с <strong>had + V3</strong>, затем другое действие в Past Simple.</p></article>
      <ChoiceGrid title="Exercise 1: follow the route" questions={[
        { prompt: 'Where does the main story begin?', answer: 'Atlanta', options: ['Miami', 'Atlanta', 'San Francisco'] },
        { prompt: 'Where did the journey begin?', answer: 'Miami', options: ['Miami', 'Atlanta', 'San Francisco'] },
        { prompt: 'Where was the journey meant to finish?', answer: 'San Francisco', options: ['Miami', 'Atlanta', 'San Francisco'] },
      ]} />
      <GapSelect title="Exercise 2: where had each event happened?" options={['Miami', 'Atlanta', 'Kansas', 'Denver']} questions={[
        { prompt: 'a · The engine started making strange noises.', answer: 'Atlanta' },
        { prompt: 'b · Nick had dreamt of crossing the USA.', answer: 'Miami' },
        { prompt: 'c · He bought the second-hand Harley-Davidson.', answer: 'Miami' },
        { prompt: 'd · He began the journey.', answer: 'Miami' },
        { prompt: 'e · The electrical system failed.', answer: 'Kansas' },
        { prompt: 'f · The motorcycle stopped again.', answer: 'Denver' },
      ]} />
      <ModelAnswers title="Exercise 3: complete the story with your ideas" prompts={[
        'Michael was looking forward to his trip to Moscow because ...',
        'He was late leaving home because ...',
        'The traffic was moving slowly because ...',
        'He had to sit in the back seat because ...',
        'The departure was delayed because ...',
        'As the plane was taking off, he remembered that ...',
      ]} answers={[
        'he had never visited Russia before.', 'he had forgotten his passport.', 'there had been an accident.', 'the driver had filled the front seat with luggage.', 'the plane had developed a technical problem.', 'he had left his wallet at home.',
      ]} />
    </section>
  );
}

function JourneyAnecdote() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Speaking · 2.30 · page 73" title="A journey to the Red Sea" />
      <AudioCard title="Audio 2.30" description="Listen to Suzi's anecdote. Find and correct the wrong information." src={audio.track230} />
      <ChoiceGrid title="Exercise 1: correct the journey notes" questions={[
        { prompt: 'a · They went to the Dead Sea.', answer: 'Red Sea', options: ['Correct as written', 'Red Sea'] },
        { prompt: "b · They visited Christopher's Monastery.", answer: "St Catherine's Monastery", options: ['Correct as written', "St Catherine's Monastery"] },
        { prompt: 'c · The main activity was diving.', answer: 'windsurfing', options: ['Correct as written', 'windsurfing'] },
        { prompt: 'd · They travelled in a big van.', answer: 'minivan', options: ['Correct as written', 'minivan'] },
        { prompt: 'e · The weather was hot and windy.', answer: 'hot, with no wind', options: ['Correct as written', 'hot, with no wind'] },
        { prompt: 'f · She went with seven tourists, a guide and a driver.', answer: 'Correct as written', options: ['Correct as written', 'eight other tourists'] },
        { prompt: 'g · The journey took three hours.', answer: 'two hours', options: ['Correct as written', 'two hours'] },
        { prompt: 'h · She loved the sea on the way.', answer: 'scenery', options: ['Correct as written', 'scenery'] },
        { prompt: 'i · She took photos and bought food.', answer: 'souvenirs', options: ['Correct as written', 'souvenirs'] },
        { prompt: 'j · Next time she would go in her own car.', answer: 'a rented car, on her own', options: ['Correct as written', 'a rented car, on her own'] },
      ]} />
      <OpenPrompts title="Exercise 2: prepare your journey anecdote" prompts={[
        'Where did you go and when?', 'Why did you go?', 'Who did you go with?', 'How did you travel?', 'How long did the journey take?', 'What was the weather like?', 'What happened during the journey?', 'What did you see or do?', 'What did you like or dislike?', 'Would you make the same journey again?',
      ]} />
    </section>
  );
}

function Directions() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Useful phrases · page 74" title="Asking for and giving directions" />
      <AudioCard title="Audio 2.31" description="Listen to the conversation and answer the questions." src={audio.track231} />
      <ReadingText title="Conversation" paragraphs={[
        `Angie: Rick, do you know where we are? Rick: Yes, of course. Why? Angie: Because we've passed the same supermarket twice. Rick: Oh dear. Angie: You'd better stop and ask somebody.`,
        `Rick: OK. Excuse me, I'm trying to get to Andover. Do you know how we can get onto the A34 from here? Man 1: Yes, first you need to turn round and then take the first turning on the left. Go to the end of the road and you'll come to a roundabout. Take the third exit and you'll come onto the A34.`,
        `Rick: Great, thanks. Did he say left or right? Angie: I can't remember. Look, stop and ask that woman. Rick: Excuse me, we're looking for the road to Andover. Could you tell me which way we need to go? Woman: Andover? Go straight down here until you come to a petrol station. Then turn left and follow the signs.`,
        `Rick: OK, thanks. I haven't seen the petrol station yet. Angie: No, neither have I, but here's that supermarket again. Rick: Oh no. Excuse me, we're lost. Do you have any idea where the A34 is? Man 2: Er, no, sorry.`,
      ]} />
      <ChoiceGrid title="Exercise 1: understand the route" questions={[
        { prompt: 'Where are the speakers trying to get to?', answer: 'Andover', options: ['Oxford', 'Andover', 'London'] },
        { prompt: 'Which road do they need?', answer: 'A34', options: ['A30', 'A34', 'M4'] },
        { prompt: 'How many times do they pass the supermarket?', answer: 'three times', options: ['once', 'twice', 'three times'] },
      ]} />
      <GapSelect title="Exercise 2: complete the useful phrases" options={[
        'to get to', 'for the road to', 'we can get onto', 'way we need to go', 'the A34 is', 'round', 'first turning on', 'come to a roundabout', 'exit', 'you come to a petrol station', 'the signs',
      ]} questions={[
        { prompt: 'a · Do you know how ___ Andover?', answer: 'to get to' },
        { prompt: "b · Excuse me, we're looking ___ Andover.", answer: 'for the road to' },
        { prompt: 'c · Do you know how ___ the A34?', answer: 'we can get onto' },
        { prompt: 'd · Could you tell me which ___?', answer: 'way we need to go' },
        { prompt: 'e · Do you know where ___?', answer: 'the A34 is' },
        { prompt: 'f1 · Turn ___ ...', answer: 'round' },
        { prompt: 'f2 · ... and take the ___ the left.', answer: 'first turning on' },
        { prompt: "g · Go to the end of the road and you'll ___.", answer: 'come to a roundabout' },
        { prompt: 'h · Take the third ___.', answer: 'exit' },
        { prompt: 'i · Go straight on until ___.', answer: 'you come to a petrol station' },
        { prompt: 'j · Then follow ___.', answer: 'the signs' },
      ]} />
      <AudioCard title="Audio 2.32" description="Listen, check and repeat the useful phrases." src={audio.track232} />
      <TheoryBox title="Polite indirect questions" points={[
        'Start with Do you know..., Could you tell me..., or Do you have any idea...?',
        'After the opening phrase, use statement word order: Do you know where the station is?',
        'Do not use do/does again: Could you tell me how I can get there?',
      ]} />
      <article className="language-hint"><h3>Подсказка ученику</h3><p>В косвенном вопросе порядок слов прямой: <strong>where the station is</strong>, а не <strong>where is the station</strong>.</p></article>
      <ModelAnswers title="Exercise 3: make the questions more polite" prompts={[
        "Where's the nearest bank?", 'How can I get to the airport from here?', 'Which way do I need to go to get to the bus station?', 'How can I get to the centre of town from here?', 'Where can I get a taxi?', 'How can I get to the cinema from here?',
      ]} answers={[
        'Do you know where the nearest bank is?', 'Do you know how I can get to the airport from here?', 'Could you tell me which way I need to go to get to the bus station?', 'Do you have any idea how I can get to the centre of town from here?', 'Could you tell me where I can get a taxi?', 'Do you know how I can get to the cinema from here?',
      ]} />
    </section>
  );
}

function DictionaryLabels() {
  return (
    <section className="stack">
      <PageTitle eyebrow="Vocabulary Extra · page 75" title="Understanding dictionary labels" />
      <ChoiceGrid title="Exercise 1: match the dictionary label with its meaning" questions={[
        { prompt: 'formal', answer: 'not normally used in everyday speech or writing', options: ['used in American but not British English', 'not normally used in everyday speech or writing', 'common in speech but not formal writing', 'used in British but not American English'] },
        { prompt: 'American', answer: 'used in American but not British English', options: ['used in American but not British English', 'not normally used in everyday speech or writing', 'common in speech but not formal writing', 'used in British but not American English'] },
        { prompt: 'informal', answer: 'common in speech but not formal writing', options: ['used in American but not British English', 'not normally used in everyday speech or writing', 'common in speech but not formal writing', 'used in British but not American English'] },
        { prompt: 'British', answer: 'used in British but not American English', options: ['used in American but not British English', 'not normally used in everyday speech or writing', 'common in speech but not formal writing', 'used in British but not American English'] },
      ]} />
      <GapSelect title="Exercise 2: label the word groups" options={['American', 'informal', 'formal']} questions={[
        { prompt: 'candy · sidewalk · trash can', answer: 'American' },
        { prompt: 'booze · guy · nerd', answer: 'informal' },
        { prompt: 'alight · beverage · refrain', answer: 'formal' },
      ]} />
      <TheoryBox title="Dictionary extracts" points={[
        'alight / disembark / dismount (formal): get off a vehicle, ship or bicycle',
        'beverage / purchase / persons / refrain / permissible (formal)',
        'downtown / freeway / sidewalk / subway / trash can / truck / yard (American)',
        'nerd (informal): someone considered boring and unfashionable',
      ]} />
      <ModelAnswers title="Exercise 3: rewrite the notices in less formal English" prompts={[
        'Kindly refrain from smoking in this area.', 'Foot passengers please disembark via steps at front of ferry.', 'All cyclists must dismount here.', 'The use of calculators is not permissible.', 'Do not alight from train whilst still in motion.', 'Alcoholic beverages cannot be purchased by persons under 18.',
      ]} answers={[
        "Please don't smoke around here.", 'Passengers on foot, please get off using the steps at the front.', 'Cyclists, please get off your bikes here.', "You can't use calculators.", "Don't get off the train while it is moving.", "People under 18 can't buy alcoholic drinks.",
      ]} />
      <OpenPrompts title="Exercise 3: understand the notices" prompts={[
        'Where might you see the no-smoking notice?', 'Where might foot passengers see the disembark notice?', 'Where might cyclists see the dismount notice?', 'Where might calculators be forbidden?', 'Where might you see the notice about a moving train?', 'Where might you see the notice about alcoholic drinks?',
      ]} />
      <ModelAnswers title="Exercise 4: rewrite the sentences in British English" prompts={[
        'Last year I took my vacation in the fall.', 'Put the trash can in the yard.', 'Would you like some candy and cookies?', 'The truck was driving on the freeway.', 'Take the subway downtown.', 'There is a mailbox on the sidewalk.',
      ]} answers={[
        'Last year I went on holiday in autumn.', 'Put the bin in the garden.', 'Would you like some sweets and biscuits?', 'The lorry was driving on the motorway.', 'Take the underground to the city centre.', 'There is a postbox on the pavement.',
      ]} />
      <OpenPrompts title="Exercise 4: discuss" prompts={['Are any of the six statements true for you? Explain your answer.']} />
      <OpenPrompts title="Exercise 5: use a dictionary" prompts={['Find two more words labelled American, British, formal or informal. Record the word, its meaning and its neutral equivalent.']} />
    </section>
  );
}

function PageTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="page-title"><p className="kicker">{eyebrow}</p><h2>{title}</h2></div>;
}

function InteractiveCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="panel"><h3>{title}</h3>{children}</article>;
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
  const correct = questions.filter((question) => answers[question.prompt] === question.answer).length;
  return (
    <InteractiveCard title={title}>
      <div className="choice-grid">{questions.map((question) => <div className="choice-card" key={question.prompt}><p>{question.prompt}</p><div className="choice-options">{question.options.map((option) => {
        const chosen = answers[question.prompt] === option;
        return <button className={`choice-button ${chosen ? 'chosen' : ''} ${chosen ? (option === question.answer ? 'correct' : 'wrong') : ''}`} type="button" key={option} onClick={() => setAnswers((current) => ({ ...current, [question.prompt]: option }))}>{option}</button>;
      })}</div></div>)}</div>
      <p className="result">{Object.keys(answers).length ? `${correct}/${questions.length} correct` : 'Choose answers to start checking.'}</p>
    </InteractiveCard>
  );
}

function GapSelect({ title, questions, options }: { title: string; questions: GapQuestion[]; options: string[] }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const correct = questions.filter((question) => answers[question.prompt] === question.answer).length;
  return (
    <InteractiveCard title={title}>
      <div className="question-list">{questions.map((question) => {
        const value = answers[question.prompt] ?? '';
        return <label className={`question-row ${value ? (value === question.answer ? 'correct' : 'wrong') : ''}`} key={question.prompt}><span>{question.prompt}</span><select value={value} onChange={(event) => setAnswers((current) => ({ ...current, [question.prompt]: event.target.value }))}><option value="">Choose</option>{options.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>;
      })}</div>
      <p className="result">{Object.keys(answers).length ? `${correct}/${questions.length} correct` : 'Choose answers to start checking.'}</p>
    </InteractiveCard>
  );
}

function OpenPrompts({ title, prompts }: { title: string; prompts: string[] }) {
  return <InteractiveCard title={title}><div className="open-prompts">{prompts.map((prompt, index) => <label key={prompt}><span>{index + 1}. {prompt}</span><textarea placeholder="Write your answer here." /></label>)}</div></InteractiveCard>;
}

function ModelAnswers({ title, prompts, answers }: { title: string; prompts: string[]; answers: string[] }) {
  const [visible, setVisible] = useState(false);
  return (
    <InteractiveCard title={title}>
      <div className="open-prompts">{prompts.map((prompt, index) => <label key={prompt}><span>{index + 1}. {prompt}</span><textarea placeholder="Write your answer here." />{visible && <small className="model-answer">Model: {answers[index]}</small>}</label>)}</div>
      <button className="secondary-action" type="button" onClick={() => setVisible((current) => !current)}>{visible ? 'Hide model answers' : 'Show model answers'}</button>
    </InteractiveCard>
  );
}

function Vocabulary({ words, onRemoveWord }: { words: SavedWord[]; onRemoveWord: (id: string) => void }) {
  return (
    <section className="stack">
      <PageTitle eyebrow="Notebook" title="My Journey words" />
      <InteractiveCard title={`Saved vocabulary · ${words.length}`}>
        {words.length === 0 ? <p className="empty-state">Add unfamiliar words at the bottom of any Journey page. They will appear here.</p> : <div className="saved-words">{words.map((word) => <div className="saved-word" key={word.id}><div><strong>{word.term}</strong><span>{word.note || 'No translation or note yet'}</span></div><small>{word.section}</small><button className="remove-word" type="button" onClick={() => onRemoveWord(word.id)} aria-label={`Remove ${word.term}`} title="Remove word">×</button></div>)}</div>}
      </InteractiveCard>
    </section>
  );
}
