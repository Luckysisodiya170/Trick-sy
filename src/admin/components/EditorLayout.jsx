import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, RefreshCcw } from 'lucide-react';

const EditorLayout = ({ 
  title, 
  description, 
  backPath, 
  onSave, 
  onReset,
  isSaving = false, 
  children 
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(backPath)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
            {description && <p className="text-xs font-medium text-slate-500">{description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onReset && (
            <button 
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <RefreshCcw size={16} /> Reset
            </button>
          )}
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-zinc-950 hover:bg-emerald-500 transition-all shadow-md disabled:opacity-70"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Form Content Area */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;