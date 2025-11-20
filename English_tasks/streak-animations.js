// Simple streak animation manager
(function () {
  let streak = 0;
  let hideTimeout = null;

  const messages = {
    1: { emoji: "⭐", text: "Nice! Keep going!" },
    3: { emoji: "🔥", text: "3 in a row! On fire!" },
    5: { emoji: "⚡", text: "5 in a row! Beast mode!" },
    7: { emoji: "🌈", text: "7 in a row! CRAZY STREAK!" }
  };

  function getLevel(streakCount) {
    if (streakCount >= 7) return 7;
    if (streakCount >= 5) return 5;
    if (streakCount >= 3) return 3;
    if (streakCount >= 1) return 1;
    return 0;
  }

  function updateMessage(level) {
    const emojiEl = document.getElementById("streak-emoji");
    const textEl = document.getElementById("streak-text");
    const data = messages[level] || messages[1];

    if (emojiEl) emojiEl.textContent = data.emoji;
    if (textEl) textEl.textContent = data.text;
  }

  function triggerStreakAnimation(streakCount) {
    const level = getLevel(streakCount);
    if (!level) return;

    const container = document.getElementById("streak-anim-container");
    if (!container) return;

    // Clear old classes
    container.classList.remove("streak-1", "streak-3", "streak-5", "streak-7", "show");

    // Force reflow to restart animation
    // eslint-disable-next-line no-unused-expressions
    container.offsetWidth;

    updateMessage(level);
    container.classList.add("show", `streak-${level}`);

    // Hide after some time depending on level
    if (hideTimeout) clearTimeout(hideTimeout);
    const duration =
      level === 1 ? 800 :
      level === 3 ? 1200 :
      level === 5 ? 1500 :
      1800;

    hideTimeout = setTimeout(() => {
      container.classList.remove("show", "streak-1", "streak-3", "streak-5", "streak-7");
    }, duration);
  }

  // Public API
  window.Streak = {
    correct() {
      streak += 1;
      triggerStreakAnimation(streak);
    },
    wrong() {
      streak = 0;
    },
    reset() {
      streak = 0;
    },
    get() {
      return streak;
    }
  };
})();
