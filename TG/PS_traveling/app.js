const root = document.getElementById("lessonRoot");
const tip = document.getElementById("tip");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const legendBtn = document.getElementById("legendBtn");
const legend = document.getElementById("legend");
const legendClose = document.getElementById("legendClose");
const studentName = document.getElementById("studentName");
const scoreText = document.getElementById("scoreText");
const saveKey = "psTravelSequentialProgress";
const formBase = "https://docs.google.com/forms/d/e/1FAIpQLSeUzYUvQbbzo_1r81AacP6Kj7HlKDzEVfa93Dam39LiVjcItA/formResponse";

const steps = Array.from(root.querySelectorAll(".panel, .task-card"));
let currentStep = 0;

const generatedChoices = {
  "Start Questions": [
    {
      prompt: "Choose a Past Simple travel sentence.",
      answer: "I travelled to another city last summer.",
      options: ["I travel every summer.", "I travelled to another city last summer.", "I am travelling now."]
    },
    {
      prompt: "Choose the correct question.",
      answer: "Who did you travel with?",
      options: ["Who did you travelled with?", "Who do you travelled with?", "Who did you travel with?"]
    },
    {
      prompt: "Choose a travel problem.",
      answer: "The train was late.",
      options: ["The train was late.", "The train late.", "The train is late yesterday."]
    },
    {
      prompt: "Choose a good final opinion.",
      answer: "It was interesting but tiring.",
      options: ["It were interesting but tiring.", "It was interesting but tiring.", "It is interesting yesterday."]
    }
  ],
  "Speak Quickly": [
    {
      prompt: "Choose the correct sentence.",
      answer: "The hotel was clean.",
      options: ["The hotel was clean.", "The hotel were clean.", "The hotel clean was."]
    },
    {
      prompt: "Choose the correct sentence.",
      answer: "The museum was interesting.",
      options: ["The museum interesting.", "The museum was interesting.", "The museum were interesting."]
    },
    {
      prompt: "Choose the correct sentence.",
      answer: "The airport was crowded.",
      options: ["The airport was crowded.", "The airport were crowded.", "The airport crowded was."]
    }
  ],
  "Text Questions": [
    {
      prompt: "Why do some people travel to the sea?",
      answer: "They want to rest.",
      options: ["They want to rest.", "They want to lose documents.", "They want to work more."]
    },
    {
      prompt: "What places do people visit to learn something new?",
      answer: "Museums, old streets, castles, churches, and famous places.",
      options: ["Only airports.", "Museums, old streets, castles, churches, and famous places.", "Only hotels."]
    },
    {
      prompt: "Can a bad trip become a good story?",
      answer: "Yes, it can.",
      options: ["Yes, it can.", "No, never.", "Only if there is no problem."]
    }
  ],
  "Story Questions": [
    {
      prompt: "Where did Pavel and Igor travel?",
      answer: "Saint Petersburg",
      options: ["Moscow", "Saint Petersburg", "Sochi"]
    },
    {
      prompt: "Why did Pavel almost miss the train?",
      answer: "He woke up late.",
      options: ["He woke up late.", "He lost his passport.", "He forgot the hotel."]
    },
    {
      prompt: "What problem did Igor have?",
      answer: "He lost his wallet.",
      options: ["He lost his wallet.", "He missed the plane.", "He broke his phone."]
    },
    {
      prompt: "Why did they call the trip an adventure?",
      answer: "They had problems, but the next day was better.",
      options: ["They had problems, but the next day was better.", "Nothing happened.", "They stayed at home."]
    }
  ],
  "Past Verb Hunt": [
    {
      prompt: "Choose three Past Simple verbs from the story.",
      answer: "decided, bought, booked",
      options: ["decided, bought, booked", "decide, buy, book", "deciding, buying, booking"]
    },
    {
      prompt: "Choose three more Past Simple verbs.",
      answer: "woke, ran, waited",
      options: ["wake, run, wait", "woke, ran, waited", "waking, running, waiting"]
    },
    {
      prompt: "Choose the irregular verb.",
      answer: "took",
      options: ["visited", "watched", "took"]
    }
  ],
  "Transport Problems": [
    {
      prompt: "Your train left five minutes ago. What is the best action?",
      answer: "Buy a new ticket or ask at the station.",
      options: ["Buy a new ticket or ask at the station.", "Go home and say nothing.", "Wait on the wrong platform."]
    },
    {
      prompt: "Your suitcase didn't arrive. What should you do?",
      answer: "Go to the lost luggage desk.",
      options: ["Go to the beach.", "Go to the lost luggage desk.", "Throw away the ticket."]
    },
    {
      prompt: "The last metro closed. Choose a safe solution.",
      answer: "Take an official taxi.",
      options: ["Walk alone far away.", "Take an official taxi.", "Sleep at the station."]
    }
  ],
  "Write a Hotel Review": [
    {
      prompt: "Choose a good hotel review sentence.",
      answer: "The room was small but clean.",
      options: ["The room was small but clean.", "The room were small but clean.", "The room small but clean."]
    },
    {
      prompt: "Choose a negative review sentence.",
      answer: "I didn't like the noisy neighbours.",
      options: ["I didn't liked the noisy neighbours.", "I didn't like the noisy neighbours.", "I don't liked the noisy neighbours."]
    },
    {
      prompt: "Choose a final opinion.",
      answer: "I would stay there again.",
      options: ["I would stay there again.", "I will stayed there again.", "I would stayed there again."]
    }
  ],
  "Last Trip Answers": [
    {
      prompt: "Choose a correct answer about place.",
      answer: "I went to Kazan.",
      options: ["I went to Kazan.", "I go to Kazan yesterday.", "I goed to Kazan."]
    },
    {
      prompt: "Choose a correct answer about transport.",
      answer: "I travelled by train.",
      options: ["I travel by train last year.", "I travelled by train.", "I travelling by train."]
    },
    {
      prompt: "Choose a correct answer about opinion.",
      answer: "The trip was amazing.",
      options: ["The trip were amazing.", "The trip was amazing.", "The trip amazing was."]
    }
  ],
  "Logic Mistake Hunter": [
    {
      prompt: "What is the mistake with the train?",
      answer: "They arrived after the train left.",
      options: ["They arrived after the train left.", "They arrived too early.", "The train was free."]
    },
    {
      prompt: "What is the mistake with clothes?",
      answer: "Winter coats are strange in +30 C.",
      options: ["Winter coats are strange in +30 C.", "They needed more coats.", "The weather was snowy."]
    },
    {
      prompt: "What is the mistake with the museum?",
      answer: "They visited it after it closed.",
      options: ["They visited it after it closed.", "It opened at night.", "It was near the hotel."]
    }
  ],
  "Case: Lost Passport": [
    {
      prompt: "What was bad advice?",
      answer: "Don't tell anyone.",
      options: ["Don't tell anyone.", "Ask for help.", "Call the embassy."]
    },
    {
      prompt: "What should Masha do first?",
      answer: "Ask official people for help.",
      options: ["Travel to another city.", "Ask official people for help.", "Hide the problem."]
    },
    {
      prompt: "Should she travel without a passport?",
      answer: "No, she shouldn't.",
      options: ["Yes, of course.", "No, she shouldn't.", "Only for fun."]
    }
  ],
  "Case: Online Hotel": [
    {
      prompt: "What was different in real life?",
      answer: "The hotel was far, smelly, and breakfast was not included.",
      options: ["The hotel was far, smelly, and breakfast was not included.", "The beach was three minutes away.", "The room was perfect."]
    },
    {
      prompt: "What should they ask for?",
      answer: "A refund or another room.",
      options: ["More bad photos.", "A refund or another room.", "A colder shower."]
    },
    {
      prompt: "How can tourists avoid this problem?",
      answer: "Read reviews before booking.",
      options: ["Read reviews before booking.", "Never check the address.", "Book the first hotel."]
    }
  ],
  "Case: A Difficult Friend": [
    {
      prompt: "What did Roma do wrong?",
      answer: "He woke up late and complained.",
      options: ["He woke up late and complained.", "He planned everything well.", "He helped his friends."]
    },
    {
      prompt: "Should friends do everything together?",
      answer: "No, they can sometimes split up.",
      options: ["Yes, always.", "No, they can sometimes split up.", "No one should travel."]
    },
    {
      prompt: "What should friends discuss?",
      answer: "Money, plans, and free time.",
      options: ["Only souvenirs.", "Money, plans, and free time.", "Nothing."]
    }
  ],
  "Hotel Reception Role Play": [
    {
      prompt: "Choose the polite first line.",
      answer: "Hello. I booked a room for two nights.",
      options: ["Give me room now.", "Hello. I booked a room for two nights.", "Where train?"]
    },
    {
      prompt: "Choose the correct question.",
      answer: "Did you travel far?",
      options: ["Did you travelled far?", "Do you travelled far?", "Did you travel far?"]
    },
    {
      prompt: "Choose the correct answer.",
      answer: "Yes, I travelled by train.",
      options: ["Yes, I travelled by train.", "Yes, I travel yesterday.", "Yes, I did travelled."]
    }
  ],
  "Travel Story Interview": [
    {
      prompt: "Choose a correct interview question.",
      answer: "Where did you go?",
      options: ["Where did you went?", "Where did you go?", "Where you went?"]
    },
    {
      prompt: "Choose a correct answer.",
      answer: "I went to the beach.",
      options: ["I went to the beach.", "I go to the beach last summer.", "I goed to the beach."]
    },
    {
      prompt: "Choose another correct question.",
      answer: "Did you buy souvenirs?",
      options: ["Did you bought souvenirs?", "Did you buy souvenirs?", "Bought you souvenirs?"]
    }
  ],
  "Class Survey": [
    {
      prompt: "Choose a correct survey question.",
      answer: "Did you travel last summer?",
      options: ["Did you travel last summer?", "Did you travelled last summer?", "Do you travelled last summer?"]
    },
    {
      prompt: "Choose a correct survey result.",
      answer: "Three students travelled last summer.",
      options: ["Three students travel last summer.", "Three students travelled last summer.", "Three students did travelled."]
    },
    {
      prompt: "Choose a correct problem sentence.",
      answer: "One student lost luggage.",
      options: ["One student lost luggage.", "One student lose luggage yesterday.", "One student losing luggage."]
    }
  ],
  "One Minute Speaking": [
    {
      prompt: "Choose a correct topic sentence.",
      answer: "My best trip was last year.",
      options: ["My best trip was last year.", "My best trip were last year.", "My best trip is last year."]
    },
    {
      prompt: "Choose a correct problem sentence.",
      answer: "I missed the bus.",
      options: ["I miss the bus yesterday.", "I missed the bus.", "I did missed the bus."]
    },
    {
      prompt: "Choose a correct final sentence.",
      answer: "I liked the trip.",
      options: ["I liked the trip.", "I like the trip yesterday.", "I was liked the trip."]
    }
  ],
  "My Last Trip": [
    {
      prompt: "Choose the best opening.",
      answer: "Last summer, I went to Sochi.",
      options: ["Last summer, I went to Sochi.", "Last summer, I go to Sochi.", "Last summer, I goed to Sochi."]
    },
    {
      prompt: "Choose the correct activity sentence.",
      answer: "We swam and visited a museum.",
      options: ["We swam and visited a museum.", "We swim and visit yesterday.", "We swimming and visited."]
    },
    {
      prompt: "Choose the correct opinion.",
      answer: "It was a great trip.",
      options: ["It were a great trip.", "It was a great trip.", "It did a great trip."]
    }
  ],
  "The Holiday That Went Wrong": [
    {
      prompt: "Choose a good story start.",
      answer: "Last winter, we went to Moscow.",
      options: ["Last winter, we went to Moscow.", "Last winter, we go to Moscow.", "Last winter, we did went to Moscow."]
    },
    {
      prompt: "Choose a travel problem.",
      answer: "We missed the train.",
      options: ["We missed the train.", "We miss the train yesterday.", "We did missed the train."]
    },
    {
      prompt: "Choose a good ending.",
      answer: "In the end, we bought new tickets.",
      options: ["In the end, we bought new tickets.", "In the end, we buyed new tickets.", "In the end, we did bought new tickets."]
    }
  ],
  "Final Speaking Challenge": [
    {
      prompt: "Choose a sentence with a regular verb.",
      answer: "We visited a museum.",
      options: ["We visited a museum.", "We visit a museum yesterday.", "We did visited a museum."]
    },
    {
      prompt: "Choose a sentence with an irregular verb.",
      answer: "We ate local food.",
      options: ["We eated local food.", "We ate local food.", "We did ate local food."]
    },
    {
      prompt: "Choose a correct negative sentence.",
      answer: "We didn't buy souvenirs.",
      options: ["We didn't bought souvenirs.", "We didn't buy souvenirs.", "We don't bought souvenirs."]
    }
  ],
  "Mini Test: Questions and Story": [
    {
      prompt: "Choose the correct story sentence.",
      answer: "I went to the beach.",
      options: ["I went to the beach.", "I go to the beach yesterday.", "I did went to the beach."]
    },
    {
      prompt: "Choose the correct negative sentence.",
      answer: "I didn't stay in a hotel.",
      options: ["I didn't stayed in a hotel.", "I didn't stay in a hotel.", "I don't stayed in a hotel."]
    }
  ]
};

const answerOptions = {
  "a document for transport": ["a document for transport", "bags and suitcases", "a place where you sleep"],
  "bags and suitcases": ["bags and suitcases", "an official travel document", "a person who visits places"],
  "a place where you sleep during a trip": ["a place where you sleep during a trip", "a document for transport", "a small gift"],
  "an official document for travelling abroad": ["an official document for travelling abroad", "a beach activity", "a train station"],
  "Last summer I travelled by train.": ["Last summer I travelled by train.", "Last summer I travel by train.", "Last summer I did travelled by train."],
  "He went to the beach last year.": ["He went to the beach last year.", "He go to the beach last year.", "He did went to the beach last year."],
  "They didn't buy souvenirs.": ["They didn't buy souvenirs.", "They didn't bought souvenirs.", "They don't bought souvenirs."],
  "I didn't travel by plane.": ["I didn't travel by plane.", "I didn't travelled by plane.", "I don't travelled by plane."],
  "She didn't see the sea.": ["She didn't see the sea.", "She didn't saw the sea.", "She don't saw the sea."],
  "They didn't go to the mountains.": ["They didn't go to the mountains.", "They didn't went to the mountains.", "They don't went to the mountains."],
  "Did you travel last summer?": ["Did you travel last summer?", "Did you travelled last summer?", "Do you travelled last summer?"],
  "Did she go to the beach?": ["Did she go to the beach?", "Did she went to the beach?", "Does she went to the beach?"],
  "Did the train arrive on time?": ["Did the train arrive on time?", "Did the train arrived on time?", "Was the train arrive on time?"],
  "Did you go to Kazan?": ["Did you go to Kazan?", "Did you went to Kazan?", "Do you went to Kazan?"],
  "I didn't buy a ticket.": ["I didn't buy a ticket.", "I didn't bought a ticket.", "I don't bought a ticket."],
  "The hotel was clean.": ["The hotel was clean.", "The hotel were clean.", "The hotel clean."],
  "Take a power bank.": ["Take a power bank.", "Forget the charger.", "Pack ten coats."],
  "Pack only what you need.": ["Pack only what you need.", "Pack everything you own.", "Never pack documents."],
  "Check the weather.": ["Check the weather.", "Ignore the weather.", "Lose the address."],
  "Save the address on your phone and on paper.": ["Save the address on your phone and on paper.", "Delete the address.", "Ask nobody."],
  "Did he stay in a hotel?": ["Did he stay in a hotel?", "Did he stayed in a hotel?", "Does he stayed in a hotel?"],
  "Were the tickets expensive?": ["Were the tickets expensive?", "Was the tickets expensive?", "Did the tickets expensive?"]
};

document.documentElement.setAttribute("translate", "no");
document.body.setAttribute("translate", "no");
document.body.classList.add("lock-select", "sequential-mode");

steps.forEach((step, index) => {
  step.classList.add("lesson-step");
  step.dataset.step = String(index + 1);
  if (!step.querySelector(".step-badge")) {
    const badge = document.createElement("div");
    badge.className = "step-badge no-copy";
    badge.textContent = `Step ${index + 1} / ${steps.length}`;
    step.prepend(badge);
  }
});

["copy", "cut", "contextmenu", "dragstart"].forEach((eventName) => {
  document.addEventListener(eventName, (event) => {
    const editable = event.target.closest("input, select");
    if (!editable) event.preventDefault();
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const protectedCombo = (event.ctrlKey || event.metaKey) && ["c", "x", "u", "s", "p"].includes(key);
  if (protectedCombo && !event.target.closest("input")) event.preventDefault();
});

function normalize(value) {
  return String(value || "")
    .trim()
    .replace(/[']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "")
    .toLowerCase();
}

function shuffleOptions(options) {
  return [...new Set(options)].sort(() => Math.random() - 0.5);
}

function createChoiceSelect(answer, options) {
  const select = document.createElement("select");
  select.dataset.answer = answer;
  select.appendChild(new Option("Choose", ""));
  shuffleOptions(options).forEach((option) => {
    select.appendChild(new Option(option, option));
  });
  return select;
}

function fallbackOptions(answer) {
  const lower = normalize(answer);
  if (["a", "b", "c"].includes(lower)) return ["A", "B", "C"];
  if (["did", "was", "were"].includes(lower)) return ["Did", "Was", "Were"];
  if (["visited", "stayed", "walked", "travelled", "watched", "arrived"].includes(lower)) {
    const base = {
      visited: "visit",
      stayed: "stay",
      walked: "walk",
      travelled: "travel",
      watched: "watch",
      arrived: "arrive"
    }[lower];
    return [answer, base, `${base}ing`];
  }
  if (["went", "saw", "ate", "bought", "took", "lost"].includes(lower)) {
    const base = { went: "go", saw: "see", ate: "eat", bought: "buy", took: "take", lost: "lose" }[lower];
    return [answer, base, `${base}ed`];
  }
  return [answer, "I don't know", "Another answer"];
}

function makeChoiceBlock(items) {
  const list = document.createElement("div");
  list.className = "choice-list generated-choice";
  items.forEach((item) => {
    const label = document.createElement("label");
    label.append(item.prompt);
    label.appendChild(createChoiceSelect(item.answer, item.options));
    list.appendChild(label);
  });
  return list;
}

function convertWritingToChoices() {
  document.querySelectorAll(".task-card").forEach((task) => {
    const title = task.querySelector(".task-head b")?.textContent.trim();
    let replacedWriting = false;

    task.querySelectorAll("textarea").forEach((textarea) => {
      replacedWriting = true;
      const choices = generatedChoices[title] || [
        {
          prompt: "Choose the best Past Simple sentence.",
          answer: "I went there last summer.",
          options: ["I went there last summer.", "I go there last summer.", "I did went there last summer."]
        },
        {
          prompt: "Choose the correct negative sentence.",
          answer: "I didn't buy a ticket.",
          options: ["I didn't buy a ticket.", "I didn't bought a ticket.", "I don't bought a ticket."]
        }
      ];
      textarea.replaceWith(makeChoiceBlock(choices));
    });

    if (replacedWriting) {
      task.querySelectorAll("ol").forEach((list) => list.remove());
    }

    task.querySelectorAll("input[data-answer]").forEach((input) => {
      const answer = input.dataset.answer;
      const select = createChoiceSelect(answer, answerOptions[answer] || fallbackOptions(answer));
      input.replaceWith(select);
    });

    task.querySelectorAll("input:not([data-answer])").forEach((input) => {
      input.replaceWith(createChoiceSelect("A", ["A", "B", "C"]));
    });

    task.querySelectorAll("p").forEach((paragraph) => {
      paragraph.textContent = paragraph.textContent
        .replace(/Answer in full sentences\./gi, "Choose the best answers.")
        .replace(/Write [^.]+\./gi, "Choose the best option.")
        .replace(/Make six sentences with travel words and adjectives\./gi, "Choose correct travel sentences.")
        .replace(/Ask and answer 8 questions about a real or invented trip\./gi, "Choose correct interview lines.")
        .replace(/Tell a travel story\.[^.]+/gi, "Choose correct travel story lines.");
    });
  });
}

function currentFields() {
  return Array.from(steps[currentStep].querySelectorAll("input, select"));
}

function showStep(index) {
  currentStep = Math.max(0, Math.min(index, steps.length - 1));
  steps.forEach((step, stepIndex) => {
    step.classList.toggle("is-active", stepIndex === currentStep);
  });
  backBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Next";
  scoreText.textContent = `Step ${currentStep + 1}/${steps.length}`;
  document.querySelector(".lesson-shell-anchor")?.scrollIntoView({ block: "start" });
  saveProgress();
}

function validateStep(mark = true) {
  const fields = currentFields();
  if (!fields.length) return true;

  let ok = true;
  let answered = false;

  fields.forEach((field) => {
    const value = field.value.trim();
    const expected = field.dataset.answer;
    field.classList.remove("correct", "wrong");

    if (value) answered = true;

    if (expected) {
      const isCorrect = normalize(value) === normalize(expected);
      if (!isCorrect) ok = false;
      if (mark && value) field.classList.add(isCorrect ? "correct" : "wrong");
      if (!value) ok = false;
      return;
    }

    if (!value) ok = false;
  });

  if (!answered) {
    scoreText.textContent = "Answer first";
    return false;
  }

  if (!ok) {
    scoreText.textContent = "Check this step";
    return false;
  }

  scoreText.textContent = "Good";
  return true;
}

function checkAllAnswers() {
  let checked = 0;
  let correct = 0;

  document.querySelectorAll("[data-answer]").forEach((field) => {
    const answer = normalize(field.dataset.answer);
    const value = normalize(field.value);
    if (!value) {
      field.classList.remove("correct", "wrong");
      return;
    }

    checked += 1;
    const ok = value === answer;
    correct += ok ? 1 : 0;
    field.classList.toggle("correct", ok);
    field.classList.toggle("wrong", !ok);
  });

  return { checked, correct };
}

function fieldId(field, index) {
  if (!field.dataset.saveId) field.dataset.saveId = `field-${index}`;
  return field.dataset.saveId;
}

function getFields() {
  return Array.from(document.querySelectorAll("input, select"));
}

function saveProgress() {
  const data = {
    step: currentStep,
    updatedAt: new Date().toISOString(),
    fields: {}
  };

  getFields().forEach((field, index) => {
    data.fields[fieldId(field, index)] = field.value;
  });

  localStorage.setItem(saveKey, JSON.stringify(data));
  document.cookie = `${saveKey}=1; Max-Age=2592000; path=/; SameSite=Lax`;
}

function loadProgress() {
  const raw = localStorage.getItem(saveKey);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    getFields().forEach((field, index) => {
      const value = data.fields?.[fieldId(field, index)];
      if (typeof value === "string") field.value = value;
    });
    currentStep = Math.min(Number(data.step) || 0, steps.length - 1);
  } catch {
    localStorage.removeItem(saveKey);
  }
}

function buildResults() {
  const score = checkAllAnswers();
  const tasks = Array.from(document.querySelectorAll("[data-task]")).map((task, index) => {
    const fields = Array.from(task.querySelectorAll("input, textarea, select"));
    const checkedFields = fields.filter((field) => field.dataset.answer);
    const correct = checkedFields.filter((field) => normalize(field.value) === normalize(field.dataset.answer)).length;
    const answered = fields.filter((field) => field.value.trim()).length;

    return {
      task: index + 1,
      answered,
      fields: fields.length,
      checked: checkedFields.length,
      correct
    };
  });

  return {
    name: studentName.value.trim() || "No name",
    group: "TG25 defaul",
    lesson: "past simple and travel",
    score: score.correct,
    checked: score.checked,
    completedTasks: tasks.filter((task) => task.answered > 0).length,
    totalTasks: tasks.length,
    tasks,
    sentAt: new Date().toISOString()
  };
}

function sendResults() {
  const payload = buildResults();
  const iframe = document.createElement("iframe");
  iframe.name = `formTarget${Date.now()}`;
  iframe.hidden = true;
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = formBase;
  form.target = iframe.name;
  form.hidden = true;

  const entries = {
    "entry.1582931880": payload.name,
    "entry.1222434157": payload.group,
    "entry.371289786": payload.lesson,
    "entry.679064514": JSON.stringify(payload)
  };

  Object.entries(entries).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  scoreText.textContent = `Sent ${payload.score}/${payload.checked}`;
  window.setTimeout(() => {
    iframe.remove();
    form.remove();
  }, 5000);
}

backBtn.addEventListener("click", () => showStep(currentStep - 1));
nextBtn.addEventListener("click", () => {
  if (!validateStep(true)) return;
  if (currentStep === steps.length - 1) {
    sendResults();
    return;
  }
  showStep(currentStep + 1);
});

legendBtn.addEventListener("click", () => {
  legend.hidden = false;
  window.clearTimeout(legend.hideTimer);
  legend.hideTimer = window.setTimeout(() => { legend.hidden = true; }, 12000);
});

legendClose.addEventListener("click", () => { legend.hidden = true; });

document.addEventListener("input", (event) => {
  if (event.target.matches("input, select")) saveProgress();
});

document.addEventListener("change", (event) => {
  if (event.target.matches("input, select")) saveProgress();
});

function showTip(button, entry) {
  const rect = button.getBoundingClientRect();
  tip.innerHTML = `<b>${entry.emoji ? `${entry.emoji} ` : ""}${entry.word}</b><br>${entry.translation}`;
  tip.hidden = false;
  const left = Math.min(rect.left, window.innerWidth - tip.offsetWidth - 12);
  const top = rect.bottom + tip.offsetHeight + 14 > window.innerHeight
    ? rect.top - tip.offsetHeight - 10
    : rect.bottom + 10;
  tip.style.left = `${Math.max(12, left)}px`;
  tip.style.top = `${Math.max(12, top)}px`;
}

function fixMojibake(value) {
  const text = String(value || "");
  if (!/[ÐÑÂÃð]/.test(text)) return text;
  try {
    const bytes = Uint8Array.from(text, (char) => char.charCodeAt(0) & 255);
    return new TextDecoder("utf-8").decode(bytes);
  } catch {
    return text;
  }
}

function fixVisibleEncoding() {
  document.querySelectorAll(".ru").forEach((element) => {
    element.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) node.nodeValue = fixMojibake(node.nodeValue);
    });
  });
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".vocab-word")) tip.hidden = true;
});

async function loadVocabulary() {
  try {
    const response = await fetch("words_fixed.json", { cache: "force-cache" });
    const words = await response.json();
    const dict = new Map();

    words.forEach((item) => {
      const word = String(item.Word || "").toLowerCase();
      if (word && /^[a-z][a-z'-]*$/.test(word)) {
        dict.set(word, {
          word: item.Word,
          translation: fixMojibake(item.Translation),
          emoji: fixMojibake(item.Emoji)
        });
      }
    });

    wrapText(root, dict);
  } catch {
    scoreText.textContent = "Vocabulary did not load";
  }
}

function wrapText(container, dict) {
  const used = new Map();
  let totalWrapped = 0;
  const maxTotal = 280;
  const maxPerWord = 2;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("input, select, button, label, .task-head, .step-badge, script, style")) {
        return NodeFilter.FILTER_REJECT;
      }
      return /[A-Za-z]/.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const parts = node.nodeValue.split(/([A-Za-z][A-Za-z'-]*)/g);

    parts.forEach((part) => {
      const entry = dict.get(part.toLowerCase());
      const key = part.toLowerCase();
      const wordCount = used.get(key) || 0;
      if (!entry || part.length < 3 || wordCount >= maxPerWord || totalWrapped >= maxTotal) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }

      used.set(key, wordCount + 1);
      totalWrapped += 1;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "vocab-word";
      button.textContent = part;
      button.setAttribute("translate", "no");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        showTip(button, entry);
      });
      button.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
        showTip(button, entry);
      });
      fragment.appendChild(button);
    });

    node.parentNode.replaceChild(fragment, node);
  });
}

const anchor = document.createElement("div");
anchor.className = "lesson-shell-anchor";
document.querySelector(".layout").prepend(anchor);

fixVisibleEncoding();
convertWritingToChoices();
loadProgress();
showStep(currentStep);
loadVocabulary();
