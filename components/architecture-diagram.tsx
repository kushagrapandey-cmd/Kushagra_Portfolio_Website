type ArchitectureDiagramProps = {
  nodes: readonly string[];
  label: string;
};

export function ArchitectureDiagram({ nodes, label }: ArchitectureDiagramProps) {
  return (
    <div className="architecture-diagram" role="img" aria-label={`${label}: ${nodes.join(" to ")}`}>
      {nodes.map((node, index) => (
        <div className="architecture-segment" key={node}>
          <div className="architecture-node">
            <span className="node-index">{String(index + 1).padStart(2, "0")}</span>
            <strong>{node}</strong>
          </div>
          {index < nodes.length - 1 ? <div className="architecture-connector" aria-hidden="true"><span>↓</span></div> : null}
        </div>
      ))}
    </div>
  );
}
