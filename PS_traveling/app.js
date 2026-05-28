const root = document.getElementById("lessonRoot");
const tip = document.getElementById("tip");
const checkBtn = document.getElementById("checkBtn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const clearBtn = document.getElementById("clearBtn");
const sendBtn = document.getElementById("sendBtn");
const legendBtn = document.getElementById("legendBtn");
const legend = document.getElementById("legend");
const legendClose = document.getElementById("legendClose");
const studentName = document.getElementById("studentName");
const scoreText = document.getElementById("scoreText");
const saveKey = "psTravelSequentialProgress";
const formBase = "https://docs.google.com/forms/d/e/1FAIpQLSeUzYUvQbbzo_1r81AacP6Kj7HlKDzEVfa93Dam39LiVjcItA/formResponse";

const steps = Array.from(root.querySelectorAll(".panel, .task-card"));
let currentStep = 0;

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
    const editable = event.target.closest("input, textarea, select");
    if (!editable) event.preventDefault();
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const protectedCombo = (event.ctrlKey || event.metaKey) && ["c", "x", "u", "s", "p"].includes(key);
  if (protectedCombo && !event.target.closest("input, textarea")) event.preventDefault();
});

function normalize(value) {
  return String(value || "")
    .trim()
    .replace(/[']/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "")
    .toLowerCase();
}

function words(value) {
  return String(value || "").trim().split(/\s+/).filter(Boolean).length;
}

function currentFields() {
  return Array.from(steps[currentStep].querySelectorAll("input, textarea, select"));
}

function showStep(index) {
  currentStep = Math.max(0, Math.min(index, steps.length - 1));
  steps.forEach((step, stepIndex) => {
    step.classList.toggle("is-active", stepIndex === currentStep);
  });
  backBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Continue";
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

    if (field.tagName === "TEXTAREA" && words(value) < 4) ok = false;
    if (field.tagName !== "TEXTAREA" && !value) ok = false;
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
  return Array.from(document.querySelectorAll("input, textarea, select"));
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

function clearWork() {
  getFields().forEach((field) => {
    field.value = "";
    field.classList.remove("correct", "wrong");
  });
  currentStep = 0;
  localStorage.removeItem(saveKey);
  document.cookie = `${saveKey}=; Max-Age=0; path=/`;
  showStep(0);
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
  scoreText.textContent = `sent: ${payload.score}/${payload.checked}`;
  window.setTimeout(() => {
    iframe.remove();
    form.remove();
  }, 5000);
}

checkBtn.addEventListener("click", () => validateStep(true));
backBtn.addEventListener("click", () => showStep(currentStep - 1));
nextBtn.addEventListener("click", () => {
  if (!validateStep(true)) return;
  if (currentStep === steps.length - 1) {
    sendResults();
    return;
  }
  showStep(currentStep + 1);
});
clearBtn.addEventListener("click", clearWork);
sendBtn.addEventListener("click", sendResults);

legendBtn.addEventListener("click", () => {
  legend.hidden = false;
  window.clearTimeout(legend.hideTimer);
  legend.hideTimer = window.setTimeout(() => { legend.hidden = true; }, 12000);
});

legendClose.addEventListener("click", () => { legend.hidden = true; });

document.addEventListener("input", (event) => {
  if (event.target.matches("input, textarea, select")) saveProgress();
});

document.addEventListener("change", (event) => {
  if (event.target.matches("input, textarea, select")) saveProgress();
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
          translation: item.Translation || "",
          emoji: item.Emoji || ""
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
      if (!parent || parent.closest("input, textarea, select, button, label, .task-head, .step-badge, script, style")) {
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
      fragment.appendChild(button);
    });

    node.parentNode.replaceChild(fragment, node);
  });
}

const anchor = document.createElement("div");
anchor.className = "lesson-shell-anchor";
document.querySelector(".layout").prepend(anchor);

loadProgress();
showStep(currentStep);
loadVocabulary();
