/**
 * ARKA OS — VS Code Markdown Documentation Previewer
 * 
 * Renders rich documentation from README.md files:
 * - GitHub/VS Code Dark preview styling
 * - Clean tables, headings, lists, badges, and code blocks
 * - Anti-Copy, Anti-Select, and Anti-Inspection protection
 */

import React from 'react';

interface MarkdownDocumentViewerProps {
  content: string;
  fileName: string;
}

export const MarkdownDocumentViewer: React.FC<MarkdownDocumentViewerProps> = ({
  content,
  fileName,
}) => {
  // Simple, robust Markdown parser that renders headings, tables, code blocks, lists, blockquotes, and text
  const renderMarkdown = () => {
    const rawLines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    const handleCopy = (e: React.ClipboardEvent) => {
      e.preventDefault();
      e.clipboardData.setData('text/plain', 'Arkasnata Pal Portfolio — Documentation Protected.');
    };

    while (i < rawLines.length) {
      const line = rawLines[i];
      const trimmed = line.trim();

      // Empty line
      if (!trimmed) {
        i++;
        continue;
      }

      // Fenced Code Block ```
      if (trimmed.startsWith('```')) {
        const lang = trimmed.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < rawLines.length && !rawLines[i].trim().startsWith('```')) {
          codeLines.push(rawLines[i]);
          i++;
        }
        i++; // skip closing ```

        elements.push(
          <div key={`code-${i}`} className="my-4 rounded-lg overflow-hidden border border-white/10 bg-[#18181b] shadow-lg">
            {lang && (
              <div className="bg-[#242427] px-3 py-1 text-[11px] font-mono text-slate-400 border-b border-white/5 flex justify-between items-center">
                <span>{lang.toUpperCase()}</span>
                <span className="text-[10px] text-slate-500">🔒 Protected View</span>
              </div>
            )}
            <pre className="p-3.5 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed whitespace-pre select-none">
              {codeLines.join('\n')}
            </pre>
          </div>
        );
        continue;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${i}`} className="text-2xl font-bold text-white mt-6 mb-3 pb-2 border-b border-white/10 flex items-center gap-2">
            <span>📄</span>
            <span>{trimmed.slice(2)}</span>
          </h1>
        );
        i++;
        continue;
      }

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-xl font-bold text-[#e95420] mt-6 mb-2.5 pb-1 border-b border-white/5">
            {trimmed.slice(3)}
          </h2>
        );
        i++;
        continue;
      }

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-base font-semibold text-cyan-400 mt-4 mb-2">
            {trimmed.slice(4)}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal Rule ---
      if (trimmed === '---' || trimmed === '***') {
        elements.push(<hr key={`hr-${i}`} className="my-6 border-white/10" />);
        i++;
        continue;
      }

      // Markdown Table: lines starting and containing |
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const tableLines: string[] = [];
        while (i < rawLines.length && rawLines[i].trim().startsWith('|') && rawLines[i].trim().endsWith('|')) {
          tableLines.push(rawLines[i].trim());
          i++;
        }

        if (tableLines.length >= 2) {
          const headerCols = tableLines[0]
            .slice(1, -1)
            .split('|')
            .map(c => c.trim());
          
          // Row 1 is divider (| --- | --- |)
          const bodyRows = tableLines.slice(2).map(rowStr =>
            rowStr
              .slice(1, -1)
              .split('|')
              .map(c => c.trim())
          );

          elements.push(
            <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-lg border border-white/10 shadow-md">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-[#242427] text-white border-b border-white/10">
                    {headerCols.map((col, cIdx) => (
                      <th key={cIdx} className="px-3.5 py-2.5 font-bold tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bodyRows.map((rCols, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-[#18181b]/70 hover:bg-white/5' : 'bg-[#1e1e24]/70 hover:bg-white/5'}>
                      {rCols.map((cVal, cIdx) => (
                        <td key={cIdx} className="px-3.5 py-2 text-slate-300 font-mono text-[11px]">
                          {cVal.startsWith('`') && cVal.endsWith('`') ? (
                            <code className="px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 border border-white/5">
                              {cVal.slice(1, -1)}
                            </code>
                          ) : (
                            cVal
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // Bullet List (- or *)
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const listItems: string[] = [];
        while (i < rawLines.length && (rawLines[i].trim().startsWith('- ') || rawLines[i].trim().startsWith('* '))) {
          listItems.push(rawLines[i].trim().slice(2));
          i++;
        }

        elements.push(
          <ul key={`ul-${i}`} className="list-disc ml-6 my-3 space-y-1.5 text-xs text-slate-300 leading-relaxed font-sans">
            {listItems.map((item, idx) => (
              <li key={idx}>
                {item.replace(/\*\*(.*?)\*\*/g, '$1')}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Blockquote >
      if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={`bq-${i}`} className="border-l-4 border-[#e95420] pl-4 py-1 my-3 bg-[#e95420]/5 text-xs text-slate-300 italic">
            {trimmed.slice(2)}
          </blockquote>
        );
        i++;
        continue;
      }

      // Regular Paragraph
      elements.push(
        <p key={`p-${i}`} className="my-2.5 text-xs text-slate-300 leading-relaxed font-sans">
          {trimmed}
        </p>
      );
      i++;
    }

    return (
      <div
        onContextMenu={(e) => e.preventDefault()}
        onCopy={handleCopy}
        className="max-w-3xl mx-auto p-4 sm:p-8 space-y-2 select-none"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {/* Top Header Badge */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">📖</span>
            <span className="font-bold text-white">{fileName}</span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px]">
              Hardware Architecture Documentation
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-mono">
            <span>🔒</span>
            <span>Read-Only Preview</span>
          </div>
        </div>

        {elements}
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-[#1e1e1e] text-slate-200 select-none">
      {renderMarkdown()}
    </div>
  );
};
