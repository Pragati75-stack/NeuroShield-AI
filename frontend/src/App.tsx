import { FormEvent, ReactNode, useEffect, useState } from "react"

type AppView = "public" | "login" | "signup" | "dashboard"
type DashboardView = "home" | "prediction" | "results" | "explainability" | "analytics" | "history"
type IconName = "arrow-right" | "brain" | "chart" | "check" | "chevron" | "eye" | "eye-off" | "file" | "github" | "heart" | "home" | "info" | "layers" | "lock" | "mail" | "menu" | "model" | "pulse" | "search" | "shield" | "spark" | "target" | "user" | "x"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
]

const dashboardNav: { id: DashboardView; label: string; icon: IconName }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "prediction", label: "Prediction", icon: "pulse" },
  { id: "results", label: "Results", icon: "target" },
  { id: "explainability", label: "Explainability", icon: "layers" },
  { id: "analytics", label: "Analytics", icon: "chart" },
  { id: "history", label: "Assessment History", icon: "file" },
]

const featureCards = [
  {
    icon: "model" as IconName,
    title: "Machine learning analysis",
    text: "Explore structured health-survey data with reproducible classification workflows.",
    accent: "blue",
  },
  {
    icon: "brain" as IconName,
    title: "Deep learning models",
    text: "Compare classical estimators with TabNet for attentive tabular representation learning.",
    accent: "teal",
  },
  {
    icon: "spark" as IconName,
    title: "Explainable predictions",
    text: "Translate model outputs into understandable feature-level contributions using SHAP.",
    accent: "violet",
  },
  {
    icon: "heart" as IconName,
    title: "Health data insights",
    text: "Support research awareness with careful, non-diagnostic interpretation of risk patterns.",
    accent: "coral",
  },
]

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }

  const paths: Record<IconName, ReactNode> = {
    "arrow-right": (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    brain: (
      <>
        <path d="M9.5 4.5A3 3 0 0 0 4 6.2a3 3 0 0 0-1 5.7 3.2 3.2 0 0 0 2 5.7A3 3 0 0 0 10 20V5.5c0-.4-.2-.8-.5-1Z" />
        <path d="M14.5 4.5A3 3 0 0 1 20 6.2a3 3 0 0 1 1 5.7 3.2 3.2 0 0 1-2 5.7A3 3 0 0 1 14 20V5.5c0-.4.2-.8.5-1Z" />
        <path d="M6 9c1.5 0 2.5.8 3 2M18 9c-1.5 0-2.5.8-3 2M6 15c1.5 0 2.5-.8 3-2M18 15c-1.5 0-2.5-.8-3-2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19V3" />
        <path d="M2 19h21" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    "eye-off": (
      <>
        <path d="m3 3 18 18" />
        <path d="M10.6 6.2c.5-.1.9-.2 1.4-.2 6 0 9.5 6 9.5 6a16 16 0 0 1-2 2.7M6.2 6.3C3.8 8 2.5 12 2.5 12s3.5 6 9.5 6c1.5 0 2.8-.4 4-1" />
      </>
    ),
    file: (
      <>
        <path d="M6 2h8l4 4v16H6z" />
        <path d="M14 2v5h5M9 12h6M9 16h6" />
      </>
    ),
    github: (
      <>
        <path d="M15 22v-3.9c0-1 .1-1.4-.5-2 3 0 6.1-1.5 6.1-6.5 0-1.5-.5-2.7-1.4-3.7.1-.4.6-1.8-.2-3.7 0 0-1.1-.4-3.8 1.4a13 13 0 0 0-6.8 0C5.8 1.8 4.6 2.2 4.6 2.2c-.7 1.9-.3 3.3-.1 3.7A5.3 5.3 0 0 0 3 9.6c0 5 3.1 6.5 6.1 6.5-.4.4-.7.9-.8 1.6-.7.3-2.5.9-3.6-1 0 0-.7-1.3-2-1.4" />
        <path d="M9 22v-4.2" />
      </>
    ),
    heart: (
      <>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
        <path d="M7 12h3l1-3 2 6 1-3h3" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-6h6v6" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v6M12 7h.01" />
      </>
    ),
    layers: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    model: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="8.5" y="14" width="7" height="7" rx="1" />
        <path d="M6.5 10v2h11v-2M12 12v2" />
      </>
    ),
    pulse: (
      <>
        <path d="M3 12h4l2-7 4 14 2-7h6" />
        <path d="M20.2 5.8A9 9 0 1 1 3.8 18.2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 4.5 5v6c0 5 3.2 9.4 7.5 11 4.3-1.6 7.5-6 7.5-11V5L12 2Z" />
        <path d="M8 12h2l1.3-3 1.7 6 1-3h2" />
      </>
    ),
    spark: (
      <>
        <path d="m12 2 1.2 4.2L17 8l-3.8 1.8L12 14l-1.2-4.2L7 8l3.8-1.8L12 2Z" />
        <path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    x: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  }

  return <svg {...common}>{paths[name]}</svg>
}

function Logo({
  compact = false,
  inverse = false,
}: {
  compact?: boolean
  inverse?: boolean
}) {
  return (
    <div className={`logo ${inverse ? "logo--inverse" : ""}`}>
      <span className="logo__mark">
        <Icon name="shield" size={compact ? 22 : 25} />
      </span>
      {!compact && (
        <span className="logo__type">
          NeuroShield <b>AI</b>
        </span>
      )}
    </div>
  )
}

function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost" | "light" | "danger"
  type?: "button" | "submit"
  onClick?: () => void
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      className={`btn btn--${variant} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
}) {
  return (
    <div className={`section-title section-title--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function BrainIllustration() {
  return (
    <div
      className="brain-art"
      aria-label="Abstract brain protected by an AI shield"
    >
      <div className="brain-art__orbit brain-art__orbit--one" />
      <div className="brain-art__orbit brain-art__orbit--two" />
      <svg viewBox="0 0 560 520" role="img">
        <defs>
          <linearGradient id="shieldFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--blue-500)" />
            <stop offset="1" stopColor="var(--teal-500)" />
          </linearGradient>
          <linearGradient id="brainFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--blue-50)" />
            <stop offset="1" stopColor="var(--teal-100)" />
          </linearGradient>
        </defs>
        <path
          className="brain-art__shield"
          d="M280 42 445 107v132c0 111-69 201-165 238-96-37-165-127-165-238V107L280 42Z"
          fill="url(#shieldFill)"
        />
        <path
          d="M280 77 413 129v108c0 87-52 160-133 195-81-35-133-108-133-195V129L280 77Z"
          fill="var(--white)"
          opacity=".96"
        />
        <g
          fill="url(#brainFill)"
          stroke="var(--navy-700)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M269 172c-17-30-62-28-75 4-28 2-42 35-27 57-20 20-13 57 13 68-6 35 30 62 59 45 10 17 30 25 48 19V177c-4-5-10-7-18-5Z" />
          <path d="M291 172c17-30 62-28 75 4 28 2 42 35 27 57 20 20 13 57-13 68 6 35-30 62-59 45-10 17-30 25-48 19V177c4-5 10-7 18-5Z" />
          <path
            d="M203 229c21-3 37 8 46 26M357 229c-21-3-37 8-46 26M198 305c23 5 40-4 50-25M362 305c-23 5-40-4-50-25"
            fill="none"
          />
        </g>
        <g
          className="brain-art__nodes"
          fill="var(--white)"
          stroke="var(--teal-500)"
          strokeWidth="5"
        >
          <circle cx="195" cy="202" r="8" />
          <circle cx="219" cy="292" r="8" />
          <circle cx="247" cy="335" r="8" />
          <circle cx="365" cy="202" r="8" />
          <circle cx="341" cy="292" r="8" />
          <circle cx="313" cy="335" r="8" />
        </g>
      </svg>
      <div className="brain-art__badge brain-art__badge--top">
        <Icon name="spark" size={18} />
        <span>
          <b>Explainable</b> by design
        </span>
      </div>
      <div className="brain-art__badge brain-art__badge--bottom">
        <span className="status-dot" />
        <span>
          <b>Research</b> workflow
        </span>
      </div>
    </div>
  )
}

function PublicWebsite({ navigate }: { navigate: (view: AppView) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const visitSection = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="site-shell">
      <header className="navbar">
        <div className="container navbar__inner">
          <button
            className="logo-button"
            onClick={() => visitSection("#home")}
            aria-label="NeuroShield AI home"
          >
            <Logo />
          </button>
          <nav
            className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <button key={item.href} onClick={() => visitSection(item.href)}>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="navbar__actions">
            <Button variant="ghost" onClick={() => navigate("login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("signup")}>
              Sign up <Icon name="arrow-right" size={16} />
            </Button>
          </div>
          <button
            className="icon-button navbar__menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero__glow" />
          <div className="container hero__grid">
            <div className="hero__content">
              <div className="hero__pill">
                <span className="status-dot" /> Explainable AI for health
                research
              </div>
              <h1>
                Understand stroke.
                <br />
                <span>Explain AI.</span>
                <br />
                Empower awareness.
              </h1>
              <p>
                NeuroShield AI is a research platform for exploring
                stroke-related patterns in population health data through
                transparent machine learning and human-readable explanations.
              </p>
              <div className="hero__actions">
                <Button onClick={() => navigate("dashboard")}>
                  Explore platform <Icon name="arrow-right" size={17} />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => visitSection("#research")}
                >
                  Discover research
                </Button>
              </div>
              <div className="hero__proof">
                <div>
                  <Icon name="check" size={15} />
                  <span>Non-diagnostic research tool</span>
                </div>
                <div>
                  <Icon name="check" size={15} />
                  <span>Transparent methodology</span>
                </div>
              </div>
            </div>
            <BrainIllustration />
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-strip__inner">
            <p>Built for responsible, reproducible research</p>
            <div>
              <span>BRFSS</span>
              <span>SCIKIT-LEARN</span>
              <span>PYTORCH</span>
              <span>SHAP</span>
              <span>TABNET</span>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container about__grid">
            <div className="about__visual">
              <div className="data-card">
                <div className="data-card__head">
                  <span>Research pipeline</span>
                  <span className="mini-tag">Transparent</span>
                </div>
                <div className="data-card__chart">
                  {[42, 63, 48, 78, 58, 88, 70, 94].map((height, i) => (
                    <i key={i} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="data-card__footer">
                  <span>Feature signal</span>
                  <b>Interpretable outputs</b>
                </div>
              </div>
              <div className="about__stat">
                <strong>6</strong>
                <span>clear stages from data to explanation</span>
              </div>
            </div>
            <div className="about__content">
              <SectionTitle
                eyebrow="About NeuroShield"
                title="Research clarity for complex health data"
                align="left"
              />
              <p>
                Stroke research involves complex relationships across
                demographics, health indicators, and behavior. NeuroShield AI
                was created to make those model relationships easier to inspect,
                question, and communicate.
              </p>
              <p>
                Our mission is to pair strong machine learning workflows with
                explainability, helping researchers and learners understand why
                a model produces an output—not only what it predicts.
              </p>
              <div className="about__points">
                <div>
                  <span>
                    <Icon name="search" />
                  </span>
                  <p>
                    <b>Research motivation</b>Improve visibility into model
                    behavior and influential survey features.
                  </p>
                </div>
                <div>
                  <span>
                    <Icon name="target" />
                  </span>
                  <p>
                    <b>Our mission</b>Support thoughtful awareness through
                    transparent, data-informed exploration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--tint" id="solutions">
          <div className="container">
            <SectionTitle
              eyebrow="Platform capabilities"
              title="One platform. Multiple research perspectives."
              description="Move from structured survey data to model comparison and human-readable explanations within a single coherent workflow."
            />
            <div className="feature-grid">
              {featureCards.map((feature, index) => (
                <article className="feature-card" key={feature.title}>
                  <div
                    className={`feature-card__icon feature-card__icon--${feature.accent}`}
                  >
                    <Icon name={feature.icon} size={24} />
                  </div>
                  <span className="feature-card__number">0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  <button onClick={() => navigate("dashboard")}>
                    Explore capability <Icon name="arrow-right" size={16} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section workflow" id="how-it-works">
          <div className="container">
            <SectionTitle
              eyebrow="How it works"
              title="From population data to clear explanations"
              description="A structured pipeline designed to keep preprocessing, evaluation, and interpretation visible."
            />
            <div className="workflow__steps">
              {[
                [
                  "file",
                  "BRFSS dataset",
                  "Retrospective, self-reported health survey data",
                ],
                [
                  "layers",
                  "Preprocessing",
                  "Clean, encode, and prepare model features",
                ],
                [
                  "model",
                  "ML + TabNet",
                  "Train classical and attentive deep models",
                ],
                [
                  "chart",
                  "Evaluation",
                  "Compare performance with multiple metrics",
                ],
                [
                  "spark",
                  "SHAP analysis",
                  "Inspect global and local feature influence",
                ],
                ["target", "Results", "Communicate research-oriented outputs"],
              ].map(([icon, title, text], index) => (
                <div className="workflow__step" key={title}>
                  <span className="workflow__count">{index + 1}</span>
                  <div className="workflow__icon">
                    <Icon name={icon as IconName} size={23} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {index < 5 && <span className="workflow__line" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section why" id="why-us">
          <div className="container why__grid">
            <div className="why__content">
              <SectionTitle
                eyebrow="Why NeuroShield"
                title="Trust begins with understanding"
                align="left"
              />
              <p className="why__intro">
                A model output without context is difficult to evaluate.
                NeuroShield prioritizes traceability at every step.
              </p>
              <div className="why__list">
                {[
                  [
                    "Explainability first",
                    "See which inputs move a model output—and in what direction.",
                  ],
                  [
                    "Transparent workflow",
                    "Keep data preparation, model choices, and evaluation visible.",
                  ],
                  [
                    "Research driven",
                    "Frame every insight as an exploratory research finding, not a diagnosis.",
                  ],
                  [
                    "Data informed",
                    "Use multiple views and metrics instead of a single headline number.",
                  ],
                ].map(([title, text]) => (
                  <div key={title}>
                    <span>
                      <Icon name="check" size={16} />
                    </span>
                    <p>
                      <b>{title}</b>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
              <Button onClick={() => navigate("dashboard")}>
                See the platform <Icon name="arrow-right" size={17} />
              </Button>
            </div>
            <div className="why__panel">
              <div className="why__panel-head">
                <span>
                  <Icon name="spark" size={18} /> Local explanation
                </span>
                <span className="mini-tag mini-tag--success">SHAP</span>
              </div>
              <div className="impact">
                <span className="impact__label">Feature contribution</span>
                {[
                  ["General health", 82, "positive"],
                  ["Age band", 66, "positive"],
                  ["BMI", 43, "positive"],
                  ["Physical activity", 29, "negative"],
                  ["Fruit intake", 18, "negative"],
                ].map(([label, value, type]) => (
                  <div className="impact__row" key={label}>
                    <span>{label}</span>
                    <div>
                      <i
                        className={`impact__bar impact__bar--${type}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <b>
                      {type === "positive" ? "+" : "−"}
                      {value}
                    </b>
                  </div>
                ))}
              </div>
              <div className="why__insight">
                <Icon name="info" size={18} />
                <p>
                  <b>Readable by design</b>Directional contributions help
                  explain model behavior for an individual record.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section research" id="research">
          <div className="container">
            <SectionTitle
              eyebrow="Research foundation"
              title="Built for careful model comparison"
              description="Explore the data source, model families, evaluation framework, and explainability methods behind the platform."
            />
            <div className="research__grid">
              <article className="research__featured">
                <span className="research__tag">Dataset overview</span>
                <h3>Behavioral Risk Factor Surveillance System</h3>
                <p>
                  BRFSS is a large telephone survey collecting self-reported
                  health-related behaviors, chronic conditions, and use of
                  preventive services in the United States.
                </p>
                <div className="research__notice">
                  <Icon name="info" size={19} />
                  <span>
                    The target represents retrospective self-reported stroke
                    history—not future stroke incidence.
                  </span>
                </div>
                <button>
                  View data documentation <Icon name="arrow-right" size={16} />
                </button>
              </article>
              <div className="research__cards">
                <article>
                  <span>
                    <Icon name="model" />
                  </span>
                  <div>
                    <small>Models</small>
                    <h3>Comparative approach</h3>
                    <p>Classical machine learning and TabNet architectures.</p>
                  </div>
                </article>
                <article>
                  <span>
                    <Icon name="chart" />
                  </span>
                  <div>
                    <small>Evaluation</small>
                    <h3>Multiple metrics</h3>
                    <p>Accuracy, precision, recall, F1 and ROC-AUC views.</p>
                  </div>
                </article>
                <article>
                  <span>
                    <Icon name="spark" />
                  </span>
                  <div>
                    <small>Explainability</small>
                    <h3>Local + global SHAP</h3>
                    <p>
                      Understand individual outputs and broader model patterns.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container contact__panel">
            <div>
              <span className="eyebrow eyebrow--light">
                Open research project
              </span>
              <h2>Let’s make health AI easier to understand.</h2>
              <p>
                Explore the project, review the methodology, or connect with the
                team developing NeuroShield AI.
              </p>
            </div>
            <div className="contact__actions">
              <Button variant="light" onClick={() => navigate("dashboard")}>
                Explore live platform <Icon name="arrow-right" size={17} />
              </Button>
              <Button variant="ghost" className="btn--on-dark">
                <Icon name="github" size={18} /> View GitHub
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Logo inverse />
            <p>
              Explainable AI research for responsible stroke-data exploration.
            </p>
            <span>Research use only · Not a medical device</span>
          </div>
          <div>
            <h4>Platform</h4>
            <button onClick={() => navigate("dashboard")}>Overview</button>
            <button onClick={() => navigate("dashboard")}>Prediction</button>
            <button onClick={() => navigate("dashboard")}>
              Explainability
            </button>
            <button onClick={() => navigate("dashboard")}>Analytics</button>
          </div>
          <div>
            <h4>Research</h4>
            <button onClick={() => visitSection("#research")}>
              BRFSS dataset
            </button>
            <button>Methodology</button>
            <button>SHAP documentation</button>
            <button>References</button>
          </div>
          <div>
            <h4>Company</h4>
            <button onClick={() => visitSection("#about")}>About</button>
            <button onClick={() => visitSection("#contact")}>Contact</button>
            <button>GitHub</button>
            <button>Privacy</button>
          </div>
        </div>
        <div className="container footer__bottom">
          <span>© 2025 NeuroShield AI. Academic research concept.</span>
          <span>
            Outputs are informational and are not a substitute for professional
            medical advice.
          </span>
        </div>
      </footer>
    </div>
  )
}

function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
  children,
}: {
  label: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  icon?: IconName
  children?: ReactNode
}) {
  return (
    <label className={`form-field ${error ? "form-field--error" : ""}`}>
      <span className="form-field__label">{label}</span>
      <span className="form-field__control">
        {icon && <Icon name={icon} size={18} />}
        {children || (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
          />
        )}
      </span>
      {error && <span className="form-field__error">{error}</span>}
    </label>
  )
}

function AuthScreen({
  mode,
  navigate,
}: {
  mode: "login" | "signup"
  navigate: (view: AppView) => void
}) {
  const isLogin = mode === "login"
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  })

  const update = (key: keyof typeof values, value: string) =>
    setValues((current) => ({ ...current, [key]: value }))
  const emailError =
    submitted && !values.email.includes("@")
      ? "Enter a valid email address."
      : ""
  const passwordError =
    submitted && values.password.length < 8 ? "Use at least 8 characters." : ""
  const confirmError =
    submitted && !isLogin && values.confirm !== values.password
      ? "Passwords do not match."
      : ""

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    if (
      values.email.includes("@") &&
      values.password.length >= 8 &&
      (isLogin || values.confirm === values.password)
    ) {
      navigate("dashboard")
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-brand">
        <button className="logo-button" onClick={() => navigate("public")}>
          <Logo inverse />
        </button>
        <div className="auth-brand__message">
          <span className="eyebrow eyebrow--light">
            {isLogin ? "Welcome back" : "Begin exploring"}
          </span>
          <h1>
            {isLogin
              ? "Research insights are waiting."
              : "Make complex AI easier to understand."}
          </h1>
          <p>
            Explore stroke-related health data through transparent models, clear
            evaluation, and explainable outputs.
          </p>
        </div>
        <div className="auth-illustration">
          <div className="auth-illustration__shield">
            <Icon name="shield" size={70} />
          </div>
          <div className="auth-illustration__line auth-illustration__line--one" />
          <div className="auth-illustration__line auth-illustration__line--two" />
          <span className="auth-illustration__node auth-illustration__node--one">
            <Icon name="brain" />
          </span>
          <span className="auth-illustration__node auth-illustration__node--two">
            <Icon name="chart" />
          </span>
          <span className="auth-illustration__node auth-illustration__node--three">
            <Icon name="spark" />
          </span>
        </div>
        <p className="auth-brand__note">
          <Icon name="lock" size={15} /> Secure research workspace
        </p>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form">
          <button
            className="auth-form__back"
            onClick={() => navigate("public")}
          >
            <Icon name="arrow-right" size={16} /> Back to website
          </button>
          <div className="auth-form__mobile-logo">
            <Logo />
          </div>
          <h2>{isLogin ? "Sign in to NeuroShield" : "Create your account"}</h2>
          <p>
            {isLogin
              ? "Enter your details to access the research platform."
              : "Join the explainable health AI research workspace."}
          </p>
          <form onSubmit={submit} noValidate>
            {!isLogin && (
              <FormField
                label="Full name"
                placeholder="Your full name"
                value={values.name}
                onChange={(value) => update("name", value)}
                icon="user"
                error={submitted && !values.name ? "Enter your full name." : ""}
              />
            )}
            <FormField
              label="Email address"
              type="email"
              placeholder="name@organization.com"
              value={values.email}
              onChange={(value) => update("email", value)}
              icon="mail"
              error={emailError}
            />
            <FormField
              label="Password"
              value={values.password}
              onChange={(value) => update("password", value)}
              error={passwordError}
            >
              <Icon name="lock" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={values.password}
                onChange={(event) => update("password", event.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <Icon name={showPassword ? "eye-off" : "eye"} size={18} />
              </button>
            </FormField>
            {!isLogin && (
              <FormField
                label="Confirm password"
                type={showPassword ? "text" : "password"}
                placeholder="Repeat your password"
                value={values.confirm}
                onChange={(value) => update("confirm", value)}
                icon="lock"
                error={confirmError}
              />
            )}
            {isLogin && (
              <div className="auth-form__options">
                <label className="check-field">
                  <input type="checkbox" />
                  <span /> Remember me
                </label>
                <button type="button">Forgot password?</button>
              </div>
            )}
            {!isLogin && (
              <label className="terms-field">
                <input type="checkbox" />
                <span /> I agree to the Terms of Use and acknowledge this is a
                non-diagnostic research platform.
              </label>
            )}
            <Button type="submit" className="auth-form__submit">
              {isLogin ? "Sign in" : "Create account"}{" "}
              <Icon name="arrow-right" size={17} />
            </Button>
          </form>
          <div className="auth-form__switch">
            {isLogin ? "New to NeuroShield AI?" : "Already have an account?"}
            <button onClick={() => navigate(isLogin ? "signup" : "login")}>
              {isLogin ? "Create account" : "Sign in"}
            </button>
          </div>
          <p className="auth-form__disclaimer">
            <Icon name="info" size={15} /> For educational and research use
            only. Not for clinical diagnosis.
          </p>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  note,
  tone = "blue",
}: {
  icon: IconName
  label: string
  value: string
  note: string
  tone?: string
}) {
  return (
    <article className="metric-card">
      <span className={`metric-card__icon metric-card__icon--${tone}`}>
        <Icon name={icon} />
      </span>
      <div>
        <p>{label}</p>
        <h3>{value}</h3>
        <span>{note}</span>
      </div>
    </article>
  )
}

function DashboardHome({
  setPage,
}: {
  setPage: (page: DashboardView) => void
}) {
  return (
    <>
      <div className="dash-welcome">
        <div>
          <span className="dash-welcome__tag">
            <Icon name="spark" size={15} /> Explainable research workspace
          </span>
          <h1>Welcome to NeuroShield AI.</h1>
          <p>
            Explore retrospective stroke-history patterns with an AI research
            workspace designed for transparent model review.
          </p>
          <Button onClick={() => setPage("prediction")}>
            New assessment <Icon name="arrow-right" size={17} />
          </Button>
        </div>
        <div className="dash-welcome__visual">
          <span className="dash-welcome__ring" />
          <span className="dash-welcome__brain">
            <Icon name="brain" size={76} />
          </span>
          <i className="dash-welcome__dot dash-welcome__dot--one" />
          <i className="dash-welcome__dot dash-welcome__dot--two" />
          <i className="dash-welcome__dot dash-welcome__dot--three" />
        </div>
      </div>

      <div className="dash-section-head">
        <div>
          <h2>Platform overview</h2>
          <p>Everything you need to inspect model outputs responsibly.</p>
        </div>
        <button onClick={() => setPage("history")}>
          View assessment history <Icon name="arrow-right" size={15} />
        </button>
      </div>
      <div className="dash-feature-grid">
        {[
          [
            "target",
            "ML Predictions",
            "Explore an illustrative model estimate for retrospective self-reported stroke history.",
            "blue",
          ],
          [
            "spark",
            "Explainable AI",
            "Understand positive and negative feature contributions using SHAP.",
            "teal",
          ],
          [
            "chart",
            "Data Insights",
            "Explore patterns in retrospective population health survey records.",
            "violet",
          ],
          [
            "heart",
            "Research",
            "Review outputs with transparent methodology and appropriate research caution.",
            "coral",
          ],
        ].map(([icon, title, text, tone]) => (
          <article key={title}>
            <span className={`dash-card-icon dash-card-icon--${tone}`}>
              <Icon name={icon as IconName} size={23} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            <button
              onClick={() =>
                setPage(
                  title === "Explainable AI"
                    ? "explainability"
                    : title === "Data Insights" || title === "Research"
                      ? "analytics"
                      : "prediction",
                )
              }
            >
              Learn more <Icon name="arrow-right" size={14} />
            </button>
          </article>
        ))}
      </div>

      <div className="dash-bottom-grid">
        <div className="dash-panel getting-started">
          <div className="dash-panel__head">
            <div>
              <h3>Getting started</h3>
              <p>A simple, transparent research workflow.</p>
            </div>
            <span className="mini-tag">3 steps</span>
          </div>
          <div className="getting-started__steps">
            <div>
              <span>1</span>
              <p>
                <b>Enter a record</b>Add supported survey and health indicators.
              </p>
            </div>
            <div>
              <span>2</span>
              <p>
                <b>Review model output</b>Inspect the estimated class and
                probability.
              </p>
            </div>
            <div>
              <span>3</span>
              <p>
                <b>Explore explanation</b>See which features influenced model
                behavior.
              </p>
            </div>
          </div>
        </div>
        <div className="dash-panel responsible-card">
          <span className="responsible-card__icon">
            <Icon name="shield" size={28} />
          </span>
          <h3>Responsible by design</h3>
          <p>
            NeuroShield AI is a research and educational platform. Outputs
            describe model behavior, not medical certainty.
          </p>
          <button onClick={() => setPage("history")}>
            View illustrative records <Icon name="arrow-right" size={15} />
          </button>
        </div>
      </div>
    </>
  )
}

const SelectField = ({
  label,
  children,
  defaultValue = "",
}: {
  label: string
  children: ReactNode
  defaultValue?: string
}) => (
  <FormField label={label}>
    <select defaultValue={defaultValue}>{children}</select>
    <Icon name="chevron" size={16} />
  </FormField>
)

type AssessmentAnswers = Record<string, string>
type AssessmentSection = "Basic Profile" | "Medical History" | "Lifestyle & Physical Activity"
type AssessmentQuestion = {
  id: string
  section: AssessmentSection
  label: string
  help?: string
  type: "radio" | "select" | "number"
  options?: string[]
  placeholder?: string
  min?: number
  max?: number
  suffix?: string
}
type AssessmentRecord = {
  id: string
  date: string
  summary: string
  classification: string
  probability: string
  model: string
  threshold: string
  answers: AssessmentAnswers
  illustrative: true
}

const assessmentSections: AssessmentSection[] = [
  "Basic Profile",
  "Medical History",
  "Lifestyle & Physical Activity",
]
const yesNoUnknown = ["Yes", "No", "Don't know / not sure", "Refused"]

function getAssessmentQuestions(
  answers: AssessmentAnswers,
): AssessmentQuestion[] {
  const questions: AssessmentQuestion[] = [
    {
      id: "ageGroup",
      section: "Basic Profile",
      label: "What is your age group?",
      help: "Choose the category that matches the BRFSS age grouping.",
      type: "select",
      options: [
        "18–24",
        "25–29",
        "30–34",
        "35–39",
        "40–44",
        "45–49",
        "50–54",
        "55–59",
        "60–64",
        "65–69",
        "70–74",
        "75–79",
        "80+",
      ],
    },
    {
      id: "sex",
      section: "Basic Profile",
      label: "What sex category should be used for this record?",
      help: "Options match the source dataset categories used by the current schema.",
      type: "radio",
      options: ["Male", "Female"],
    },
    {
      id: "maritalStatus",
      section: "Basic Profile",
      label: "What is your marital status?",
      type: "select",
      options: [
        "Married",
        "Divorced",
        "Widowed",
        "Separated",
        "Never married",
        "Member of an unmarried couple",
        "Refused",
      ],
    },
    {
      id: "education",
      section: "Basic Profile",
      label: "What is the highest level of education completed?",
      type: "select",
      options: [
        "Never attended school / kindergarten only",
        "Grades 1–8",
        "Grades 9–11",
        "High school graduate",
        "Some college or technical school",
        "College graduate",
        "Refused",
      ],
    },
    {
      id: "employment",
      section: "Basic Profile",
      label: "What is your current employment status?",
      type: "select",
      options: [
        "Employed for wages",
        "Self-employed",
        "Out of work",
        "Homemaker",
        "Student",
        "Retired",
        "Unable to work",
        "Refused",
      ],
    },
    {
      id: "income",
      section: "Basic Profile",
      label: "What is your annual household income?",
      help: "Choose a range. Exact income is not requested.",
      type: "select",
      options: [
        "Less than $15,000",
        "$15,000–$24,999",
        "$25,000–$34,999",
        "$35,000–$49,999",
        "$50,000–$99,999",
        "$100,000–$199,999",
        "$200,000 or more",
        "Don't know / not sure",
        "Refused",
      ],
    },
    {
      id: "bmiMethod",
      section: "Medical History",
      label: "How would you like to provide body-size information?",
      help: "Enter BMI directly or provide height and weight. No value is calculated until all required inputs are present.",
      type: "radio",
      options: ["Enter BMI", "Enter height and weight"],
    },
  ]

  if (answers.bmiMethod === "Enter BMI") {
    questions.push({
      id: "bmi",
      section: "Medical History",
      label: "What is the BMI value?",
      help: "Enter a numeric value from an existing measurement.",
      type: "number",
      placeholder: "e.g. 26.4",
      min: 10,
      max: 90,
    })
  }
  if (answers.bmiMethod === "Enter height and weight") {
    questions.push(
      {
        id: "height",
        section: "Medical History",
        label: "What is the height in inches?",
        type: "number",
        placeholder: "e.g. 68",
        min: 36,
        max: 96,
        suffix: "inches",
      },
      {
        id: "weight",
        section: "Medical History",
        label: "What is the weight in pounds?",
        help: "A BMI could be derived later by the implementation layer.",
        type: "number",
        placeholder: "e.g. 170",
        min: 50,
        max: 700,
        suffix: "pounds",
      },
    )
  }

  questions.push(
    {
      id: "highBloodPressure",
      section: "Medical History",
      label: "Have you ever been told you have high blood pressure?",
      type: "radio",
      options: yesNoUnknown,
    },
    {
      id: "diabetes",
      section: "Medical History",
      label: "Have you ever been told you had diabetes?",
      help: "Pregnancy-related diabetes and borderline or prediabetes responses remain distinct.",
      type: "select",
      options: [
        "Yes",
        "Yes, but only during pregnancy",
        "No",
        "No, borderline / prediabetes",
        "Don't know / not sure",
        "Refused",
      ],
    },
    {
      id: "heartAttack",
      section: "Medical History",
      label: "Have you ever been told you had a heart attack?",
      type: "radio",
      options: yesNoUnknown,
    },
    {
      id: "coronaryHeartDisease",
      section: "Medical History",
      label: "Have you ever been told you had coronary heart disease?",
      type: "radio",
      options: yesNoUnknown,
    },
    {
      id: "highCholesterol",
      section: "Medical History",
      label: "Have you ever been told your cholesterol was high?",
      type: "radio",
      options: yesNoUnknown,
    },
  )
  if (answers.highCholesterol === "Yes") {
    questions.push({
      id: "cholesterolMedication",
      section: "Medical History",
      label:
        "Are you currently taking medicine prescribed for high cholesterol?",
      type: "radio",
      options: yesNoUnknown,
    })
  }
  questions.push(
    {
      id: "kidneyDisease",
      section: "Medical History",
      label: "Have you ever been told you had kidney disease?",
      help: "Do not include kidney stones, bladder infection, or incontinence.",
      type: "radio",
      options: yesNoUnknown,
    },
    {
      id: "prediabetes",
      section: "Medical History",
      label:
        "Have you ever been told you had prediabetes or borderline diabetes?",
      type: "radio",
      options: yesNoUnknown,
    },
    {
      id: "smoked100",
      section: "Lifestyle & Physical Activity",
      label: "Have you smoked at least 100 cigarettes in your entire life?",
      help: "Unknown and refused responses remain separate from No.",
      type: "radio",
      options: yesNoUnknown,
    },
  )
  if (answers.smoked100 === "Yes") {
    questions.push({
      id: "currentSmoking",
      section: "Lifestyle & Physical Activity",
      label: "Do you now smoke cigarettes every day, some days, or not at all?",
      type: "radio",
      options: [
        "Every day",
        "Some days",
        "Not at all",
        "Don't know / not sure",
        "Refused",
      ],
    })
  }
  questions.push({
    id: "physicalActivity",
    section: "Lifestyle & Physical Activity",
    label:
      "During the past month, did you participate in any physical activity or exercise?",
    help: "Exclude activity performed as part of a regular job.",
    type: "radio",
    options: yesNoUnknown,
  })
  if (answers.physicalActivity === "Yes") {
    questions.push(
      {
        id: "activityType",
        section: "Lifestyle & Physical Activity",
        label: "Which activity best describes the activity you did most?",
        help: "Activity-detail mapping is a placeholder and does not calculate _TOTINDA or other derived variables.",
        type: "select",
        options: [
          "Walking",
          "Running or jogging",
          "Cycling",
          "Swimming",
          "Strength activity",
          "Another activity",
          "Don't know / not sure",
          "Refused",
        ],
      },
      {
        id: "activityDetail",
        section: "Lifestyle & Physical Activity",
        label: "How should this activity detail be recorded for the prototype?",
        help: "Exact frequency, duration, and derived-variable mapping will be implemented later against the trained schema.",
        type: "radio",
        options: [
          "Activity details provided later",
          "Prefer not to provide details",
          "Mapping not yet implemented",
        ],
      },
    )
  }
  questions.push(
    {
      id: "generalHealth",
      section: "Lifestyle & Physical Activity",
      label: "Would you say your general health is…",
      type: "radio",
      options: [
        "Excellent",
        "Very good",
        "Good",
        "Fair",
        "Poor",
        "Don't know / not sure",
        "Refused",
      ],
    },
    {
      id: "physicalHealthDays",
      section: "Lifestyle & Physical Activity",
      label:
        "During the past 30 days, for how many days was your physical health not good?",
      type: "number",
      placeholder: "0–30",
      min: 0,
      max: 30,
      suffix: "days",
    },
    {
      id: "mentalHealthDays",
      section: "Lifestyle & Physical Activity",
      label:
        "During the past 30 days, for how many days was your mental health not good?",
      type: "number",
      placeholder: "0–30",
      min: 0,
      max: 30,
      suffix: "days",
    },
  )
  return questions
}

function PredictionView({
  initialAnswers,
  startInReview,
  onReviewOpened,
  onSubmit,
}: {
  initialAnswers: AssessmentAnswers
  startInReview: boolean
  onReviewOpened: () => void
  onSubmit: (answers: AssessmentAnswers) => void
}) {
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers)
  const [currentId, setCurrentId] = useState("ageGroup")
  const [reviewing, setReviewing] = useState(
    startInReview && Object.keys(initialAnswers).length > 0,
  )
  const [error, setError] = useState("")
  const questions = getAssessmentQuestions(answers)
  const currentIndex = Math.max(
    0,
    questions.findIndex((question) => question.id === currentId),
  )
  const current = questions[currentIndex]
  const answeredCount = questions.filter((question) =>
    Boolean(answers[question.id]),
  ).length
  const progress = questions.length
    ? Math.round((answeredCount / questions.length) * 100)
    : 0

  useEffect(() => {
    if (startInReview) onReviewOpened()
  }, [startInReview, onReviewOpened])

  const setAnswer = (id: string, value: string) => {
    setAnswers((existing) => {
      const next = { ...existing, [id]: value }
      if (id === "bmiMethod") {
        if (value === "Enter BMI") {
          delete next.height
          delete next.weight
        } else {
          delete next.bmi
        }
      }
      if (id === "highCholesterol" && value !== "Yes")
        delete next.cholesterolMedication
      if (id === "smoked100" && value !== "Yes") delete next.currentSmoking
      if (id === "physicalActivity" && value !== "Yes") {
        delete next.activityType
        delete next.activityDetail
      }
      return next
    })
    setError("")
  }

  const validateCurrent = () => {
    const value = answers[current.id]
    if (!value) {
      setError("Please select or enter an answer before continuing.")
      return false
    }
    if (
      current.type === "number" &&
      ((current.min !== undefined && Number(value) < current.min) ||
        (current.max !== undefined && Number(value) > current.max))
    ) {
      setError(`Enter a value between ${current.min} and ${current.max}.`)
      return false
    }
    return true
  }

  const continueAssessment = () => {
    if (!validateCurrent()) return
    const updatedQuestions = getAssessmentQuestions(answers)
    const index = updatedQuestions.findIndex(
      (question) => question.id === current.id,
    )
    if (index >= updatedQuestions.length - 1) setReviewing(true)
    else setCurrentId(updatedQuestions[index + 1].id)
  }

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentId(questions[currentIndex - 1].id)
      setError("")
    }
  }
  const editSection = (section: AssessmentSection) => {
    const first = questions.find((question) => question.section === section)
    if (first) {
      setCurrentId(first.id)
      setReviewing(false)
      setError("")
    }
  }
  const submit = () => {
    const missing = questions.find((question) => !answers[question.id])
    if (missing) {
      setCurrentId(missing.id)
      setReviewing(false)
      setError("Please answer this required question before submitting.")
      return
    }
    onSubmit(answers)
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Prediction workspace</span>
          <h1>BRFSS-based assessment</h1>
          <p>
            Answer one question at a time. Follow-up questions appear only when
            relevant.
          </p>
        </div>
        <span className="page-heading__badge">
          <Icon name="lock" size={15} /> Frontend prototype · no data saved
        </span>
      </div>
      <div className="prediction-layout">
        <div className="dash-panel prediction-form branching-form">
          <div className="branching-progress">
            <div>
              <span>{reviewing ? "Review answers" : current.section}</span>
              <b>
                {reviewing
                  ? "Final review"
                  : `Question ${currentIndex + 1} of ${questions.length}`}
              </b>
            </div>
            <strong>{progress}% complete</strong>
            <i>
              <em style={{ width: `${progress}%` }} />
            </i>
          </div>

          {!reviewing ? (
            <div className="question-stage">
              <div className="question-stage__meta">
                <span className="step-badge">{current.section}</span>
                <button
                  onClick={() => setReviewing(true)}
                  disabled={answeredCount === 0}
                >
                  Review answers
                </button>
              </div>
              <div className="question-stage__heading">
                <span>
                  <Icon
                    name={
                      current.section === "Basic Profile"
                        ? "user"
                        : current.section === "Medical History"
                          ? "heart"
                          : "pulse"
                    }
                    size={21}
                  />
                </span>
                <div>
                  <small>Required</small>
                  <h2>{current.label}</h2>
                  {current.help && <p>{current.help}</p>}
                </div>
              </div>
              <div className="question-control">
                {current.type === "radio" && (
                  <div
                    className={`answer-options ${
                      current.options && current.options.length > 5
                        ? "answer-options--compact"
                        : ""
                    }`}
                  >
                    {current.options?.map((option) => (
                      <label
                        key={option}
                        className={
                          answers[current.id] === option ? "selected" : ""
                        }
                      >
                        <input
                          type="radio"
                          name={current.id}
                          value={option}
                          checked={answers[current.id] === option}
                          onChange={() => setAnswer(current.id, option)}
                        />
                        <span>
                          <i />
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                {current.type === "select" && (
                  <label className="branch-select">
                    <select
                      value={answers[current.id] || ""}
                      onChange={(event) =>
                        setAnswer(current.id, event.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select an answer
                      </option>
                      {current.options?.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <Icon name="chevron" size={16} />
                  </label>
                )}
                {current.type === "number" && (
                  <label className="branch-number">
                    <input
                      type="number"
                      value={answers[current.id] || ""}
                      min={current.min}
                      max={current.max}
                      step={current.id === "bmi" ? "0.1" : "1"}
                      placeholder={current.placeholder}
                      onChange={(event) =>
                        setAnswer(current.id, event.target.value)
                      }
                    />
                    {current.suffix && <span>{current.suffix}</span>}
                  </label>
                )}
                {error && (
                  <div className="question-error">
                    <Icon name="info" size={16} />
                    {error}
                  </div>
                )}
              </div>
              <div className="question-stage__actions">
                <Button
                  variant="secondary"
                  onClick={previous}
                  disabled={currentIndex === 0}
                >
                  Previous
                </Button>
                <Button onClick={continueAssessment}>
                  Continue <Icon name="arrow-right" size={16} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="branch-review">
              <div className="review-section__intro">
                <span>
                  <Icon name="check" size={20} />
                </span>
                <div>
                  <h4>Review your answers</h4>
                  <p>
                    Skipped follow-up questions are omitted rather than recorded
                    as No.
                  </p>
                </div>
              </div>
              <div className="section-review-list">
                {assessmentSections.map((section) => {
                  const sectionQuestions = questions.filter(
                    (question) => question.section === section,
                  )
                  const complete = sectionQuestions.every((question) =>
                    Boolean(answers[question.id]),
                  )
                  return (
                    <section key={section}>
                      <div className="section-review-list__head">
                        <div>
                          <span
                            className={complete ? "complete" : "incomplete"}
                          >
                            <Icon
                              name={complete ? "check" : "info"}
                              size={13}
                            />
                          </span>
                          <h3>{section}</h3>
                          <small>
                            {complete ? "Complete" : "Needs attention"}
                          </small>
                        </div>
                        <button onClick={() => editSection(section)}>
                          Edit section
                        </button>
                      </div>
                      <dl>
                        {sectionQuestions
                          .filter((question) => answers[question.id])
                          .map((question) => (
                            <div key={question.id}>
                              <dt>{question.label}</dt>
                              <dd>{answers[question.id]}</dd>
                            </div>
                          ))}
                      </dl>
                    </section>
                  )
                })}
              </div>
              <div className="review-disclaimer">
                <Icon name="shield" size={18} />
                <p>
                  <b>Research use only</b>This assessment supports a BRFSS-based
                  stroke-history classification prototype. It does not predict
                  future stroke incidence or provide medical advice.
                </p>
              </div>
              <div className="question-stage__actions">
                <Button variant="secondary" onClick={() => setReviewing(false)}>
                  Return to questions
                </Button>
                <Button onClick={submit}>
                  Submit assessment <Icon name="arrow-right" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
        <aside className="prediction-help">
          <div className="dash-panel help-card">
            <span className="help-card__icon">
              <Icon name="layers" />
            </span>
            <h3>Branching logic</h3>
            <p>
              The questionnaire automatically adds or removes follow-ups based
              on your answers.
            </p>
            <ul>
              <li>
                <Icon name="check" size={14} /> Unknown and refused remain
                distinct
              </li>
              <li>
                <Icon name="check" size={14} /> Irrelevant questions are skipped
              </li>
              <li>
                <Icon name="check" size={14} /> Answers remain editable
              </li>
            </ul>
          </div>
          <div className="dash-panel model-card">
            <div>
              <span>Dataset context</span>
              <b>CDC BRFSS 2023</b>
            </div>
            <span className="mini-tag mini-tag--success">Research</span>
            <hr />
            <div>
              <span>Target field</span>
              <b>CVDSTRK3</b>
            </div>
            <div>
              <span>Derived variables</span>
              <b>Calculated later</b>
            </div>
          </div>
          <div className="medical-note">
            <Icon name="info" size={21} />
            <p>
              <b>Schema note</b>_MICHD, _SMOKER3, and _TOTINDA are not requested
              directly and would be derived later in the implementation layer.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

function ResultsView({
  record,
  setPage,
  onViewAssessment,
}: {
  record: AssessmentRecord
  setPage: (page: DashboardView) => void
  onViewAssessment: () => void
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Assessment results</span>
          <h1>BRFSS-based stroke-history classification</h1>
          <p>Research-oriented output for assessment {record.id}.</p>
        </div>
        <span className="page-heading__badge">
          <Icon name="file" size={15} /> {record.date}
        </span>
      </div>
      <div className="sample-result-banner">
        <Icon name="check" size={18} />
        <div>
          <b>
            Assessment submitted · Illustrative sample result — not a real
            prediction
          </b>
          <span>
            No model inference is connected. Classification, score, and
            threshold values must come from the validated implementation.
          </span>
        </div>
      </div>
      <div className="result-hero dash-panel">
        <div className="result-hero__status">
          <span className="result-hero__status-icon">
            <Icon name="shield" size={34} />
          </span>
          <div>
            <span>Illustrative classification result</span>
            <h2>{record.classification}</h2>
            <p>
              CVDSTRK3 represents self-reported history of ever being told by a
              healthcare professional that the respondent had a stroke.
            </p>
          </div>
        </div>
        <div className="probability-ring probability-ring--unavailable">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="48" />
            <circle
              className="probability-ring__value"
              cx="60"
              cy="60"
              r="48"
            />
          </svg>
          <div>
            <strong>—</strong>
            <span>score not available</span>
          </div>
        </div>
      </div>
      <div className="result-meta-grid">
        <div className="dash-panel result-meta-card">
          <span>
            <Icon name="file" size={18} />
          </span>
          <div>
            <small>Assessment ID</small>
            <b>{record.id}</b>
            <p>{record.date}</p>
          </div>
        </div>
        <div className="dash-panel result-meta-card">
          <span>
            <Icon name="model" size={18} />
          </span>
          <div>
            <small>Model information</small>
            <b>{record.model}</b>
            <p>No connected inference model</p>
          </div>
        </div>
        <div className="dash-panel result-meta-card">
          <span>
            <Icon name="target" size={18} />
          </span>
          <div>
            <small>Classification threshold</small>
            <b>{record.threshold}</b>
            <p>Shown only when supplied by the model</p>
          </div>
        </div>
      </div>
      <div className="results-grid">
        <div className="dash-panel interpretation-card">
          <div className="dash-panel__head">
            <div>
              <h3>How to interpret this screen</h3>
              <p>Classification and reported history are different concepts</p>
            </div>
            <span className="mini-tag">Research context</span>
          </div>
          <div className="result-distinction">
            <div>
              <span>
                <Icon name="spark" size={19} />
              </span>
              <p>
                <b>Model classification</b>A model output would classify
                patterns associated with the retrospective CVDSTRK3 target. The
                current prototype has not run a model.
              </p>
            </div>
            <div>
              <span>
                <Icon name="user" size={19} />
              </span>
              <p>
                <b>Respondent-reported history</b>The questionnaire does not ask
                the respondent to provide CVDSTRK3 directly. Reported stroke
                history is therefore not inferred from an answer on this form.
              </p>
            </div>
          </div>
          <div className="score-placeholder">
            <span>Model-generated score / probability</span>
            <b>{record.probability}</b>
            <i>
              <em />
            </i>
            <small>
              A probability indicator will populate only after real model
              integration.
            </small>
          </div>
        </div>
        <div className="dash-panel result-actions-card">
          <span className="next-card__icon">
            <Icon name="layers" size={24} />
          </span>
          <h3>Continue reviewing</h3>
          <p>
            Inspect the explanation workspace or return to the exact answers
            used for this illustrative record.
          </p>
          <Button onClick={() => setPage("explainability")}>
            View Explainability <Icon name="arrow-right" size={15} />
          </Button>
          <Button
            variant="secondary"
            onClick={onViewAssessment}
            disabled={!Object.keys(record.answers).length}
          >
            View Full Assessment
          </Button>
          <button className="back-dashboard" onClick={() => setPage("home")}>
            <Icon name="arrow-right" size={14} /> Back to Dashboard
          </button>
        </div>
      </div>
      <div className="disclaimer-banner">
        <Icon name="info" size={21} />
        <p>
          <b>Research and educational use only</b>NeuroShield AI is not a
          clinically validated stroke-risk calculator. This BRFSS-based
          stroke-history classification must not be used to predict future
          stroke incidence, diagnose a condition, recommend treatment, or
          replace professional medical care.
        </p>
      </div>
    </>
  )
}

const shapData = [
  {
    label: "General health: Fair",
    value: 88,
    amount: "+0.24",
    type: "positive",
  },
  { label: "Age band: 55–64", value: 69, amount: "+0.18", type: "positive" },
  {
    label: "High blood pressure: Yes",
    value: 53,
    amount: "+0.14",
    type: "positive",
  },
  { label: "BMI: 26.4", value: 31, amount: "+0.08", type: "positive" },
  {
    label: "Physical activity: Yes",
    value: 48,
    amount: "−0.12",
    type: "negative",
  },
  { label: "Heart disease: No", value: 38, amount: "−0.10", type: "negative" },
  { label: "Smoking: Never", value: 28, amount: "−0.07", type: "negative" },
]

function ExplainabilityView() {
  const [tab, setTab] = useState<"local" | "global">("local")
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Explainable AI</span>
          <h1>Understand model behavior</h1>
          <p>
            Inspect which features influenced an individual output or broader
            model patterns.
          </p>
        </div>
        <span className="page-heading__badge">
          <Icon name="spark" size={15} /> SHAP explanations
        </span>
      </div>
      <div className="tabs">
        <button
          className={tab === "local" ? "active" : ""}
          onClick={() => setTab("local")}
        >
          Local explanation
        </button>
        <button
          className={tab === "global" ? "active" : ""}
          onClick={() => setTab("global")}
        >
          Global explanation
        </button>
      </div>
      <div className="explain-grid">
        <div className="dash-panel shap-panel">
          <div className="dash-panel__head">
            <div>
              <h3>
                {tab === "local"
                  ? "Feature contribution for this record"
                  : "Mean feature importance across records"}
              </h3>
              <p>
                {tab === "local"
                  ? "Positive values push toward class 1; negative values push toward class 0."
                  : "Average absolute contribution in the demonstration model."}
              </p>
            </div>
            <button className="download-button">
              <Icon name="file" size={16} /> Export
            </button>
          </div>
          <div className="shap-legend">
            <span>
              <i className="legend-positive" /> Pushes toward class 1
            </span>
            <span>
              <i className="legend-negative" /> Pushes toward class 0
            </span>
          </div>
          <div className="shap-chart">
            {shapData.map((item) => (
              <div className="shap-row" key={item.label}>
                <span>{item.label}</span>
                <div className={`shap-track shap-track--${item.type}`}>
                  <i
                    style={{
                      width: `${
                        tab === "global"
                          ? Math.min(item.value + 8, 96)
                          : item.value
                      }%`,
                    }}
                  />
                </div>
                <b>
                  {tab === "global"
                    ? (item.value / 100).toFixed(2)
                    : item.amount}
                </b>
              </div>
            ))}
          </div>
          <div className="shap-axis">
            <span>Lower influence</span>
            <span>Higher influence</span>
          </div>
        </div>
        <aside>
          <div className="dash-panel explanation-summary">
            <span className="explanation-summary__icon">
              <Icon name="brain" size={27} />
            </span>
            <h3>How to interpret this</h3>
            <p>
              {tab === "local"
                ? "The strongest upward contribution in this example came from the selected general health response. Physical activity and no reported heart disease contributed in the opposite direction."
                : "General health and age-related features have larger average influence in this illustrative view, but influence does not establish causation."}
            </p>
            <div className="explanation-summary__note">
              <Icon name="info" size={16} /> SHAP describes a model’s
              calculations. It does not prove clinical importance or causality.
            </div>
          </div>
          <div className="dash-panel output-card">
            <span>Base model output</span>
            <b>0.11</b>
            <i>
              <em className="bar-width-11" />
            </i>
            <span>Output after contributions</span>
            <b>0.18</b>
            <i>
              <em className="bar-width-18" />
            </i>
          </div>
        </aside>
      </div>
      <div className="contribution-grid">
        <div className="dash-panel">
          <div className="contribution-grid__head contribution-grid__head--positive">
            <span>
              <Icon name="arrow-right" size={18} />
            </span>
            <div>
              <h3>Positive contributions</h3>
              <p>Features pushing toward class 1</p>
            </div>
          </div>
          <ul>
            {shapData
              .filter((item) => item.type === "positive")
              .slice(0, 3)
              .map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <b>{item.amount}</b>
                </li>
              ))}
          </ul>
        </div>
        <div className="dash-panel">
          <div className="contribution-grid__head contribution-grid__head--negative">
            <span>
              <Icon name="arrow-right" size={18} />
            </span>
            <div>
              <h3>Negative contributions</h3>
              <p>Features pushing toward class 0</p>
            </div>
          </div>
          <ul>
            {shapData
              .filter((item) => item.type === "negative")
              .slice(0, 3)
              .map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <b>{item.amount}</b>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {tab === "local" && (
        <div className="dash-panel waterfall-panel">
          <div className="dash-panel__head">
            <div>
              <h3>Individual SHAP waterfall</h3>
              <p>
                Illustrative path from the base value to this record’s model
                output.
              </p>
            </div>
            <span className="mini-tag">Local record</span>
          </div>
          <div className="waterfall-chart">
            <div className="waterfall-axis">
              <span>0.00</span>
              <span>0.10</span>
              <span>0.20</span>
              <span>0.30</span>
              <span>0.40</span>
            </div>
            {[
              ["Base value", "waterfall-base", "0.11"],
              [
                "General health",
                "waterfall-positive waterfall-offset-1",
                "+0.24",
              ],
              ["Age band", "waterfall-positive waterfall-offset-2", "+0.18"],
              [
                "Physical activity",
                "waterfall-negative waterfall-offset-3",
                "−0.12",
              ],
              [
                "Heart disease",
                "waterfall-negative waterfall-offset-4",
                "−0.10",
              ],
              ["Model output", "waterfall-output waterfall-offset-5", "0.18"],
            ].map(([label, className, value]) => (
              <div className="waterfall-row" key={label}>
                <span>{label}</span>
                <div>
                  <i className={className} />
                  <b>{value}</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function AnalyticsView() {
  const models = [
    {
      name: "Logistic regression",
      accuracy: "0.78",
      precision: "0.41",
      recall: "0.67",
      f1: "0.51",
      auc: "0.81",
    },
    {
      name: "Random forest",
      accuracy: "0.82",
      precision: "0.48",
      recall: "0.63",
      f1: "0.55",
      auc: "0.84",
    },
    {
      name: "XGBoost",
      accuracy: "0.83",
      precision: "0.51",
      recall: "0.69",
      f1: "0.59",
      auc: "0.86",
    },
    {
      name: "TabNet",
      accuracy: "0.81",
      precision: "0.49",
      recall: "0.72",
      f1: "0.58",
      auc: "0.85",
    },
  ]
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Model analytics</span>
          <h1>Compare model performance</h1>
          <p>
            Illustrative metrics demonstrate how multiple evaluation views can
            support model selection.
          </p>
        </div>
        <select className="model-select">
          <option>Validation split</option>
          <option>Test split</option>
        </select>
      </div>
      <div className="metric-grid metric-grid--five">
        <MetricCard
          icon="target"
          label="Accuracy"
          value="0.83"
          note="Best: XGBoost"
        />
        <MetricCard
          icon="check"
          label="Precision"
          value="0.51"
          note="Best: XGBoost"
          tone="teal"
        />
        <MetricCard
          icon="pulse"
          label="Recall"
          value="0.72"
          note="Best: TabNet"
          tone="violet"
        />
        <MetricCard
          icon="model"
          label="F1-score"
          value="0.59"
          note="Best: XGBoost"
          tone="coral"
        />
        <MetricCard
          icon="chart"
          label="ROC-AUC"
          value="0.86"
          note="Best: XGBoost"
          tone="blue"
        />
      </div>
      <div className="analytics-grid">
        <div className="dash-panel comparison-chart">
          <div className="dash-panel__head">
            <div>
              <h3>Model comparison</h3>
              <p>Selected metrics by model</p>
            </div>
            <div className="chart-legend">
              <span>
                <i /> F1
              </span>
              <span>
                <i /> ROC-AUC
              </span>
            </div>
          </div>
          <div className="grouped-bars">
            {models.map((model) => (
              <div key={model.name}>
                <div className="grouped-bars__plot">
                  <i style={{ height: `${Number(model.f1) * 100}%` }} />
                  <i style={{ height: `${Number(model.auc) * 100}%` }} />
                </div>
                <span>{model.name.replace("Logistic ", "Log. ")}</span>
              </div>
            ))}
          </div>
          <div className="chart-scale">
            <span>1.0</span>
            <span>0.8</span>
            <span>0.6</span>
            <span>0.4</span>
            <span>0.2</span>
            <span>0.0</span>
          </div>
        </div>
        <div className="dash-panel matrix-panel">
          <div className="dash-panel__head">
            <div>
              <h3>Confusion matrix</h3>
              <p>Illustrative TabNet validation outputs</p>
            </div>
            <span className="mini-tag">TabNet</span>
          </div>
          <div className="matrix">
            <span className="matrix__ylabel">Actual class</span>
            <div className="matrix__cells">
              <div className="matrix__strong">
                <b>7,842</b>
                <span>True negative</span>
              </div>
              <div>
                <b>1,264</b>
                <span>False positive</span>
              </div>
              <div>
                <b>216</b>
                <span>False negative</span>
              </div>
              <div className="matrix__medium">
                <b>558</b>
                <span>True positive</span>
              </div>
            </div>
            <span className="matrix__xlabel">Predicted class</span>
          </div>
        </div>
      </div>
      <div className="curve-grid">
        <div className="dash-panel curve-panel">
          <div className="dash-panel__head">
            <div>
              <h3>ROC curve</h3>
              <p>Illustrative true-positive versus false-positive rates</p>
            </div>
            <span className="mini-tag">Sample data</span>
          </div>
          <svg
            viewBox="0 0 420 190"
            role="img"
            aria-label="Illustrative ROC curve"
          >
            <path
              className="curve-gridline"
              d="M40 20v140h350M40 125h350M40 90h350M40 55h350M110 20v140M180 20v140M250 20v140M320 20v140"
            />
            <path className="curve-baseline" d="M40 160 390 20" />
            <path
              className="curve-line curve-line--roc"
              d="M40 160 C65 100 92 65 135 48 S230 29 390 20"
            />
            <text x="205" y="185">
              False positive rate
            </text>
            <text x="12" y="100" transform="rotate(-90 12 100)">
              True positive rate
            </text>
          </svg>
        </div>
        <div className="dash-panel curve-panel">
          <div className="dash-panel__head">
            <div>
              <h3>Precision–Recall curve</h3>
              <p>Illustrative precision across recall thresholds</p>
            </div>
            <span className="mini-tag">Sample data</span>
          </div>
          <svg
            viewBox="0 0 420 190"
            role="img"
            aria-label="Illustrative precision recall curve"
          >
            <path
              className="curve-gridline"
              d="M40 20v140h350M40 125h350M40 90h350M40 55h350M110 20v140M180 20v140M250 20v140M320 20v140"
            />
            <path
              className="curve-line curve-line--pr"
              d="M40 36 C105 39 132 50 180 67 S275 105 390 146"
            />
            <text x="225" y="185">
              Recall
            </text>
            <text x="12" y="100" transform="rotate(-90 12 100)">
              Precision
            </text>
          </svg>
        </div>
      </div>
      <div className="dash-panel table-panel">
        <div className="dash-panel__head">
          <div>
            <h3>Detailed comparison</h3>
            <p>
              Placeholder values for interface demonstration—not published
              research results.
            </p>
          </div>
          <button className="download-button">
            <Icon name="file" size={16} /> Export CSV
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Accuracy</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1-score</th>
                <th>ROC-AUC</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model, index) => (
                <tr key={model.name}>
                  <td>
                    <span className={`model-dot model-dot--${index}`} />
                    {model.name}
                    {index === 2 && <small>Best overall</small>}
                  </td>
                  <td>{model.accuracy}</td>
                  <td>{model.precision}</td>
                  <td>{model.recall}</td>
                  <td>{model.f1}</td>
                  <td>{model.auc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const initialAssessmentRecords: AssessmentRecord[] = [
  {
    id: "NSA-DEMO-1048",
    date: "May 24, 2025 · 10:42",
    summary: "Illustrative sample · Class 0",
    classification: "Illustrative sample classification — Class 0",
    probability: "Not available",
    model: "Not connected",
    threshold: "Not available",
    answers: {},
    illustrative: true,
  },
  {
    id: "NSA-DEMO-1047",
    date: "May 22, 2025 · 14:18",
    summary: "Illustrative sample · Class 1",
    classification: "Illustrative sample classification — Class 1",
    probability: "Not available",
    model: "Not connected",
    threshold: "Not available",
    answers: {},
    illustrative: true,
  },
  {
    id: "NSA-DEMO-1046",
    date: "May 19, 2025 · 09:05",
    summary: "Illustrative sample · Unavailable",
    classification: "Illustrative sample classification — not connected",
    probability: "Not available",
    model: "Not connected",
    threshold: "Not available",
    answers: {},
    illustrative: true,
  },
]

function AssessmentHistory({
  records,
  onOpen,
  onNew,
}: {
  records: AssessmentRecord[]
  onOpen: (record: AssessmentRecord) => void
  onNew: () => void
}) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All results")
  const visible = records.filter((assessment) => {
    const matchesQuery =
      assessment.id.toLowerCase().includes(query.toLowerCase()) ||
      assessment.summary.toLowerCase().includes(query.toLowerCase())
    const matchesFilter =
      filter === "All results" || assessment.summary.includes(filter)
    return matchesQuery && matchesFilter
  })

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Assessment history</span>
          <h1>Review previous assessments</h1>
          <p>
            Illustrative sample records for frontend demonstration only. No
            personal data is stored.
          </p>
        </div>
        <Button onClick={onNew}>
          New assessment <Icon name="arrow-right" size={16} />
        </Button>
      </div>
      <div className="history-stats">
        <MetricCard
          icon="file"
          label="Visible assessments"
          value={String(records.length)}
          note="Illustrative records"
        />
        <MetricCard
          icon="target"
          label="Most recent"
          value={records[0]?.id || "—"}
          note={records[0]?.date || "No records"}
          tone="teal"
        />
        <MetricCard
          icon="model"
          label="Inference status"
          value="Not connected"
          note="Frontend prototype"
          tone="violet"
        />
      </div>
      <div className="dash-panel history-panel">
        <div className="history-toolbar">
          <div className="history-search">
            <Icon name="search" size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search assessment ID or result"
            />
          </div>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option>All results</option>
            <option>Class 0</option>
            <option>Class 1</option>
          </select>
        </div>
        <div className="table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th>Assessment ID</th>
                <th>Date</th>
                <th>Result summary</th>
                <th>Score / probability</th>
                <th>Model</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((assessment) => (
                <tr key={assessment.id}>
                  <td>
                    <span className="assessment-id">
                      <Icon name="file" size={15} />
                      {assessment.id}
                    </span>
                  </td>
                  <td>{assessment.date}</td>
                  <td>
                    <span
                      className={`result-pill ${
                        assessment.summary.includes("Class 1")
                          ? "result-pill--alert"
                          : ""
                      }`}
                    >
                      <i />
                      {assessment.summary}
                    </span>
                  </td>
                  <td>
                    <b>{assessment.probability}</b>
                  </td>
                  <td>{assessment.model}</td>
                  <td>
                    <button
                      className="view-details"
                      onClick={() => onOpen(assessment)}
                    >
                      View details <Icon name="chevron" size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visible.length === 0 && (
            <div className="history-empty">
              <Icon name="search" size={24} />
              <b>No assessments found</b>
              <span>Try a different search or filter.</span>
            </div>
          )}
        </div>
        <div className="history-footer">
          <span>
            Showing {visible.length} of {records.length} illustrative
            assessments
          </span>
          <div>
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button disabled>Next</button>
          </div>
        </div>
      </div>
      <div className="disclaimer-banner disclaimer-banner--strong">
        <Icon name="info" size={21} />
        <p>
          <b>Retrospective target</b>These sample summaries refer to BRFSS
          CVDSTRK3 self-reported prior stroke history, not a prediction of
          future stroke incidence.
        </p>
      </div>
    </>
  )
}

function Dashboard({ navigate }: { navigate: (view: AppView) => void }) {
  const [page, setPage] = useState<DashboardView>("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [assessmentAnswers, setAssessmentAnswers] = useState<AssessmentAnswers>(
    {},
  )
  const [assessmentRecords, setAssessmentRecords] =
    useState<AssessmentRecord[]>(initialAssessmentRecords)
  const [selectedAssessment, setSelectedAssessment] =
    useState<AssessmentRecord>(initialAssessmentRecords[0])
  const [openAssessmentReview, setOpenAssessmentReview] = useState(false)

  const go = (next: DashboardView) => {
    setPage(next)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const submitAssessment = (answers: AssessmentAnswers) => {
    const now = new Date()
    const record: AssessmentRecord = {
      id: `NSA-DEMO-${1050 + assessmentRecords.length}`,
      date: now.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      summary: "Illustrative sample · Class 0",
      classification: "Illustrative sample classification — Class 0",
      probability: "Not available",
      model: "Not connected",
      threshold: "Not available",
      answers,
      illustrative: true,
    }
    setAssessmentAnswers(answers)
    setAssessmentRecords((records) => [record, ...records])
    setSelectedAssessment(record)
    setOpenAssessmentReview(false)
    go("results")
  }

  const openHistoryRecord = (record: AssessmentRecord) => {
    setSelectedAssessment(record)
    if (Object.keys(record.answers).length) setAssessmentAnswers(record.answers)
    go("results")
  }

  const startNewAssessment = () => {
    setAssessmentAnswers({})
    setOpenAssessmentReview(false)
    go("prediction")
  }

  return (
    <div className="dashboard-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <Logo inverse />
          <button
            className="sidebar__close"
            onClick={() => setSidebarOpen(false)}
          >
            <Icon name="x" />
          </button>
        </div>
        <div className="sidebar__workspace">
          <span>RESEARCH WORKSPACE</span>
          <div>
            <i>NS</i>
            <p>
              <b>Stroke analysis</b>BRFSS study
            </p>
            <Icon name="chevron" size={14} />
          </div>
        </div>
        <nav>
          <span className="sidebar__label">PLATFORM</span>
          {dashboardNav.map((item) => (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => go(item.id)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {page === item.id && <i />}
            </button>
          ))}
        </nav>
        <div className="sidebar__support">
          <div>
            <span>
              <Icon name="spark" size={18} />
            </span>
            <p>
              <b>Need a prior result?</b>Browse illustrative assessment records
              and reopen their details.
            </p>
            <button onClick={() => go("history")}>
              View assessment history
            </button>
          </div>
        </div>
        <div className="sidebar__profile">
          <span>AR</span>
          <p>
            <b>Alex Rivera</b>Research member
          </p>
          <button onClick={() => navigate("public")} aria-label="Log out">
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </aside>
      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}
      <div className="dashboard-main">
        <header className="dash-topbar">
          <div>
            <button
              className="dash-topbar__menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Icon name="menu" />
            </button>
            <div className="dash-breadcrumb">
              <span>NeuroShield AI</span>
              <Icon name="chevron" size={13} />
              <b>{dashboardNav.find((item) => item.id === page)?.label}</b>
            </div>
          </div>
          <div className="dash-topbar__actions">
            <span className="model-status">
              <i /> Prototype mode
            </span>
            <button className="icon-button">
              <Icon name="search" size={19} />
            </button>
            <button className="topbar-avatar">AR</button>
          </div>
        </header>
        <main className="dashboard-content">
          {page === "home" && <DashboardHome setPage={go} />}
          {page === "prediction" && (
            <PredictionView
              initialAnswers={assessmentAnswers}
              startInReview={openAssessmentReview}
              onReviewOpened={() => setOpenAssessmentReview(false)}
              onSubmit={submitAssessment}
            />
          )}
          {page === "results" && (
            <ResultsView
              record={selectedAssessment}
              setPage={go}
              onViewAssessment={() => {
                setAssessmentAnswers(selectedAssessment.answers)
                setOpenAssessmentReview(true)
                go("prediction")
              }}
            />
          )}
          {page === "explainability" && <ExplainabilityView />}
          {page === "analytics" && <AnalyticsView />}
          {page === "history" && (
            <AssessmentHistory
              records={assessmentRecords}
              onOpen={openHistoryRecord}
              onNew={startNewAssessment}
            />
          )}
        </main>
        <footer className="dash-footer">
          <span>NeuroShield AI · Research interface</span>
          <span>Not for clinical use</span>
        </footer>
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<AppView>("public")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  if (view === "login" || view === "signup")
    return <AuthScreen mode={view} navigate={setView} />
  if (view === "dashboard") return <Dashboard navigate={setView} />
  return <PublicWebsite navigate={setView} />
}
