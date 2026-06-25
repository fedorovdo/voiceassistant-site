import { useMemo, useState } from 'react'
import './App.css'

type Language = 'ru' | 'en'

const simplyAdminUrl = 'https://simplyadmin.org/'
const voiceAssistantGitHubUrl = 'https://github.com/fedorovdo/VoiceAssistant'
const voiceAssistantDownloadUrl = 'https://github.com/fedorovdo/VoiceAssistant/releases/download/v0.2.0/VoiceAssistant-0.2.0-x64.exe'
const voiceAssistantReleaseUrl = 'https://github.com/fedorovdo/VoiceAssistant/releases/tag/v0.2.0'
const voiceAssistantQuickStartUrl = 'https://github.com/fedorovdo/VoiceAssistant/blob/main/docs/QUICK_START_RU.md'
const voiceAssistantPrivacyUrl = 'https://github.com/fedorovdo/VoiceAssistant/blob/main/docs/PRIVACY_RU.md'
const voiceAssistantSha256 = 'f35c482ea36f246f6785d79a33e5833f60492d548882ae4ce9271cb2fd3f014c'

const copy = {
  ru: {
    navAria: 'Основная навигация',
    features: 'Возможности',
    architecture: 'Как работает',
    quickStart: 'Быстрый старт',
    github: 'GitHub',
    downloadWindows: 'Скачать для Windows',
    documentation: 'Документация',
    release: 'Релиз v0.2.0',
    subtitle: 'Локальный помощник для технических обсуждений и обучения',
    description:
      'VoiceAssistant слушает технический разговор, распознает вопросы и показывает короткие практические пояснения. Частые команды и определения он может находить в локальной базе знаний, а для более подробных ответов использовать OpenAI.',
    badgeVersion: 'v0.2.0',
    badgeStatus: 'Windows · Preview',
    screenshotTitle: 'Скриншот приложения',
    screenshotText:
      'Здесь будет реальный экран VoiceAssistant после добавления файла public/images/voiceassistant-main.png. Пока показана аккуратная рамка, чтобы страница оставалась честной и законченной.',
    featuresTitle: 'Что умеет VoiceAssistant',
    architectureTitle: 'Как это работает',
    topicsTitle: 'Поддерживаемые области',
    quickStartTitle: 'Быстрый старт',
    privacyTitle: 'Приватность и ограничения',
    localNote: 'Локальные ответы не требуют GPT.',
    sttNote: 'Распознавание речи через микрофон сейчас требует OpenAI API key и интернет.',
    noKeyNote: 'Приложение не содержит API-ключ. Пользователь добавляет свой ключ сам.',
    notRecorder: 'VoiceAssistant не является скрытым рекордером встреч. Это локальный помощник для технического обучения.',
    checksum: 'SHA-256 релизного EXE',
    growingCatalog: 'Локальный каталог знаний постепенно расширяется.',
    privacy: 'Privacy',
    footerText: 'Локальный технический помощник от Simply Admin.',
    featureCards: [
      ['Live Assist', 'Автоматически отслеживает технические вопросы во время разговора.'],
      ['Локальная справка', 'Практические карточки по Linux, Docker, Kubernetes, сетям, Active Directory, Git, Proxmox и Samba.'],
      ['Ручной режим', 'Можно вводить вопрос текстом и получать локальный ответ без GPT.'],
      ['OpenAI STT', 'Распознавание речи через OpenAI при наличии API-ключа.'],
      ['Гибкие источники ответа', 'Только локальная база, гибридный режим или только GPT.'],
      ['Приватность', 'API-ключ хранится локально. Локальные текстовые ответы не требуют отправки вопроса в GPT.'],
    ],
    flow: ['Микрофон', 'OpenAI STT', 'Распознанный текст', 'Локальная справка или GPT', 'Ответ в приложении'],
    topics: [
      'Linux',
      'Docker и Docker Compose',
      'Kubernetes',
      'Networking и TCP/IP',
      'Active Directory',
      'Samba и SMB',
      'Git',
      'Proxmox',
      'Basic Windows administration',
    ],
    startSteps: [
      'Скачайте VoiceAssistant для Windows.',
      'Запустите portable EXE.',
      'Используйте Manual mode для локальных текстовых вопросов.',
      'Добавьте OpenAI API key, чтобы включить распознавание микрофона и GPT-ответы.',
    ],
    privacyItems: [
      'API-ключ хранится локально в настройках приложения.',
      'Аудио отправляется в OpenAI только когда включен microphone STT.',
      'Локальный текстовый поиск работает без GPT.',
      'Live Assist и STT остаются экспериментальными.',
      'Windows-сборка пока не подписана, поэтому SmartScreen может показать предупреждение.',
      'Проверяйте SHA-256 скачанного файла перед запуском.',
    ],
  },
  en: {
    navAria: 'Primary navigation',
    features: 'Features',
    architecture: 'How it works',
    quickStart: 'Quick start',
    github: 'GitHub',
    downloadWindows: 'Download for Windows',
    documentation: 'Documentation',
    release: 'Release v0.2.0',
    subtitle: 'A local helper for technical discussions and learning',
    description:
      'VoiceAssistant listens to technical conversation, detects questions, and shows short practical explanations. Common commands and definitions can be found in the local knowledge base; OpenAI can enrich deeper answers.',
    badgeVersion: 'v0.2.0',
    badgeStatus: 'Windows · Preview',
    screenshotTitle: 'Application screenshot',
    screenshotText:
      'A real VoiceAssistant screenshot should be added as public/images/voiceassistant-main.png. Until then, this honest placeholder keeps the page polished without fabricating UI.',
    featuresTitle: 'What VoiceAssistant does',
    architectureTitle: 'How it works',
    topicsTitle: 'Supported knowledge areas',
    quickStartTitle: 'Quick start',
    privacyTitle: 'Privacy and limitations',
    localNote: 'Local answers do not require GPT.',
    sttNote: 'Microphone speech recognition currently requires an OpenAI API key and internet access.',
    noKeyNote: 'The application does not include an API key. The user provides their own key.',
    notRecorder: 'VoiceAssistant is not a hidden meeting recorder. It is a local technical learning assistant.',
    checksum: 'Release EXE SHA-256',
    growingCatalog: 'The local knowledge catalog is growing over time.',
    privacy: 'Privacy',
    footerText: 'A local technical helper by Simply Admin.',
    featureCards: [
      ['Live Assist', 'Automatically watches for technical questions during a conversation.'],
      ['Local knowledge', 'Practical cards for Linux, Docker, Kubernetes, networking, Active Directory, Git, Proxmox, and Samba.'],
      ['Manual mode', 'Type a question and get a local answer without GPT.'],
      ['OpenAI STT', 'Speech recognition through OpenAI when an API key is provided.'],
      ['Flexible answer sources', 'Local only, hybrid mode, or GPT only.'],
      ['Privacy', 'The API key is stored locally. Local text answers do not require sending a question to GPT.'],
    ],
    flow: ['Microphone', 'OpenAI STT', 'Recognized text', 'Local knowledge or GPT', 'Answer in the app'],
    topics: [
      'Linux',
      'Docker and Docker Compose',
      'Kubernetes',
      'Networking and TCP/IP',
      'Active Directory',
      'Samba and SMB',
      'Git',
      'Proxmox',
      'Basic Windows administration',
    ],
    startSteps: [
      'Download VoiceAssistant for Windows.',
      'Launch the portable EXE.',
      'Use Manual mode for local text questions.',
      'Add an OpenAI API key to enable microphone transcription and GPT answers.',
    ],
    privacyItems: [
      'The API key is stored locally in application settings.',
      'Audio is sent to OpenAI only when microphone STT is enabled.',
      'Local text lookup works without GPT.',
      'Live Assist and STT are experimental.',
      'The Windows build is currently unsigned, so SmartScreen may show a warning.',
      'Verify the SHA-256 checksum before running the downloaded file.',
    ],
  },
} as const

function App() {
  const [language, setLanguage] = useState<Language>('ru')
  const t = copy[language]
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="VoiceAssistant">
          <span className="brand-mark">VA</span>
          <span>VoiceAssistant</span>
        </a>
        <nav className="nav" aria-label={t.navAria}>
          <a href="#features">{t.features}</a>
          <a href="#architecture">{t.architecture}</a>
          <a href="#start">{t.quickStart}</a>
          <a href={voiceAssistantGitHubUrl}>{t.github}</a>
        </nav>
        <div className="language-switcher" aria-label="Language switcher">
          {(['ru', 'en'] as const).map((item) => (
            <button
              className={language === item ? 'active' : ''}
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
              aria-pressed={language === item}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <section className="hero voice-hero" id="top">
        <div className="hero-copy">
          <div className="badge-row">
            <span className="badge">{t.badgeVersion}</span>
            <span className="badge muted">{t.badgeStatus}</span>
          </div>
          <h1>VoiceAssistant</h1>
          <p className="subtitle">{t.subtitle}</p>
          <p className="description">{t.description}</p>
          <div className="button-row">
            <a className="button primary" href={voiceAssistantDownloadUrl}>
              {t.downloadWindows}
            </a>
            <a className="button secondary" href={voiceAssistantGitHubUrl}>
              GitHub
            </a>
            <a className="button tertiary" href={voiceAssistantQuickStartUrl}>
              {t.documentation}
            </a>
          </div>
        </div>
        <ScreenshotPreview language={language} />
      </section>

      <section className="section" id="features">
        <div className="section-heading centered">
          <p className="eyebrow">Preview</p>
          <h2>{t.featuresTitle}</h2>
        </div>
        <div className="feature-grid">
          {t.featureCards.map(([title, text]) => (
            <article className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="architecture">
        <div>
          <p className="eyebrow">Architecture</p>
          <h2>{t.architectureTitle}</h2>
          <div className="note-list">
            <p>{t.localNote}</p>
            <p>{t.sttNote}</p>
            <p>{t.noKeyNote}</p>
            <p>{t.notRecorder}</p>
          </div>
        </div>
        <ol className="flow-list" aria-label={t.architectureTitle}>
          {t.flow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="section compact-section">
        <div className="section-heading">
          <p className="eyebrow">Knowledge</p>
          <h2>{t.topicsTitle}</h2>
          <p>{t.growingCatalog}</p>
        </div>
        <div className="topic-list">
          {t.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </section>

      <section className="section two-column-section" id="start">
        <article className="quiet-card">
          <p className="eyebrow">Start</p>
          <h2>{t.quickStartTitle}</h2>
          <ol className="numbered-list">
            {t.startSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <div className="card-actions stacked-actions">
            <a className="inline-link" href={voiceAssistantQuickStartUrl}>
              {t.documentation}
            </a>
            <a className="inline-link" href={voiceAssistantReleaseUrl}>
              {t.release}
            </a>
          </div>
        </article>
        <article className="quiet-card privacy-card">
          <p className="eyebrow">Privacy</p>
          <h2>{t.privacyTitle}</h2>
          <ul className="plain-list">
            {t.privacyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="checksum-box">
            <span>{t.checksum}</span>
            <code>{voiceAssistantSha256}</code>
          </div>
          <a className="inline-link" href={voiceAssistantPrivacyUrl}>
            {t.privacy}
          </a>
        </article>
      </section>

      <footer className="footer">
        <div>
          <strong>VoiceAssistant</strong>
          <p>{t.footerText}</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href={simplyAdminUrl}>Simply Admin</a>
          <a href={voiceAssistantGitHubUrl}>GitHub</a>
          <a href={voiceAssistantReleaseUrl}>{t.release}</a>
          <a href={voiceAssistantPrivacyUrl}>{t.privacy}</a>
        </nav>
        <span className="copyright">© {currentYear}</span>
      </footer>
    </main>
  )
}

function ScreenshotPreview({ language }: { language: Language }) {
  const t = copy[language]

  return (
    <figure className="screenshot-frame">
      <div className="window-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <img
        className="application-screenshot"
        src="/images/voiceassistant-main.png"
        alt={
          language === 'ru'
            ? 'Главное окно приложения VoiceAssistant'
            : 'VoiceAssistant application main window'
        }
      />

      <figcaption>
        <strong>{t.screenshotTitle}</strong>
        <span>
          {language === 'ru'
            ? 'VoiceAssistant в режиме технического помощника.'
            : 'VoiceAssistant running as a technical discussion helper.'}
        </span>
      </figcaption>
    </figure>
  )
}
export default App
