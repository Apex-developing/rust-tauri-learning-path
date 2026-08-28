export type Language = 'en' | 'uk';

export const LANGUAGE_OPTIONS: Language[] = ['en', 'uk'];

export const UI_TEXT = {
  en: {
    course: 'Course',
    learningPath: 'Learning path',
    completeEachModule: 'Complete each module with exact-match quiz answers. A module is marked as completed only when you select the full correct set.',
    ofModules: 'of {count} modules complete',
    startQuiz: 'Start quiz',
    startQuizLocked: 'Complete prerequisites to unlock',
    back: '← Back',
    moduleLabel: 'Module',
    sources: 'Sources',
    submitAnswers: 'Submit answers',
    reviewRetry: 'Review and retry',
    retryModule: 'Repeat module',
    studyNextModule: 'Study module {number}',
    backToModule: 'Back to module',
    loading: 'Loading course…',
    completed: 'Completed',
    available: 'Available',
    locked: 'Locked',
    min: 'min',
    questions: 'questions',
    question: 'Question',
    correct: 'Correct',
    incorrect: 'Incorrect',
    quiz: 'Quiz',
    courseTitle: 'Rust & Tauri Learning Path',
    moduleProgress: '{completed}/{total}',
    status: 'Status',
    continue: 'Continue',
    language: 'Language'
  },
  uk: {
    course: 'Курс',
    learningPath: 'Навчальний шлях',
    completeEachModule: 'Проходьте кожен модуль із точними відповідями у форматі exact-match. Модуль позначається як завершений лише після вибору повного правильного набору варіантів.',
    ofModules: 'з {count} модулів завершено',
    startQuiz: 'Почати квіз',
    startQuizLocked: 'Завершіть попередні модулі, щоб розблокувати',
    back: '← Назад',
    moduleLabel: 'Модуль',
    sources: 'Джерела',
    submitAnswers: 'Надіслати відповіді',
    reviewRetry: 'Перевірити та повторити',
    retryModule: 'Повторити модуль',
    studyNextModule: 'Вивчати модуль {number}',
    backToModule: 'Повернутися до модуля',
    loading: 'Завантаження курсу…',
    completed: 'Завершено',
    available: 'Доступно',
    locked: 'Заблоковано',
    min: 'хв',
    questions: 'запитань',
    question: 'Питання',
    correct: 'Правильно',
    incorrect: 'Неправильно',
    quiz: 'Квіз',
    courseTitle: 'Навчальний шлях Rust & Tauri',
    moduleProgress: '{completed}/{total}',
    status: 'Статус',
    continue: 'Продовжити',
    language: 'Мова'
  }
} as const;

export const MODULE_TITLE_UK: Record<string, string> = {
  '00': 'Орієнтація: Програми, Rust і Tauri',
  '01': 'Налаштування та перший запуск',
  '02': 'Основи Rust',
  '03': 'Володіння, посилання та зрізи',
  '04': 'Моделювання даних і обробка помилок',
  '05': 'Організація та тестування коду Rust',
  '06': 'TypeScript для фронтенду Tauri',
  '07': 'Перший модуль Tauri: фронтенд ↔ Rust',
  '08': 'Стан, помилки та постійні дані',
  '09': 'Асинхронна робота та оновлення прогресу',
  '10': 'Файли та межі безпеки',
  '11': 'Життєвий цикл вікон і системний трей',
  '12': 'Тести, збірки та основи релізу',
  '13': 'Мобільні пристрої та наступні проєкти'
};

export const MODULE_DESCRIPTION_UK: Record<string, string> = {
  '00': 'Розберіться, що таке програма, компілятор, frontend, backend, Rust і Tauri.',
  '01': 'Налаштуйте середовище, запустіть проект і ознайомтеся з першим запуском Tauri.',
  '02': 'Вивчіть змінні, функції, умови, цикли та основні типи Rust.',
  '03': 'Розберіться з володінням, посиланнями, зрізами та правилами доступу до даних.',
  '04': 'Навчіться моделювати дані та обробляти помилки в Rust.',
  '05': 'Організуйте код, пишіть тести та поділіться структурою проєкту.',
  '06': 'Зрозумійте базові типи та спосіб роботи з TypeScript у фронтенді Tauri.',
  '07': 'Дізнайтеся, як фронтенд викликає Rust-команди та передає аргументи.',
  '08': 'Зрозумійте стан, Result, та збереження даних у Tauri Store.',
  '09': 'Розберіть асинхронну роботу, події прогресу та відмінності від блокуючих задач.',
  '10': 'Вивчіть межі довіри, доступ до файлів і принцип найменших привілеїв.',
  '11': 'Керуйте вікнами, життєвим циклом додатку та системним трей.',
  '12': 'Запускайте тести, збирайте релізні артефакти та вивчайте підписування.',
  '13': 'Погляньте на мобільну розробку та майбутні проєкти на основі Tauri.'
};

export function getText(language: Language, key: keyof typeof UI_TEXT.en): string {
  const dict = UI_TEXT[language] ?? UI_TEXT.en;
  const value = dict[key];
  return value || UI_TEXT.en[key];
}

export function localizeModuleTitle(moduleId: string, language: Language, fallback: string): string {
  if (language === 'uk') {
    return MODULE_TITLE_UK[moduleId] ?? fallback;
  }
  return fallback;
}

export function localizeModuleDescription(moduleId: string, language: Language, fallback: string): string {
  if (language === 'uk') {
    return MODULE_DESCRIPTION_UK[moduleId] ?? fallback;
  }
  return fallback;
}

export function translateModuleContent(content: string, language: Language): string {
  if (language !== 'uk') {
    return content;
  }

  return content
    .replace(/## Goal/gi, '## Мета')
    .replace(/## Check your understanding/gi, '## Перевірте своє розуміння')
    .replace(/## What you can do now/gi, '## Що ви можете робити зараз')
    .replace(/## Sources/gi, '## Джерела')
    .replace(/### Remember/gi, "### Пам'ятайте")
    .replace(/## Lesson 1:/gi, '## Урок 1:')
    .replace(/## Lesson 2:/gi, '## Урок 2:')
    .replace(/## Lesson 3:/gi, '## Урок 3:')
    .replace(/## Lesson 4:/gi, '## Урок 4:')
    .replace(/By the end of this module, you can /gi, 'Наприкінці цього модуля ви зможете ')
    .replace(/By the end of this module, you can/gi, 'Наприкінці цього модуля ви зможете')
    .replace(/A program is a set of instructions/gi, 'Програма — це набір інструкцій')
    .replace(/A compiler/gi, 'Компілятор')
    .replace(/The frontend/gi, 'Фронтенд')
    .replace(/The backend/gi, 'Бекенд')
    .replace(/The Rust core/gi, 'Ядро Rust')
    .replace(/This matters because/gi, 'Це важливо, тому що')
    .replace(/This is useful when/gi, 'Це корисно, коли')
    .replace(/The idea is/gi, 'Ідея полягає в тому, що')
    .replace(/This means/gi, 'Це означає')
    .replace(/A common pattern is/gi, 'Типовий шаблон такий:')
    .replace(/The tray can emit/gi, 'Трей може генерувати')
    .replace(/The app can react/gi, 'Додаток може реагувати')
    .replace(/The app should/gi, 'Додаток має')
    .replace(/A good rule is/gi, 'Хороше правило таке:')
    .replace(/A \*\*program\*\* is a precise set of instructions that a computer follows\./gi, 'A **program** — це точний набір інструкцій, які виконує комп’ютер.')
    .replace(/Computers ultimately run machine instructions, not the English-like text that we write\./gi, 'Комп’ютер врешті-решт виконує машинні інструкції, а не текст, який ми пишемо англійською або іншими словами.')
    .replace(/Compiler errors are useful feedback\./gi, 'Помилки компілятора — це корисний зворотний зв’язок.')
    .replace(/You write source code; the compiler checks and translates it; the computer runs the result\./gi, 'Ви пишете вихідний код; компілятор перевіряє його й перекладає; комп’ютер запускає результат.')
    .replace(/In an application, the\s+\*\*frontend\*\* is the part a person sees and uses: buttons, text fields, menus, and displayed results\./gi, 'У застосунку **frontend** — це та частина, яку людина бачить і використовує: кнопки, поля введення, меню та відображені результати.')
    .replace(/A \*\*backend\*\* performs work that should not live directly in the interface, such as validating data, reading a local file, or calculating a result\./gi, 'A **backend** виконує роботу, яка не повинна жити безпосередньо в інтерфейсі, наприклад перевірку даних, читання локального файла або обчислення результату.')
    .replace(/In a Tauri desktop app, the frontend is web content: HTML, CSS, and usually JavaScript or TypeScript rendered in the operating system's WebView\./gi, 'У десктопному застосунку Tauri **frontend** — це веб-вміст: HTML, CSS і зазвичай JavaScript або TypeScript, який відображається в WebView операційної системи.')
    .replace(/Neither side is “more important\.”/gi, 'Жодна зі сторін не є “важливішою.”')
    .replace(/The frontend makes the app understandable; the Rust core gives it controlled access to native capabilities\./gi, 'Фронтенд робить застосунок зрозумілим; ядро Rust дає йому контрольований доступ до нативних можливостей.')
    .replace(/Rust is a programming language designed to offer both low-level control and high-level ergonomics\./gi, 'Rust — це мова програмування, розроблена для поєднання низькорівневого контролю та зручності високого рівня.')
    .replace(/Its compiler checks many mistakes before the program runs, including rules around memory safety and data access\./gi, 'Його компілятор перевіряє багато помилок ще до запуску програми, включно з правилами безпеки пам’яті та доступу до даних.')
    .replace(/Tauri is a toolkit for creating applications with a Rust core and a web frontend\./gi, 'Tauri — це інструментарій для створення застосунків із ядром на Rust і веб-фронтендом.')
    .replace(/It uses the operating system's WebView rather than bundling a separate browser runtime\./gi, 'Він використовує WebView операційної системи, а не вбудовує окремий рантайм браузера.')
    .replace(/This is useful when a frontend action needs to react to window-level signals such as resize, focus, or custom app events\./gi, 'Це корисно, коли фронтенд-дія має реагувати на сигнали рівня вікна, наприклад зміну розміру, фокус або кастомні події застосунку.')
    .replace(/Desktop apps often need to minimize, close, show, or focus windows in response to user actions\./gi, 'Десктопні застосунки часто повинні мінімізувати, закривати, показувати або фокусувати вікна у відповідь на дії користувача.')
    .replace(/A tray icon gives the user a quick way to access app actions even when the main window is closed or hidden\./gi, 'Іконка в системному трей дає користувачу швидкий доступ до дій застосунку, навіть якщо головне вікно закрите або сховане.')
    .replace(/The tray can emit click, double-click, enter, move, and leave events\./gi, 'Трей може надсилати події кліку, подвійного кліку, входу, переміщення та виходу.')
    .replace(/A common pattern is to show and focus the main window when the user clicks a tray item or reopens the app\./gi, 'Типовий шаблон — показувати та фокусувати головне вікно, коли користувач клікає по елементу в трей або повторно відкриває застосунок.')
    .replace(/A longer explanation is not needed here\./gi, 'Детальніше пояснення тут не потрібне.')
    .replace(/This is the same idea as/gi, 'Це той самий принцип, що й ');
}
