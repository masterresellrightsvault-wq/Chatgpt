/* Catch-Up Quest — lesson content.
   Question formats (the correct answer is always listed first; the app shuffles):
     m(question, [right, wrong, wrong...], hint, extra)   multiple choice
     o(question, [items in the correct order], hint)      put in order
     s(question, {Group: [items], Group2: [items]}, hint) sort into groups
     p(question, [[left, right], ...], hint)              match pairs
   extra = { v: "visualName" } shows a picture with the question.
   Maths lessons use generators (g) that make new questions every time. */
window.QC = (function () {
  const learn = (title, body, v) => ["l", title, body, v];
  const m = (q, opts, hint, extra) => ["m", q, opts, hint, extra];
  const o = (q, items, hint) => ["o", q, items, hint];
  const s = (q, groups, hint) => ["s", q, groups, hint];
  const p = (q, pairs, hint) => ["p", q, pairs, hint];
  const L = (id, t, n, c, q, extra) => Object.assign({ id, t, n, c, q: q || [] }, extra || {});

  /* ───────────────────────── ENGLISH ───────────────────────── */
  const english = [
    // Level 1 · Year 5 skills
    L("e1-spell", 1, "Tricky word spells",
      [learn("Tricky words", "Some words don’t follow the sound rules. You just have to learn them.\n- Break the word into chunks: **be-cause**, **dif-fer-ent**.\n- Find a small word inside: fri**end** has **end** at the end.\n- Tap the speaker to hear the word. Say it while you look at it.")],
      [], { g: ["spell"], gn: 6, k: "Pick 3 words you found tricky. Write each one in the air with your finger, then with Blu Tack snakes, then on paper." }),

    L("e1-sentences", 1, "Build a sentence",
      [learn("What makes a sentence?", "A sentence is one complete idea.\n- It starts with a **capital letter**.\n- It says **who** or **what**.\n- It says what they **do**.\n- It ends with **. ? or !**")],
      [
        o("Put the words in order to make a sentence.", ["The", "dragon", "guarded", "the", "gold."], "Start with the capital letter: The. End with the full stop: gold."),
        o("Put the words in order to make a sentence.", ["My", "friend", "joined", "the", "game", "late."], "Who? My friend. Did what? Joined the game. When? Late."),
        o("Put the words in order to make a question.", ["Where", "did", "you", "hide", "the", "key?"], "Questions often start with a question word like Where, What or Why."),
        m("Which is a complete sentence?", ["The creeper exploded.", "the creeper exploded", "Exploded the creeper.", "The creeper."], "It needs a capital letter, a who (the creeper), a doing word (exploded) and a full stop."),
        m("Which one needs a question mark?", ["Where is the save point", "I found the save point", "The save point is near the door", "Save the game now"], "A question asks something. ‘Where is…’ is asking."),
        m("Which sentence has the right capital letters?", ["On Saturday, Sam played Fortnite.", "on saturday, sam played fortnite.", "On saturday, Sam played fortnite.", "on Saturday, sam played Fortnite."], "Capitals go at the start of a sentence and on names: days (Saturday), people (Sam) and game titles (Fortnite).")
      ], { k: "Say 3 sentences out loud about your favourite game. Clap for the capital letter at the start, and stamp your foot for the full stop at the end." }),

    L("e1-words", 1, "Nouns, verbs and adjectives",
      [learn("Three types of words", "- **Noun**: a person, place or thing. (player, castle, sword)\n- **Verb**: a doing word. (jump, build, run)\n- **Adjective**: a describing word. (huge, shiny, scary)\n\nTest: put **the** in front. ‘The castle’ works, so castle is a noun. Put **I can** in front. ‘I can jump’ works, so jump is a verb.")],
      [
        s("Sort each word into the right box.", { "Noun": ["castle", "player", "sword"], "Verb": ["jump", "build", "run"], "Adjective": ["shiny", "huge", "scary"] }, "Noun = thing. Verb = action. Adjective = describes a noun."),
        m("‘The huge zombie chased me.’ Which word is the verb?", ["chased", "huge", "zombie", "me"], "The verb is the action. What did the zombie do? It chased."),
        m("‘Alex found a rare diamond.’ Which word is the adjective?", ["rare", "found", "diamond", "Alex"], "The adjective describes the diamond. What kind of diamond? A rare one."),
        m("‘The knight rode to the castle.’ Which word is a noun?", ["castle", "rode", "to", "the"], "A noun is a thing or a place. The castle is a place."),
        s("Sort these words.", { "Noun": ["controller", "village"], "Verb": ["explore", "shout"], "Adjective": ["quiet", "golden"] }, "Try ‘the controller’ (noun), ‘I can explore’ (verb), ‘a quiet room’ (adjective).")
      ]),

    L("e1-glitch", 1, "Reading quest: The Glitch",
      [learn("Read the story", "Mia loaded her favourite game after school. She wanted to finish Level 3 before dinner.\n\nBut when her character jumped over the lava, the screen froze. A strange purple square appeared in the sky. Mia pressed every button. Nothing happened.\n\nThen the square opened like a door, and a tiny robot rolled out. ‘Help me,’ it beeped. ‘The game is breaking.’\n\nMia grabbed a notebook and a pencil. If she was going to fix a glitch, she needed a plan.")],
      [
        m("When did Mia play the game?", ["After school", "Before school", "At lunch", "At midnight"], "Look at the first sentence: ‘Mia loaded her favourite game after school.’"),
        m("What colour was the square?", ["Purple", "Green", "Red", "Blue"], "‘A strange purple square appeared in the sky.’"),
        m("What came out of the square?", ["A tiny robot", "A dragon", "A zombie", "A cat"], "‘A tiny robot rolled out.’"),
        m("Why did Mia grab a notebook?", ["To make a plan to fix the glitch", "To do her homework", "To draw the robot", "To write her score"], "The last sentence says she needed a plan."),
        m("How do you think Mia felt when the screen froze?", ["Surprised or worried", "Sleepy", "Bored", "Angry at her friend"], "Clue: she pressed every button. People do that when they are surprised or worried.")
      ], { k: "Tell someone what you think happens next in the story. Just say it out loud. No writing needed." }),

    // Level 2 · Year 6 skills
    L("e2-conj", 2, "Joining words",
      [learn("Glue words", "Joining words (conjunctions) glue two ideas together.\n- **and** adds more\n- **but** shows a change\n- **so** shows a result\n- **because** gives a reason\n- **when** tells the time\n- **although** means ‘even though’")],
      [
        m("I wanted to play, ___ my tablet was flat.", ["but", "because", "and", "so"], "A flat tablet is a problem. It changes what you wanted. That’s ‘but’."),
        m("I practised every day, ___ I got much better.", ["so", "but", "although", "when"], "Getting better is the result of practising. Results use ‘so’."),
        m("We stayed inside ___ it was raining.", ["because", "but", "so", "or"], "The rain is the reason. Reasons use ‘because’."),
        m("___ the boss appeared, everyone ran and hid.", ["When", "But", "So", "And"], "This tells us the time it happened. ‘When’ tells time."),
        m("___ it was late, we kept playing.", ["Although", "Because", "So", "And"], "‘Although’ means ‘even though’. Even though it was late, we kept playing."),
        m("Which sentence joins the ideas best?", ["I love racing games because they are fast.", "I love racing games. Because they are fast.", "I love racing games so because fast.", "Because I love racing games they."], "One joining word, and the whole thing makes sense as one sentence.")
      ]),

    L("e2-prefix", 2, "Word parts: prefixes and suffixes",
      [learn("Build words from parts", "A **prefix** goes at the start. A **suffix** goes at the end. They change the meaning.\n- **un**happy = not happy\n- **re**build = build again\n- **pre**view = see before\n- fear**less** = without fear\n- help**ful** = full of help")],
      [
        p("Match each word part to its meaning.", [["un-", "not"], ["re-", "again"], ["pre-", "before"], ["-less", "without"], ["-ful", "full of"]], "Think of words you know: unhappy, replay, preview, homeless, colourful."),
        m("What does ‘rebuild’ mean?", ["Build again", "Not build", "Build before", "Build badly"], "re- means again. Rebuild = build again."),
        m("Which word means ‘without fear’?", ["fearless", "fearful", "unfear", "refear"], "-less means without. Fear + less = fearless."),
        m("What does ‘unbeatable’ mean?", ["It cannot be beaten", "It was beaten again", "It is easy to beat", "It was beaten before"], "un- = not. -able = can be. Unbeatable = can not be beaten."),
        m("Which word means ‘play again’?", ["replay", "unplay", "playful", "preplay"], "re- means again.")
      ]),

    L("e2-para", 2, "Paragraph power",
      [learn("What is a paragraph?", "A paragraph is a group of sentences about **one** main idea.\n- The first sentence is the **topic sentence**. It tells the main idea.\n- The middle sentences give details or examples.\n- The last sentence wraps it up.\n- New idea? Start a new paragraph.")],
      [
        m("Which is the best topic sentence for a paragraph about why dogs make good pets?", ["Dogs make great pets for lots of reasons.", "I have a cat called Toby.", "Dogs have four legs and a tail.", "My friend’s name is Sam."], "A topic sentence tells the main idea of the whole paragraph."),
        o("Put this paragraph in order.", ["Minecraft is a game about building and exploring.", "Players collect blocks to make anything they can imagine.", "They can also explore caves and fight monsters.", "That is why millions of people love it."], "Topic sentence first. Details in the middle. The wrap-up (That is why…) goes last."),
        m("A paragraph is about healthy sleep. Which sentence does NOT belong?", ["My favourite food is pizza.", "Teenagers need about 9 hours of sleep.", "Screens before bed can keep you awake.", "Good sleep helps your memory."], "Every sentence should be about the main idea. Pizza is not about sleep."),
        m("When should you start a new paragraph?", ["When you start a new idea", "After every sentence", "Only at the very end", "When you get tired"], "New idea = new paragraph.")
      ], { k: "Go to the Writing Lab and try the Hamburger Paragraph." }),

    L("e2-infer", 2, "Reading between the lines",
      [learn("Inference", "Writers don’t always tell you everything. You use **clues** to work it out. That’s called **inference**.\n\nRead this:\n\nJayden’s hands were shaking as he held the controller. The crowd at the gaming tournament went quiet. He could hear his heart thumping. On the big screen, the words FINAL ROUND flashed. Jayden took a deep breath, wiped his hands on his jeans, and pressed Start.")],
      [
        m("How is Jayden feeling?", ["Nervous", "Bored", "Sleepy", "Angry"], "Shaking hands and a thumping heart are clues that someone is nervous."),
        m("Which clue shows how he feels?", ["His hands were shaking", "He pressed Start", "The screen said FINAL ROUND", "He was wearing jeans"], "Look for what his body is doing."),
        m("Why did he wipe his hands on his jeans?", ["They were sweaty from nerves", "They were dirty from food", "He was cold", "He dropped the controller"], "Nervous people often get sweaty hands."),
        m("Where is Jayden?", ["At a gaming tournament", "At school", "At home alone", "At the beach"], "‘The crowd at the gaming tournament went quiet.’"),
        m("Why did the crowd go quiet?", ["The final round was about to start", "They went home", "The power went out", "They were asleep"], "The screen said FINAL ROUND. Crowds go quiet before a big moment.")
      ]),

    // Level 3 · Year 7 skills
    L("e3-persuade", 3, "Persuasive techniques",
      [learn("Tricks writers use to convince you", "- **Rhetorical question**: a question that makes you think. ‘Who wants less fun?’\n- **Emotive language**: strong words that make you feel. ‘Cruel’, ‘heartbreaking’.\n- **Statistics**: numbers that sound like proof. ‘9 out of 10…’\n- **Expert opinion**: what a doctor or scientist says.\n- **Repetition**: saying something again to make it stick.")],
      [
        p("Match each technique to its example.", [["Rhetorical question", "Who doesn’t want a longer lunch break?"], ["Emotive language", "Cancelling sport is cruel and heartbreaking."], ["Statistic", "9 out of 10 students agree."], ["Expert opinion", "Doctors say teens need 9 hours of sleep."], ["Repetition", "We need change. We need it now. We need it today."]], "Read the example. Is it a question? Numbers? A doctor? Strong feelings? The same words again?"),
        m("‘Isn’t it time we gave students a say?’ This is a…", ["Rhetorical question", "Statistic", "Fact", "Expert opinion"], "It’s a question that doesn’t need an answer. It makes you think."),
        m("Which sentence uses emotive language?", ["Innocent animals are suffering in terrible conditions.", "There are 20 animals at the shelter.", "The shelter opens at 9am.", "Animals need food."], "Emotive language uses strong feeling words: innocent, suffering, terrible."),
        m("Why do writers use statistics?", ["To make their argument sound proven", "To make it funny", "To tell a story", "To ask a question"], "Numbers make it sound like there is proof.")
      ], { k: "Watch one ad on TV or YouTube. Which persuasive trick did it use? Tell someone." }),

    L("e3-fact", 3, "Fact or opinion?",
      [learn("Fact vs opinion", "- A **fact** can be checked and proven true.\n- An **opinion** is what someone thinks or feels.\n- Opinion clue words: best, worst, should, I think, boring, amazing.")],
      [
        s("Sort each sentence.", { "Fact": ["Minecraft was first released in 2009.", "A soccer team has 11 players on the field.", "Water boils at 100°C at sea level."], "Opinion": ["Minecraft is the best game ever.", "Soccer is boring to watch.", "Everyone should learn to cook."] }, "Can you check it in a book or online? Then it’s a fact. Is it what someone thinks? Then it’s an opinion."),
        m("Which is an opinion?", ["Pizza is the tastiest food.", "Pizza comes from Italy.", "Pizza is cooked in an oven.", "Pizza can be cut into slices."], "‘Tastiest’ is what someone thinks. Not everyone agrees."),
        m("Which is a fact?", ["Melbourne is the capital city of Victoria.", "Melbourne has the best coffee.", "Melbourne is too cold.", "Everyone loves Melbourne."], "You can check this on a map."),
        m("Which word is a clue that something is an opinion?", ["should", "was", "has", "is made of"], "‘Should’ tells you what someone thinks ought to happen.")
      ]),

    L("e3-homo", 3, "Sound-alike words",
      [learn("Homophones", "Homophones sound the same but mean different things.\n- **their** = belongs to them. **there** = a place. **they’re** = they are.\n- **your** = belongs to you. **you’re** = you are.\n- **to** = towards. **too** = also or very. **two** = 2.\n- **its** = belongs to it. **it’s** = it is.\n\nTrick: if you can say ‘they are’, ‘you are’ or ‘it is’ instead, use the one with the apostrophe.")],
      [
        m("___ going to win the match.", ["They’re", "Their", "There"], "They’re = they are. ‘They are going to win.’ It works!"),
        m("Put the controller over ___.", ["there", "their", "they’re"], "‘There’ is a place. It has the word ‘here’ inside it."),
        m("___ turn is next.", ["Your", "You’re"], "Your = belongs to you. ‘You are turn’ doesn’t make sense."),
        m("I have ___ lives left.", ["two", "to", "too"], "Two is the number 2."),
        m("That level is ___ hard for me.", ["too", "to", "two"], "Too = very or also."),
        m("The dog wagged ___ tail.", ["its", "it’s"], "Its = belongs to it. ‘It is tail’ doesn’t make sense."),
        m("___ the best player on the team.", ["You’re", "Your"], "You’re = you are. ‘You are the best player.’ Yes!")
      ]),

    L("e3-review", 3, "Reading quest: a game review",
      [learn("Read the review", "**Review: Sky Racers (rated PG)**\n\nSky Racers is a flying race game where you steer a jet-powered board through floating cities. The graphics are stunning. Clouds drift past, and the cities glow at night.\n\nThe controls are easy to learn but hard to master. In the first ten minutes I was winning races. By level 20, I was losing to the computer again and again.\n\nThe biggest problem is the music. The same song plays over and over, and it gets annoying fast.\n\nOverall, Sky Racers is fun, fast and beautiful. I give it 4 out of 5 stars. I recommend it for players aged 10 and up who love speed.")],
      [
        m("What is the main purpose of this text?", ["To give an opinion about a game", "To teach you how to fly", "To tell a made-up story", "To sell a jet board"], "A review tells you what someone thinks about something."),
        m("What rating did the reviewer give?", ["4 out of 5 stars", "5 out of 5 stars", "3 out of 5 stars", "20 out of 5 stars"], "Look near the end: ‘I give it…’"),
        m("What did the reviewer NOT like?", ["The music", "The graphics", "The cities", "The controls"], "‘The biggest problem is the music.’"),
        m("‘Easy to learn but hard to master’ means…", ["Simple to start, but hard to get really good at", "Too hard to even start", "Easy all the way through", "Impossible to play"], "Master = get really, really good at something."),
        m("Which sentence is an opinion?", ["The graphics are stunning.", "The game is rated PG.", "You steer a board.", "There are floating cities."], "‘Stunning’ is what the reviewer thinks.")
      ], { k: "Tell someone a 30-second review of a game you know. Say one good thing, one bad thing and a score out of 5." }),

    L("e3-structure", 3, "Beginning, middle and end",
      [learn("How texts are built", "Most non-fiction texts have 3 parts:\n- **Introduction**: says what the text is about.\n- **Body**: paragraphs with the main points and details.\n- **Conclusion**: sums it up. In persuasive writing, it tells the reader what to do.")],
      [
        o("Put this persuasive text in order.", ["Schools should have a gaming club.", "Firstly, gaming builds teamwork.", "Secondly, it helps students make friends.", "Let’s start a gaming club this term!"], "Introduction (main idea) first, then Firstly, then Secondly, then the conclusion."),
        m("Which part tells the reader what the text is about?", ["Introduction", "Conclusion", "Body", "The last word"], "The introduction introduces the topic."),
        m("Where do the main points and details go?", ["Body paragraphs", "Introduction", "Conclusion", "The title"], "The body is the main part, like the body of a person."),
        m("Which is the best conclusion?", ["For all these reasons, every school should have a gaming club.", "Gaming builds teamwork.", "Hi, my name is Leo.", "Firstly, gaming is fun."], "A conclusion sums up and says your main idea again in a new way.")
      ]),

    // Level 4 · Year 8 skills
    L("e4-apos", 4, "Apostrophes",
      [learn("Two jobs for apostrophes", "**Job 1: shortening (contractions)**\n- do not → don’t\n- I am → I’m\n- it is → it’s\n\n**Job 2: ownership**\n- the player’s sword (one player owns it)\n- the players’ swords (more than one player)\n\nPlurals (just more than one) do **not** need an apostrophe: three cats.")],
      [
        m("What is the short form of ‘they are’?", ["they’re", "their", "theyre", "there"], "The apostrophe goes where the missing letter ‘a’ was: they’re."),
        m("Which is correct?", ["The dog’s bone was buried.", "The dogs bone was buried.", "The dogs’s bone was buried.", "The do’gs bone was buried."], "One dog owns the bone: dog’s."),
        m("Which sentence is correct with NO apostrophe needed?", ["I have three cats.", "I cant come.", "Its raining.", "Sams bike is red."], "‘Cats’ just means more than one cat. The others are missing apostrophes."),
        m("‘We won’t give up.’ What does won’t mean?", ["will not", "want not", "would not", "was not"], "Won’t is a special one. It means will not."),
        m("Which is correct?", ["The teacher’s desk", "The teachers’s desk", "The teacher’s’ desk", "The teachers desk’s"], "One teacher owns the desk: teacher’s.")
      ]),

    L("e4-formal", 4, "Formal or informal?",
      [learn("Choose your voice", "- **Informal** language is for friends: ‘Hey, that was sick!’\n- **Formal** language is for school work, letters, job applications and adults you don’t know well: ‘That was excellent.’\n- Formal writing: no slang, full words (do not instead of don’t) and a polite tone.")],
      [
        s("Sort each sentence.", { "Formal": ["I would like to request a meeting.", "Thank you for your time.", "The results were impressive."], "Informal": ["Hey, what’s up?", "That game was lit.", "Gonna be there soon."] }, "Would you say it to a friend or write it to a principal?"),
        m("You are writing to the school principal. Which opening is best?", ["Dear Ms Nguyen,", "Hey Ms N!", "Yo principal", "Sup"], "Formal letters start with ‘Dear’ and the person’s name."),
        m("Which is the formal version of ‘The game was heaps good’?", ["The game was very enjoyable.", "The game was sick.", "Game = good.", "The game was heaps good lol."], "Swap slang for full, clear words."),
        m("Where is informal language OK?", ["A text to your friend", "A job application", "A science report", "A letter to the council"], "Informal is for people you know well.")
      ]),

    L("e4-story", 4, "Story structure",
      [learn("The story path", "Most stories follow this path:\n- **Orientation**: who, where and when.\n- **Complication**: a problem starts.\n- **Rising action**: things get harder.\n- **Climax**: the biggest, most exciting moment.\n- **Resolution**: the problem is solved (or not!).")],
      [
        o("Put the story parts in order.", ["Orientation", "Complication", "Rising action", "Climax", "Resolution"], "Start with who and where. End with the problem being fixed."),
        o("Put this story in order.", ["Kai lived in a quiet village at the edge of the map.", "One night, a dragon stole the village’s only water crystal.", "Kai followed its tracks through the dark forest and over the mountains.", "At the top of the volcano, Kai faced the dragon and grabbed the crystal.", "Kai returned home a hero, and the village wells filled again."], "Who and where → problem → journey → big moment → fixed."),
        p("Match each part to what happens.", [["Orientation", "Meet the characters and the setting"], ["Complication", "A problem starts"], ["Climax", "The most exciting moment"], ["Resolution", "The problem gets solved"]], "Orientation is like the start screen. Climax is the boss fight."),
        m("In a game, the boss fight is most like the story’s…", ["Climax", "Orientation", "Resolution", "Title"], "The climax is the biggest, most intense moment.")
      ], { k: "Think of a movie or game you know. Tell someone its orientation, complication, climax and resolution." }),

    L("e4-vocab", 4, "Level up your words",
      [learn("Powerful words", "Strong writers pick exact, powerful words.\n- said → whispered, shouted, muttered\n- big → enormous, massive, gigantic\n- good → excellent, brilliant, impressive\n- walked → crept, stomped, wandered\n- scared → terrified, nervous, uneasy")],
      [
        p("Match each plain word to a powerful word.", [["big", "enormous"], ["good", "excellent"], ["scared", "terrified"], ["said quietly", "whispered"], ["walked slowly", "crept"]], "The powerful word means the same, just stronger or more exact."),
        m("‘The rocket went into the sky.’ Which word is a better choice than ‘went’?", ["blasted", "walked", "sat", "slept"], "A rocket moves fast and loud. ‘Blasted’ shows that."),
        m("Which shows the character is angry?", ["‘Get out!’ she roared.", "‘Get out,’ she said.", "‘Get out,’ she giggled.", "‘Get out,’ she yawned."], "‘Roared’ sounds loud and angry."),
        m("‘The ancient castle loomed over the village.’ What does ‘loomed’ suggest?", ["It seemed big and scary", "It was small and cute", "It was falling down", "It was moving fast"], "Loomed = appeared large and threatening.")
      ]),

    L("e4-show", 4, "Show, don’t tell",
      [learn("Let the reader work it out", "**Telling:** Sam was scared.\n\n**Showing:** Sam’s legs froze. His breath came in short gasps.\n\nShowing uses actions, senses and body language so the reader **feels** it too.")],
      [
        m("Which sentence SHOWS that Ella is happy?", ["Ella grinned and punched the air.", "Ella was happy.", "Ella felt good.", "Ella was not sad."], "Showing uses actions: grinning and punching the air."),
        m("Which sentence SHOWS it is cold?", ["Frost crunched under my boots and my breath made clouds.", "It was cold.", "It was very, very cold.", "The weather was not warm."], "It uses senses: crunching frost and breath clouds."),
        m("‘His fists clenched and his face turned red.’ How does he feel?", ["Angry", "Sleepy", "Excited", "Hungry"], "Clenched fists and a red face are signs of anger."),
        m("Why do writers show instead of tell?", ["So the reader feels it and pictures it", "To make it shorter", "To use fewer words", "Because telling is against the rules"], "Showing helps the reader see the story in their head.")
      ]),

    // Level 5 · Year 9 skills
    L("e5-teel", 5, "TEEL paragraphs",
      [learn("A recipe for essay paragraphs", "TEEL helps you write strong paragraphs.\n- **T**opic sentence: your main point.\n- **E**xplain: tell more about the point.\n- **E**vidence: a fact, quote or example that proves it.\n- **L**ink: connect back to the question.")],
      [
        p("Match each letter to its job.", [["T", "Topic sentence: the main point"], ["E (first)", "Explain the point"], ["E (second)", "Evidence that proves it"], ["L", "Link back to the question"]], "T-E-E-L. Point, explain, prove, link."),
        o("Put this TEEL paragraph in order.", ["Video games can improve problem-solving skills.", "Many games make players plan ahead and test different strategies.", "For example, a 2013 study found that teens who played strategy games showed better problem-solving.", "This shows that games can do more than entertain; they can help young people learn."], "Topic, then explain, then the evidence (For example…), then the link (This shows…)."),
        m("In a TEEL paragraph, which sentence is the evidence?", ["For example, 70% of students in a survey said…", "This shows that uniforms matter.", "School uniforms are a good idea.", "Uniforms make things simpler."], "Evidence usually has a fact, number or quote. It often starts with ‘For example’."),
        m("What does the Link sentence do?", ["Connects back to the main question", "Starts a new topic", "Gives a statistic", "Says hello"], "Link = link it back.")
      ], { k: "Go to the Writing Lab. Write one persuasive paragraph using the Hamburger planner, then check it has T, E, E and L." }),

    L("e5-evidence", 5, "Using evidence and quotes",
      [learn("Prove it", "Evidence makes your argument believable.\n- Use facts, statistics, expert opinions, examples or quotes.\n- Put exact words from a text in quotation marks.\n- Blend the quote into your own sentence: The author calls the city ‘a maze of shadows’, which makes it seem dangerous.\n- Then **explain** what the quote shows.")],
      [
        m("Claim: too much screen time at night can affect sleep. Which is the best evidence?", ["Research shows light from screens can delay the body’s sleep hormone.", "My cousin plays a lot of games.", "Screens are shiny.", "Some people like tablets."], "The best evidence comes from research, not just one person."),
        m("Which quote is blended into the sentence correctly?", ["The author describes the city as ‘a maze of shadows’, which makes it seem dangerous.", "The author says. ‘A maze of shadows’.", "‘A maze of shadows’ the city.", "The city, maze, shadows, quote."], "The quote fits smoothly inside a full sentence."),
        m("After you use a quote, what should you do next?", ["Explain what it shows", "Start a new essay", "Write another quote straight away", "Stop writing"], "Quote, then explain."),
        m("Which is NOT good evidence?", ["‘Everyone knows it’s true.’", "A statistic from a government report", "A quote from the novel", "An expert’s opinion"], "‘Everyone knows’ can’t be checked.")
      ]),

    L("e5-bias", 5, "Point of view and bias",
      [learn("Same event, different spin", "Two headlines about the **same** charity gaming event:\n\n**Headline A:** ‘Teen gamers raise $10,000 for children’s hospital in 24-hour stream’\n\n**Headline B:** ‘Kids glued to screens for an entire day and night’\n\nThe words each writer chooses show their **point of view**. When a text only shows one side, it is **biased**.")],
      [
        m("Which headline shows gaming in a positive way?", ["Headline A", "Headline B", "Both the same", "Neither"], "Headline A talks about raising money for a hospital."),
        m("Which words in Headline B make gaming sound bad?", ["glued to screens", "raise $10,000", "children’s hospital", "24-hour stream"], "‘Glued to screens’ sounds unhealthy."),
        m("What does ‘biased’ mean?", ["Only showing one side", "Being completely fair", "Using lots of facts", "Being very long"], "Biased = one-sided."),
        m("What is the best way to get a fair picture of an event?", ["Read several sources and compare them", "Only read the first headline", "Trust whatever gets shared the most", "Ask one friend"], "Compare different sources.")
      ], { k: "Find two news headlines about the same story (ask an adult to help). Do they have a different point of view?" }),

    L("e5-fig", 5, "Figurative language",
      [learn("Words that paint pictures", "- **Simile**: compares using like or as. ‘Fast as lightning.’\n- **Metaphor**: says something IS something else. ‘The classroom was a zoo.’\n- **Personification**: gives human actions to things. ‘The wind howled.’\n- **Hyperbole**: a huge exaggeration. ‘I’ve told you a million times.’\n- **Alliteration**: the same starting sound. ‘Silly snakes slither.’")],
      [
        p("Match each technique to an example.", [["Simile", "He ran like a cheetah."], ["Metaphor", "My room is a pigsty."], ["Personification", "The old car groaned up the hill."], ["Hyperbole", "This bag weighs a tonne."], ["Alliteration", "Big blue bubbles burst."]], "Like/as = simile. IS something = metaphor. Human action = personification. Huge exaggeration = hyperbole. Same sound = alliteration."),
        m("‘The stars danced in the sky.’ This is…", ["Personification", "Simile", "Alliteration", "A statistic"], "Stars can’t really dance. That’s a human action."),
        m("‘Her voice was as smooth as silk.’ This is…", ["Simile", "Metaphor", "Hyperbole", "Personification"], "It uses ‘as’ to compare."),
        m("‘I’m so hungry I could eat a horse.’ This is…", ["Hyperbole", "Simile", "Alliteration", "A fact"], "A huge exaggeration.")
      ], { k: "Listen to a song you like. Find one simile or metaphor in the lyrics." }),

    L("e5-essay", 5, "Planning an essay",
      [learn("Big writing in small steps", "- Read the question twice. Highlight the key words.\n- Brainstorm ideas. Say them out loud or record them.\n- Pick your 3 best ideas. Each one becomes a body paragraph.\n- Write a **thesis**: one sentence that answers the question.\n- Write it, then read it aloud to check.")],
      [
        o("Put the essay steps in order.", ["Read the question and highlight key words", "Brainstorm ideas", "Pick your 3 best ideas", "Write your thesis", "Write the essay", "Read it aloud and fix mistakes"], "Understand → ideas → choose → thesis → write → check."),
        m("Which is a thesis statement for ‘Should homework be banned?’", ["Homework should be limited, not banned, because some practice helps but too much causes stress.", "I like homework sometimes.", "Homework is a word.", "What is homework?"], "A thesis answers the question and gives a reason."),
        m("How many main ideas should each body paragraph have?", ["One", "Three", "Five", "None"], "One idea per paragraph keeps it clear."),
        m("What is the best thing to do after writing a draft?", ["Read it aloud and fix mistakes", "Hand it in without reading it", "Delete it", "Start a new topic"], "Reading aloud helps you hear mistakes. Use the read-aloud button!")
      ], { k: "Go to the Writing Lab and plan a full persuasive piece with the Full Piece planner." })
  ];

  /* ───────────────────────── MATHS ───────────────────────── */
  const maths = [
    // Level 1
    L("m1-place", 1, "Place value and rounding",
      [learn("Place value", "Each digit has a value based on its place.\n\nIn **472,305** the 7 is in the **ten thousands** place, so it is worth **70,000**.\n- Places from the right: ones, tens, hundreds, thousands, ten thousands, hundred thousands.\n\n**Rounding:** look at the digit just to the right. 5 or more → round up. 4 or less → it stays the same.")],
      [], { g: ["placeValue", "rounding"], gn: 6, k: "Find 3 prices at home or in a catalogue. Round each one to the nearest $10." }),
    L("m1-times", 1, "Times tables power-up",
      [learn("Multiply and divide", "Times tables are your speed boost.\n- 7 × 8 means 7 groups of 8.\n- Division is the reverse: 56 ÷ 8 = 7.\n- Stuck? Skip count: 8, 16, 24, 32…\n- 9 times table trick: the digits add to 9. (9 × 4 = 36, and 3 + 6 = 9)")],
      [], { g: ["times", "divide"], gn: 8, k: "Grab 24 small things (Lego, coins or Blu Tack balls). Split them into groups of 4. How many groups? Now try groups of 6 and groups of 8." }),
    L("m1-addsub", 1, "Big number battles (+ and −)",
      [learn("Adding and subtracting", "Line up the digits by place value.\n- Start with the ones column.\n- Adding: if a column makes 10 or more, carry 1 to the next column.\n- Subtracting: if the top digit is smaller, borrow 10 from the next column.\n- Check subtraction by adding back: 500 − 180 = 320, and 320 + 180 = 500.")],
      [], { g: ["addSub"], gn: 6 }),
    L("m1-frac", 1, "Fractions",
      [learn("Parts of a whole", "A fraction is part of a whole.\n- The **bottom** number (denominator) = how many equal parts.\n- The **top** number (numerator) = how many parts you have.\n- This health bar is 3/4 full: 4 equal parts, 3 are full.\n- **Equivalent** fractions are the same amount: 1/2 = 2/4 = 4/8.", "fracbar")],
      [], { g: ["fracShade", "equivFrac"], gn: 6, k: "Cut a sandwich or a piece of paper into 4 equal parts. Eat or colour 3. What fraction is left?" }),
    L("m1-money", 1, "Money and shopping",
      [learn("Money maths", "- $1 = 100 cents.\n- To find change, count up from the price to the note.\n- Price $3.60, pay with $10: $3.60 → $4 is 40c. $4 → $10 is $6. Change = **$6.40**.\n- Line up the decimal points when you add money.")],
      [], { g: ["money", "moneyMulti"], gn: 6, k: "Next time you’re at a shop, work out the change before the cashier tells you." }),

    // Level 2
    L("m2-dec", 2, "Decimals",
      [learn("Decimals", "Decimals are parts of a whole, just like cents.\n- 0.5 = five tenths = a half.\n- 0.25 = twenty-five hundredths = a quarter.\n- To compare, line up the points: 0.5 is the same as **0.50**, so it’s bigger than 0.45.\n- To add, line up the points and add like normal.")],
      [], { g: ["decCompare", "decAdd"], gn: 6 }),
    L("m2-pct", 2, "Percentages",
      [learn("Percent means ‘out of 100’", "- 50% = half → divide by 2\n- 25% = a quarter → divide by 4\n- 10% → divide by 10\n- 20% → find 10%, then double it\n- 75% → find 25%, then times by 3")],
      [], { g: ["percentBasic"], gn: 6, k: "Find a battery icon on a phone or tablet. What percentage is it on? About what fraction is that?" }),
    L("m2-ops", 2, "Order of operations",
      [learn("Which job goes first?", "Maths has a rule for which job goes first. Remember **BODMAS**:\n- **B**rackets first\n- **O**rders (powers)\n- **D**ivision and **M**ultiplication (left to right)\n- **A**ddition and **S**ubtraction (left to right)\n\nExample: 2 + 3 × 4 = 2 + 12 = **14** (not 20!)")],
      [], { g: ["orderOps"], gn: 6 }),
    L("m2-area", 2, "Area and perimeter",
      [learn("Around and inside", "- **Perimeter** = the distance around the edge. Add up all the sides.\n- **Area** = the space inside. For a rectangle: length × width.\n- Area is in **square units** (m², cm²).\n- A 5 m × 3 m room: perimeter = 5 + 3 + 5 + 3 = **16 m**. Area = 5 × 3 = **15 m²**.", "rect")],
      [], { g: ["areaRect"], gn: 6, k: "Measure your bedroom with a tape measure (or count your footsteps). Work out the perimeter." }),
    L("m2-angles", 2, "Angles",
      [learn("Angle facts", "- A right angle = **90°** (a square corner).\n- Angles on a straight line add to **180°**.\n- A full turn = **360°**.\n- The 3 angles inside a triangle add to **180°**.")],
      [], { g: ["angles"], gn: 6, k: "Find 3 right angles in your room (the corner of a book, a door, a screen)." }),

    // Level 3
    L("m3-int", 3, "Negative numbers",
      [learn("Below zero", "Negative numbers are less than zero. Think of a thermometer, or going underground in a game.\n- Adding moves **up** the number line. Subtracting moves **down**.\n- −3 + 5 = 2\n- Subtracting a negative is the same as adding: 4 − (−2) = 6.\n- Negative × positive = negative. Negative × negative = positive.", "numline")],
      [], { g: ["integers"], gn: 6 }),
    L("m3-fracamt", 3, "Fractions of amounts",
      [learn("Fraction of a number", "To find 3/4 of 40:\n- Divide by the bottom: 40 ÷ 4 = 10\n- Times by the top: 10 × 3 = **30**\n\nRemember: ‘divide by the bottom, times by the top’.")],
      [], { g: ["fracAmount", "equivFrac"], gn: 6 }),
    L("m3-ratio", 3, "Ratios",
      [learn("Sharing in a ratio", "A ratio compares amounts. 2 : 3 means ‘for every 2 of these, there are 3 of those’.\n\nSharing 20 gems in the ratio 2 : 3:\n- Total parts = 2 + 3 = 5\n- One part = 20 ÷ 5 = 4\n- Shares: 2 × 4 = **8** and 3 × 4 = **12**")],
      [], { g: ["ratio"], gn: 6, k: "Make a drink with cordial and water in the ratio 1 : 4. How many cups of water for 2 cups of cordial?" }),
    L("m3-alg", 3, "Algebra: letters as numbers",
      [learn("Substitution", "In algebra, a letter stands for a number.\n- 3x means 3 × x.\n- If x = 4, then 3x + 2 = 3 × 4 + 2 = **14**.\n- Swap the letter for the number, then follow BODMAS.")],
      [], { g: ["substitute"], gn: 6 }),
    L("m3-stats", 3, "Stats: mean, median, mode, range",
      [learn("Describing data", "Scores: 4, 7, 7, 9, 13\n- **Mean** (average): add them up, divide by how many. 40 ÷ 5 = **8**\n- **Median**: the middle number when in order. **7**\n- **Mode**: the most common. **7**\n- **Range**: biggest − smallest. 13 − 4 = **9**")],
      [], { g: ["stats"], gn: 6, k: "Play 5 rounds of a game. Write down your scores. Work out your mean score." }),

    // Level 4
    L("m4-eq", 4, "Solving equations",
      [learn("Keep it balanced", "An equation is like a balance. Whatever you do to one side, do to the other.\n- x + 7 = 15 → take 7 from both sides → x = **8**\n- 3x = 21 → divide both sides by 3 → x = **7**\n- 2x + 5 = 17 → take 5 → 2x = 12 → divide by 2 → x = **6**\n- Check: put your answer back in. 2 × 6 + 5 = 17. Yes!")],
      [], { g: ["equations"], gn: 6 }),
    L("m4-pctchg", 4, "Discounts and increases",
      [learn("Sales and price rises", "- To take 25% off $80: find 25% (80 ÷ 4 = 20), then subtract: 80 − 20 = **$60**.\n- To increase by 10%: find 10%, then add it on.\n- Shortcut: 25% off means you pay 75%.")],
      [], { g: ["percentChange"], gn: 6, k: "Look at a sale catalogue or game store. Pick one discounted item and check the sale price is right." }),
    L("m4-area", 4, "Triangles and circles",
      [learn("Area formulas", "- Triangle area = ½ × base × height.\n- Circle: the **radius** (r) goes from the centre to the edge. Diameter = 2 × r.\n- Circle area = π × r × r. Use π ≈ 3.14.\n- Circumference (distance around) = 2 × π × r.")],
      [], { g: ["areaTri", "circle"], gn: 6 }),
    L("m4-prob", 4, "Probability",
      [learn("How likely?", "Probability is how likely something is, from 0 (impossible) to 1 (certain).\n- Probability = ways it can happen ÷ total outcomes.\n- A dice has 6 sides. The chance of rolling a 6 = 1/6.\n- A spinner with 8 equal parts, 3 are gold. The chance of gold = 3/8.")],
      [], { g: ["probability"], gn: 6, k: "Roll a dice 30 times and tally the results. Did each number come up about 5 times?" }),
    L("m4-pow", 4, "Powers (index notation)",
      [learn("Repeated multiplying", "A power is a shortcut for multiplying a number by itself.\n- 2⁵ = 2 × 2 × 2 × 2 × 2 = **32**\n- The small number (the index) says how many times.\n- 10³ = 1,000. 10⁶ = 1,000,000.\n- Careful: 3² = 3 × 3 = 9, not 6.")],
      [], { g: ["powers"], gn: 6 }),

    // Level 5
    L("m5-alg", 5, "Algebra: expand and simplify",
      [learn("Tidy up algebra", "- **Like terms** have the same letter: 3x and 5x. Add them: 8x.\n- 2x + 4 + 3x = **5x + 4** (x terms together, numbers together)\n- **Expanding brackets**: multiply everything inside by the number outside.\n- 3(x + 4) = 3x + 12")],
      [], { g: ["expand", "likeTerms"], gn: 6 }),
    L("m5-lin", 5, "Linear graphs",
      [learn("Straight lines: y = mx + c", "A straight-line graph has the rule **y = mx + c**.\n- **m** is the gradient: how steep. The line goes up m for every 1 across.\n- **c** is the y-intercept: where the line crosses the y-axis.\n- y = 2x + 1: gradient 2, crosses the y-axis at 1.\n- To find y, put the x value in: x = 3 → y = 2 × 3 + 1 = 7.", "graph")],
      [], { g: ["linear"], gn: 6 }),
    L("m5-pyth", 5, "Pythagoras",
      [learn("Right-angled triangles", "In a right-angled triangle, the longest side is the **hypotenuse** (c). It’s opposite the right angle.\n- **a² + b² = c²**\n- Sides 3 and 4: 9 + 16 = 25, and √25 = **5**.\n- To find a shorter side, subtract: c² − a² = b².", "pythag")],
      [], { g: ["pythag"], gn: 6, k: "Measure the width and height of a TV or screen. Use Pythagoras to work out the diagonal, then measure it to check." }),
    L("m5-money", 5, "Money smarts: interest",
      [learn("Interest", "When you save money in a bank, it earns **interest**.\n- Simple interest: I = P × r × t ÷ 100\n- P = the amount saved. r = the rate (%). t = the time in years.\n- $500 at 4% for 3 years: 500 × 4 × 3 ÷ 100 = **$60**.\n- Loans and credit cards work the other way: **you** pay the interest.")],
      [], { g: ["interest", "percentChange"], gn: 6 }),
    L("m5-sci", 5, "Scientific notation",
      [learn("Huge numbers, short way", "Scientists write huge numbers in a short way.\n- 45,000,000 = **4.5 × 10⁷**\n- The first number must be between 1 and 10.\n- The power of 10 says how many places the decimal point moves.\n- Earth is about 150,000,000 km from the Sun = 1.5 × 10⁸ km.")],
      [], { g: ["sciNot"], gn: 6 }),
    L("m5-trig", 5, "Trigonometry intro",
      [learn("SOH CAH TOA", "In a right-angled triangle, label the sides from the angle θ:\n- **Opposite**: across from the angle\n- **Adjacent**: next to the angle\n- **Hypotenuse**: the longest side\n\n**SOH CAH TOA**: sin = O ÷ H, cos = A ÷ H, tan = O ÷ A.", "trig")],
      [], { g: ["trig"], gn: 6 })
  ];

  /* ───────────────────────── SCIENCE ───────────────────────── */
  const science = [
    // Level 1
    L("s1-states", 1, "Solids, liquids and gases",
      [learn("States of matter", "Everything is made of tiny particles.\n- **Solid**: particles packed tight. Keeps its shape. (ice, rock)\n- **Liquid**: particles slide past each other. Takes the shape of its container. (water, juice)\n- **Gas**: particles spread out and zoom around. Fills any space. (steam, air)\n- Heating can change a solid → liquid → gas.")],
      [
        s("Sort each thing.", { "Solid": ["Rock", "Ice cube", "Controller"], "Liquid": ["Water", "Juice", "Honey"], "Gas": ["Steam", "Air", "Helium in a balloon"] }, "Does it keep its shape (solid), pour (liquid) or float around and fill space (gas)?"),
        m("What happens when ice melts?", ["It changes from a solid to a liquid", "It changes from a gas to a solid", "It disappears forever", "It becomes a gas straight away"], "Ice is solid water. Melting turns it into liquid water."),
        o("Put these in order as water is heated.", ["Ice (solid)", "Water (liquid)", "Steam (gas)"], "Heat makes particles move faster: solid → liquid → gas."),
        m("Which one is a gas?", ["Air", "Milk", "Wood", "Sand"], "Air spreads out to fill any space.")
      ], { k: "Put an ice cube on a plate. Check it every 10 minutes. How long does it take to melt?" }),
    L("s1-living", 1, "Living things",
      [learn("What makes something alive?", "Living things do all of these (remember **MRS GREN**):\n- **M**ove, **R**espire (use air for energy), **S**ense\n- **G**row, **R**eproduce, **E**xcrete (get rid of waste), **N**utrition (need food)\n\nPlants need sunlight, water, air and nutrients. Animals need food, water, air and shelter.")],
      [
        s("Sort each thing.", { "Living": ["Gum tree", "Mushroom", "Spider"], "Non-living": ["Rock", "Robot", "Cloud"] }, "Does it grow, need food and reproduce? Then it’s living."),
        m("What do plants need to make their own food?", ["Sunlight, water and air", "Pizza", "Only soil", "Darkness"], "Plants use sunlight, water and carbon dioxide from the air."),
        m("A robot can move and sense. Why isn’t it alive?", ["It can’t grow, reproduce or eat", "It is too heavy", "It is made of metal", "It is not green"], "Living things do ALL of MRS GREN."),
        m("What does ‘respire’ mean?", ["Use air to get energy", "Sleep", "Move quickly", "Make a copy"], "Respiration = using oxygen to release energy from food.")
      ]),
    L("s1-space", 1, "Earth, Sun and Moon",
      [learn("Our place in space", "- The **Earth spins** once every 24 hours. That makes day and night.\n- The side facing the Sun has day.\n- The Earth **orbits** (travels around) the Sun once a year: about 365 days.\n- The **Moon** orbits the Earth about every 27 days.\n- The Sun is a star. The Moon reflects the Sun’s light.")],
      [
        m("What causes day and night?", ["The Earth spinning", "The Sun moving around the Earth", "The Moon blocking the Sun", "Clouds"], "The Earth spins once every 24 hours."),
        m("How long does the Earth take to orbit the Sun?", ["About 365 days", "24 hours", "1 week", "27 days"], "One orbit = one year."),
        m("Where does the Moon’s light come from?", ["It reflects the Sun’s light", "It makes its own light", "From city lights on Earth", "From stars behind it"], "The Moon is like a mirror for sunlight."),
        p("Match each word to its meaning.", [["Sun", "A star"], ["Earth", "Our planet"], ["Moon", "Orbits the Earth"], ["Orbit", "A path around something"]], "The Sun is a star. The Moon goes around the Earth.")
      ], { k: "Look at the Moon tonight (or tomorrow). Draw its shape. Check again in 3 days. Has it changed?" }),
    L("s1-light", 1, "Light and shadows",
      [learn("Light", "- Light travels in straight lines.\n- A **shadow** forms when an object blocks light.\n- **Transparent** things let light through (glass).\n- **Translucent** things let some light through (baking paper).\n- **Opaque** things block all light (wood).\n- Mirrors reflect light.")],
      [
        s("Sort each thing.", { "Transparent": ["Window glass", "Clear water"], "Translucent": ["Baking paper", "Frosted glass"], "Opaque": ["Wooden door", "Book"] }, "Clear = transparent. Blurry light = translucent. No light = opaque."),
        m("Why do shadows form?", ["An object blocks the light", "Light bends around things", "Shadows are made of dark air", "The Sun turns off"], "Light travels in straight lines, so it can’t get around the object."),
        m("At midday the Sun is high in the sky. Your shadow is…", ["Short", "Very long", "Gone forever", "Blue"], "When light comes from above, shadows are short."),
        m("What does a mirror do to light?", ["Reflects it", "Absorbs all of it", "Makes more light", "Turns it into sound"], "Mirrors bounce light back.")
      ], { k: "Use a torch and your hand to make shadow shapes on a wall. Move your hand closer to the torch. What happens to the shadow?" }),

    // Level 2
    L("s2-circ", 2, "Electric circuits",
      [learn("How circuits work", "- A circuit is a loop that electricity flows around.\n- It needs a **power source** (battery), **wires**, and something to power (a globe or LED).\n- The loop must be **complete**. A gap stops the flow.\n- A **switch** opens and closes the gap.\n- **Conductors** let electricity through (metal). **Insulators** don’t (plastic, rubber, wood).")],
      [
        s("Sort each thing.", { "Conductor": ["Copper wire", "Steel spoon", "Aluminium foil"], "Insulator": ["Plastic ruler", "Rubber band", "Wooden peg"] }, "Metals are conductors. Plastic, rubber and wood are insulators."),
        m("Why won’t the globe light up if there is a gap in the circuit?", ["The circuit is not complete", "The battery is too big", "The wires are too long", "Globes need water"], "Electricity needs a full loop."),
        m("Why are electrical wires covered in plastic?", ["Plastic is an insulator, so it keeps us safe", "To make them colourful", "Plastic makes electricity faster", "To keep them warm"], "Insulators stop electricity reaching your hands."),
        m("What does a switch do?", ["Opens or closes the circuit", "Makes batteries", "Changes the colour of light", "Stores electricity"], "Switch on = loop closed. Switch off = gap.")
      ], { k: "Look at an unplugged charging cable. Which parts are conductors? Which parts are insulators?" }),
    L("s2-adapt", 2, "Adaptations",
      [learn("Built to survive", "An **adaptation** is a feature that helps a living thing survive in its environment.\n- **Structural**: body parts. A duck’s webbed feet help it swim.\n- **Behavioural**: things it does. Possums sleep in the day and feed at night.\n- Australian animals are well adapted to heat and dry land.")],
      [
        p("Match each living thing to its adaptation.", [["Kangaroo", "Licks its forearms to cool down"], ["Echidna", "Spines protect it from predators"], ["Camel", "Hump stores fat for energy"], ["Polar bear", "Thick fur and fat keep it warm"], ["Cactus", "Stores water in its thick stem"]], "Think about where each one lives: hot, cold or dry."),
        m("Owls hunt at night. This is a … adaptation.", ["Behavioural", "Structural", "Electrical", "Fake"], "It’s something the owl DOES, so it’s behavioural."),
        m("Why do many desert animals come out at night?", ["It’s cooler", "It’s brighter", "To see the Sun", "Because they are lazy"], "Deserts are very hot in the day."),
        m("Which is a structural adaptation?", ["A duck’s webbed feet", "A bird flying north for winter", "A possum sleeping in the day", "A frog hiding under a log"], "Structural = a body part.")
      ]),
    L("s2-change", 2, "Reversible or irreversible?",
      [learn("Can you undo it?", "- **Reversible** change: you can undo it. Melting ice, freezing water, dissolving salt (let the water evaporate to get the salt back).\n- **Irreversible** change: you can’t undo it. Burning paper, cooking an egg, rusting, baking a cake.\n- Irreversible changes usually make a **new substance**.")],
      [
        s("Sort each change.", { "Reversible": ["Melting chocolate", "Freezing water", "Dissolving salt"], "Irreversible": ["Burning wood", "Cooking an egg", "A bike chain rusting"] }, "Could you get the original thing back? Then it’s reversible."),
        m("Which change is irreversible?", ["Toasting bread", "Melting chocolate", "Freezing juice", "Folding paper"], "You can’t un-toast bread!"),
        m("How can you get salt back after dissolving it in water?", ["Let the water evaporate", "Freeze it", "Stir it more", "Add sugar"], "When the water evaporates, the salt is left behind."),
        m("A new substance being made is a clue that the change is…", ["Irreversible", "Reversible", "Invisible", "Magnetic"], "New substance = can’t go back.")
      ], { k: "With an adult, make toast. Is it a reversible or irreversible change? What clues tell you?" }),
    L("s2-solar", 2, "The solar system",
      [learn("Our solar system", "The Sun is at the centre. 8 planets orbit it.\n- In order: **M**ercury, **V**enus, **E**arth, **M**ars, **J**upiter, **S**aturn, **U**ranus, **N**eptune.\n- Memory trick: **My Very Excited Mother Just Served Us Noodles.**\n- The first 4 are rocky planets. The last 4 are giant planets made mostly of gas and ice.\n- Jupiter is the biggest.")],
      [
        o("Put the planets in order from the Sun.", ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"], "My Very Excited Mother Just Served Us Noodles."),
        m("Which is the biggest planet?", ["Jupiter", "Earth", "Mars", "Mercury"], "Jupiter is so big that all the other planets could fit inside it."),
        m("Which planet is closest to the Sun?", ["Mercury", "Venus", "Earth", "Neptune"], "M for Mercury comes first."),
        m("Which planet is famous for its huge rings?", ["Saturn", "Mars", "Mercury", "Venus"], "Saturn’s rings are made of ice and rock.")
      ]),

    // Level 3
    L("s3-food", 3, "Food chains and webs",
      [learn("Who eats whom?", "A food chain shows who eats whom. The arrows show energy moving.\n- **Producers** make their own food from sunlight (plants).\n- **Consumers** eat other living things.\n- Grass → grasshopper → frog → snake → eagle\n- A **food web** is lots of food chains joined together.")],
      [
        o("Put this food chain in order.", ["Grass", "Grasshopper", "Frog", "Snake", "Eagle"], "Start with the producer (the plant). Each one is eaten by the next."),
        m("Which is a producer?", ["Gum tree", "Koala", "Fox", "Eagle"], "Plants are producers. They make food from sunlight."),
        m("What does the arrow in a food chain show?", ["The direction energy flows", "Who is bigger", "Where animals live", "Who is faster"], "Energy flows from the thing eaten to the eater."),
        m("If all the frogs disappeared, what might happen to the grasshoppers?", ["Their numbers would go up", "They would all disappear", "Nothing at all", "They would turn into frogs"], "Fewer frogs means fewer grasshoppers get eaten."),
        m("Where does the energy in a food chain start?", ["The Sun", "The eagle", "The soil", "The water"], "Plants capture energy from the Sun.")
      ]),
    L("s3-mix", 3, "Mixtures and separating",
      [learn("Separating mixtures", "A **mixture** is two or more things mixed together but not chemically joined.\n- **Filtering**: separates solids from liquids (sand from water).\n- **Evaporation**: heats the liquid away to leave a dissolved solid (salt from sea water).\n- **Magnet**: pulls out iron (iron nails from sand).\n- **Sieving**: separates big bits from small bits (pebbles from flour).")],
      [
        p("Match each mixture to the best way to separate it.", [["Sand and water", "Filtering"], ["Salt dissolved in water", "Evaporation"], ["Iron nails in sand", "Magnet"], ["Pebbles and flour", "Sieving"]], "Big bits = sieve. Iron = magnet. Dissolved = evaporate. Solid in liquid = filter."),
        m("Which is a mixture?", ["Fruit salad", "Pure water", "Gold", "Oxygen"], "You can pick the fruits back out. They’re mixed, not joined."),
        m("A coffee filter lets water through but not the coffee grounds. This is…", ["Filtering", "Evaporation", "Magnetism", "Melting"], "A filter traps the solid bits."),
        m("How do we get salt from sea water?", ["Evaporation", "A magnet", "A sieve", "Freezing"], "The water evaporates and the salt is left.")
      ], { k: "Stir a spoon of salt into warm water. Put a little on a dark plate in a sunny spot for a day or two. What’s left behind?" }),
    L("s3-force", 3, "Forces",
      [learn("Pushes and pulls", "A force is a push or a pull.\n- **Gravity** pulls things down towards Earth.\n- **Friction** slows things when surfaces rub. Rough surfaces = more friction.\n- **Air resistance** is friction from air. Parachutes use it.\n- **Magnetic force** pulls iron and steel.\n- Forces can change speed, direction or shape.")],
      [
        m("Why does a ball roll further on a smooth floor than on carpet?", ["There is less friction on the smooth floor", "There is more gravity on carpet", "Carpet is magnetic", "The ball gets tired"], "Carpet is rough, so it has more friction."),
        m("What force pulls you back down when you jump?", ["Gravity", "Friction", "Magnetism", "Air resistance"], "Gravity pulls everything towards Earth."),
        p("Match each force to an example.", [["Gravity", "An apple falls from a tree"], ["Friction", "Bike brakes slow the wheel"], ["Air resistance", "A parachute slows a skydiver"], ["Magnetic force", "A fridge magnet sticks"]], "Falling = gravity. Rubbing = friction. Air pushing back = air resistance."),
        m("Why do sneakers have grippy soles?", ["To increase friction so you don’t slip", "To reduce gravity", "To be magnetic", "To make them heavier"], "More grip = more friction.")
      ], { k: "Roll a toy car down a ramp (a book on a slope) onto 3 surfaces: tiles, carpet and a towel. Which stops it fastest? That one has the most friction." }),
    L("s3-water", 3, "The water cycle",
      [learn("Water on the move", "Water moves around Earth in a cycle.\n- **Evaporation**: the Sun heats water and it turns into water vapour.\n- **Condensation**: the vapour cools and forms clouds.\n- **Precipitation**: water falls as rain, hail or snow.\n- **Collection**: water gathers in rivers, lakes, oceans and underground.")],
      [
        o("Put the water cycle in order.", ["Evaporation", "Condensation", "Precipitation", "Collection"], "Water goes up (evaporation), makes clouds (condensation), falls (precipitation), gathers (collection)."),
        p("Match each word to its meaning.", [["Evaporation", "Water turns into vapour"], ["Condensation", "Vapour cools into droplets and clouds"], ["Precipitation", "Rain, hail or snow falls"], ["Collection", "Water gathers in rivers and oceans"]], "Precipitation = anything falling from clouds."),
        m("Which process makes clouds?", ["Condensation", "Evaporation", "Collection", "Filtering"], "Cooling vapour condenses into tiny droplets, which make clouds."),
        m("Water droplets form on a cold can on a hot day. This is…", ["Condensation", "Evaporation", "Precipitation", "Melting"], "Water vapour in the air cools on the cold can.")
      ]),

    // Level 4
    L("s4-cells", 4, "Cells and body systems",
      [learn("Building blocks of life", "All living things are made of **cells**: the building blocks of life.\n- Cells → tissues → organs → systems → organism.\n- **Digestive** system: breaks down food (stomach, intestines).\n- **Circulatory** system: moves blood (heart, blood vessels).\n- **Respiratory** system: gets oxygen in (lungs).\n- **Skeletal** system: supports and protects (bones).\n- **Nervous** system: sends messages (brain, nerves).")],
      [
        p("Match each organ to its body system.", [["Heart", "Circulatory"], ["Lungs", "Respiratory"], ["Stomach", "Digestive"], ["Brain", "Nervous"], ["Skull", "Skeletal"]], "Blood = circulatory. Breathing = respiratory. Food = digestive. Messages = nervous. Bones = skeletal."),
        o("Put these in order from smallest to biggest.", ["Cell", "Tissue", "Organ", "System", "Organism"], "Cells make tissues. Tissues make organs. Organs make systems."),
        m("What is the job of the lungs?", ["Take in oxygen and get rid of carbon dioxide", "Pump blood", "Digest food", "Think"], "Lungs are part of the respiratory system."),
        m("Which part of a plant cell makes food from sunlight?", ["Chloroplast", "Nucleus", "Cell wall", "Vacuole"], "Chloroplasts are green and capture sunlight."),
        m("Which part controls what the cell does?", ["Nucleus", "Cell wall", "Vacuole", "Chloroplast"], "The nucleus is the control centre.")
      ]),
    L("s4-atoms", 4, "Elements and compounds",
      [learn("What stuff is made of", "- An **atom** is the smallest piece of an element.\n- An **element** is made of only one type of atom. There are 118. (oxygen, gold, carbon)\n- A **compound** is two or more elements chemically joined. (water = H₂O, salt = NaCl)\n- The **periodic table** lists all the elements.\n- Symbols: O = oxygen, H = hydrogen, C = carbon, Fe = iron, Au = gold.")],
      [
        s("Sort each substance.", { "Element": ["Gold (Au)", "Oxygen (O₂)", "Iron (Fe)"], "Compound": ["Water (H₂O)", "Carbon dioxide (CO₂)", "Table salt (NaCl)"] }, "One type of letter symbol = element. Two or more different symbols = compound."),
        p("Match each symbol to its element.", [["O", "Oxygen"], ["H", "Hydrogen"], ["C", "Carbon"], ["Fe", "Iron"], ["Au", "Gold"]], "Fe and Au come from Latin words: ferrum (iron) and aurum (gold)."),
        m("Water is H₂O. How many hydrogen atoms are in one water molecule?", ["2", "1", "3", "0"], "The small 2 after H means 2 hydrogen atoms."),
        m("What is a compound?", ["Two or more elements chemically joined", "Only one type of atom", "Sand mixed with water", "A type of metal"], "Compound = elements joined together.")
      ]),
    L("s4-energy", 4, "Energy forms and transfers",
      [learn("Energy changes form", "Energy can’t be made or destroyed. It changes from one form to another.\n- **Kinetic**: movement energy\n- **Thermal**: heat\n- **Light** and **sound** energy\n- **Electrical** energy\n- **Chemical** (stored) energy: food, batteries, fuel\n\nA gaming console changes electrical energy → light (screen), sound (speakers) and thermal energy (it gets warm).")],
      [
        p("Match each thing to its main energy change.", [["Torch", "Chemical (battery) → light"], ["Toaster", "Electrical → thermal"], ["Speaker", "Electrical → sound"], ["Solar panel", "Light → electrical"], ["Riding a bike", "Chemical (food) → kinetic"]], "What goes in? What comes out?"),
        m("Why does a console have a fan?", ["Some energy turns into heat", "To make it louder", "To make light", "To store energy"], "Not all energy becomes light and sound. Some becomes heat."),
        m("What type of energy is stored in food?", ["Chemical", "Kinetic", "Sound", "Light"], "Food stores chemical energy your body uses."),
        m("Can energy be destroyed?", ["No, it only changes form", "Yes, easily", "Only on hot days", "Only light energy"], "Energy is never made or destroyed.")
      ]),
    L("s4-rocks", 4, "Rocks and the rock cycle",
      [learn("Three rock types", "- **Igneous** rock forms when melted rock (magma or lava) cools. (granite, basalt)\n- **Sedimentary** rock forms from layers of sand, mud and shells pressed together. (sandstone) Fossils are found here.\n- **Metamorphic** rock forms when heat and pressure change a rock. (marble, slate)\n- Victoria has old volcanoes! Much of the flat land west of Melbourne is **basalt** from lava flows.")],
      [
        p("Match each rock type to how it forms.", [["Igneous", "Melted rock cools down"], ["Sedimentary", "Layers are pressed together"], ["Metamorphic", "Heat and pressure change it"]], "Igneous = fire. Sedimentary = sediment layers. Metamorphic = morphs (changes)."),
        m("Where would you most likely find fossils?", ["Sedimentary rock", "Igneous rock", "Fresh lava", "Inside a volcano"], "Animals and plants get buried in the layers."),
        m("Basalt forms from cooled lava. What type of rock is it?", ["Igneous", "Sedimentary", "Metamorphic", "Plastic"], "Cooled lava = igneous."),
        m("Heat and pressure change limestone into marble. Marble is…", ["Metamorphic", "Igneous", "Sedimentary", "Not a rock"], "Changed by heat and pressure = metamorphic.")
      ], { k: "Collect 3 different rocks from outside. Are they rough or smooth? Layered? Shiny? Guess what type each one is." }),

    // Level 5
    L("s5-nerv", 5, "Your body’s control systems",
      [learn("Stimulus and response", "Your body responds to changes around you.\n- **Stimulus**: a change (a ball flying at you).\n- **Receptor**: detects it (your eyes).\n- **Nerves** carry the message to your **brain**.\n- **Effector**: a muscle or gland that responds.\n- **Response**: you catch the ball.\n- The **endocrine system** uses **hormones** in the blood for slower messages (adrenaline, growth).\n- **Reflexes** go through the spinal cord for speed: pulling your hand off a hot pan.")],
      [
        o("Put the steps in order.", ["Stimulus", "Receptor detects it", "Nerves carry the message", "Brain processes it", "Effector (muscle) acts", "Response"], "Change → sense it → send it → decide → act → result."),
        m("Which system uses hormones?", ["Endocrine", "Skeletal", "Digestive", "Respiratory"], "Hormones are chemical messages in the blood."),
        m("Why are reflexes so fast?", ["The message goes through the spinal cord without waiting for the brain to decide", "Hormones are faster", "Muscles think for themselves", "Eyes move faster"], "Reflexes skip the thinking part of the brain."),
        m("Adrenaline gets your body ready for action. When might it be released?", ["When you get a fright", "When you are asleep", "When you eat lunch", "When you read quietly"], "Adrenaline = fight or flight."),
        m("Your ears hearing a sound are acting as…", ["Receptors", "Effectors", "Hormones", "Stimuli"], "Receptors detect. Ears detect sound.")
      ], { k: "Ruler drop test: someone holds a ruler above your open hand and drops it without warning. Catch it! Write down the cm mark. Try 5 times. Did you get faster?" }),
    L("s5-eco", 5, "Ecosystems and human impact",
      [learn("Everything is connected", "An **ecosystem** is all the living things in an area plus the non-living things around them.\n- Living parts = **biotic**. Non-living parts (water, soil, sunlight, temperature) = **abiotic**.\n- Remove one species and the whole food web can change.\n- Humans affect ecosystems through land clearing, pollution, introduced species (rabbits, foxes, cane toads) and climate change.\n- We can help: protect habitats, control pests, reduce waste.")],
      [
        s("Sort each part of a forest ecosystem.", { "Biotic (living)": ["Gum trees", "Possums", "Fungi"], "Abiotic (non-living)": ["Sunlight", "Rainfall", "Soil temperature"] }, "Bio = life. Abiotic = not living."),
        m("Cane toads were brought to Australia in 1935. Why are they a problem?", ["They are poisonous to native animals that eat them", "They only eat sugar cane", "They help farmers", "They are native to Australia"], "Quolls, goannas and snakes die from eating them."),
        m("What is an introduced species?", ["A living thing brought to a place where it didn’t naturally live", "A newly discovered animal", "An extinct species", "A plant that grows fast"], "Rabbits and foxes were brought here from Europe."),
        m("Which action helps an ecosystem?", ["Planting native trees", "Clearing all the bush", "Releasing pet fish into rivers", "Leaving rubbish at the beach"], "Native plants give native animals food and shelter.")
      ]),
    L("s5-atom", 5, "Inside the atom",
      [learn("Tiny parts", "Atoms have even smaller parts:\n- **Protons**: positive (+) charge, in the nucleus.\n- **Neutrons**: no charge, in the nucleus.\n- **Electrons**: negative (−) charge, moving around the nucleus in shells.\n- The number of protons tells you the element. Carbon always has 6. Oxygen always has 8.\n- Some nuclei are unstable and give off radiation. This is **radioactivity**. It’s used in medicine to find and treat cancer, and in nuclear power stations.")],
      [
        p("Match each particle to its charge.", [["Proton", "Positive (+)"], ["Neutron", "No charge"], ["Electron", "Negative (−)"]], "Proton = positive. Neutron = neutral. Electron = the other one."),
        m("Where are protons and neutrons found?", ["In the nucleus", "In the shells", "Outside the atom", "Inside electrons"], "The nucleus is the centre of the atom."),
        m("An atom has 8 protons. Which element is it?", ["Oxygen", "Carbon", "Gold", "Iron"], "Oxygen always has 8 protons."),
        m("What is radioactivity?", ["Unstable nuclei giving off radiation", "Electricity in wires", "Light from a globe", "Sound waves"], "Radio-active = the nucleus gives off energy."),
        m("What charge does an electron have?", ["Negative", "Positive", "None", "Both"], "Electrons are negative.")
      ]),
    L("s5-react", 5, "Chemical reactions",
      [learn("Making new substances", "In a chemical reaction, **reactants** change into new **products**.\n- Reactants → Products\n- Signs of a reaction: bubbles (a gas), a colour change, heat or light, a smell, or a new solid forming.\n- **Acids** (lemon juice, vinegar) have a pH below 7. **Bases** (soap, baking soda) have a pH above 7. Pure water is neutral: 7.\n- Acid + base → salt + water. This is called neutralisation.")],
      [
        s("Sort each change.", { "Chemical reaction": ["Rust forming", "Fireworks exploding", "Baking a cake"], "Physical change": ["Ice melting", "Cutting paper", "Dissolving sugar"] }, "Is a new substance made? Then it’s a chemical reaction."),
        m("When you mix vinegar and baking soda, what are the bubbles?", ["A new gas: carbon dioxide", "Air from the bottle", "Water vapour", "Soap"], "Bubbles are a sign a new gas was made."),
        m("Lemon juice has a pH of about 2. It is…", ["An acid", "A base", "Neutral", "A metal"], "Below 7 = acid."),
        m("Which is a sign of a chemical reaction?", ["A new gas forms", "It changes shape", "It gets cut in half", "It moves"], "New gas = new substance."),
        m("What are the substances at the start of a reaction called?", ["Reactants", "Products", "Elements", "Mixtures"], "Reactants react. Products are produced.")
      ], { k: "Volcano time (with an adult): put 2 spoons of baking soda in a cup, add a squirt of dish soap, then pour in vinegar. What signs of a chemical reaction can you see?" }),
    L("s5-heat", 5, "Heat, light and sound",
      [learn("How energy travels", "Heat moves in 3 ways:\n- **Conduction**: through touching. A metal spoon gets hot in soup.\n- **Convection**: hot liquids and gases rise, cool ones sink. A heater warms a room.\n- **Radiation**: heat travels as waves, even through space. Sunlight warms your face.\n\n**Sound** is a vibration. It travels through air, water and solids, but not empty space.\n**Light** is super fast (300,000 km per second) and can travel through space.")],
      [
        p("Match each way heat travels to an example.", [["Conduction", "A metal spoon heats up in hot soup"], ["Convection", "Warm air rises from a heater"], ["Radiation", "Sunlight warms your face"]], "Touching = conduction. Rising and sinking = convection. Waves = radiation."),
        m("Why is a saucepan handle often made of plastic?", ["Plastic doesn’t conduct heat well", "Plastic is heavier", "Plastic conducts heat really well", "It looks nice"], "Plastic is a poor conductor (an insulator)."),
        m("Why can’t sound travel through space?", ["There are no particles to vibrate", "It’s too cold", "It’s too dark", "The Sun blocks it"], "Sound needs particles to pass the vibration along."),
        m("How does heat from the Sun reach Earth?", ["Radiation", "Conduction", "Convection", "Sound"], "Radiation can travel through empty space.")
      ])
  ];

  /* ───────────────────── HISTORY & GEOGRAPHY ───────────────────── */
  const hass = [
    // Level 1
    L("h1-maps", 1, "Maps and directions",
      [learn("Reading maps", "- A **compass** shows directions: **N**orth, **E**ast, **S**outh, **W**est. Remember: **N**ever **E**at **S**oggy **W**eetbix (clockwise from the top).\n- Maps use a **grid**, like a game map. B3 means column B, row 3.\n- A **legend** (key) explains the symbols.\n- A **scale** shows real distance: 1 cm might equal 1 km.", "gridmap")],
      [
        m("Look at the map. What is in square C2?", ["Treasure", "Castle", "Lake", "Village"], "Find column C along the top, then row 2 down the side.", { v: "gridmap" }),
        m("Look at the map. Which square is the castle in?", ["A1", "C2", "D3", "B1"], "Find the castle, then read the letter above it and the number beside it.", { v: "gridmap" }),
        m("Which direction is opposite to North?", ["South", "East", "West", "Up"], "North is at the top. South is at the bottom."),
        m("What does a map legend do?", ["Explains the symbols", "Shows north only", "Tells the time", "Lists the players"], "Legend = key. It unlocks what the symbols mean."),
        m("Going clockwise from North, which direction comes next?", ["East", "West", "South", "North"], "Never Eat Soggy Weetbix: N, E, S, W.")
      ], { k: "Draw a map of your bedroom or your street. Add a compass and a legend with 3 symbols." }),
    L("h1-first", 1, "First Peoples of Victoria",
      [learn("The oldest continuing cultures", "- Aboriginal and Torres Strait Islander peoples have lived in Australia for **more than 65,000 years**. They are the world’s oldest continuing cultures.\n- Victoria is home to many Aboriginal nations. The Melbourne area is the Country of the **Wurundjeri Woi-wurrung** and **Bunurong** peoples of the **Kulin Nation**.\n- **Country** means more than land. It includes the land, water, sky, animals, stories and law, all connected.\n- For the Kulin Nation, **Bunjil** the wedge-tailed eagle is an important creator spirit.\n- The **Budj Bim** eel traps in western Victoria are over 6,600 years old and are World Heritage listed.\n- An **Acknowledgement of Country** shows respect to the Traditional Owners of the land.")],
      [
        m("How long have Aboriginal people lived in Australia?", ["More than 65,000 years", "About 200 years", "About 1,000 years", "10 years"], "They are the world’s oldest continuing cultures."),
        m("What is Budj Bim famous for?", ["Eel traps over 6,600 years old", "A theme park", "A shopping centre", "A gold mine"], "The Gunditjmara people built stone channels and traps to farm eels."),
        m("What does ‘Country’ mean to Aboriginal people?", ["Land, water, sky, animals, stories and law, all connected", "Only the map of Australia", "A type of music", "A city"], "Country is about connection, not just land."),
        m("Bunjil is an important creator spirit for the Kulin Nation. What animal is Bunjil?", ["A wedge-tailed eagle", "A kangaroo", "A crow", "A snake"], "Bunjil soars above as a wedge-tailed eagle."),
        m("What is an Acknowledgement of Country?", ["A way of showing respect to the Traditional Owners", "A type of map", "A sports rule", "A school test"], "It recognises whose land we are on.")
      ], { k: "Find out whose Country you live on. Ask an adult or search ‘AIATSIS map of Indigenous Australia’." }),
    L("h1-gold", 1, "The Victorian gold rush",
      [learn("Gold fever!", "- In **1851**, gold was found in Victoria, near Clunes, Ballarat and Bendigo.\n- Hundreds of thousands of people rushed here from Britain, Ireland, China, America and Europe.\n- Melbourne grew into one of the richest cities in the world.\n- Miners had to pay an expensive **licence** fee, even if they found nothing.\n- In **1854**, angry miners built a stockade at **Eureka** in Ballarat. Soldiers attacked it, and more than 20 miners and several soldiers died.\n- Afterwards the rules changed, and miners won the right to vote.")],
      [
        m("In what year was gold found in Victoria?", ["1851", "1788", "1901", "1915"], "It was the early 1850s."),
        m("Why were the miners angry?", ["They had to pay expensive licence fees, even if they found no gold", "There was too much gold", "They wanted to leave", "They didn’t like Melbourne"], "Paying for a licence and finding nothing felt unfair."),
        m("Where was the Eureka Stockade?", ["Ballarat", "Sydney", "Perth", "Hobart"], "Ballarat was one of the biggest goldfields."),
        m("What happened to Melbourne during the gold rush?", ["It grew quickly and became very rich", "It disappeared", "It got smaller", "Nothing changed"], "Gold brought people and money."),
        m("Where did gold seekers come from?", ["Britain, Ireland, China, America and Europe", "Only Sydney", "Nowhere", "Only children came"], "It was a worldwide rush.")
      ], { k: "Find Ballarat and Bendigo on a map of Victoria. How far are they from where you live?" }),

    // Level 2
    L("h2-fed", 2, "Federation 1901",
      [learn("Becoming one nation", "- Before 1901, Australia was **six separate British colonies**: New South Wales, Victoria, Queensland, South Australia, Western Australia and Tasmania.\n- Each colony had its own laws, taxes and even different train track sizes!\n- On **1 January 1901**, the colonies joined to become one nation: the **Commonwealth of Australia**. This is called **Federation**.\n- **Edmund Barton** was the first Prime Minister.\n- Melbourne was the temporary capital until Parliament moved to **Canberra** in 1927.")],
      [
        m("What happened on 1 January 1901?", ["The colonies joined to form Australia", "Gold was found", "The First Fleet arrived", "World War I began"], "This was Federation."),
        m("Who was Australia’s first Prime Minister?", ["Edmund Barton", "Captain Cook", "Ned Kelly", "John Curtin"], "Barton led the first federal government."),
        m("Before Federation, Australia was…", ["Six separate colonies", "One big state", "Part of America", "Empty land"], "Each colony ran itself."),
        m("Which city was the temporary capital?", ["Melbourne", "Sydney", "Canberra", "Brisbane"], "Parliament met in Melbourne until 1927."),
        o("Put these events in order.", ["Gold found in Victoria", "Eureka Stockade", "Federation", "Parliament moves to Canberra"], "1851, 1854, 1901, 1927.")
      ]),
    L("h2-gov", 2, "How Australia is governed",
      [learn("Three levels of government", "Australia is a **democracy**: people vote for who makes the laws. Voting is compulsory from age 18.\n\nThere are **3 levels of government**:\n- **Federal** (the whole country, based in Canberra): defence, Medicare, passports, money.\n- **State** (Victoria, based in Melbourne): schools, hospitals, police, trains.\n- **Local council**: rubbish bins, parks, libraries, local roads.")],
      [
        s("Which level of government looks after each thing?", { "Federal": ["Army and defence", "Passports"], "State": ["Public schools", "Police"], "Local council": ["Rubbish collection", "Playgrounds and parks"] }, "Whole country = federal. Victoria = state. Your area = local council."),
        m("At what age do Australians have to vote?", ["18", "12", "16", "21"], "Voting is compulsory from 18."),
        m("What is a democracy?", ["People vote to choose their leaders", "One person makes all the rules forever", "Nobody makes rules", "Only kings choose"], "Demo = people. Democracy = rule by the people."),
        m("Which level of government runs Victoria’s public schools?", ["State", "Federal", "Local", "None"], "Schools are a state job.")
      ]),
    L("h2-climate", 2, "Australia’s climate and hazards",
      [learn("Weather and hazards", "- Australia is the driest inhabited continent.\n- Northern Australia is **tropical**: hot, with a wet season and a dry season.\n- Victoria has a **temperate** climate: warm summers and cool winters.\n- Natural hazards include **bushfires**, **floods**, **droughts** and **cyclones**.\n- Bushfire safety: know your family’s fire plan and check the VicEmergency app on hot, windy days.")],
      [
        m("What type of climate does Victoria have?", ["Temperate", "Tropical", "Polar", "Desert everywhere"], "Warm summers and cool winters = temperate."),
        p("Match each hazard to what it is.", [["Drought", "A long time with little or no rain"], ["Bushfire", "A fire burning out of control in bush or grass"], ["Flood", "Water covers land that is usually dry"], ["Cyclone", "A huge tropical storm with very strong winds"]], "Think about water: too little, too much, or wind."),
        m("What is the driest inhabited continent?", ["Australia", "Antarctica", "Europe", "Asia"], "Antarctica is drier, but nobody lives there permanently."),
        m("What should every family have for bushfire season?", ["A fire plan", "A new TV", "A pool", "Nothing"], "A plan means everyone knows what to do.")
      ], { k: "Ask your family: do we have a fire plan? If not, help make one." }),

    // Level 3
    L("h3-egypt", 3, "Ancient Egypt",
      [learn("Life on the Nile", "- Ancient Egypt grew along the **Nile River** more than 5,000 years ago.\n- Every year the Nile flooded, leaving rich soil for farming.\n- Rulers were called **pharaohs**. People believed they were gods on Earth.\n- The **pyramids** at Giza were tombs for pharaohs.\n- Egyptians wrote with picture symbols called **hieroglyphs**.\n- They **mummified** bodies because they believed in life after death.")],
      [
        m("Why was the Nile River so important?", ["Its floods left rich soil for farming", "It was full of gold", "It was a good place to hide", "It had no water"], "Farming fed the whole civilisation."),
        m("What were Egyptian rulers called?", ["Pharaohs", "Emperors", "Presidents", "Knights"], "Pharaohs were seen as gods on Earth."),
        m("What are hieroglyphs?", ["Picture symbols used for writing", "Pyramids", "Mummies", "Boats"], "Hiero = holy, glyph = carving."),
        m("What were the pyramids built for?", ["Tombs for pharaohs", "Houses for farmers", "Shops", "Sports stadiums"], "They protected the pharaoh’s body for the afterlife."),
        m("Why did Egyptians make mummies?", ["They believed in life after death", "To scare robbers", "For fun", "To make statues"], "They wanted the body to last for the afterlife.")
      ], { k: "Write your name in hieroglyphs. Search ‘hieroglyph alphabet’ with an adult." }),
    L("h3-rome", 3, "Ancient Rome",
      [learn("The Roman Empire", "- Rome started as a small city in Italy and grew into a huge **empire**.\n- It was first a **republic** (citizens voted) and later ruled by **emperors**.\n- Romans built roads, **aqueducts** (bridges that carry water) and the **Colosseum**, where gladiators fought.\n- The Roman army was split into **legions**.\n- Their language, **Latin**, is the root of many English words: ‘aqua’ = water → aquarium.")],
      [
        m("What was an aqueduct used for?", ["Carrying water to cities", "Holding gladiator fights", "Storing gold", "Sailing ships"], "Aqua = water."),
        m("What happened at the Colosseum?", ["Gladiator fights and shows", "Farming", "School lessons", "Church services"], "It held around 50,000 people watching games."),
        m("‘Aqua’ is Latin for water. Which English word comes from it?", ["Aquarium", "Castle", "Pizza", "Keyboard"], "An aquarium holds water and fish."),
        m("In a republic…", ["Citizens vote for their leaders", "One emperor rules forever", "There are no rules", "Only soldiers vote"], "Rome was a republic before the emperors."),
        m("What was a legion?", ["A large group of Roman soldiers", "A type of road", "A Roman god", "A food"], "The army was organised into legions.")
      ]),
    L("h3-water", 3, "Water in the world",
      [learn("Precious water", "- Only about **3%** of Earth’s water is fresh water. Most of that is frozen in ice caps and glaciers.\n- Australia is very dry, so we need to **manage water** carefully.\n- Most of Melbourne’s water comes from protected forest **catchments** and dams to the east of the city (like the Thomson Dam).\n- A **desalination** plant near Wonthaggi can turn sea water into drinking water.\n- Ways to save water: shorter showers, fixing leaks, rain tanks.")],
      [
        m("About how much of Earth’s water is fresh water?", ["About 3%", "About 50%", "About 90%", "100%"], "Most water is salty ocean water."),
        m("What does a desalination plant do?", ["Turns sea water into drinking water", "Makes rain", "Cleans cars", "Makes ice"], "De-salination = taking the salt out."),
        m("What is a water catchment?", ["An area of land where rain collects and flows into rivers and dams", "A fishing net", "A type of shower", "A swimming pool"], "The land ‘catches’ the rain."),
        m("Which is a good way to save water?", ["Taking shorter showers", "Leaving taps running", "Watering the garden at midday", "Washing a car every day"], "Every minute less in the shower saves litres.")
      ], { k: "Time your next shower. Could you make it 2 minutes shorter?" }),

    // Level 4
    L("h4-medieval", 4, "Medieval Europe",
      [learn("The Middle Ages", "- The **Middle Ages** (medieval times) lasted from about 500 to 1500 AD.\n- Society was a pyramid called the **feudal system**: King → Nobles (lords) → Knights → Peasants.\n- Most people were peasants who farmed the land.\n- Castles protected lords and their people.\n- The **Black Death** (1347–1351), a plague spread by fleas on rats, killed about **one-third** of Europe’s people.")],
      [
        o("Put the feudal system in order from most powerful to least.", ["King", "Nobles (lords)", "Knights", "Peasants"], "The king is at the top. Peasants are at the bottom."),
        m("What was the Black Death?", ["A plague that killed about a third of Europe’s people", "A type of castle", "A famous knight", "A dark winter"], "It spread through fleas on rats."),
        m("What did most medieval people do?", ["Farmed the land as peasants", "Were knights", "Were kings", "Worked in factories"], "Most people were peasants."),
        m("What was the main purpose of a castle?", ["To protect the lord and his people", "To be a school", "To store water only", "To host games"], "Thick walls and moats kept enemies out.")
      ]),
    L("h4-land", 4, "Landforms and landscapes",
      [learn("Shaping the land", "- **Landforms** are natural shapes on Earth’s surface: mountains, valleys, plateaus, coasts, volcanoes.\n- They are shaped by **erosion** (wind, water and ice wearing rock away) and by forces inside the Earth.\n- The **Twelve Apostles** on the Great Ocean Road are limestone stacks carved by waves.\n- The **Grampians (Gariwerd)** are sandstone mountains in western Victoria.\n- Many landforms are special cultural places for Aboriginal people.")],
      [
        p("Match each landform to its description.", [["Mountain", "A high, steep landform"], ["Valley", "Low land between hills, often with a river"], ["Plateau", "A high, flat area"], ["Coast", "Where land meets the sea"]], "Plateau sounds like ‘plate’: flat."),
        m("What shaped the Twelve Apostles?", ["Waves eroding limestone", "Volcanoes", "People carving them", "Earthquakes only"], "The sea wore away the cliffs, leaving stacks."),
        m("What is erosion?", ["Rock and soil being worn away by water, wind or ice", "People building mountains", "Planting trees", "Rock melting"], "Erosion wears things away slowly."),
        m("What is the Aboriginal name for the Grampians?", ["Gariwerd", "Naarm", "Uluru", "Budj Bim"], "Naarm is Melbourne. Uluru is in the Northern Territory.")
      ]),
    L("h4-city", 4, "Cities and urbanisation",
      [learn("Moving to the city", "- **Urbanisation** means more and more people moving to cities.\n- About two-thirds of Australians live in a capital city.\n- Melbourne has about **5 million people**.\n- People move to cities for jobs, education, health care and entertainment.\n- Problems: traffic, high housing costs, pollution.\n- Solutions: better public transport, more parks, planning new suburbs well.")],
      [
        m("What does ‘urbanisation’ mean?", ["More people moving to cities", "People moving to farms", "Building more farms", "Cities getting smaller"], "Urban = city."),
        s("Sort each one.", { "City problem": ["Traffic jams", "Expensive housing", "Air pollution"], "Possible solution": ["More trains and buses", "More parks and trees", "Bike lanes"] }, "Problems make life harder. Solutions help fix them."),
        m("Why do many people move to cities?", ["Jobs, education and health care", "To find more space", "To grow crops", "To be far from shops"], "Cities have lots of services."),
        m("About how many people live in Melbourne?", ["About 5 million", "About 5,000", "About 500", "About 50 million"], "Melbourne is one of Australia’s two biggest cities.")
      ]),

    // Level 5
    L("h5-ind", 5, "The Industrial Revolution",
      [learn("Machines change everything", "- Began in **Britain around 1750** and spread around the world.\n- Machines replaced hand work. **Steam engines** powered factories, trains and ships.\n- People moved from farms to cities to work in **factories**.\n- Conditions were tough: long hours, dangerous machines and **child labour**. Some children worked 12-hour days.\n- Over time, workers formed **unions** and won better rights. In Melbourne, stonemasons won the **8-hour day** in **1856**, one of the first in the world.")],
      [
        m("Where did the Industrial Revolution begin?", ["Britain", "Australia", "China", "Brazil"], "It started in Britain around 1750."),
        m("What powered many early factories and trains?", ["Steam engines", "Solar panels", "Horses only", "Batteries"], "Burning coal heated water to make steam."),
        m("Why did people move from farms to cities?", ["To work in factories", "To go on holiday", "To find gold", "To go to university"], "The new jobs were in factories."),
        m("What did Melbourne stonemasons win in 1856?", ["The 8-hour work day", "A gold medal", "The first car", "A new city"], "8 hours work, 8 hours rest, 8 hours for yourself."),
        m("What was child labour?", ["Children working long hours in factories and mines", "Children playing games", "Children going to school", "Children helping with dinner"], "Many children worked instead of going to school.")
      ]),
    L("h5-people", 5, "Movement of peoples",
      [learn("Why people move", "- In **1788**, the British First Fleet arrived at Sydney Cove and started a colony. This caused huge loss and suffering for Aboriginal peoples, who lost land, lives and culture.\n- About **162,000 convicts** were sent to Australia between 1788 and 1868.\n- Free settlers came for land and work. Many came for gold in the 1850s.\n- People move because of **push factors** (war, poverty, no jobs) and **pull factors** (jobs, safety, land, family).\n- Today, about 3 in 10 Australians were born overseas.")],
      [
        s("Sort each reason.", { "Push factor": ["War in their country", "No jobs at home", "Poverty"], "Pull factor": ["Jobs in the new country", "Safety", "Family already living there"] }, "Push = pushes you out. Pull = pulls you in."),
        m("In what year did the First Fleet arrive?", ["1788", "1851", "1901", "1915"], "Late in the 1700s."),
        m("About how many convicts were sent to Australia?", ["About 162,000", "About 100", "About 10 million", "About 1,000"], "Between 1788 and 1868."),
        m("How did British colonisation affect Aboriginal peoples?", ["They lost land, lives and culture", "Nothing changed for them", "They gained more land", "They all moved overseas"], "Colonisation caused great harm that is still felt today.")
      ]),
    L("h5-ww1", 5, "World War I and the ANZACs",
      [learn("The Great War", "- **World War I** lasted from **1914 to 1918**.\n- Australia was part of the British Empire, so it joined the war.\n- About **416,000** Australians enlisted, from a population of under 5 million.\n- On **25 April 1915**, Australian and New Zealand troops landed at **Gallipoli** in Turkey. ANZAC = **A**ustralian and **N**ew **Z**ealand **A**rmy **C**orps.\n- More than **60,000** Australians died in the war.\n- We remember them on **Anzac Day** (25 April) and **Remembrance Day** (11 November).\n- A **primary source** comes from the time (a soldier’s letter). A **secondary source** is made later (a textbook).")],
      [
        m("When was World War I?", ["1914 to 1918", "1939 to 1945", "1851 to 1854", "1788 to 1800"], "It started in 1914."),
        m("What does ANZAC stand for?", ["Australian and New Zealand Army Corps", "All New Zealand And Canada", "Army Navy Zone And Camp", "Australian National Zoo And Circus"], "A-N-Z-A-C."),
        m("On what date did the ANZACs land at Gallipoli?", ["25 April 1915", "11 November 1918", "1 January 1901", "26 January 1788"], "That date is now Anzac Day."),
        m("Why did Australia join the war?", ["It was part of the British Empire", "It was attacked first", "It wanted gold", "It was a game"], "When Britain went to war, Australia followed."),
        m("A soldier’s letter written in 1915 is a…", ["Primary source", "Secondary source", "Fake source", "Modern source"], "Primary = from the time.")
      ], { k: "Find your local war memorial, or ask a family member if any relatives served in a war." }),
    L("h5-biomes", 5, "Biomes and food security",
      [learn("Feeding the world", "- A **biome** is a large region with a similar climate, plants and animals: desert, rainforest, grassland, tundra, forest.\n- People change biomes to grow food: clearing forests for farms, using rivers for irrigation.\n- **Food security** means everyone has enough safe, healthy food.\n- Threats: droughts, climate change, soil damage and food waste.\n- Australia grows more food than it needs and exports a lot, like wheat, beef and wine.")],
      [
        p("Match each biome to its description.", [["Desert", "Very dry, with little rain"], ["Rainforest", "Hot and wet, with tall trees"], ["Tundra", "Very cold, with frozen ground"], ["Grassland", "Open land covered in grasses"]], "Desert = dry. Rainforest = rain. Tundra = frozen."),
        m("What does ‘food security’ mean?", ["Everyone has enough safe, healthy food", "Locking up the fridge", "Guards at the supermarket", "Only eating fast food"], "Secure = safe and reliable."),
        m("Which is a threat to food security?", ["Long droughts", "Good rainfall", "Healthy soil", "Less food waste"], "No rain means crops fail."),
        m("Which is a way to reduce food waste?", ["Only buy what you need and use leftovers", "Throw out food every day", "Cook double every meal", "Buy food you don’t like"], "Less waste means more food to go around.")
      ]),
    L("h5-inter", 5, "Interconnections: where your console comes from",
      [learn("Your console’s world tour", "Your gaming console connects you to the whole world.\n- It is **designed** in one country (such as Japan or the USA).\n- Metals like **lithium, cobalt and gold** are mined in places like Australia, the Congo and Chile. Australia is the world’s biggest lithium producer.\n- Parts are **made** in factories in countries such as China, Taiwan and Vietnam.\n- It is **shipped** across oceans to Australia.\n- When thrown away, it becomes **e-waste**. In Victoria, e-waste is banned from landfill, so it must be recycled.")],
      [
        o("Put your console’s journey in order.", ["Designed", "Raw metals mined", "Parts made in factories", "Shipped to Australia", "Sold in a shop", "Recycled as e-waste"], "Idea → materials → making → moving → buying → recycling."),
        m("What is e-waste?", ["Thrown-out electronics like old phones and consoles", "Waste emails", "Food scraps", "Paper"], "E = electronic."),
        m("Which metal is Australia the world’s biggest producer of?", ["Lithium", "Chocolate", "Plastic", "Glass"], "Lithium is used in rechargeable batteries."),
        m("What is an interconnection?", ["A link between people and places", "A type of cable only", "A game level", "A shop"], "Things we use connect us to people all over the world.")
      ], { k: "Pick one thing you own (a controller, shoes or a phone). Check the label. Where was it made? Find that country on a map." })
  ];

  /* ───────────────────── SPELLING LIST (for the spelling generator) ───────────────────── */
  const spell = [
    ["because", "becuase", "becos"], ["friend", "freind", "frend"], ["said", "sed", "siad"],
    ["people", "peple", "poeple"], ["which", "wich", "whitch"], ["could", "cud", "coud"],
    ["different", "diffrent", "differnt"], ["beautiful", "beutiful", "beautifull"],
    ["favourite", "favorit", "favourate"], ["answer", "anser", "awnser"], ["again", "agen", "agian"],
    ["enough", "enuff", "enogh"], ["believe", "beleive", "belive"], ["separate", "seperate", "seprate"],
    ["tomorrow", "tommorow", "tomorow"], ["necessary", "neccessary", "necesary"],
    ["definitely", "definately", "definitly"], ["weird", "wierd", "weerd"], ["would", "woud", "wuld"],
    ["island", "iland", "ilund"], ["knight", "nite", "knite"], ["character", "caracter", "charactor"],
    ["level", "levle", "leval"], ["weapon", "wepon", "weppon"], ["tournament", "turnament", "tornament"]
  ];
  const spellSentences = {
    because: "I play at night ___ it’s quiet.", friend: "My best ___ joined my team.", said: "‘Watch out!’ she ___.",
    people: "Lots of ___ play online.", which: "___ level are you on?", could: "I ___ not find the key.",
    different: "Each world looks ___.", beautiful: "The sunset in the game was ___.", favourite: "What is your ___ game?",
    answer: "I know the ___!", again: "Let’s play that level ___.", enough: "Do we have ___ coins?",
    believe: "I ___ we can win.", separate: "Put the gems in ___ piles.", tomorrow: "We’ll finish it ___.",
    necessary: "Is it ___ to save first?", definitely: "That was ___ the hardest boss.", weird: "That glitch was really ___.",
    would: "I ___ like a new controller.", island: "We built a base on an ___.", knight: "The ___ rode into battle.",
    character: "My ___ has blue armour.", level: "I finished the last ___!", weapon: "Pick your ___ wisely.",
    tournament: "We entered the gaming ___."
  };

  /* ───────────────────── WRITING LAB ───────────────────── */
  const writing = {
    types: [
      { id: "persuasive", name: "Persuade", purpose: "Convince the reader to agree with you.",
        prompts: ["Should school start at 10am?", "Should gaming be a school subject?", "Which game is the best ever made? Convince me.", "Should phones be allowed at school?", "Should everyone learn to cook?"],
        bank: ["clearly", "definitely", "essential", "unfair", "benefit", "importantly", "evidence shows", "for example", "in addition", "however", "therefore", "without a doubt"],
        sections: [
          { k: "intro", label: "Introduction", tip: "Say your opinion clearly. Tell the reader your reasons in one sentence.", starters: ["I strongly believe that", "It is clear that", "There are three reasons why"] },
          { k: "b1", label: "Reason 1", tip: "Your strongest reason. Explain it and give an example.", starters: ["Firstly,", "The most important reason is", "For example,"] },
          { k: "b2", label: "Reason 2", tip: "Another reason. Explain it and give evidence.", starters: ["Secondly,", "Another reason is", "Research shows that"] },
          { k: "b3", label: "The other side", tip: "What might someone who disagrees say? Explain why they’re wrong.", starters: ["Some people think", "However,", "Although some argue"] },
          { k: "end", label: "Conclusion", tip: "Say your opinion again in new words. Tell the reader what to do.", starters: ["In conclusion,", "For all these reasons,", "It is time to"] }
        ] },
      { id: "narrative", name: "Story", purpose: "Entertain the reader with a story.",
        prompts: ["You wake up inside your favourite game.", "The last save point.", "A glitch opens a door to the real world.", "Your character refuses to follow orders.", "The final boss wants to be friends."],
        bank: ["suddenly", "without warning", "sprinted", "whispered", "glowing", "trembling", "echoed", "shattered", "cautiously", "enormous", "silence", "heart pounding"],
        sections: [
          { k: "intro", label: "Orientation", tip: "Who is in the story? Where and when is it?", starters: ["It was a normal day until", "Deep inside", "My name is"] },
          { k: "b1", label: "Complication", tip: "What problem starts?", starters: ["Suddenly,", "Without warning,", "That’s when I noticed"] },
          { k: "b2", label: "Rising action", tip: "Things get harder. What does the character try?", starters: ["I tried to", "Things got worse when", "My heart was pounding as"] },
          { k: "b3", label: "Climax", tip: "The biggest, most exciting moment.", starters: ["At that moment,", "With one last", "Everything went silent as"] },
          { k: "end", label: "Resolution", tip: "How is the problem solved? How does the character feel?", starters: ["In the end,", "Finally,", "When it was all over,"] }
        ] },
      { id: "report", name: "Info report", purpose: "Teach the reader facts about a topic.",
        prompts: ["How video games are made", "An Australian animal", "A planet in our solar system", "The Victorian gold rush", "How electricity gets to your house"],
        bank: ["includes", "consists of", "for example", "such as", "in addition", "however", "located", "known as", "scientists believe", "approximately", "commonly", "one interesting fact"],
        sections: [
          { k: "intro", label: "Introduction", tip: "What is your topic? Give a general description.", starters: ["___ is a", "Have you ever wondered", "This report is about"] },
          { k: "b1", label: "Section 1", tip: "One main idea with facts. E.g. what it looks like, or where it is.", starters: ["There are many types of", "It is found in", "One interesting fact is"] },
          { k: "b2", label: "Section 2", tip: "Another main idea with facts. E.g. how it works.", starters: ["In addition,", "Another important fact is", "It works by"] },
          { k: "b3", label: "Section 3", tip: "A third idea. E.g. why it matters, or problems it faces.", starters: ["This is important because", "Did you know", "However,"] },
          { k: "end", label: "Conclusion", tip: "Sum up the most important facts.", starters: ["Overall,", "In summary,", "As you can see,"] }
        ] },
      { id: "review", name: "Review", purpose: "Give your opinion about a game, movie or show.",
        prompts: ["Review a game you’ve played", "Review a movie or show you’ve watched", "Review a YouTube channel you like", "Review a food you love (or hate)"],
        bank: ["gameplay", "graphics", "storyline", "controls", "challenging", "addictive", "immersive", "repetitive", "worth it", "recommend", "however", "overall"],
        sections: [
          { k: "intro", label: "Introduction", tip: "Name it. Who made it? What type is it?", starters: ["___ is a ___ game made by", "I recently played", "If you like ___, you’ll love"] },
          { k: "b1", label: "The best parts", tip: "What is good about it? Give examples.", starters: ["The best part is", "I really enjoyed", "One great feature is"] },
          { k: "b2", label: "What could be better", tip: "What isn’t so good?", starters: ["One thing that could be better is", "However,", "The biggest problem is"] },
          { k: "b3", label: "Who is it for?", tip: "Who would enjoy it? Who wouldn’t?", starters: ["I would recommend it to", "It’s perfect for", "It might not suit"] },
          { k: "end", label: "Rating", tip: "Give a score and a final thought.", starters: ["Overall, I give it", "My final rating is", "In the end,"] }
        ] }
    ],
    stages: {
      1: { name: "Super Sentence", goal: 12, blurb: "Build one long, detailed sentence." },
      2: { name: "Hamburger Paragraph", goal: 60, blurb: "Write one paragraph: top bun, 3 fillings, bottom bun." },
      3: { name: "Full Piece", goal: 250, blurb: "Plan and write a whole piece, one part at a time. Year 9 goal: 400+ words." }
    }
  };

  /* ───────────────────── QUEST PROJECTS ───────────────────── */
  const stepTemplate = [
    { k: "choose", title: "Choose your quest", text: "Pick a topic from the ideas, or choose your own. Pick something you actually care about.", notes: "My topic is…" },
    { k: "ask", title: "Ask 3 questions", text: "What do you want to find out? Write or say 3 questions. Start them with What, How, Why or When.", notes: "1. \n2. \n3. " },
    { k: "research", title: "Research", text: "Find answers. Use books, safe websites (ask an adult), videos or ask an expert. Write 3–5 facts and where you found each one.", notes: "Fact 1 (source):\nFact 2 (source):\nFact 3 (source):" },
    { k: "plan", title: "Plan it", text: "Choose how you will show what you learned. Then list the parts you’ll need.", notes: "I will make a… It will have these parts:" },
    { k: "make", title: "Make it", text: "Build your project. Do one part per session. Take a break whenever you need one.", notes: "What I finished today:" },
    { k: "present", title: "Present it", text: "Show your project to someone. Explain 3 things you learned.", notes: "I presented to… They asked…" },
    { k: "reflect", title: "Reflect", text: "What went well? What was hard? What would you do differently next time?", notes: "Went well:\nWas hard:\nNext time:" }
  ];
  const projects = [
    { id: "game-level", name: "Design your own game level", tag: "English · Maths · Design",
      blurb: "Plan a level for a game: the map, the story, the enemies and the rules.",
      ideas: ["A platformer level with 3 checkpoints", "A Minecraft adventure map", "A board game version of a video game", "A puzzle room escape level"],
      extra: { research: "Look at 2 levels from games you know. What makes them fun? What makes them hard?", make: "Draw your level on grid paper. Use a scale (1 square = 1 m). Work out the area of each room." } },
    { id: "game-history", name: "The history of video games", tag: "History · English",
      blurb: "Make a timeline of video games, from Pong (1972) to today.",
      ideas: ["Timeline from 1970 to now", "How consoles changed over time", "The story of one game series", "How graphics got better"],
      extra: { research: "Find 6–8 big moments: the first home console, first 3D games, first online games, mobile gaming.", make: "Make a timeline with dates in order. Add a picture or drawing for each event." } },
    { id: "game-country", name: "Build a game-world country", tag: "Geography · Science",
      blurb: "Invent a country for a game world, with real geography: biome, climate, resources and a map.",
      ideas: ["An island nation in a tropical biome", "A frozen tundra kingdom", "A desert country with hidden water", "A mountain realm with rivers and valleys"],
      extra: { research: "Pick a real biome. What is the climate? What plants and animals live there? What would people eat?", make: "Draw the map with a compass, grid, legend and scale. Mark rivers, mountains, cities and resources." } },
    { id: "reaction", name: "Science of gaming: reaction time", tag: "Science · Maths",
      blurb: "Run a real experiment: does practice (or gaming) make your reactions faster?",
      ideas: ["Does practice make reactions faster?", "Are reactions faster in the morning or afternoon?", "Left hand vs right hand", "Before vs after playing a game"],
      extra: { research: "Look up the ‘ruler drop test’. Write your prediction (hypothesis): what do you think will happen?", make: "Do 10 ruler drops for each condition. Record the results in a table. Work out the mean. Make a bar graph." } },
    { id: "free", name: "Free choice quest", tag: "Any subject",
      blurb: "Choose anything you’re curious about: an animal, a sport, a car, a YouTuber, a place.",
      ideas: ["How is a car engine built?", "The best Australian animal", "How do YouTubers make money?", "A sport you like: rules, history and stars"],
      extra: {} }
  ];
  const presentWays = ["Poster", "Slideshow", "Voice recording", "Video", "Model or build", "Minecraft build", "Comic", "Talk to family"];

  return { lessons: { english, maths, science, hass }, spell, spellSentences, writing, projects, stepTemplate, presentWays };
})();
