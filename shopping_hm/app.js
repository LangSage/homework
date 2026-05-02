(() => {
  'use strict';

  const TOPIC = 'Shopping Homework: Market Mission';
  const ASSIGNMENT_CODE = 'HOMEFORK_TG25';
  const FORM_ID = '1FAIpQLSeUzYUvQbbzo_1r81AacP6Kj7HlKDzEVfa93Dam39LiVjcItA';
  const FORM_VIEW_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform?usp=pp_url`;
  const FORM_ACTION_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
  const FORM_FIELDS = {
    name: 'entry.1582931880',
    code: 'entry.371289786',
    payload: 'entry.679064514',
  };

  const STORAGE = {
    profile: 'shopping_hm_profile_v1',
    snapshot: 'shopping_hm_snapshot_v1',
    result: 'shopping_hm_result_v1',
    pending: 'shopping_hm_pending_v1',
    submitted: 'shopping_hm_submitted_v1',
  };

  const BANK = [
    {
      id: 'vocab-basket',
      type: 'vocabulary',
      prompt: 'Maya walks into Sunny Market. What does she take to carry small items?',
      choices: ['a basket', 'a shelf', 'a receipt', 'a cashier'],
      answer: 0,
      image: './assets/images/market_scene.png',
      feedback: 'A basket is for carrying small things while you shop.',
    },
    {
      id: 'vocab-cashier',
      type: 'vocabulary',
      prompt: 'Which person takes your money at the end of shopping?',
      choices: ['a customer', 'a cashier', 'a janitor', 'a manager'],
      answer: 1,
      image: './assets/images/market_scene.png',
      feedback: 'The cashier works at the checkout.',
    },
    {
      id: 'container-loaf',
      type: 'vocabulary',
      prompt: 'A loaf usually goes with which food?',
      choices: ['bread', 'water', 'oranges', 'rice'],
      answer: 0,
      image: './assets/images/basket_receipt.png',
      feedback: 'We say a loaf of bread.',
    },
    {
      id: 'container-carton',
      type: 'vocabulary',
      prompt: 'A carton is the best container for...',
      choices: ['milk', 'bread', 'apples', 'a receipt'],
      answer: 0,
      image: './assets/images/market_scene.png',
      feedback: 'A carton of milk is a useful shopping phrase.',
    },
    {
      id: 'phrase-price',
      type: 'phrases',
      prompt: 'Maya asks, "How much is it?" What does she want to know?',
      choices: ['the price', 'the section', 'the color', 'the worker name'],
      answer: 0,
      feedback: 'How much is it? is a price question.',
    },
    {
      id: 'map-top-left',
      type: 'image',
      prompt: 'Look at the shop map. Which area is at the top left?',
      choices: ['fruit', 'drinks', 'cashier', 'rice'],
      answer: 0,
      image: './assets/images/store_map.png',
      feedback: 'Fruit is in the top-left area of the map.',
    },
    {
      id: 'map-cashier',
      type: 'image',
      prompt: 'Look at the shop map. Where is the cashier?',
      choices: ['bottom right', 'top left', 'near the entrance', 'between fruit and dairy'],
      answer: 0,
      image: './assets/images/store_map.png',
      feedback: 'The cashier is in the bottom-right corner.',
    },
    {
      id: 'map-middle',
      type: 'image',
      prompt: 'Look at the shop map. Which section is between fruit and drinks?',
      choices: ['dairy', 'bread', 'rice', 'entrance'],
      answer: 0,
      image: './assets/images/store_map.png',
      feedback: 'Dairy is between fruit and drinks.',
    },
    {
      id: 'scene-bottles',
      type: 'image',
      prompt: 'In the market scene, which section has bottles?',
      choices: ['drinks', 'bread', 'fruit', 'cashier'],
      answer: 0,
      image: './assets/images/market_scene.png',
      feedback: 'The bottles are in the drinks section.',
    },
    {
      id: 'scene-hand',
      type: 'image',
      prompt: 'In the market scene, what is Maya holding?',
      choices: ['a basket', 'a receipt', 'a bottle', 'a loaf'],
      answer: 0,
      image: './assets/images/market_scene.png',
      feedback: 'She is holding a basket.',
    },
    {
      id: 'receipt-apple',
      type: 'receipt',
      prompt: 'Look at the receipt. Which item costs 0.60?',
      choices: ['apple', 'milk', 'rice', 'bread'],
      answer: 0,
      image: './assets/images/basket_receipt.png',
      feedback: 'The apple costs 0.60 on the receipt.',
    },
    {
      id: 'receipt-total',
      type: 'receipt',
      prompt: 'Look at the receipt. What is the total?',
      choices: ['7.10', '6.10', '1.80', '2.10'],
      answer: 0,
      image: './assets/images/basket_receipt.png',
      feedback: 'The receipt total is 7.10.',
    },
    {
      id: 'story-empty',
      type: 'reading',
      prompt: 'Read the mini story.\nMaya and Leo have a dinner list. They need bread, milk, rice, apples, and juice. The juice shelf is empty, so they choose water. At the cashier, Leo checks the receipt and sees one extra chocolate bar. They ask the cashier to remove it.\nWhat is not available?',
      choices: ['juice', 'bread', 'rice', 'milk'],
      answer: 0,
      feedback: 'The juice shelf is empty.',
    },
    {
      id: 'story-cashier',
      type: 'reading',
      prompt: 'Read the mini story again.\nMaya and Leo have a dinner list. They need bread, milk, rice, apples, and juice. The juice shelf is empty, so they choose water. At the cashier, Leo checks the receipt and sees one extra chocolate bar. They ask the cashier to remove it.\nWhy do they speak to the cashier?',
      choices: ['There is an extra chocolate bar.', 'The rice is too heavy.', 'The shop is closed.', 'The basket is missing.'],
      answer: 0,
      feedback: 'They found an extra item on the receipt.',
    },
    {
      id: 'story-replace',
      type: 'reading',
      prompt: 'Read the mini story again.\nMaya and Leo have a dinner list. They need bread, milk, rice, apples, and juice. The juice shelf is empty, so they choose water.\nWhat do they choose instead of juice?',
      choices: ['water', 'cheese', 'bananas', 'chocolate milk'],
      answer: 0,
      feedback: 'They choose water because there is no juice.',
    },
    {
      id: 'polite-sentence',
      type: 'phrases',
      prompt: 'Which sentence is polite in a shop?',
      choices: ['Could I have a packet of rice, please?', 'Rice now.', 'Give me that shelf.', 'You must buy this.'],
      answer: 0,
      feedback: 'Could I have..., please? is polite and useful.',
    },
    {
      id: 'audio-rice',
      type: 'listening',
      prompt: 'Listen to the customer. What is the customer looking for?',
      choices: ['rice', 'bread', 'oranges', 'the cashier'],
      answer: 0,
      audio: './assets/audio/clip_rice.mp3',
      feedback: 'The customer asks where the rice is.',
    },
    {
      id: 'audio-basket',
      type: 'listening',
      prompt: 'Listen to the customer. What is in the basket?',
      choices: ['two oranges and one apple', 'two apples and one orange', 'bread and rice only', 'water and cheese'],
      answer: 0,
      audio: './assets/audio/clip_basket.mp3',
      feedback: 'The basket has two oranges and one apple.',
    },
    {
      id: 'audio-water',
      type: 'listening',
      prompt: 'Listen to the customer. Why does the customer not take the water?',
      choices: ['It is too expensive.', 'It is too cold.', 'It is open.', 'It is near the door.'],
      answer: 0,
      audio: './assets/audio/clip_water.mp3',
      feedback: 'The bottle of water is too expensive.',
    },
    {
      id: 'dialogue-help',
      type: 'phrases',
      prompt: 'Worker: Can I help you?\nCustomer: ...\nChoose the best answer.',
      choices: ['Yes, please. I need a packet of rice.', 'No, you are rice.', 'Where money?', 'I am the cashier.'],
      answer: 0,
      feedback: 'Yes, please. I need... is clear and polite.',
    },
    {
      id: 'list-correct',
      type: 'vocabulary',
      prompt: 'Your list says: bread, milk, apples. Which basket is correct?',
      choices: ['bread, milk, apples', 'rice, water, oranges', 'bread, juice, potatoes', 'milk, cheese, tomatoes'],
      answer: 0,
      feedback: 'The basket must match the shopping list.',
    },
    {
      id: 'grammar-there-is',
      type: 'grammar',
      grammar: true,
      prompt: 'Grammar check.\nChoose the correct start: ___ a cashier near the door.',
      choices: ['There is', 'There are', 'There am', 'There be'],
      answer: 0,
      feedback: 'Use There is for one cashier.',
    },
    {
      id: 'grammar-an',
      type: 'grammar',
      grammar: true,
      prompt: 'Grammar check.\nChoose the correct article: Maya wants ___ orange.',
      choices: ['an', 'a', 'the', '-'],
      answer: 0,
      feedback: 'Use an before the vowel sound in orange.',
    },
    {
      id: 'grammar-the',
      type: 'grammar',
      grammar: true,
      prompt: 'Grammar check.\nChoose the best article: The rice is on ___ top shelf from the map.',
      choices: ['the', 'a', 'an', 'are'],
      answer: 0,
      feedback: 'Use the when the shelf is specific.',
    },
  ];

  const dom = {
    startScreen: document.getElementById('startScreen'),
    practiceScreen: document.getElementById('practiceScreen'),
    resultScreen: document.getElementById('resultScreen'),
    studentName: document.getElementById('studentName'),
    studentGroup: document.getElementById('studentGroup'),
    startBtn: document.getElementById('startBtn'),
    resumeBtn: document.getElementById('resumeBtn'),
    studentMeta: document.getElementById('studentMeta'),
    progressText: document.getElementById('progressText'),
    scoreText: document.getElementById('scoreText'),
    progressFill: document.getElementById('progressFill'),
    imagePanel: document.getElementById('imagePanel'),
    questionImage: document.getElementById('questionImage'),
    questionCanvas: document.getElementById('questionCanvas'),
    audioRow: document.getElementById('audioRow'),
    playAudioBtn: document.getElementById('playAudioBtn'),
    taskAudio: document.getElementById('taskAudio'),
    optionsList: document.getElementById('optionsList'),
    feedbackPanel: document.getElementById('feedbackPanel'),
    feedbackCanvas: document.getElementById('feedbackCanvas'),
    questionWordLayer: document.getElementById('questionWordLayer'),
    feedbackWordLayer: document.getElementById('feedbackWordLayer'),
    saveBtn: document.getElementById('saveBtn'),
    nextBtn: document.getElementById('nextBtn'),
    resultTitle: document.getElementById('resultTitle'),
    resultScore: document.getElementById('resultScore'),
    resultPercent: document.getElementById('resultPercent'),
    resultName: document.getElementById('resultName'),
    resultGroup: document.getElementById('resultGroup'),
    resultTime: document.getElementById('resultTime'),
    resultSession: document.getElementById('resultSession'),
    submitState: document.getElementById('submitState'),
    retrySendBtn: document.getElementById('retrySendBtn'),
    formFallback: document.getElementById('formFallback'),
    toast: document.getElementById('toast'),
    dictPopover: document.getElementById('dictPopover'),
    dictClose: document.getElementById('dictClose'),
    dictEmoji: document.getElementById('dictEmoji'),
    dictWord: document.getElementById('dictWord'),
    dictTranslation: document.getElementById('dictTranslation'),
  };

  const colors = {
    ink: '#1f2a2e',
    muted: '#687477',
    green: '#235b4d',
    red: '#d74e43',
    blue: '#315c96',
  };

  const state = {
    sessionId: '',
    name: '',
    group: '',
    questions: [],
    currentIndex: 0,
    answers: {},
    startedAt: 0,
    finishedAt: 0,
    finished: false,
    submitState: 'Waiting',
    awayEvents: 0,
    lastHiddenAt: 0,
  };

  let toastTimer = 0;
  let dictTimer = 0;
  let resizeTimer = 0;
  let hiddenDuringTask = false;
  const dictionary = new Map();
  let dictionaryReady = false;

  init();

  function init() {
    document.documentElement.setAttribute('translate', 'no');
    document.body.setAttribute('translate', 'no');
    document.body.classList.add('notranslate');

    attachProtection();
    preloadProfile();
    registerServiceWorker();
    requestPersistentStorage();

    const result = safeRead(STORAGE.result, null);
    const snapshot = safeRead(STORAGE.snapshot, null);
    if (snapshot && snapshot.sessionId && !snapshot.finished) {
      dom.resumeBtn.classList.remove('hidden');
    }

    if (result && result.sessionId && result.finished) {
      hydrateResult(result);
    }

    dom.startBtn.addEventListener('click', startSessionFromInputs);
    dom.resumeBtn.addEventListener('click', resumeSession);
    dom.saveBtn.addEventListener('click', () => {
      persistSnapshot();
      showToast('Saved.');
    });
    dom.nextBtn.addEventListener('click', goNext);
    dom.playAudioBtn.addEventListener('click', playCurrentAudio);
    dom.retrySendBtn.addEventListener('click', () => submitOnce(buildPayload(), true));
    dom.dictClose.addEventListener('click', hideDictionary);
    document.addEventListener('click', (event) => {
      if (dom.dictPopover.classList.contains('hidden')) return;
      if (dom.dictPopover.contains(event.target) || event.target.classList.contains('word-hit')) return;
      hideDictionary();
    });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pagehide', persistIfActive, { passive: true });
    window.addEventListener('beforeunload', persistIfActive, { passive: true });
    window.addEventListener('online', tryPendingSubmission, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    render();
    loadDictionary().then(() => render());
    tryPendingSubmission();
  }

  function startSessionFromInputs() {
    const locked = safeRead(STORAGE.result, null);
    if (locked && locked.finished) {
      hydrateResult(locked);
      render();
      showToast('This homework is already completed.');
      return;
    }

    const name = cleanInput(dom.studentName.value, 80);
    const group = cleanInput(dom.studentGroup.value, 50);
    if (!name) {
      showToast('Enter your name.');
      return;
    }

    state.sessionId = createSessionId();
    state.name = name;
    state.group = group;
    state.questions = buildSessionQuestions();
    state.currentIndex = 0;
    state.answers = {};
    state.startedAt = Date.now();
    state.finishedAt = 0;
    state.finished = false;
    state.submitState = 'Waiting';
    state.awayEvents = 0;
    state.lastHiddenAt = 0;

    safeWrite(STORAGE.profile, { name, group });
    safeWrite(STORAGE.result, null);
    persistSnapshot();
    render();
  }

  function resumeSession() {
    const snapshot = safeRead(STORAGE.snapshot, null);
    if (!snapshot || !snapshot.sessionId || snapshot.finished) {
      showToast('Nothing to resume.');
      return;
    }

    hydrateSnapshot(snapshot);
    render();
    showToast('Progress restored.');
  }

  function buildSessionQuestions() {
    return shuffle(BANK.map((item) => ({
      id: item.id,
      type: item.type,
      grammar: !!item.grammar,
      prompt: item.prompt,
      image: item.image || '',
      audio: item.audio || '',
      feedback: item.feedback || '',
      options: shuffle(item.choices.map((text, index) => ({
        text,
        correct: index === item.answer,
      }))),
    })));
  }

  function render() {
    const active = Boolean(state.sessionId && !state.finished);
    const finished = Boolean(state.sessionId && state.finished);
    dom.startScreen.classList.toggle('hidden', active || finished);
    dom.practiceScreen.classList.toggle('hidden', !active);
    dom.resultScreen.classList.toggle('hidden', !finished);

    if (active) renderPractice();
    if (finished) renderResult();
  }

  function renderPractice() {
    const question = currentQuestion();
    if (!question) {
      finishSession();
      return;
    }

    const answered = state.answers[question.id];
    const total = state.questions.length;
    const done = Object.keys(state.answers).length;
    const score = getScore();
    const progress = Math.round((done / total) * 100);

    dom.studentMeta.textContent = `${state.name}${state.group ? ' / ' + state.group : ''}`;
    dom.progressText.textContent = `${Math.min(done + 1, total)} / ${total}`;
    dom.scoreText.textContent = `${score} pts`;
    dom.progressFill.style.width = `${progress}%`;

    if (question.image) {
      dom.questionImage.src = question.image;
      dom.imagePanel.classList.remove('hidden');
    } else {
      dom.questionImage.removeAttribute('src');
      dom.imagePanel.classList.add('hidden');
    }

    if (question.audio) {
      dom.taskAudio.src = question.audio;
      dom.audioRow.classList.remove('hidden');
    } else {
      dom.taskAudio.removeAttribute('src');
      dom.audioRow.classList.add('hidden');
    }

    const title = `Task ${state.currentIndex + 1} of ${total}\n${question.prompt}`;
    renderTextCanvas(dom.questionCanvas, title, {
      fontSize: window.innerWidth < 700 ? 18 : 22,
      lineHeight: 1.42,
      paddingX: window.innerWidth < 700 ? 16 : 22,
      paddingY: window.innerWidth < 700 ? 16 : 20,
      minHeight: 116,
      color: colors.ink,
      strongFirstLine: true,
    }, dom.questionWordLayer);

    dom.optionsList.innerHTML = '';
    question.options.forEach((option, index) => {
      const card = document.createElement('div');
      card.className = 'option-card';
      card.setAttribute('role', 'button');
      card.tabIndex = answered ? -1 : 0;
      card.setAttribute('aria-label', `Option ${index + 1}`);
      const wrap = document.createElement('div');
      wrap.className = 'canvas-wrap';
      const canvas = document.createElement('canvas');
      const wordLayer = document.createElement('div');
      wordLayer.className = 'word-layer';
      wrap.appendChild(canvas);
      wrap.appendChild(wordLayer);
      card.appendChild(wrap);
      dom.optionsList.appendChild(card);

      const prefix = `${String.fromCharCode(65 + index)}. `;
      renderTextCanvas(canvas, prefix + option.text, {
        fontSize: window.innerWidth < 700 ? 16 : 18,
        lineHeight: 1.35,
        paddingX: 14,
        paddingY: 13,
        minHeight: 52,
        color: colors.ink,
      }, wordLayer);

      if (answered) {
        card.classList.add('locked');
        if (index === answered.choiceIndex) card.classList.add('selected');
        if (option.correct) card.classList.add('correct');
        if (index === answered.choiceIndex && !answered.correct) card.classList.add('wrong');
      } else {
        card.addEventListener('click', () => answerCurrent(index));
        card.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          answerCurrent(index);
        });
      }
    });

    if (answered) {
      const feedback = answered.correct
        ? `Correct.\n${question.feedback}`
        : `Not this time.\nCorrect answer: ${answered.correctText}\n${question.feedback}`;
      dom.feedbackPanel.classList.remove('hidden');
      renderTextCanvas(dom.feedbackCanvas, feedback, {
        fontSize: window.innerWidth < 700 ? 16 : 18,
        lineHeight: 1.35,
        paddingX: 16,
        paddingY: 14,
        minHeight: 78,
        color: answered.correct ? colors.green : colors.red,
      }, dom.feedbackWordLayer);
      dom.nextBtn.disabled = false;
      dom.nextBtn.textContent = state.currentIndex >= total - 1 ? 'Finish' : 'Next';
    } else {
      dom.feedbackPanel.classList.add('hidden');
      if (dom.feedbackWordLayer) dom.feedbackWordLayer.innerHTML = '';
      dom.nextBtn.disabled = true;
      dom.nextBtn.textContent = 'Next';
    }
  }

  function answerCurrent(choiceIndex) {
    const question = currentQuestion();
    if (!question || state.answers[question.id]) return;

    const option = question.options[choiceIndex];
    const correct = question.options.find((item) => item.correct);
    state.answers[question.id] = {
      questionId: question.id,
      type: question.type,
      grammar: !!question.grammar,
      prompt: question.prompt,
      choiceIndex,
      choiceText: option ? option.text : '',
      correctText: correct ? correct.text : '',
      correct: !!(option && option.correct),
      answeredAt: Date.now(),
    };
    persistSnapshot();
    renderPractice();
  }

  function goNext() {
    const question = currentQuestion();
    if (!question || !state.answers[question.id]) return;
    if (state.currentIndex >= state.questions.length - 1) {
      finishSession();
      return;
    }
    state.currentIndex += 1;
    persistSnapshot();
    renderPractice();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function finishSession() {
    state.finished = true;
    state.finishedAt = Date.now();
    state.currentIndex = state.questions.length;
    state.submitState = 'Sending...';
    persistSnapshot();
    saveResult();
    render();
    submitOnce(buildPayload(), false);
  }

  function renderResult() {
    const payload = buildPayload();
    dom.resultTitle.textContent = payload.percent >= 85 ? 'Excellent' : payload.percent >= 65 ? 'Good work' : 'Completed';
    dom.resultScore.textContent = `${payload.score} / ${payload.total}`;
    dom.resultPercent.textContent = `${payload.percent}%`;
    dom.resultName.textContent = payload.name || '-';
    dom.resultGroup.textContent = payload.group || '-';
    dom.resultTime.textContent = formatDuration(payload.durationSec);
    dom.resultSession.textContent = payload.sessionId || '-';
    dom.submitState.textContent = state.submitState || 'Waiting';
    dom.formFallback.href = buildPrefilledLink(payload);
  }

  function buildPayload() {
    const total = state.questions.length || BANK.length;
    const score = getScore();
    const percent = total ? Math.round((score / total) * 100) : 0;
    const durationSec = Math.max(0, Math.round(((state.finishedAt || Date.now()) - (state.startedAt || Date.now())) / 1000));
    const answers = state.questions.map((question, index) => {
      const answer = state.answers[question.id] || {};
      return {
        n: index + 1,
        id: question.id,
        type: question.type,
        grammar: !!question.grammar,
        selected: answer.choiceText || '',
        correctAnswer: answer.correctText || '',
        correct: !!answer.correct,
      };
    });

    return {
      assignment: ASSIGNMENT_CODE,
      topic: TOPIC,
      sessionId: state.sessionId,
      name: state.name,
      group: state.group,
      score,
      total,
      percent,
      durationSec,
      awayEvents: state.awayEvents,
      grammarTasks: state.questions.filter((item) => item.grammar).length,
      finishedAt: state.finishedAt ? new Date(state.finishedAt).toISOString() : '',
      submitState: state.submitState,
      answers,
    };
  }

  async function submitOnce(payload, force) {
    if (!payload || !payload.sessionId) return;

    const submittedMap = safeRead(STORAGE.submitted, {});
    if (submittedMap[payload.sessionId] && !force) {
      state.submitState = 'Already sent';
      saveResult();
      renderResult();
      return;
    }

    const body = buildFormBody(payload);
    try {
      let sent = false;
      if (navigator.sendBeacon && !force) {
        const blob = new Blob([body.toString()], {
          type: 'application/x-www-form-urlencoded;charset=UTF-8',
        });
        sent = navigator.sendBeacon(FORM_ACTION_URL, blob);
      }

      if (!sent) {
        await fetch(FORM_ACTION_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: body.toString(),
          keepalive: true,
        });
      }

      submittedMap[payload.sessionId] = true;
      safeWrite(STORAGE.submitted, submittedMap);
      safeWrite(STORAGE.pending, null);
      state.submitState = 'Sent';
      saveResult();
      persistSnapshot();
      renderResult();
    } catch (error) {
      safeWrite(STORAGE.pending, {
        sessionId: payload.sessionId,
        body: body.toString(),
        payload,
        at: Date.now(),
      });
      state.submitState = 'Queued';
      saveResult();
      persistSnapshot();
      renderResult();
    }
  }

  async function tryPendingSubmission() {
    const pending = safeRead(STORAGE.pending, null);
    if (!pending || !pending.body || !navigator.onLine) return;

    const submittedMap = safeRead(STORAGE.submitted, {});
    if (submittedMap[pending.sessionId]) {
      safeWrite(STORAGE.pending, null);
      return;
    }

    try {
      await fetch(FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: pending.body,
        keepalive: true,
      });
      submittedMap[pending.sessionId] = true;
      safeWrite(STORAGE.submitted, submittedMap);
      safeWrite(STORAGE.pending, null);
      if (pending.sessionId === state.sessionId) {
        state.submitState = 'Sent';
        saveResult();
        renderResult();
      }
    } catch (error) {
      if (pending.sessionId === state.sessionId) {
        state.submitState = 'Queued';
        saveResult();
        renderResult();
      }
    }
  }

  function buildFormBody(payload) {
    const body = new URLSearchParams();
    body.set(FORM_FIELDS.name, payload.name || '');
    body.set(FORM_FIELDS.code, ASSIGNMENT_CODE);
    body.set(FORM_FIELDS.payload, JSON.stringify(payload));
    return body;
  }

  function buildPrefilledLink(payload) {
    const url = new URL(FORM_VIEW_URL);
    url.searchParams.set(FORM_FIELDS.name, payload.name || '');
    url.searchParams.set(FORM_FIELDS.code, ASSIGNMENT_CODE);
    url.searchParams.set(FORM_FIELDS.payload, JSON.stringify(payload));
    return url.toString();
  }

  function playCurrentAudio() {
    const question = currentQuestion();
    if (!question || !question.audio) return;
    dom.taskAudio.currentTime = 0;
    dom.taskAudio.play().catch(() => showToast('Tap again to play audio.'));
  }

  function currentQuestion() {
    return state.questions[state.currentIndex] || null;
  }

  function getScore() {
    return Object.values(state.answers).reduce((sum, item) => sum + (item && item.correct ? 1 : 0), 0);
  }

  function persistIfActive() {
    if (state.sessionId && !state.finished) persistSnapshot();
  }

  function persistSnapshot() {
    if (!state.sessionId) return;
    const snapshot = {
      sessionId: state.sessionId,
      name: state.name,
      group: state.group,
      questions: state.questions,
      currentIndex: state.currentIndex,
      answers: state.answers,
      startedAt: state.startedAt,
      finishedAt: state.finishedAt,
      finished: state.finished,
      submitState: state.submitState,
      awayEvents: state.awayEvents,
      lastHiddenAt: state.lastHiddenAt,
    };
    safeWrite(STORAGE.snapshot, snapshot);
    writeCookie('shopping_hm_live', JSON.stringify({
      sessionId: state.sessionId,
      currentIndex: state.currentIndex,
      score: getScore(),
      total: state.questions.length,
      finished: state.finished,
      t: Date.now(),
    }), 30);
  }

  function saveResult() {
    const payload = buildPayload();
    safeWrite(STORAGE.result, {
      ...payload,
      finished: true,
      questions: state.questions,
      answersState: state.answers,
      startedAt: state.startedAt,
      finishedAtMs: state.finishedAt,
    });
    writeCookie('shopping_hm_result', JSON.stringify({
      sessionId: state.sessionId,
      score: payload.score,
      total: payload.total,
      percent: payload.percent,
      t: Date.now(),
    }), 30);
  }

  function hydrateSnapshot(snapshot) {
    state.sessionId = snapshot.sessionId || '';
    state.name = cleanInput(snapshot.name || '', 80);
    state.group = cleanInput(snapshot.group || '', 50);
    state.questions = Array.isArray(snapshot.questions) ? snapshot.questions : buildSessionQuestions();
    state.currentIndex = clamp(Number(snapshot.currentIndex) || 0, 0, Math.max(0, state.questions.length - 1));
    state.answers = snapshot.answers && typeof snapshot.answers === 'object' ? snapshot.answers : {};
    state.startedAt = Number(snapshot.startedAt) || Date.now();
    state.finishedAt = Number(snapshot.finishedAt) || 0;
    state.finished = !!snapshot.finished;
    state.submitState = snapshot.submitState || 'Waiting';
    state.awayEvents = Number(snapshot.awayEvents) || 0;
    state.lastHiddenAt = Number(snapshot.lastHiddenAt) || 0;
    dom.studentName.value = state.name;
    dom.studentGroup.value = state.group;
  }

  function hydrateResult(result) {
    state.sessionId = result.sessionId || '';
    state.name = cleanInput(result.name || '', 80);
    state.group = cleanInput(result.group || '', 50);
    state.questions = Array.isArray(result.questions) ? result.questions : [];
    state.answers = result.answersState && typeof result.answersState === 'object' ? result.answersState : {};
    state.currentIndex = state.questions.length;
    state.startedAt = Number(result.startedAt) || Date.now();
    state.finishedAt = Number(result.finishedAtMs) || Date.now();
    state.finished = true;
    state.submitState = result.submitState || 'Waiting';
    state.awayEvents = Number(result.awayEvents) || 0;
    dom.studentName.value = state.name;
    dom.studentGroup.value = state.group;
  }

  function preloadProfile() {
    const profile = safeRead(STORAGE.profile, null);
    if (!profile) return;
    dom.studentName.value = profile.name || '';
    dom.studentGroup.value = profile.group || '';
  }

  function handleVisibilityChange() {
    if (!state.sessionId || state.finished) return;
    if (document.hidden) {
      hiddenDuringTask = true;
      state.awayEvents += 1;
      state.lastHiddenAt = Date.now();
      persistSnapshot();
      return;
    }

    if (!hiddenDuringTask) return;
    hiddenDuringTask = false;
    refreshRemainingTasks();
    persistSnapshot();
    render();
    showToast('Remaining tasks refreshed.');
  }

  function refreshRemainingTasks() {
    const question = currentQuestion();
    if (question && state.answers[question.id]) return;

    const answered = state.questions.filter((item) => state.answers[item.id]);
    const remaining = state.questions
      .filter((item) => !state.answers[item.id])
      .map((item) => ({
        ...item,
        options: shuffle(item.options.slice()),
      }));

    state.questions = answered.concat(shuffle(remaining));
    state.currentIndex = answered.length;
  }

  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (state.sessionId && !state.finished) renderPractice();
    }, 90);
  }

  async function loadDictionary() {
    try {
      const response = await fetch('./words.json', { cache: 'force-cache' });
      if (!response.ok) throw new Error('Dictionary not found');
      const rows = await response.json();
      if (!Array.isArray(rows)) throw new Error('Dictionary is not an array');
      rows.forEach((row) => {
        if (!row || !row.Word || !row.Translation) return;
        const key = normalizeDictKey(row.Word);
        if (!key) return;
        dictionary.set(key, {
          word: String(row.Word),
          translation: String(row.Translation),
          emoji: String(row.Emoji || '📘'),
        });
      });
      dictionaryReady = true;
    } catch (error) {
      dictionaryReady = false;
    }
  }

  function renderTextCanvas(canvas, text, cfg, wordLayer) {
    const frame = canvas.parentElement;
    const width = Math.max(260, Math.floor((frame && frame.clientWidth) || canvas.clientWidth || 320));
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const fontSize = cfg.fontSize || 18;
    const lineHeight = Math.round(fontSize * (cfg.lineHeight || 1.35));
    const paddingX = cfg.paddingX == null ? 14 : cfg.paddingX;
    const paddingY = cfg.paddingY == null ? 12 : cfg.paddingY;
    const maxWidth = Math.max(40, width - paddingX * 2);
    const font = `700 ${fontSize}px Inter, Segoe UI, Arial, sans-serif`;
    const normalFont = `600 ${fontSize}px Inter, Segoe UI, Arial, sans-serif`;
    const probe = document.createElement('canvas').getContext('2d');
    probe.font = normalFont;

    const lines = [];
    String(text || '').replace(/\r/g, '').split('\n').forEach((paragraph) => {
      const words = paragraph.trim().split(/\s+/).filter(Boolean);
      if (!words.length) {
        lines.push({ tokens: [], text: '' });
        return;
      }
      let lineTokens = [];
      words.forEach((word) => {
        const token = { raw: word };
        const nextTokens = lineTokens.concat(token);
        const next = nextTokens.map((item) => item.raw).join(' ');
        if (probe.measureText(next).width <= maxWidth || !lineTokens.length) {
          lineTokens = nextTokens;
        } else {
          lines.push({ tokens: lineTokens, text: lineTokens.map((item) => item.raw).join(' ') });
          lineTokens = [token];
        }
      });
      if (lineTokens.length) lines.push({ tokens: lineTokens, text: lineTokens.map((item) => item.raw).join(' ') });
    });

    const height = Math.max(cfg.minHeight || 52, paddingY * 2 + lines.length * lineHeight);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.textBaseline = 'top';

    lines.forEach((line, index) => {
      ctx.font = cfg.strongFirstLine && index === 0 ? font : normalFont;
      ctx.fillStyle = index === 0 && cfg.strongFirstLine ? colors.green : (cfg.color || colors.ink);
      ctx.fillText(line.text, paddingX, paddingY + index * lineHeight);
      let x = paddingX;
      const space = ctx.measureText(' ').width;
      line.tokens.forEach((token) => {
        const tokenWidth = ctx.measureText(token.raw).width;
        token.x = x;
        token.y = paddingY + index * lineHeight;
        token.width = tokenWidth;
        token.height = lineHeight;
        x += tokenWidth + space;
      });
    });

    renderWordLayer(wordLayer, lines, width, height);
  }

  function renderWordLayer(layer, lines, width, height) {
    if (!layer) return;
    layer.innerHTML = '';
    layer.style.width = `${width}px`;
    layer.style.height = `${height}px`;
    if (!dictionaryReady || !dictionary.size) return;

    const fragment = document.createDocumentFragment();
    lines.forEach((line) => {
      line.tokens.forEach((token) => {
        const entry = findDictionaryEntry(token.raw);
        if (!entry) return;
        const hit = document.createElement('span');
        hit.className = 'word-hit';
        hit.setAttribute('role', 'button');
        hit.tabIndex = 0;
        hit.setAttribute('aria-label', `Translate ${token.raw}`);
        hit.style.left = `${token.x}px`;
        hit.style.top = `${token.y}px`;
        hit.style.width = `${Math.max(12, token.width)}px`;
        hit.style.height = `${Math.max(18, token.height)}px`;
        hit.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          showDictionary(entry, token.raw);
        });
        hit.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          event.stopPropagation();
          showDictionary(entry, token.raw);
        });
        fragment.appendChild(hit);
      });
    });
    layer.appendChild(fragment);
  }

  function findDictionaryEntry(rawToken) {
    const key = normalizeDictKey(rawToken);
    if (!key) return null;
    const candidates = [key];
    if (key.endsWith("'s")) candidates.push(key.slice(0, -2));
    if (key.endsWith('ies') && key.length > 4) candidates.push(`${key.slice(0, -3)}y`);
    if (key.endsWith('es') && key.length > 3) candidates.push(key.slice(0, -2));
    if (key.endsWith('s') && key.length > 3) candidates.push(key.slice(0, -1));
    if (key.endsWith('ing') && key.length > 5) candidates.push(key.slice(0, -3), `${key.slice(0, -3)}e`);
    if (key.endsWith('ed') && key.length > 4) candidates.push(key.slice(0, -2), `${key.slice(0, -1)}`);

    for (const item of candidates) {
      if (dictionary.has(item)) return dictionary.get(item);
    }
    return null;
  }

  function normalizeDictKey(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, '')
      .replace(/[^a-z0-9']/g, '');
  }

  function showDictionary(entry, rawToken) {
    clearTimeout(dictTimer);
    dom.dictEmoji.textContent = entry.emoji || '📘';
    dom.dictWord.textContent = String(rawToken || entry.word || '').replace(/^[^a-z0-9']+|[^a-z0-9']+$/gi, '') || entry.word || '';
    dom.dictTranslation.textContent = entry.translation || '';
    dom.dictPopover.classList.remove('hidden');
    dictTimer = window.setTimeout(hideDictionary, 3600);
  }

  function hideDictionary() {
    clearTimeout(dictTimer);
    dom.dictPopover.classList.add('hidden');
  }

  function attachProtection() {
    const guarded = (event) => {
      if (isEditable(event.target)) return;
      event.preventDefault();
    };
    ['copy', 'cut', 'contextmenu', 'dragstart', 'selectstart'].forEach((type) => {
      document.addEventListener(type, guarded);
    });

    document.addEventListener('keydown', (event) => {
      if (isEditable(event.target)) return;
      const key = String(event.key || '').toLowerCase();
      if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'p', 's', 'u', 'x'].includes(key)) {
        event.preventDefault();
      }
      if (key === 'f12') event.preventDefault();
    });
  }

  function isEditable(target) {
    return Boolean(target && target.closest && target.closest('input, textarea, [contenteditable="true"]'));
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (location.protocol === 'file:') return;
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  function requestPersistentStorage() {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().catch(() => {});
    }
  }

  function safeRead(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw || raw === 'null') return fallback;
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function safeWrite(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }

  function writeCookie(name, value, days) {
    try {
      const expires = new Date(Date.now() + Number(days || 30) * 86400000).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    } catch (error) {}
  }

  function cleanInput(value, max) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
  }

  function createSessionId() {
    const random = Math.random().toString(36).slice(2, 9);
    return `shop-${Date.now().toString(36)}-${random}`;
  }

  function shuffle(items) {
    const array = items.slice();
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function formatDuration(totalSec) {
    const safe = Math.max(0, Number(totalSec) || 0);
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    dom.toast.textContent = message;
    dom.toast.classList.remove('hidden');
    toastTimer = window.setTimeout(() => dom.toast.classList.add('hidden'), 2200);
  }
})();
