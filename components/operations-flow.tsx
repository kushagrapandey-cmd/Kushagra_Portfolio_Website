const steps = ["Alert", "Investigate", "Validate", "Troubleshoot", "Document", "Escalate / resolve"];

export function OperationsFlow() {
  return (
    <ol className="operations-flow" aria-label="Typical L1 operational workflow">
      {steps.map((step, index) => (
        <li key={step}>
          <span className="flow-index">{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
          {index < steps.length - 1 ? <span className="flow-arrow" aria-hidden="true">→</span> : null}
        </li>
      ))}
    </ol>
  );
}
