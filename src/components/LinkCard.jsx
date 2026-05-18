export default function LinkCard({ label, url }) {
  return (
    <a
      className="link-card"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="link-card__label">{label}</span>
      <span className="link-card__icon" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
