interface TableHeaderProps {
  headers: string[];
}

export function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead>
      <tr className="border-b border-ink-muted/10 bg-surface/50 text-[11px] font-bold text-ink-muted tracking-wider uppercase">
        {headers.map((header, idx) => (
          <th
            key={header}
            className={`px-4 py-3.5 font-display select-none ${
              idx === headers.length - 1 ? "text-right" : "text-left"
            }`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
