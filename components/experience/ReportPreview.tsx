import { Check } from "lucide-react";
import { Logo, LogoMark } from "@/components/ui/Logo";
import styles from "./ReportPreview.module.css";

const evidence = [
  "AI use & purpose",
  "Risk & impact assessment",
  "Ownership & review",
];

export function ReportPreview() {
  return (
    <figure
      id="transparency-report-preview"
      className={styles.preview}
      aria-labelledby="report-caption"
    >
      <div className={styles.stage}>
        <div className={styles.cover} aria-hidden="true">
          <LogoMark className={styles.coverMark} />
          <span className={styles.coverLabel}>AI governance</span>
          <svg className={styles.coverLines} viewBox="0 0 240 320" fill="none">
            <path d="M-80 280 120 80 320 280M-80 240 120 40 320 240M-80 200 120 0 320 200M-80 160 120-40 320 160" />
            <path d="M-80 280 120 120 320 280M-80 320 120 160 320 320" />
          </svg>
          <span className={styles.coverFooter}>OFFICE &amp; CLOUD</span>
        </div>
        <div className={styles.sheetBack} aria-hidden="true" />
        <div className={styles.sheetMiddle} aria-hidden="true" />

        <div className={styles.paper}>
          <div className={styles.masthead}>
            <Logo surface="light" className={styles.reportLogo} />
            <span>AI GOVERNANCE</span>
          </div>
          <div className={styles.brandRule} aria-hidden="true" />

          <h3 className={styles.title}>
            AI transparency
            <br />
            report<span>.</span>
          </h3>
          <p className={styles.subject}>Customer Success AI</p>

          <div className={styles.sectionTitle}>
            <span>Executive overview</span>
            <span aria-hidden="true">01</span>
          </div>
          <div className={styles.assessment}>
            <div>
              <span className={styles.fieldLabel}>Risk tier</span>
              <strong className={styles.risk}>
                <span aria-hidden="true" />
                Medium
              </strong>
            </div>
            <div>
              <span className={styles.fieldLabel}>Assessment</span>
              <strong className={styles.complete}>
                <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                Complete
              </strong>
            </div>
          </div>

          <dl className={styles.accountability}>
            <div>
              <dt>Human owner</dt>
              <dd>Customer Success lead</dd>
            </div>
            <div>
              <dt>Next review</dt>
              <dd>4 Dec</dd>
            </div>
          </dl>

          <p className={styles.evidenceTitle}>Evidence in this report</p>
          <ol className={styles.evidenceIndex}>
            {evidence.map((label, index) => (
              <li key={label}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{label}</span>
              </li>
            ))}
          </ol>

          <div className={styles.folio}>
            <span>AI Registry + risk &amp; impact assessment</span>
            <span aria-hidden="true">01</span>
          </div>
        </div>
      </div>
      <figcaption id="report-caption" className={styles.caption}>
        <span aria-hidden="true" />
        Clear ownership. Documented risk. Ready to share.
      </figcaption>
    </figure>
  );
}
