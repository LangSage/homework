(() => {
  'use strict';

  const TOPIC_CODE = 'homework_for_offliners';
  const FORM_FIELDS = {
    name: 'entry.1582931880',
    group: 'entry.1222434157',
    topic: 'entry.371289786',
    payload: 'entry.679064514',
  };

  const STORAGE_KEYS = {
    profile: 'offliners_question_words_profile_v1',
    result: 'offliners_question_words_result_v1',
  };

  const DEFAULT_PROFILE = {
    name: 'Andrew',
    group: 'ОДЛз',
  };

  const CORE_DICT = [
    { Word: 'what', Translation: 'что / какой', Emoji: '?' },
    { Word: 'who', Translation: 'кто', Emoji: '?' },
    { Word: 'where', Translation: 'где / куда', Emoji: '?' },
    { Word: 'when', Translation: 'когда', Emoji: '?' },
    { Word: 'why', Translation: 'почему', Emoji: '?' },
    { Word: 'how', Translation: 'как / насколько', Emoji: '?' },
    { Word: 'which', Translation: 'какой / который из вариантов', Emoji: '?' },
    { Word: 'whose', Translation: 'чей', Emoji: '?' },
    { Word: 'whom', Translation: 'кого / кому', Emoji: '?' },
    { Word: 'question', Translation: 'вопрос', Emoji: '?' },
    { Word: 'word', Translation: 'слово', Emoji: '?' },
    { Word: 'person', Translation: 'человек', Emoji: '?' },
    { Word: 'place', Translation: 'место', Emoji: '?' },
    { Word: 'time', Translation: 'время', Emoji: '?' },
    { Word: 'reason', Translation: 'причина', Emoji: '?' },
    { Word: 'owner', Translation: 'владелец', Emoji: '?' },
    { Word: 'choice', Translation: 'выбор', Emoji: '?' },
  ];

  const QUESTION_WORDS = [
    ['what', 'предмет / действие', 'What do you need?'],
    ['who', 'человек', 'Who is calling?'],
    ['where', 'место', 'Where is the office?'],
    ['when', 'время', 'When do we start?'],
    ['why', 'причина', 'Why are you late?'],
    ['how', 'как / способ', 'How do you know?'],
    ['which', 'выбор из вариантов', 'Which route is faster?'],
    ['whose', 'чей / владелец', 'Whose phone is this?'],
    ['whom', 'кого / кому', 'Whom did you invite?'],
  ];

  const STEPS = [
    {
      id: 'map',
      type: 'lesson',
      minutes: '0-6 мин',
      title: 'Вопросительное слово показывает, какой ответ нужен',
      body: [
        'Не учим их как длинный список. Каждое слово просит один тип ответа.',
        'Сначала подумай: мне нужен человек, место, время, причина или выбор?',
      ],
      cards: QUESTION_WORDS.slice(0, 6),
      visual: 'compass',
    },
    {
      id: 'full-map',
      type: 'lesson',
      minutes: '6-12 мин',
      title: 'Карта вопросительных слов',
      body: [
        'Смотри на тип ответа: предмет, человек, место, время, причина, способ, выбор, владелец.',
        'Нажимай на подчеркнутые английские слова: появится перевод из словаря.',
      ],
      cards: QUESTION_WORDS,
    },
    {
      id: 'q-what-name',
      type: 'quiz',
      minutes: '12-15 мин',
      title: 'Выбери пропущенное вопросительное слово',
      prompt: '___ is your name?',
      choices: ['What', 'Where', 'Who', 'Why'],
      answer: 0,
      explain: 'Имя - это информация. Для такой информации обычно нужен what.',
    },
    {
      id: 'q-where-from',
      type: 'quiz',
      minutes: '15-18 мин',
      title: 'Вопрос про место',
      prompt: '___ are you from?',
      choices: ['When', 'Where', 'Which', 'Whose'],
      answer: 1,
      explain: 'From значит "из какого места". Для места используем where.',
    },
    {
      id: 'formula',
      type: 'lesson',
      minutes: '18-24 мин',
      title: 'Простая формула вопроса',
      body: [
        'Частый порядок в английском вопросе: вопросительное слово + помощник/be + кто + действие.',
        'Примеры ниже читаем как готовые модели. Сначала вопросительное слово, потом is/do/did.',
      ],
      formula: ['Вопрос. слово', 'помощник / be', 'кто?', 'действие / конец'],
      examples: ['Where is the station?', 'Why do you study English?', 'What did she buy?'],
    },
    {
      id: 'q-why-late',
      type: 'quiz',
      minutes: '24-27 мин',
      title: 'Спросить причину',
      prompt: '___ are you late?',
      choices: ['Where', 'Why', 'When', 'Whose'],
      answer: 1,
      explain: 'Если ответ будет "потому что...", нужен why.',
    },
    {
      id: 'q-how-school',
      type: 'quiz',
      minutes: '27-30 мин',
      title: 'Спросить способ',
      prompt: '___ do you get to school?',
      choices: ['How', 'Who', 'Which', 'Whom'],
      answer: 0,
      explain: 'Ответ может быть by bus, by car, on foot. Это способ. Значит, нужен how.',
    },
    {
      id: 'how-family',
      type: 'lesson',
      minutes: '30-36 мин',
      title: 'Семья слова how',
      body: [
        'How часто работает вместе с другим словом: many, much, old, long, often, far.',
        'Смотри на слово после how. Оно подсказывает, о чем вопрос: количество, цена, возраст, длина, частота или расстояние.',
      ],
      family: [
        ['how many', 'сколько штук', 'How many boxes?'],
        ['how much', 'сколько стоит / сколько', 'How much is it?'],
        ['how old', 'возраст', 'How old are you?'],
        ['how long', 'как долго / длина', 'How long is the lesson?'],
        ['how often', 'как часто', 'How often do you train?'],
        ['how far', 'как далеко', 'How far is the office?'],
      ],
    },
    {
      id: 'q-how-many',
      type: 'quiz',
      minutes: '36-38 мин',
      title: 'Количество предметов',
      prompt: '___ many students are in the room?',
      choices: ['What', 'How', 'Where', 'Whose'],
      answer: 1,
      explain: 'Many почти всегда идет с how: How many students?',
    },
    {
      id: 'q-how-much',
      type: 'quiz',
      minutes: '38-40 мин',
      title: 'Вопрос о цене',
      prompt: '___ much is the ticket?',
      choices: ['Who', 'How', 'Which', 'When'],
      answer: 1,
      explain: 'Цена - это how much: How much is the ticket?',
    },
    {
      id: 'choice-owner',
      type: 'lesson',
      minutes: '40-45 мин',
      title: 'Выбор и владелец',
      body: [
        'Which используем, когда есть выбор: A или B, красный или синий, первый или второй.',
        'Whose используем, когда нужен владелец: мой, твой, его, ее, их.',
      ],
      examples: ['Which jacket do you want, red or blue?', 'Whose jacket is on the chair?'],
    },
    {
      id: 'q-whose',
      type: 'quiz',
      minutes: '45-47 мин',
      title: 'Спросить, чей предмет',
      prompt: '___ backpack is under the table?',
      choices: ['Who', 'Whose', 'Which', 'Where'],
      answer: 1,
      explain: 'Ответ будет про владельца: my backpack, Olga\'s backpack, his backpack. Нужен whose.',
    },
    {
      id: 'q-which',
      type: 'quiz',
      minutes: '47-49 мин',
      title: 'Спросить про выбор',
      prompt: '___ route is faster, A or B?',
      choices: ['Which', 'Whose', 'Why', 'When'],
      answer: 0,
      explain: 'A or B - это выбор из вариантов. Значит, нужен which.',
    },
    {
      id: 'who-whom',
      type: 'lesson',
      minutes: '49-52 мин',
      title: 'Who и whom',
      body: [
        'Who - простой и самый частый вопрос "кто?". Обычно это человек, который делает действие.',
        'Whom - формальное слово "кого / кому". В обычной речи часто говорят who, но знать whom полезно.',
      ],
      examples: ['Who called you?', 'Whom did you call?'],
    },
    {
      id: 'q-who',
      type: 'quiz',
      minutes: '52-53 мин',
      title: 'Человек делает действие',
      prompt: '___ opened the door?',
      choices: ['Who', 'Whom', 'Where', 'How'],
      answer: 0,
      explain: 'Нужен человек, который открыл дверь. Поэтому who.',
    },
    {
      id: 'q-whom',
      type: 'quiz',
      minutes: '53-54 мин',
      title: 'Формальное "кого"',
      prompt: '___ did the manager invite?',
      choices: ['Where', 'Whose', 'Whom', 'When'],
      answer: 2,
      explain: 'Менеджер пригласил кого? В формальном английском здесь whom.',
    },
    {
      id: 'memory',
      type: 'lesson',
      minutes: '54-56 мин',
      title: 'Быстрое запоминание',
      body: [
        'Повтори вслух: what - что, who - кто, where - где, when - когда, why - почему, how - как.',
        'Добавь еще три: which - какой из вариантов, whose - чей, whom - кого / кому.',
      ],
      recap: true,
    },
    {
      id: 'q-category-reason',
      type: 'quiz',
      minutes: '56-57 мин',
      title: 'Проверка значения',
      prompt: 'Какое слово спрашивает причину?',
      choices: ['When', 'Why', 'Where', 'Which'],
      answer: 1,
      explain: 'Why спрашивает причину. Ответ часто начинается с because.',
    },
    {
      id: 'q-order',
      type: 'quiz',
      minutes: '57-58 мин',
      title: 'Выбери правильный порядок',
      prompt: 'Нужен вопрос про место. Какое предложение правильное?',
      choices: ['Where is the classroom?', 'Is where the classroom?', 'Where the classroom is?', 'Classroom where is?'],
      answer: 0,
      explain: 'Порядок такой: вопросительное слово + is/do/did + кто/что. Правильно: Where is the classroom?',
    },
    {
      id: 'q-place',
      type: 'quiz',
      minutes: '58-59 мин',
      title: 'Спросить место',
      prompt: 'Ты хочешь узнать, где будет встреча.',
      choices: ['When is the meeting?', 'Where is the meeting?', 'Why is the meeting?', 'Whose is the meeting?'],
      answer: 1,
      explain: 'Место = where. Поэтому правильно: Where is the meeting?',
    },
    {
      id: 'mission-1',
      type: 'quiz',
      minutes: '59 мин',
      title: 'Финальная задача 1',
      prompt: 'Студент говорит: I lost my phone. Нужно спросить, чей это телефон.',
      choices: ['Whose phone is it?', 'Where phone is it?', 'Who phone is it?', 'Why phone is it?'],
      answer: 0,
      explain: 'Когда спрашиваем владельца, используем whose.',
    },
    {
      id: 'mission-2',
      type: 'quiz',
      minutes: '59 мин',
      title: 'Финальная задача 2',
      prompt: 'Ты видишь три автобуса. Нужно спросить, какой автобус правильный.',
      choices: ['Which bus do we need?', 'Why bus do we need?', 'Whose bus do we need?', 'Who bus do we need?'],
      answer: 0,
      explain: 'Три автобуса = выбор из вариантов. Используем which.',
    },
    {
      id: 'mission-3',
      type: 'quiz',
      minutes: '60 мин',
      title: 'Финальная задача 3',
      prompt: 'Партнер отвечает: Because the train was late. Какое было вопросительное слово?',
      choices: ['When', 'Why', 'How', 'Where'],
      answer: 1,
      explain: 'Because дает причину. Значит, вопрос начинался с why.',
    },
  ];

  const canvas = document.getElementById('lessonCanvas');
  const textTrap = document.getElementById('textTrap');
  const responseForm = document.getElementById('responseForm');
  const formName = document.getElementById('formName');
  const formGroup = document.getElementById('formGroup');
  const formTopic = document.getElementById('formTopic');
  const formPayload = document.getElementById('formPayload');
  const ctx = canvas.getContext('2d');

  const state = {
    screen: 'start',
    stepIndex: 0,
    profile: readProfile(),
    activeField: null,
    startedAt: null,
    finishedAt: null,
    sessionId: '',
    dict: new Map(),
    dictCount: 0,
    dictStatus: 'Загружаю словарь...',
    dictFallback: false,
    answers: {},
    submitted: false,
    submitStatus: 'Ждет',
    tooltip: null,
    hoverControl: null,
    hoverWord: null,
    pointer: { x: 0, y: 0 },
    dirty: true,
  };

  let controls = [];
  let wordBoxes = [];
  let canvasSize = { w: 0, h: 0, dpr: 1 };
  let cursorBlink = true;

  function readProfile() {
    const params = new URLSearchParams(window.location.search);
    const fromParams = {
      name: params.get(FORM_FIELDS.name) || params.get('name'),
      group: params.get(FORM_FIELDS.group) || params.get('group'),
    };

    let stored = {};
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || '{}');
    } catch (error) {
      stored = {};
    }

    return {
      name: String(fromParams.name || stored.name || DEFAULT_PROFILE.name),
      group: String(fromParams.group || stored.group || DEFAULT_PROFILE.group),
    };
  }

  function saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(state.profile));
    } catch (error) {
      // Local storage can be unavailable in some school browser modes.
    }
  }

  function normalizeWord(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
  }

  function applyDictionary(rows, fallback) {
    const map = new Map();
    for (const row of Array.isArray(rows) ? rows : []) {
      const rawWord = row && row.Word != null ? String(row.Word).trim() : '';
      const key = normalizeWord(rawWord);
      if (!key) continue;
      map.set(key, {
        word: rawWord,
        translation: row.Translation != null ? String(row.Translation).trim() : '',
        emoji: row.Emoji != null ? String(row.Emoji).trim() : '',
      });
    }
    state.dict = map;
    state.dictCount = map.size;
    state.dictFallback = fallback;
    state.dictStatus = fallback
      ? 'Работает короткий словарь. Открой через сервер, чтобы загрузить все слова.'
      : `Словарь подключен: ${map.size} слов.`;
    requestRender();
  }

  async function loadDictionary() {
    try {
      const response = await fetch('./dict.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Dictionary HTTP ${response.status}`);
      const rows = await response.json();
      applyDictionary(rows, false);
    } catch (error) {
      applyDictionary(CORE_DICT, true);
    }
  }

  function requestRender() {
    state.dirty = true;
    window.requestAnimationFrame(render);
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const width = Math.max(320, Math.round(rect.width));
    const height = Math.max(520, Math.round(rect.height));

    if (canvasSize.w !== width || canvasSize.h !== height || canvasSize.dpr !== dpr) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvasSize = { w: width, h: height, dpr };
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    requestRender();
  }

  function clearInteractionMaps() {
    controls = [];
    wordBoxes = [];
  }

  function addControl(id, x, y, w, h, data = {}) {
    controls.push({ id, x, y, w, h, data });
  }

  function findControlAt(x, y) {
    for (let i = controls.length - 1; i >= 0; i -= 1) {
      const c = controls[i];
      if (x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h) return c;
    }
    return null;
  }

  function findWordAt(x, y) {
    for (let i = wordBoxes.length - 1; i >= 0; i -= 1) {
      const b = wordBoxes[i];
      if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return b;
    }
    return null;
  }

  function roundedRect(x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function fillRound(x, y, w, h, r, fill, stroke = null, lineWidth = 1) {
    roundedRect(x, y, w, h, r);
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  }

  function drawBackground(w, h) {
    const sky = ctx.createLinearGradient(0, 0, w, h);
    sky.addColorStop(0, '#f7fbff');
    sky.addColorStop(.42, '#eef8f2');
    sky.addColorStop(.72, '#fff2e8');
    sky.addColorStop(1, '#eaf1ff');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalAlpha = .42;
    ctx.fillStyle = '#cae9e1';
    ctx.beginPath();
    ctx.moveTo(0, h * .12);
    ctx.lineTo(w * .32, 0);
    ctx.lineTo(w * .04, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffd0b8';
    ctx.beginPath();
    ctx.moveTo(w, h * .08);
    ctx.lineTo(w * .68, h);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(28, 68, 89, .12)';
    ctx.lineWidth = 1;
    for (let x = -h; x < w + h; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }
    ctx.restore();
  }

  function setFont(size, weight = 700, family = 'Arial') {
    ctx.font = `${weight} ${size}px ${family}, sans-serif`;
  }

  function drawLineText(text, x, baseline, options = {}) {
    const fontSize = options.size || 20;
    const lineHeight = options.lineHeight || Math.round(fontSize * 1.35);
    setFont(fontSize, options.weight || 700);
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = options.color || '#173047';
    const parts = String(text).split(/(\s+)/);
    let cx = x;
    for (const part of parts) {
      if (!part) continue;
      const width = ctx.measureText(part).width;
      const clean = normalizeWord(part);
      const entry = clean ? state.dict.get(clean) : null;
      const isClickable = Boolean(entry && options.clickable !== false);
      ctx.fillStyle = isClickable ? (options.linkColor || options.color || '#173047') : (options.color || '#173047');
      ctx.fillText(part, cx, baseline);
      if (isClickable && part.trim()) {
        const boxY = baseline - fontSize;
        wordBoxes.push({
          x: cx,
          y: boxY,
          w: Math.max(8, width),
          h: lineHeight,
          key: clean,
          entry,
        });
        ctx.save();
        ctx.strokeStyle = state.hoverWord && state.hoverWord.key === clean ? '#ff784f' : 'rgba(21, 117, 122, .42)';
        ctx.lineWidth = state.hoverWord && state.hoverWord.key === clean ? 2 : 1;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(cx, baseline + 4);
        ctx.lineTo(cx + width, baseline + 4);
        ctx.stroke();
        ctx.restore();
      }
      cx += width;
    }
    return cx;
  }

  function drawWrappedText(text, x, y, maxWidth, options = {}) {
    const fontSize = options.size || 20;
    const lineHeight = options.lineHeight || Math.round(fontSize * 1.35);
    const paragraphGap = options.paragraphGap || Math.round(lineHeight * .35);
    setFont(fontSize, options.weight || 700);
    let lineTop = y;
    const paragraphs = Array.isArray(text) ? text : String(text).split('\n');

    for (const paragraph of paragraphs) {
      const words = String(paragraph).split(/\s+/).filter(Boolean);
      let line = '';
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth && line) {
          drawLineText(line, x, lineTop + fontSize, options);
          lineTop += lineHeight;
          line = word;
        } else {
          line = test;
        }
      }
      if (line) {
        drawLineText(line, x, lineTop + fontSize, options);
        lineTop += lineHeight;
      }
      lineTop += paragraphGap;
    }

    return lineTop - paragraphGap;
  }

  function drawButton(id, x, y, w, h, label, options = {}) {
    const hovered = state.hoverControl && state.hoverControl.id === id && JSON.stringify(state.hoverControl.data) === JSON.stringify(options.data || {});
    const disabled = options.disabled;
    const fill = disabled
      ? '#d9e0e6'
      : options.kind === 'ghost'
        ? (hovered ? '#ffffff' : 'rgba(255, 255, 255, .62)')
        : (hovered ? '#1a766f' : '#215f7c');
    const stroke = disabled ? '#c4cdd5' : options.kind === 'ghost' ? '#aac0cc' : '#16485e';
    fillRound(x, y, w, h, 14, fill, stroke, 1.4);
    setFont(options.size || 18, 800);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = disabled ? '#71808d' : options.kind === 'ghost' ? '#173047' : '#ffffff';
    ctx.fillText(label, x + w / 2, y + h / 2 + 1);
    ctx.textAlign = 'left';
    if (!disabled) addControl(id, x, y, w, h, options.data || {});
  }

  function drawChip(text, x, y, fill = '#ffffff', color = '#173047') {
    setFont(14, 800);
    const width = Math.ceil(ctx.measureText(text).width + 24);
    fillRound(x, y, width, 30, 15, fill, 'rgba(28, 68, 89, .14)', 1);
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + 12, y + 15);
    return width;
  }

  function drawInput(field, label, x, y, w, h, placeholder) {
    const active = state.activeField === field;
    fillRound(x, y, w, h, 14, active ? '#ffffff' : 'rgba(255, 255, 255, .72)', active ? '#187d7a' : '#b8c8cf', active ? 2 : 1);
    setFont(13, 800);
    ctx.fillStyle = '#527083';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(label, x + 16, y + 20);

    const value = state.profile[field] || '';
    setFont(22, 800);
    ctx.fillStyle = value ? '#173047' : '#82919b';
    ctx.fillText(value || placeholder, x + 16, y + h - 18);

    if (active && cursorBlink) {
      const valueWidth = ctx.measureText(value).width;
      ctx.strokeStyle = '#187d7a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 18 + valueWidth, y + 32);
      ctx.lineTo(x + 18 + valueWidth, y + h - 16);
      ctx.stroke();
    }
    addControl(`field:${field}`, x, y, w, h);
  }

  function drawQuestionCompass(cx, cy, radius) {
    const items = [
      ['what', '#ff784f', 0],
      ['who', '#3a8f7b', Math.PI * 2 / 9],
      ['where', '#4169a8', Math.PI * 4 / 9],
      ['when', '#b46a2d', Math.PI * 6 / 9],
      ['why', '#7a5aae', Math.PI * 8 / 9],
      ['how', '#21805f', Math.PI * 10 / 9],
      ['which', '#b83f5e', Math.PI * 12 / 9],
      ['whose', '#557c2d', Math.PI * 14 / 9],
      ['whom', '#6f6273', Math.PI * 16 / 9],
    ];
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = 'rgba(26, 63, 86, .18)';
    ctx.lineWidth = 2;
    for (let i = 1; i <= 3; i += 1) {
      ctx.beginPath();
      ctx.arc(0, 0, radius * i / 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (const [word, color, angle] of items) {
      const x = Math.cos(angle) * radius * .82;
      const y = Math.sin(angle) * radius * .82;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      ctx.stroke();
      fillRound(x - 48, y - 18, 96, 36, 18, '#ffffff', color, 2);
      setFont(17, 900);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.fillText(word, x, y + 1);
    }
    fillRound(-68, -40, 136, 80, 18, '#173047', '#ffffff', 2);
    ctx.fillStyle = '#ffffff';
    setFont(18, 900);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ТИП', 0, -10);
    ctx.fillText('ОТВЕТА', 0, 16);
    ctx.restore();
    ctx.textAlign = 'left';
  }

  function drawMobileWordBoard(x, y, w) {
    const words = ['what', 'who', 'where', 'when', 'why', 'how', 'which', 'whose', 'whom'];
    const cols = 3;
    const gap = 8;
    const cardW = (w - gap * (cols - 1)) / cols;
    const cardH = 44;
    words.forEach((word, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const bx = x + col * (cardW + gap);
      const by = y + row * (cardH + gap);
      fillRound(bx, by, cardW, cardH, 14, index % 2 ? '#ffffff' : '#eef8f2', 'rgba(31,82,105,.18)', 1);
      drawWrappedText(word, bx + 10, by + 11, cardW - 20, {
        size: 15,
        lineHeight: 17,
        weight: 900,
        color: '#174a63',
        linkColor: '#174a63',
        paragraphGap: 0,
      });
    });
  }

  function drawTermCards(cards, x, y, w, compact = false) {
    const phone = w < 520;
    const cols = phone ? 2 : 3;
    const gap = phone ? 9 : 12;
    const cardW = (w - gap * (cols - 1)) / cols;
    const cardH = compact ? (phone ? 58 : 68) : (phone ? 72 : 84);
    cards.forEach((card, index) => {
      const [word, meaning, example] = card;
      const col = index % cols;
      const row = Math.floor(index / cols);
      const cx = x + col * (cardW + gap);
      const cy = y + row * (cardH + gap);
      const hue = ['#fff', '#f3fbff', '#fff7ee'][index % 3];
      fillRound(cx, cy, cardW, cardH, 14, hue, 'rgba(31, 82, 105, .18)', 1);
      drawWrappedText(word, cx + 12, cy + 8, cardW - 24, { size: phone ? 17 : 20, lineHeight: phone ? 20 : 24, weight: 900, color: '#174a63', linkColor: '#174a63' });
      drawWrappedText(meaning, cx + 12, cy + (phone ? 30 : 35), cardW - 24, { size: phone ? 12 : 14, lineHeight: phone ? 16 : 18, weight: 800, color: '#526b78' });
      if (!compact && !phone) {
        drawWrappedText(example, cx + 12, cy + 56, cardW - 24, { size: 12, lineHeight: 15, weight: 700, color: '#7a5a43' });
      }
    });
    return y + Math.ceil(cards.length / cols) * cardH + (Math.ceil(cards.length / cols) - 1) * gap;
  }

  function drawFormula(parts, x, y, w) {
    const gap = 10;
    const compact = w < 520;
    const cols = compact ? 2 : parts.length;
    const boxH = compact ? 64 : 76;
    const boxW = (w - gap * (cols - 1)) / cols;
    parts.forEach((part, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const bx = x + col * (boxW + gap);
      const by = y + row * (boxH + gap);
      fillRound(bx, by, boxW, boxH, 14, index === 0 ? '#174a63' : '#ffffff', index === 0 ? '#174a63' : '#bacbd3', 1);
      setFont(compact ? 11 : 13, 900);
      ctx.fillStyle = index === 0 ? '#c8fff6' : '#6d7e88';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(`ШАГ ${index + 1}`, bx + 12, by + 19);
      drawWrappedText(part, bx + 12, by + 26, boxW - 24, {
        size: compact ? 13 : 16,
        lineHeight: compact ? 15 : 18,
        weight: 900,
        color: index === 0 ? '#ffffff' : '#173047',
        linkColor: index === 0 ? '#ffffff' : '#174a63',
      });
      if (!compact && index < parts.length - 1) {
        setFont(22, 900);
        ctx.fillStyle = '#ff784f';
        ctx.fillText('>', bx + boxW + gap / 2 - 5, by + 44);
      }
    });
    return y + Math.ceil(parts.length / cols) * boxH + (Math.ceil(parts.length / cols) - 1) * gap + 10;
  }

  function drawHowFamily(family, x, y, w) {
    const phone = w < 560;
    const cols = phone && w < 340 ? 1 : 2;
    const gap = 10;
    const boxW = (w - gap * (cols - 1)) / cols;
    const boxH = phone ? 66 : 82;
    family.forEach(([phrase, meaning, example], index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const bx = x + col * (boxW + gap);
      const by = y + row * (boxH + gap);
      fillRound(bx, by, boxW, boxH, 14, '#ffffff', 'rgba(31, 82, 105, .16)', 1);
      drawWrappedText(phrase, bx + 12, by + 7, boxW - 24, { size: phone ? 15 : 19, lineHeight: phone ? 18 : 22, weight: 900, color: '#174a63', linkColor: '#174a63' });
      drawWrappedText(meaning, bx + 12, by + (phone ? 29 : 34), boxW - 24, { size: phone ? 11 : 13, lineHeight: phone ? 13 : 16, weight: 800, color: '#587080' });
      if (!phone || boxW > 165) {
        drawWrappedText(example, bx + 12, by + (phone ? 46 : 54), boxW - 24, { size: phone ? 10 : 13, lineHeight: phone ? 12 : 16, weight: 700, color: '#8a573b' });
      }
    });
    return y + Math.ceil(family.length / cols) * boxH + (Math.ceil(family.length / cols) - 1) * gap;
  }

  function drawHeader(w, pad) {
    const step = STEPS[state.stepIndex];
    const exerciseTotal = STEPS.filter(s => s.type === 'quiz').length;
    const answeredCount = Object.keys(state.answers).length;
    const score = getScore();
    drawChip('Вопросы', pad, 24, '#ffffff', '#173047');
    drawChip(step ? step.minutes : 'Готово', pad + 160, 24, '#173047', '#ffffff');
    const status = `${Math.min(state.stepIndex + 1, STEPS.length)} / ${STEPS.length}`;
    const scoreText = `${score} / ${exerciseTotal}`;
    const statusW = drawChip(status, w - pad - 204, 24, '#ffffff', '#173047');
    drawChip(scoreText, w - pad - statusW - 24, 24, '#ffe1d2', '#6b2e1c');

    const barX = pad;
    const barY = 66;
    const barW = w - pad * 2;
    fillRound(barX, barY, barW, 10, 5, 'rgba(31, 82, 105, .12)');
    fillRound(barX, barY, barW * ((state.stepIndex + 1) / STEPS.length), 10, 5, '#23857b');
    setFont(12, 800);
    ctx.fillStyle = '#617480';
    ctx.fillText(`Ответов: ${answeredCount}`, pad, 92);
  }

  function renderStart(w, h) {
    const phone = w < 720;
    const pad = phone ? 18 : 34;
    const panelX = pad;
    const panelY = phone ? 22 : 32;
    const panelW = w - pad * 2;
    const panelH = h - pad * 2;

    fillRound(panelX, panelY, panelW, panelH, phone ? 18 : 24, 'rgba(255,255,255,.72)', 'rgba(31, 82, 105, .18)', 1);
    drawChip('Урок в canvas', panelX + 22, panelY + 22, '#173047', '#ffffff');
    drawChip('45-60 минут', panelX + 160, panelY + 22, '#ffe0cc', '#6c3522');

    const titleSize = phone ? 34 : 50;
    const titleBottom = drawWrappedText('Вопросительные слова', panelX + 24, panelY + (phone ? 62 : 80), phone ? panelW - 48 : panelW * .54, {
      size: titleSize,
      lineHeight: titleSize + 6,
      weight: 900,
      color: '#173047',
      linkColor: '#174a63',
    });
    drawWrappedText('Разберись и запомни: what, who, where, when, why, how, which, whose, whom.', panelX + 26, titleBottom + (phone ? 14 : 16), phone ? panelW - 130 : panelW * .52, {
      size: phone ? 18 : 22,
      lineHeight: phone ? 24 : 30,
      weight: 800,
      color: '#425d6b',
      linkColor: '#174a63',
    });

    const fieldTop = phone ? Math.max(panelY + 304, h - 236) : panelY + panelH - 216;
    if (phone) {
      if (fieldTop > 500) {
        drawMobileWordBoard(panelX + 22, fieldTop - 184, panelW - 44);
      }
    } else {
      drawQuestionCompass(panelX + panelW * .75, panelY + panelH * .36, Math.min(190, panelW * .2));
    }

    const fieldW = phone ? panelW - 44 : (panelW - 74) / 2;
    const fieldH = phone ? 62 : 76;
    drawInput('name', 'Имя', panelX + 22, fieldTop, fieldW, fieldH, 'Имя студента');
    drawInput('group', 'Группа', phone ? panelX + 22 : panelX + 52 + fieldW, phone ? fieldTop + 72 : fieldTop, fieldW, fieldH, 'Группа');

    const buttonY = phone ? fieldTop + 144 : fieldTop + 98;
    const phoneButtonW = (panelW - 54) / 2;
    drawButton('start', panelX + 22, buttonY, phone ? phoneButtonW : 220, phone ? 50 : 56, 'Начать', {
      disabled: !state.profile.name.trim(),
      size: phone ? 15 : 18,
    });
    drawButton('resetProfile', phone ? panelX + 32 + phoneButtonW : panelX + 260, buttonY, phone ? phoneButtonW : 178, phone ? 50 : 56, 'Очистить', {
      kind: 'ghost',
      size: phone ? 15 : 18,
    });

    const statusY = phone ? buttonY + 60 : buttonY + 20;
    drawWrappedText(state.dictStatus, phone ? panelX + 22 : panelX + 466, statusY, phone ? panelW - 44 : panelW - 500, {
      size: 14,
      lineHeight: 18,
      weight: 800,
      color: state.dictFallback ? '#9a4b28' : '#527083',
    });
  }

  function renderLesson(step, w, h) {
    const phone = w < 720;
    const pad = phone ? 16 : 34;
    drawHeader(w, pad);

    const cardX = pad;
    const cardY = phone ? 96 : 116;
    const cardW = w - pad * 2;
    const cardH = h - cardY - (phone ? 82 : 100);
    fillRound(cardX, cardY, cardW, cardH, 22, 'rgba(255,255,255,.78)', 'rgba(31, 82, 105, .16)', 1);

    drawChip('Урок', cardX + 20, cardY + 18, '#e7f7f3', '#174a63');
    let y = cardY + (phone ? 50 : 64);
    y = drawWrappedText(step.title, cardX + 22, y, cardW - 44, {
      size: phone ? 22 : 34,
      lineHeight: phone ? 27 : 40,
      weight: 900,
      color: '#173047',
      linkColor: '#174a63',
    }) + (phone ? 8 : 10);

    y = drawWrappedText(step.body || [], cardX + 22, y, cardW - 44, {
      size: phone ? 13 : 18,
      lineHeight: phone ? 17 : 25,
      weight: 800,
      color: '#445f6b',
      linkColor: '#174a63',
    }) + (phone ? 8 : 14);

    if (step.visual === 'compass' && !phone) {
      drawQuestionCompass(cardX + cardW - 176, cardY + cardH - 172, 130);
      drawTermCards(step.cards, cardX + 22, y, cardW - 370, true);
    } else if (step.cards) {
      drawTermCards(step.cards, cardX + 22, y, cardW - 44, phone);
    }

    if (step.formula) {
      const formulaY = drawFormula(step.formula, cardX + 22, y, cardW - 44);
      let exY = formulaY + 4;
      for (const example of step.examples || []) {
        fillRound(cardX + 22, exY, cardW - 44, phone ? 38 : 44, 12, '#fff7ee', 'rgba(188, 105, 52, .2)', 1);
        drawWrappedText(example, cardX + 38, exY + 7, cardW - 76, {
          size: phone ? 15 : 18,
          lineHeight: phone ? 19 : 22,
          weight: 900,
          color: '#784323',
          linkColor: '#174a63',
        });
        exY += phone ? 46 : 54;
      }
    }

    if (step.family) {
      drawHowFamily(step.family, cardX + 22, y, cardW - 44);
    }

    if (step.examples && !step.formula) {
      let exY = y;
      for (const example of step.examples) {
        fillRound(cardX + 22, exY, cardW - 44, phone ? 44 : 52, 14, '#eef8f2', 'rgba(35, 133, 123, .22)', 1);
        drawWrappedText(example, cardX + 40, exY + 8, cardW - 80, {
          size: phone ? 16 : 20,
          lineHeight: phone ? 21 : 25,
          weight: 900,
          color: '#174a63',
          linkColor: '#174a63',
        });
        exY += phone ? 54 : 62;
      }
    }

    if (step.recap) {
      const cols = phone ? 1 : 2;
      const lines = [
        'what = что / какой',
        'who = кто',
        'where = где / куда',
        'when = когда',
        'why = почему',
        'how = как',
        'which = какой из вариантов',
        'whose = чей',
        'whom = кого / кому',
      ];
      const gap = 10;
      const itemW = (cardW - 44 - gap * (cols - 1)) / cols;
      const itemH = phone ? 34 : 42;
      lines.forEach((line, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const ix = cardX + 22 + col * (itemW + gap);
        const iy = y + row * (itemH + gap);
        fillRound(ix, iy, itemW, itemH, 12, index % 2 ? '#ffffff' : '#fff7ee', 'rgba(31, 82, 105, .14)', 1);
        drawWrappedText(line, ix + 14, iy + 6, itemW - 28, {
          size: phone ? 15 : 18,
          lineHeight: phone ? 18 : 22,
          weight: 900,
          color: '#173047',
          linkColor: '#174a63',
        });
      });
    }

    drawFooterNav(w, h, pad, false);
  }

  function renderQuiz(step, w, h) {
    const phone = w < 720;
    const pad = phone ? 16 : 34;
    drawHeader(w, pad);

    const cardX = pad;
    const cardY = phone ? 96 : 116;
    const cardW = w - pad * 2;
    const cardH = h - cardY - (phone ? 82 : 100);
    fillRound(cardX, cardY, cardW, cardH, 22, 'rgba(255,255,255,.8)', 'rgba(31, 82, 105, .16)', 1);

    drawChip('Задание', cardX + 20, cardY + 18, '#173047', '#ffffff');
    let y = cardY + (phone ? 48 : 64);
    y = drawWrappedText(step.title, cardX + 22, y, cardW - 44, {
      size: phone ? 21 : 32,
      lineHeight: phone ? 26 : 38,
      weight: 900,
      color: '#173047',
      linkColor: '#174a63',
    }) + 8;

    fillRound(cardX + 20, y, cardW - 40, phone ? 82 : 112, 18, '#eef8f2', 'rgba(35, 133, 123, .18)', 1);
    drawWrappedText(step.prompt, cardX + 40, y + (phone ? 16 : 18), cardW - 80, {
      size: phone ? 18 : 27,
      lineHeight: phone ? 23 : 34,
      weight: 900,
      color: '#173047',
      linkColor: '#174a63',
    });
    y += phone ? 94 : 132;

    const answer = state.answers[step.id];
    const gridChoices = !phone && cardW > 760;
    const choiceGap = phone ? 8 : 12;
    const choiceCols = gridChoices ? 2 : 1;
    const choiceW = (cardW - 40 - choiceGap * (choiceCols - 1)) / choiceCols;
    const choiceH = gridChoices ? 70 : (phone ? 48 : 58);
    step.choices.forEach((choice, index) => {
      const col = index % choiceCols;
      const row = Math.floor(index / choiceCols);
      const cx = cardX + 20 + col * (choiceW + choiceGap);
      const cy = y + row * (choiceH + choiceGap);
      let mode = 'neutral';
      if (answer) {
        if (index === step.answer) mode = 'correct';
        else if (index === answer.selected) mode = 'wrong';
      }
      drawChoice(step, index, choice, cx, cy, choiceW, choiceH, mode);
    });

    const feedbackY = y + Math.ceil(step.choices.length / choiceCols) * (choiceH + choiceGap) + (phone ? 2 : 8);
    if (answer) {
      const good = answer.selected === step.answer;
      fillRound(cardX + 20, feedbackY, cardW - 40, phone ? 62 : 82, 16, good ? '#e7f7f3' : '#fff2e8', good ? '#56a99e' : '#db8b61', 1.2);
      drawWrappedText(good ? 'Верно. ' + step.explain : 'Пока нет. ' + step.explain, cardX + 38, feedbackY + 12, cardW - 76, {
        size: phone ? 12 : 16,
        lineHeight: phone ? 15 : 22,
        weight: 850,
        color: good ? '#185d55' : '#7a3f26',
        linkColor: '#174a63',
      });
    } else {
      drawWrappedText('Выбери один ответ. На подчеркнутые английские слова можно нажать: появится перевод.', cardX + 22, feedbackY + 8, cardW - 44, {
        size: phone ? 12 : 15,
        lineHeight: phone ? 15 : 20,
        weight: 800,
        color: '#657a86',
        linkColor: '#174a63',
      });
    }

    drawFooterNav(w, h, pad, !answer);
  }

  function drawChoice(step, index, label, x, y, w, h, mode) {
    const isHovered = state.hoverControl && state.hoverControl.id === 'choice' && state.hoverControl.data.stepId === step.id && state.hoverControl.data.index === index;
    const fill = mode === 'correct' ? '#e7f7f3' : mode === 'wrong' ? '#ffe9df' : isHovered ? '#ffffff' : '#f8fbfd';
    const stroke = mode === 'correct' ? '#21805f' : mode === 'wrong' ? '#d86745' : '#c0d0d7';
    fillRound(x, y, w, h, 15, fill, stroke, mode === 'neutral' ? 1 : 2);
    fillRound(x + 12, y + h / 2 - 16, 32, 32, 16, mode === 'correct' ? '#21805f' : mode === 'wrong' ? '#d86745' : '#214e67');
    setFont(16, 900);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String.fromCharCode(65 + index), x + 28, y + h / 2 + 1);
    ctx.textAlign = 'left';
    drawWrappedText(label, x + 58, y + 10, w - 72, {
      size: h < 62 ? 15 : 17,
      lineHeight: h < 62 ? 18 : 21,
      weight: 900,
      color: '#173047',
      linkColor: '#174a63',
    });
    if (!state.answers[step.id]) addControl('choice', x, y, w, h, { stepId: step.id, index });
  }

  function drawFooterNav(w, h, pad, nextDisabled) {
    const y = h - (w < 720 ? 66 : 76);
    const bw = w < 720 ? 112 : 146;
    drawButton('prev', pad, y, bw, 52, 'Назад', {
      kind: 'ghost',
      disabled: state.stepIndex === 0,
    });
    const nextLabel = state.stepIndex === STEPS.length - 1 ? 'Финиш' : 'Далее';
    drawButton('next', w - pad - bw, y, bw, 52, nextLabel, { disabled: nextDisabled });
    drawButton('home', pad + bw + 12, y, w < 720 ? 96 : 128, 52, 'Начало', { kind: 'ghost' });
  }

  function getScore() {
    return Object.values(state.answers).filter(answer => answer.correct).length;
  }

  function getExerciseTotal() {
    return STEPS.filter(step => step.type === 'quiz').length;
  }

  function renderResult(w, h) {
    const phone = w < 720;
    const pad = phone ? 18 : 38;
    const total = getExerciseTotal();
    const score = getScore();
    const percent = total ? Math.round(score / total * 100) : 0;
    const panelX = pad;
    const panelY = phone ? 26 : 38;
    const panelW = w - pad * 2;
    const panelH = h - pad * 2;
    fillRound(panelX, panelY, panelW, panelH, 24, 'rgba(255,255,255,.8)', 'rgba(31, 82, 105, .18)', 1);

    drawChip('Готово', panelX + 24, panelY + 24, '#173047', '#ffffff');
    drawChip(state.submitStatus, panelX + 150, panelY + 24, state.submitted ? '#e7f7f3' : '#fff2e8', state.submitted ? '#185d55' : '#7a3f26');

    drawWrappedText(percent >= 80 ? 'Отлично: вопросительные слова понятны' : 'Хорошая работа: повтори карту еще раз', panelX + 24, panelY + 78, panelW - 48, {
      size: phone ? 28 : 42,
      lineHeight: phone ? 34 : 48,
      weight: 900,
      color: '#173047',
      linkColor: '#174a63',
    });

    const scoreY = phone ? panelY + 172 : panelY + 182;
    fillRound(panelX + 24, scoreY, panelW - 48, phone ? 104 : 126, 20, '#eef8f2', 'rgba(35, 133, 123, .18)', 1);
    setFont(phone ? 44 : 64, 900);
    ctx.fillStyle = '#174a63';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`${score} / ${total}`, panelX + 48, scoreY + (phone ? 62 : 78));
    setFont(phone ? 22 : 28, 900);
    ctx.fillStyle = '#ff784f';
    ctx.fillText(`${percent}%`, panelX + panelW - (phone ? 124 : 154), scoreY + (phone ? 60 : 76));

    const statsY = scoreY + (phone ? 126 : 156);
    const stats = [
      ['Имя', state.profile.name || '-'],
      ['Группа', state.profile.group || '-'],
      ['Время', formatDuration((state.finishedAt || Date.now()) - (state.startedAt || Date.now()))],
      ['Сессия', state.sessionId || '-'],
    ];
    const cols = phone ? 1 : 2;
    const gap = 10;
    const boxW = (panelW - 48 - gap * (cols - 1)) / cols;
    const boxH = 54;
    stats.forEach(([label, value], index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const bx = panelX + 24 + col * (boxW + gap);
      const by = statsY + row * (boxH + gap);
      fillRound(bx, by, boxW, boxH, 14, '#ffffff', 'rgba(31,82,105,.14)', 1);
      setFont(12, 900);
      ctx.fillStyle = '#6c808b';
      ctx.fillText(label, bx + 14, by + 20);
      drawWrappedText(String(value), bx + 14, by + 22, boxW - 28, { size: 16, lineHeight: 18, weight: 900, color: '#173047', linkColor: '#174a63' });
    });

    const missed = STEPS.filter(step => step.type === 'quiz' && state.answers[step.id] && !state.answers[step.id].correct).slice(0, 3);
    const reviewY = statsY + Math.ceil(stats.length / cols) * (boxH + gap) + 14;
    if (missed.length) {
      drawWrappedText('Повтори: ' + missed.map(step => step.title).join(', '), panelX + 24, reviewY, panelW - 48, {
        size: phone ? 14 : 16,
        lineHeight: phone ? 19 : 22,
        weight: 850,
        color: '#7a3f26',
        linkColor: '#174a63',
      });
    } else {
      drawWrappedText('Без ошибок. Ты связал каждое вопросительное слово с типом ответа.', panelX + 24, reviewY, panelW - 48, {
        size: phone ? 14 : 16,
        lineHeight: phone ? 19 : 22,
        weight: 850,
        color: '#185d55',
        linkColor: '#174a63',
      });
    }

    const buttonY = h - (phone ? 150 : 128);
    drawButton('resend', panelX + 24, buttonY, phone ? panelW - 48 : 190, 56, 'Отправить');
    drawButton('restart', phone ? panelX + 24 : panelX + 232, phone ? buttonY + 68 : buttonY, phone ? panelW - 48 : 170, 56, 'Сначала', { kind: 'ghost' });
  }

  function formatDuration(ms) {
    const totalSeconds = Math.max(0, Math.round(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
  }

  function drawTooltip(w, h) {
    if (!state.tooltip) return;
    const entry = state.tooltip.entry;
    const width = Math.min(330, Math.max(220, w - 32));
    const height = 126;
    let x = state.tooltip.x + 14;
    let y = state.tooltip.y + 14;
    if (x + width > w - 12) x = w - width - 12;
    if (y + height > h - 12) y = state.tooltip.y - height - 12;
    x = Math.max(12, x);
    y = Math.max(12, y);

    ctx.save();
    ctx.shadowColor = 'rgba(19, 34, 56, .25)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;
    fillRound(x, y, width, height, 18, '#173047', 'rgba(255,255,255,.32)', 1);
    ctx.restore();
    drawWrappedText(entry.word || state.tooltip.key, x + 16, y + 12, width - 32, {
      size: 22,
      lineHeight: 26,
      weight: 900,
      color: '#ffffff',
      linkColor: '#ffffff',
      clickable: false,
    });
    drawWrappedText(entry.translation || 'No translation', x + 16, y + 48, width - 32, {
      size: 17,
      lineHeight: 22,
      weight: 800,
      color: '#dff8ff',
      clickable: false,
    });
    if (entry.emoji) {
      setFont(24, 900);
      ctx.fillStyle = '#ffd0b8';
      ctx.fillText(entry.emoji, x + width - 52, y + height - 20);
    }
  }

  function render() {
    if (!state.dirty) return;
    state.dirty = false;
    const { w, h, dpr } = canvasSize;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    clearInteractionMaps();
    drawBackground(w, h);

    if (state.screen === 'start') {
      renderStart(w, h);
    } else if (state.screen === 'result') {
      renderResult(w, h);
    } else {
      const step = STEPS[state.stepIndex];
      if (step.type === 'lesson') renderLesson(step, w, h);
      else renderQuiz(step, w, h);
    }

    drawTooltip(w, h);
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function activateField(field) {
    state.activeField = field;
    textTrap.value = state.profile[field] || '';
    textTrap.focus({ preventScroll: true });
    textTrap.setSelectionRange(textTrap.value.length, textTrap.value.length);
    requestRender();
  }

  function startSession() {
    state.profile.name = state.profile.name.trim() || 'Студент';
    state.profile.group = state.profile.group.trim();
    saveProfile();
    state.screen = 'lesson';
    state.stepIndex = 0;
    state.answers = {};
    state.startedAt = Date.now();
    state.finishedAt = null;
    state.submitted = false;
    state.submitStatus = 'Ждет';
    state.sessionId = makeSessionId();
    state.tooltip = null;
    state.activeField = null;
    textTrap.blur();
    requestRender();
  }

  function makeSessionId() {
    const now = new Date();
    const stamp = now.toISOString().replace(/\D/g, '').slice(0, 14);
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `QW-${stamp}-${random}`;
  }

  function finishSession() {
    state.screen = 'result';
    state.finishedAt = Date.now();
    state.tooltip = null;
    submitResult(false);
    requestRender();
  }

  function submitResult(force) {
    if (state.submitted && !force) return;
    const payload = buildPayload();
    formName.value = state.profile.name;
    formGroup.value = state.profile.group;
    formTopic.value = TOPIC_CODE;
    formPayload.value = JSON.stringify(payload);
    try {
      responseForm.submit();
      state.submitted = true;
      state.submitStatus = force ? 'Отправлено снова' : 'Отправлено';
      localStorage.setItem(STORAGE_KEYS.result, JSON.stringify(payload));
    } catch (error) {
      state.submitted = false;
      state.submitStatus = 'Отправка заблокирована';
    }
  }

  function buildPayload() {
    const total = getExerciseTotal();
    const score = getScore();
    return {
      topic: TOPIC_CODE,
      student: { ...state.profile },
      sessionId: state.sessionId,
      startedAt: state.startedAt ? new Date(state.startedAt).toISOString() : null,
      finishedAt: state.finishedAt ? new Date(state.finishedAt).toISOString() : null,
      durationMs: state.startedAt && state.finishedAt ? state.finishedAt - state.startedAt : null,
      score,
      total,
      percent: total ? Math.round(score / total * 100) : 0,
      dictionary: {
        count: state.dictCount,
        fallback: state.dictFallback,
      },
      answers: STEPS.filter(step => step.type === 'quiz').map(step => {
        const answer = state.answers[step.id] || null;
        return {
          id: step.id,
          title: step.title,
          prompt: step.prompt,
          selected: answer ? step.choices[answer.selected] : null,
          correct: step.choices[step.answer],
          isCorrect: answer ? answer.correct : false,
        };
      }),
    };
  }

  function chooseAnswer(stepId, index) {
    const step = STEPS.find(item => item.id === stepId);
    if (!step || state.answers[stepId]) return;
    state.answers[stepId] = {
      selected: index,
      correct: index === step.answer,
      answeredAt: new Date().toISOString(),
    };
    requestRender();
  }

  function handleControl(control) {
    if (!control) return false;
    if (control.id.startsWith('field:')) {
      activateField(control.id.split(':')[1]);
      return true;
    }
    if (control.id === 'resetProfile') {
      state.profile = { name: '', group: '' };
      activateField('name');
      return true;
    }
    if (control.id === 'start') {
      startSession();
      return true;
    }
    if (control.id === 'home') {
      state.screen = 'start';
      state.tooltip = null;
      requestRender();
      return true;
    }
    if (control.id === 'prev') {
      state.stepIndex = Math.max(0, state.stepIndex - 1);
      state.tooltip = null;
      requestRender();
      return true;
    }
    if (control.id === 'next') {
      if (state.stepIndex >= STEPS.length - 1) finishSession();
      else {
        state.stepIndex += 1;
        state.tooltip = null;
        requestRender();
      }
      return true;
    }
    if (control.id === 'choice') {
      chooseAnswer(control.data.stepId, control.data.index);
      return true;
    }
    if (control.id === 'resend') {
      submitResult(true);
      requestRender();
      return true;
    }
    if (control.id === 'restart') {
      state.screen = 'start';
      state.stepIndex = 0;
      state.answers = {};
      state.startedAt = null;
      state.finishedAt = null;
      state.submitted = false;
      state.submitStatus = 'Ждет';
      state.tooltip = null;
      requestRender();
      return true;
    }
    return false;
  }

  function handlePointerMove(event) {
    const pos = pointerPosition(event);
    state.pointer = pos;
    const control = findControlAt(pos.x, pos.y);
    const word = findWordAt(pos.x, pos.y);
    const controlChanged = JSON.stringify(state.hoverControl) !== JSON.stringify(control);
    const wordChanged = (state.hoverWord && word && state.hoverWord.key !== word.key) || Boolean(state.hoverWord) !== Boolean(word);
    state.hoverControl = control;
    state.hoverWord = word;
    canvas.style.cursor = control || word ? 'pointer' : 'default';
    if (controlChanged || wordChanged) requestRender();
  }

  function handlePointerDown(event) {
    event.preventDefault();
    const pos = pointerPosition(event);
    state.pointer = pos;
    const word = findWordAt(pos.x, pos.y);
    const control = findControlAt(pos.x, pos.y);

    if (word) {
      state.tooltip = { ...word, x: pos.x, y: pos.y };
    } else if (state.tooltip) {
      state.tooltip = null;
    }

    if (!control && !word) {
      state.activeField = null;
      textTrap.blur();
    }

    handleControl(control);
    requestRender();
  }

  function handleTrapInput() {
    const field = state.activeField;
    if (!field) return;
    const max = field === 'name' ? 80 : 40;
    state.profile[field] = textTrap.value.slice(0, max);
    requestRender();
  }

  function preventCopyShortcuts(event) {
    const key = event.key.toLowerCase();
    const protectedCombo = (event.ctrlKey || event.metaKey) && ['a', 'c', 'x', 'u', 's', 'p'].includes(key);
    if (protectedCombo || key === 'f12') {
      event.preventDefault();
      return false;
    }
    if (key === 'enter') {
      const control = findControlAt(state.pointer.x, state.pointer.y);
      if (control) handleControl(control);
    }
    return true;
  }

  function blockEvent(event) {
    event.preventDefault();
    return false;
  }

  canvas.addEventListener('pointermove', handlePointerMove);
  canvas.addEventListener('pointerdown', handlePointerDown);
  textTrap.addEventListener('input', handleTrapInput);
  textTrap.addEventListener('blur', () => {
    state.activeField = null;
    saveProfile();
    requestRender();
  });

  document.addEventListener('keydown', preventCopyShortcuts);
  document.addEventListener('contextmenu', blockEvent);
  document.addEventListener('copy', blockEvent);
  document.addEventListener('cut', blockEvent);
  document.addEventListener('paste', blockEvent);
  document.addEventListener('selectstart', blockEvent);
  document.addEventListener('dragstart', blockEvent);

  window.addEventListener('resize', resizeCanvas);
  if (window.ResizeObserver) {
    new ResizeObserver(resizeCanvas).observe(canvas);
  }

  window.setInterval(() => {
    if (state.activeField) {
      cursorBlink = !cursorBlink;
      requestRender();
    }
  }, 520);

  formTopic.value = TOPIC_CODE;
  loadDictionary();
  resizeCanvas();
})();
