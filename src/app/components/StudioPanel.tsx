"use client";

interface StudioPanelProps {
  status: string;
  onSearch: (query: string) => void;
  onExport: () => void;
  isExporting: boolean;
  styleConfig: any;
  setStyleConfig: (config: any) => void;
  setTemplate: (template: string) => void;
}

export default function StudioPanel({ status, onSearch, onExport, isExporting, styleConfig, setStyleConfig, setTemplate }: StudioPanelProps) {
  const templates = ["Dark Mode", "Light Mode", "Blueprint", "Midnight"];

  return (
    <div className="w-80 h-full bg-slate-900 border-l border-slate-850 flex flex-col">
      <div className="p-5 border-b border-slate-850">
        <h2 className="text-lg font-bold text-slate-100">Generation Studio</h2>
        <p className="text-xs text-slate-500 mt-1">Customize and export your vector map.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</label>
          <div className="flex gap-2">
            <input
              id="searchInput"
              placeholder="Search city or address..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-sm text-slate-200 focus:border-brand outline-none"
            />
            <button onClick={() => onSearch((document.getElementById("searchInput") as HTMLInputElement).value)} className="px-4 bg-brand text-slate-950 text-sm font-bold rounded-lg hover:bg-brand-dark">GO</button>
          </div>
        </div>

        {/* Templates */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Templates</label>
          <div className="grid grid-cols-2 gap-2">
            {templates.map(t => (
              <button key={t} onClick={() => setTemplate(t)} className="px-3 py-2 text-xs bg-slate-950 border border-slate-850 rounded-lg text-slate-400 hover:border-brand hover:text-slate-200">{t}</button>
            ))}
          </div>
        </div>

        {/* Color Customization */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Colors</label>
          {Object.keys(styleConfig).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-slate-300 capitalize">{key}</span>
              <input
                type="color"
                value={styleConfig[key]}
                onChange={(e) => setStyleConfig({ ...styleConfig, [key]: e.target.value })}
                className="w-8 h-8 bg-transparent border border-slate-700 rounded cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Export Format */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Export Format</label>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-3 py-2 text-xs bg-brand/10 border border-brand text-brand rounded-lg">SVG</button>
            <button className="px-3 py-2 text-xs bg-slate-950 border border-slate-850 text-slate-500 rounded-lg">PNG (Pro)</button>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-5 border-t border-slate-850">
        <button
          onClick={onExport}
          disabled={isExporting}
          className="w-full py-3 bg-gradient-to-r from-brand to-blue-600 text-slate-950 text-sm font-extrabold uppercase rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isExporting ? "Generating Map..." : "Generate & Download"}
        </button>
        <div className="mt-4 p-3 bg-slate-950 border border-slate-850 rounded-lg text-center text-xs text-slate-500 min-h-[40px] flex items-center justify-center">
          {status}
        </div>
      </div>
    </div>
  );
}