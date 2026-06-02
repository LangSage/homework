from pathlib import Path
import json
import re


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path.home() / "Downloads" / "words.json"
TARGET = ROOT / "words.json"


def norm(word: str) -> str:
    return re.sub(r"[^a-z0-9']+", "", str(word).lower())


def main() -> None:
    rows = json.loads(SOURCE.read_text(encoding="utf-8"))
    merged = {}
    for row in rows:
        word = str(row.get("Word", "")).strip()
        key = norm(word)
        if not key or key in merged:
            continue
        merged[key] = {
            "Word": word,
            "Translation": str(row.get("Translation", "")).strip(),
            "Emoji": str(row.get("Emoji", "📘")).strip() or "📘",
        }

    additions = {
        "assignment": ("задание", "📝"),
        "available": ("доступный / в наличии", "✅"),
        "automatic": ("автоматический", "⚙️"),
        "bar": ("батончик / плитка", "🍫"),
        "basket": ("корзина", "🧺"),
        "bottles": ("бутылки", "🧴"),
        "cashier": ("кассир", "💳"),
        "checkout": ("касса / расчет", "💳"),
        "choice": ("выбор", "☑️"),
        "clips": ("короткие аудио-фрагменты", "🎧"),
        "container": ("контейнер / упаковка", "📦"),
        "corner": ("угол", "↘️"),
        "could": ("мог бы / можно", "🙏"),
        "customer": ("покупатель", "🧍"),
        "dairy": ("молочный отдел", "🥛"),
        "dinner": ("ужин", "🍽️"),
        "empty": ("пустой", "∅"),
        "extra": ("лишний / дополнительный", "➕"),
        "feedback": ("обратная связь", "💬"),
        "finish": ("закончить", "🏁"),
        "homework": ("домашнее задание", "🏠"),
        "janitor": ("уборщик / техработник", "🧹"),
        "leo": ("Лео", "👦"),
        "loaf": ("буханка", "🍞"),
        "market": ("рынок / магазин", "🏪"),
        "maya": ("Майя", "👩"),
        "mission": ("миссия / задание", "🎯"),
        "oranges": ("апельсины", "🍊"),
        "packet": ("пачка / пакет", "📦"),
        "polite": ("вежливый", "🙏"),
        "receipt": ("чек", "🧾"),
        "remove": ("убрать / удалить", "➖"),
        "saved": ("сохранено", "💾"),
        "scene": ("сцена / картинка", "🖼️"),
        "score": ("балл / счет", "🔢"),
        "send": ("отправить", "📤"),
        "session": ("сессия / попытка", "🧾"),
        "shelf": ("полка / стеллаж", "🗄️"),
        "shop": ("магазин / покупать", "🛒"),
        "shopping": ("покупки", "🛍️"),
        "sunny": ("солнечный", "☀️"),
        "task": ("задание", "📝"),
        "worker": ("работник", "👷"),
        "grammar": ("грамматика", "✍️"),
        "there": ("там; there is/are = есть/находится", "📍"),
        "a": ("неопределенный артикль", "🔤"),
        "an": ("неопределенный артикль перед гласным звуком", "🔤"),
        "the": ("определенный артикль", "🔤"),
        "carton": ("картонная упаковка / пакет", "🥛"),
        "apple": ("яблоко", "🍎"),
        "apples": ("яблоки", "🍎"),
        "orange": ("апельсин; оранжевый", "🍊"),
        "fruit": ("фрукты", "🍓"),
        "drinks": ("напитки", "🥤"),
        "price": ("цена", "💰"),
        "expensive": ("дорогой", "💸"),
        "answer": ("ответ", "💬"),
        "article": ("артикль", "🔤"),
        "audio": ("аудио", "🎧"),
        "bananas": ("бананы", "🍌"),
        "bottle": ("бутылка", "🧴"),
        "dialogue": ("диалог", "💬"),
        "question": ("вопрос", "❓"),
        "listen": ("слушать", "🎧"),
        "looking": ("ищет / смотрит", "🔎"),
        "carry": ("нести", "👜"),
        "items": ("предметы / товары", "🧺"),
        "section": ("отдел / секция", "📍"),
        "entrance": ("вход", "🚪"),
        "map": ("карта / схема", "🗺️"),
        "middle": ("середина / средний", "↔️"),
        "top": ("верхний / верх", "⬆️"),
        "bottom": ("нижний / низ", "⬇️"),
        "left": ("левый / слева", "⬅️"),
        "right": ("правый / справа", "➡️"),
        "between": ("между", "↔️"),
        "holding": ("держит", "🤲"),
        "costs": ("стоит (о цене)", "💰"),
        "total": ("итого / общий", "🧾"),
        "story": ("история", "📖"),
        "instead": ("вместо", "🔁"),
        "sentence": ("предложение", "✍️"),
        "please": ("пожалуйста", "🙏"),
        "specific": ("конкретный", "🎯"),
        "vowel": ("гласный звук", "🔊"),
        "yes": ("да", "✅"),
    }

    for word, (translation, emoji) in additions.items():
        merged[norm(word)] = {
            "Word": word,
            "Translation": translation,
            "Emoji": emoji,
        }

    out = sorted(merged.values(), key=lambda item: str(item["Word"]).lower())
    TARGET.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {TARGET} with {len(out)} entries")


if __name__ == "__main__":
    main()
