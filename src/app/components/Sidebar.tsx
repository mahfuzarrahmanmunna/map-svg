export default function Sidebar() {
  return (
    <div className="w-20 h-full bg-slate-950 border-r border-slate-800/80 flex flex-col items-center py-6 gap-8 z-50">
      {/* Logo */}
      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
        C
      </div>
      
      {/* Main Navigation */}
      <div className="flex flex-col gap-3 flex-1">
        <button className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800/80 text-cyan-400 transition-colors">
          {/* Active Indicator */}
          <span className="absolute left-0 w-1.5 h-6 bg-cyan-400 rounded-r-lg"></span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span className="absolute left-14 px-2 py-1 bg-slate-800 text-slate-200 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Studio
          </span>
        </button>

        <button className="group relative w-12 h-12 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          <span className="absolute left-14 px-2 py-1 bg-slate-800 text-slate-200 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Templates
          </span>
        </button>

        <button className="group relative w-12 h-12 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="absolute left-14 px-2 py-1 bg-slate-800 text-slate-200 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            History
          </span>
        </button>
      </div>

      {/* Settings & Profile */}
      <div className="flex flex-col gap-3">
        <button className="group relative w-12 h-12 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-800/50 hover:text-slate-200 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="absolute left-14 px-2 py-1 bg-slate-800 text-slate-200 text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Settings
          </span>
        </button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm cursor-pointer hover:border-cyan-500 transition-colors">
          U
        </div>
      </div>
    </div>
  );
}