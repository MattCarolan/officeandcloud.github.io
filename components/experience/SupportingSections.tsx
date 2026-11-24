import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  FileText,
  Laptop,
  Monitor,
  Terminal,
} from "lucide-react";
import { APP_SIGN_IN_URL } from "@/lib/config";
import styles from "./SupportingSections.module.css";

const expenditure = [
  { team: "Engineering", amount: 840, color: "#a46aff" },
  { team: "Customer Success", amount: 490, color: "#19d4e6" },
  { team: "Product", amount: 340, color: "#00b9d7" },
];
const recordedTotal = expenditure.reduce(
  (total, item) => total + item.amount,
  0,
);

const questions = [
  {
    question: "Which AI tools can I discover?",
    answer:
      "Discover supported AI apps on enrolled devices and register the AI agents and apps your teams use. Bring their purpose, accountable owner and review date together in one AI Registry.",
  },
  {
    question: "How can I keep AI costs under control?",
    answer:
      "Record AI expenses, review licences, estimate token costs and set budget alerts. See recorded spending by team in the expenditure dashboard and use that visibility to plan your AI budget.",
  },
  {
    question: "How can I set boundaries for AI use?",
    answer:
      "Apply website and AI app policies on supported devices. Give teams editable governance templates, assign accountable owners and use risk and impact assessments to guide your AI decisions.",
  },
  {
    question: "What can I share with stakeholders?",
    answer:
      "Export policy templates as PDFs and generate transparency reports from AI Registry records and completed risk and impact assessments. Give stakeholders a clear account of your AI use, ownership and governance.",
  },
  {
    question: "How do I get started?",
    answer:
      "Request preview access, then start with an enrolled device or an AI use your team already knows about. Add an accountable owner and build out the policies, risk reviews and cost records around your AI workforce.",
  },
];

export function SupportingSections() {
  return (
    <div className={styles.supporting}>
      <section
        className={styles.editorial}
        aria-labelledby="accountability-heading"
      >
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>HR and payroll for AI agents</p>
          <h2 id="accountability-heading" className={styles.statement}>
            Set the policies.
            <br />
            <span>Know the cost.</span>
          </h2>
          <div className={styles.architecture} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section
        className={styles.evidenceSection}
        aria-label="AI spend and governance evidence"
      >
        <div className={`${styles.wrap} ${styles.evidenceGrid}`}>
          <article className={styles.spend} aria-labelledby="spend-heading">
            <div className={styles.sectionLabel}>
              <span className={styles.eyebrow}>AI economics</span>
            </div>
            <h2 id="spend-heading" className={styles.sectionHeading}>
              See the spend.
            </h2>
            <p className={styles.description}>
              Understand what your AI workforce costs. Record expenses, review
              licences, estimate token costs and set budget alerts.
            </p>

            <div className={styles.expenditure}>
              <p className={styles.metricLabel}>Recorded expenditure</p>
              <p className={styles.total}>
                <span>CAD</span> {recordedTotal.toLocaleString("en-CA")}
              </p>
              <ul
                className={styles.bars}
                aria-label="Recorded expenditure by team"
              >
                {expenditure.map(({ team, amount, color }) => (
                  <li key={team}>
                    <div className={styles.barLabel}>
                      <span>{team}</span>
                      <span>CAD {amount.toLocaleString("en-CA")}</span>
                    </div>
                    <div className={styles.track} aria-hidden="true">
                      <span
                        style={
                          {
                            "--bar-width": `${(amount / recordedTotal) * 100}%`,
                            "--bar-color": color,
                          } as CSSProperties
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <a className={styles.textLink} href="#ai-economics">
              Explore AI economics <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </article>

          <article className={styles.reports} aria-labelledby="reports-heading">
            <div className={styles.sectionLabel}>
              <span className={styles.eyebrow}>Reports</span>
            </div>
            <h2 id="reports-heading" className={styles.sectionHeading}>
              Show the evidence.
            </h2>
            <p className={styles.description}>
              Document the oversight around your AI agents and apps. Build
              shareable transparency reports from registry records and completed
              risk and impact assessments.
            </p>

            <figure
              className={styles.reportStage}
              aria-labelledby="report-caption"
            >
              <div className={styles.reportBack} aria-hidden="true" />
              <div className={styles.reportPaper}>
                <div className={styles.reportTitle}>
                  <FileText size={23} strokeWidth={1.6} aria-hidden="true" />
                  <span>AI transparency report</span>
                </div>
                <p className={styles.reportUse}>Customer Success AI</p>
                <dl className={styles.reportFields}>
                  <div>
                    <dt>Registry record</dt>
                    <dd>AI use &amp; purpose</dd>
                  </div>
                  <div>
                    <dt>Assessment</dt>
                    <dd>Risk &amp; impact</dd>
                  </div>
                  <div>
                    <dt>Human owner</dt>
                    <dd>Customer Success lead</dd>
                  </div>
                  <div>
                    <dt>Review</dt>
                    <dd>Recorded review date</dd>
                  </div>
                </dl>
                <div className={styles.reportFooter}>
                  <span>Office &amp; Cloud</span>
                </div>
              </div>
              <figcaption id="report-caption" className={styles.srOnly}>
                AI transparency report for Customer Success AI,
                combining an AI agent record, risk and impact assessment, human
                owner and review date.
              </figcaption>
            </figure>

            <ul className={styles.reportLinks}>
              <li>
                <a href="#governance">
                  <Check size={15} aria-hidden="true" />
                  Editable policy templates
                </a>
              </li>
              <li>
                <a href="#risk-security">
                  <Check size={15} aria-hidden="true" />
                  Guided risk and impact assessments
                </a>
              </li>
              <li>
                <a href="#risk-security">
                  <Check size={15} aria-hidden="true" />
                  Shareable transparency reports
                </a>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section
        className={styles.practical}
        aria-label="Device support and common questions"
      >
        <div className={`${styles.wrap} ${styles.practicalGrid}`}>
          <div id="device-agents" className={styles.devices}>
            <p className={styles.eyebrow}>Connected to your devices</p>
            <h2 className={styles.deviceHeading}>Start where AI is used.</h2>
            <p className={styles.description}>
              Enrol devices to discover supported AI apps and apply supported
              policies. Record who is accountable for each AI agent or app and
              how it is used.
            </p>
            <ul
              className={styles.platforms}
              aria-label="Available device agent platforms"
            >
              <li>
                <Monitor size={18} aria-hidden="true" />
                <span>Windows</span>
              </li>
              <li>
                <Laptop size={18} aria-hidden="true" />
                <span>macOS</span>
                <span className={styles.beta}>Beta</span>
              </li>
              <li>
                <Terminal size={18} aria-hidden="true" />
                <span>Linux</span>
                <span className={styles.beta}>Beta</span>
              </li>
            </ul>
            <p className={styles.platformNote}>
              Capabilities vary by platform.
            </p>
            <a className={styles.textLink} href={APP_SIGN_IN_URL}>
              Manage device agents <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div id="faq" className={styles.faq}>
            <h2 className={styles.faqHeading}>Common questions</h2>
            <div className={styles.questions}>
              {questions.map(({ question, answer }) => (
                <details key={question} className={styles.question}>
                  <summary>
                    <span>{question}</span>
                    <ChevronDown size={19} aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
