export default function ValidationCallout({ children }) {
  return (
    <div className="callout">
      <span className="callout__label">Before you commit</span>
      <div className="callout__body">{children}</div>
    </div>
  );
}
