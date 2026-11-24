import styles from "./PlatformSupport.module.css";

const operatingSystems = [
  { name: "Windows", asset: "windows" },
  { name: "macOS", asset: "apple" },
  { name: "Linux", asset: "linux" },
];

const browsers = [
  { name: "Chrome", asset: "chrome" },
  { name: "Edge", asset: "edge" },
  { name: "Firefox", asset: "firefox" },
  { name: "Safari", asset: "safari" },
];

export function PlatformSupport({
  includeBrowsers = false,
}: {
  includeBrowsers?: boolean;
}) {
  return (
    <div className={styles.platformSupport}>
      <ul className={styles.operatingSystems} aria-label="Supported operating systems">
        {operatingSystems.map(({ name, asset }) => (
          <li key={asset}>
            <img
              src={`/brand/platforms/${asset}.svg`}
              width="30"
              height="30"
              alt=""
              aria-hidden="true"
            />
            <span>{name}</span>
          </li>
        ))}
      </ul>
      {includeBrowsers && (
        <ul className={styles.browsers} aria-label="Web app browsers">
          {browsers.map(({ name, asset }) => (
            <li key={asset}>
              <img
                src={`/brand/platforms/${asset}.svg`}
                width="28"
                height="28"
                alt=""
                aria-hidden="true"
              />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
