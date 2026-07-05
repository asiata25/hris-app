export function LoadingSkeleton() {
  return (
    <div className="overflow-x-auto rounded-md border border-ink-muted/10 bg-surface-raised">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-ink-muted/10 bg-surface/50 text-[11px] font-bold text-ink-muted tracking-wider uppercase">
            <th className="px-4 py-3.5 font-display">Employee</th>
            <th className="px-4 py-3.5 font-display">Department</th>
            <th className="px-4 py-3.5 font-display">Contact</th>
            <th className="px-4 py-3.5 font-display text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-muted/10 animate-pulse">
          {Array.from({ length: 6 }).map((_, idx) => (
            <tr key={idx} className="bg-surface-raised/40">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-ink-muted/10" />
                  <div className="space-y-1.5 flex-1 max-w-30">
                    <div className="h-3 bg-ink-muted/10 rounded-sm w-3/4" />
                    <div className="h-2 bg-ink-muted/10 rounded-sm w-1/2" />
                  </div>
                </div>
              </td>
              <td className="px-4 py-2.5">
                <div className="h-3.5 bg-ink-muted/10 rounded-sm w-20" />
              </td>
              <td className="px-4 py-2.5">
                <div className="h-3 bg-ink-muted/10 rounded-sm w-32" />
              </td>
              <td className="px-4 py-2.5 text-right flex justify-end">
                <div className="h-5 bg-ink-muted/10 rounded-sm w-16" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
