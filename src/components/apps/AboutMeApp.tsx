/**
 * ARKA OS — "About Arka" Portfolio Application
 * 
 * Recreates the exact layout and visual structure from the user's reference (Image 3):
 * - Left Sidebar with Ubuntu Orange active category highlighting:
 *   - About Me, Education, Skills, Projects, Resume, and Sponsor
 * - Right Content Pane:
 *   - Avatar illustration with "hi" greeting
 *   - "my name is Arka Bhattacharya ,"
 *   - "I'm a Digital VLSI Engineer!" (vibrant pink/magenta accent)
 *   - Centered divider with bullet
 *   - Detailed emoji-bulleted biography & VLSI engineering experience
 *   - Interactive tabs for Education, Skills, Projects, and Resume (with PDF download)
 */

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';

type TabKey = 'about' | 'education' | 'skills' | 'projects' | 'resume';

interface AboutMeAppProps {
  theme?: 'dark' | 'light';
}

export const AboutMeApp: React.FC<AboutMeAppProps> = ({ theme = 'dark' }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('about');

  return (
    <div className={`flex-1 flex h-full font-ubuntu select-none overflow-hidden transition-colors ${
      theme === 'light' ? 'bg-[#fafafa] text-slate-800' : 'bg-[#18181b] text-slate-100'
    }`}>
      {/* Left Sidebar Navigation (Matching Image 3) */}
      <aside className={`w-44 md:w-48 flex flex-col justify-between py-3 shrink-0 transition-colors ${
        theme === 'light' ? 'bg-[#ebebeb] border-r border-slate-300 text-slate-700' : 'bg-[#1f1f23] border-r border-black/40 text-slate-300'
      }`}>
        <div className="space-y-1">
          {/* 1. About Me */}
          <button
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer text-left ${
              activeTab === 'about'
                ? 'bg-[#e95420] text-white font-bold shadow-md'
                : theme === 'light' ? 'text-slate-700 hover:bg-black/5 hover:text-black' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-sm">👤</span>
            <span>About Me</span>
          </button>

          {/* 2. Education */}
          <button
            onClick={() => setActiveTab('education')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer text-left ${
              activeTab === 'education'
                ? 'bg-[#e95420] text-white font-bold shadow-md'
                : theme === 'light' ? 'text-slate-700 hover:bg-black/5 hover:text-black' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-sm">📖</span>
            <span>Education</span>
          </button>

          {/* 3. Skills */}
          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer text-left ${
              activeTab === 'skills'
                ? 'bg-[#e95420] text-white font-bold shadow-md'
                : theme === 'light' ? 'text-slate-700 hover:bg-black/5 hover:text-black' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-sm">🛠️</span>
            <span>Skills</span>
          </button>

          {/* 4. Projects */}
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer text-left ${
              activeTab === 'projects'
                ? 'bg-[#e95420] text-white font-bold shadow-md'
                : theme === 'light' ? 'text-slate-700 hover:bg-black/5 hover:text-black' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-sm">💻</span>
            <span>Projects</span>
          </button>

          {/* 5. Resume */}
          <button
            onClick={() => setActiveTab('resume')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer text-left ${
              activeTab === 'resume'
                ? 'bg-[#e95420] text-white font-bold shadow-md'
                : theme === 'light' ? 'text-slate-700 hover:bg-black/5 hover:text-black' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-sm">📥</span>
            <span>Resume</span>
          </button>
        </div>

        {/* Bottom: Sponsor Button (As in Image 3) */}
        <div className={`px-3 pt-2 border-t ${theme === 'light' ? 'border-black/10' : 'border-white/5'}`}>
          <a
            href="https://github.com/arka-vlsi"
            target="_blank"
            rel="noreferrer"
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer border ${
              theme === 'light'
                ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
                : 'bg-[#25252b] hover:bg-[#2d2d34] border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <span className="text-red-500 text-xs">♡</span>
            <span>Sponsor</span>
          </a>
        </div>
      </aside>

      {/* Right Main Content Pane */}
      <main className={`flex-1 p-6 md:p-8 overflow-y-auto transition-colors ${
        theme === 'light' ? 'bg-[#ffffff] text-slate-800' : 'bg-[#121214] text-slate-200'
      }`}>
        {/* TAB 1: ABOUT ME (Matches Image 3) */}
        {activeTab === 'about' && (
          <div className="max-w-xl mx-auto flex flex-col items-center text-center space-y-6 animate-fade-in">
            {/* Top Avatar with "hi" badge */}
            <div className="relative mt-2">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#e95420] to-[#77216F] p-1 shadow-2xl">
                <div className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden ${
                  theme === 'light' ? 'bg-white' : 'bg-[#1e1e24]'
                }`}>
                  <div className="text-4xl select-none">👨‍💻</div>
                </div>
              </div>
              {/* "hi" speech bubble */}
              <div className="absolute -top-1 -right-3 bg-white text-black font-extrabold text-[11px] px-2 py-0.5 rounded-full shadow-lg border border-black/10 select-none">
                hi 👋
              </div>
            </div>

            {/* Headline matching user reference Image 3 */}
            <div className="space-y-1">
              <h1 className={`text-2xl md:text-3xl font-normal tracking-tight ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                my name is <strong className="font-extrabold">{PORTFOLIO_DATA.engineer.fullName}</strong> ,
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-[#e02460] tracking-tight">
                I'm a Digital VLSI Engineer!
              </h2>
            </div>

            {/* Divider with centered white bullet (matching Image 3) */}
            <div className="w-full flex items-center justify-center my-2 max-w-xs">
              <div className={`flex-1 h-[1px] ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700'}`} />
              <div className={`w-2.5 h-2.5 rounded-full mx-3 shadow-[0_0_8px_rgba(255,255,255,0.8)] ${
                theme === 'light' ? 'bg-[#e95420]' : 'bg-white'
              }`} />
              <div className={`flex-1 h-[1px] ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700'}`} />
            </div>

            {/* Emoji Bullet List (Personalized for Digital VLSI Engineer) */}
            <div className={`w-full text-left space-y-4 text-xs md:text-sm leading-relaxed font-sans pt-1 ${
              theme === 'light' ? 'text-slate-700' : 'text-slate-300'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">🏫</span>
                <p>
                  I'm a <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>Graduate Student & Digital VLSI Engineer</strong> specializing in RTL Design, Functional Verification, and ASIC Implementation.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">💼</span>
                <p>
                  Specialized in the full silicon lifecycle: <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>From RTL to GDSII</strong>. I architect synthesizable SystemVerilog IP and build constrained-random UVM testbenches.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">🧩</span>
                <p>
                  I enjoy designing high-performance hardware microarchitectures: pipelined 32-bit RISC-V cores, multi-channel AXI4 DMA crossbars, and dual-clock asynchronous FIFOs.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">🎲</span>
                <p>
                  When I'm not running Static Timing Analysis (STA) or debugging timing closure, I like exploring open-source EDA tooling, reading silicon architecture papers, and experimenting with SkyWater 130nm CMOS PDKs.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">🌟</span>
                <p>
                  And I also have strong interest in Logic Equivalence Checking (LEC), Formal Verification (SVA), Low-Power UPF flows, and High-Speed Memory Controllers!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EDUCATION */}
        {activeTab === 'education' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className={`border-b pb-3 ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}>
              <h2 className={`text-xl font-bold flex items-center gap-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                <span>📖</span> Education & Academic Background
              </h2>
              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Formal education in Microelectronics, Digital Systems, and VLSI Engineering
              </p>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className={`p-4 rounded-xl space-y-2 border ${
                  theme === 'light' ? 'bg-white border-slate-200 shadow-sm text-slate-800' : 'bg-black/40 border-white/10 text-slate-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className={`font-bold text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{edu.degree}</span>
                    <span className="text-xs font-mono text-[#e95420] font-semibold">{edu.period}</span>
                  </div>
                  <div className={`text-xs font-medium ${theme === 'light' ? 'text-sky-700' : 'text-cyan-300'}`}>{edu.institution}</div>
                  <div className="text-xs">Grade / Score: <strong className={theme === 'light' ? 'text-slate-900' : 'text-white'}>{edu.score}</strong></div>
                  
                  {edu.coursework && (
                    <div className={`pt-2 text-xs ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                      <strong className={theme === 'light' ? 'text-slate-800' : 'text-slate-300'}>Relevant Coursework:</strong> {edu.coursework.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS */}
        {activeTab === 'skills' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className={`border-b pb-3 ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}>
              <h2 className={`text-xl font-bold flex items-center gap-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                <span>🛠️</span> Technical Skills & EDA Tooling
              </h2>
              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Core competencies across the complete ASIC & FPGA design flow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border space-y-2 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  theme === 'light' ? 'text-emerald-700' : 'text-[#8ae234]'
                }`}>
                  <span>⚡</span> RTL Design & Architecture
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills.hardwareDescriptionLanguages.map(s => (
                    <span key={s.name} className={`px-2 py-1 rounded text-xs font-mono ${
                      theme === 'light' ? 'bg-slate-100 text-slate-800 border border-slate-200' : 'bg-white/5 text-slate-200'
                    }`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  theme === 'light' ? 'text-blue-700' : 'text-[#729fcf]'
                }`}>
                  <span>🧪</span> Verification & UVM
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills.verification.map(s => (
                    <span key={s.name} className={`px-2 py-1 rounded text-xs font-mono ${
                      theme === 'light' ? 'bg-slate-100 text-slate-800 border border-slate-200' : 'bg-white/5 text-slate-200'
                    }`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  theme === 'light' ? 'text-amber-700' : 'text-amber-400'
                }`}>
                  <span>💎</span> Architecture & Protocols
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills.architectureAndProtocols.map(s => (
                    <span key={s.name} className={`px-2 py-1 rounded text-xs font-mono ${
                      theme === 'light' ? 'bg-slate-100 text-slate-800 border border-slate-200' : 'bg-white/5 text-slate-200'
                    }`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  theme === 'light' ? 'text-purple-700' : 'text-purple-400'
                }`}>
                  <span>⚙️</span> EDA CAD Suites
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills.edaTools.map(s => (
                    <span key={s.name} className={`px-2 py-1 rounded text-xs font-mono ${
                      theme === 'light' ? 'bg-slate-100 text-slate-800 border border-slate-200' : 'bg-white/5 text-slate-200'
                    }`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className={`border-b pb-3 ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}>
              <h2 className={`text-xl font-bold flex items-center gap-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                <span>💻</span> Hardware Tapeouts & Engineering Projects
              </h2>
              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Silicon designs, verified microarchitectures, and physical layouts
              </p>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.projects.map(p => (
                <div key={p.id} className={`p-4 rounded-xl border space-y-2 ${
                  theme === 'light' ? 'bg-white border-slate-200 shadow-sm text-slate-800' : 'bg-black/40 border-white/10 text-slate-200'
                }`}>
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{p.name}</span>
                    <span className="text-xs font-mono text-[#e95420] font-bold uppercase">{p.category}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>{p.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.technologies?.map(t => (
                      <span key={t} className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                        theme === 'light' ? 'bg-slate-100 text-cyan-800 border border-slate-200' : 'bg-white/5 text-cyan-300'
                      }`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RESUME */}
        {activeTab === 'resume' && (
          <div className="max-w-xl mx-auto flex flex-col items-center text-center space-y-6 animate-fade-in pt-4">
            <div className="w-16 h-16 rounded-2xl bg-[#e95420]/20 text-[#e95420] flex items-center justify-center text-3xl shadow-lg border border-[#e95420]/30">
              📥
            </div>

            <div>
              <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Curriculum Vitae / Resume</h2>
              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                {PORTFOLIO_DATA.engineer.fullName} &bull; {PORTFOLIO_DATA.engineer.title}
              </p>
            </div>

            <div className={`p-4 rounded-xl border text-xs space-y-2 max-w-md text-left ${
              theme === 'light' ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-black/40 border-white/10 text-slate-300'
            }`}>
              <div className="text-emerald-600 font-mono font-bold">● Status: Available for Immediate Hire / Internships</div>
              <div>• Specialization: RTL Microarchitecture, SystemVerilog/UVM, STA, Physical Signoff</div>
              <div>• Foundry PDK: SkyWater Sky130A (130nm CMOS)</div>
              <div>• Location: {PORTFOLIO_DATA.engineer.location}</div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  // Trigger physical file download of CV
                  const cvContent = `CURRICULUM VITAE
Name: ${PORTFOLIO_DATA.engineer.fullName}
Title: ${PORTFOLIO_DATA.engineer.title}
Tagline: ${PORTFOLIO_DATA.engineer.tagline}
Email: ${PORTFOLIO_DATA.engineer.email}
GitHub: https://github.com/arka-vlsi
LinkedIn: https://linkedin.com/in/arka-vlsi

SUMMARY:
${PORTFOLIO_DATA.engineer.summary}

CORE SKILLS:
- HDL: ${PORTFOLIO_DATA.skills.hardwareDescriptionLanguages.map(s => s.name).join(', ')}
- Verification: ${PORTFOLIO_DATA.skills.verification.map(s => s.name).join(', ')}
- Architecture: ${PORTFOLIO_DATA.skills.architectureAndProtocols.map(s => s.name).join(', ')}
- EDA Tools: ${PORTFOLIO_DATA.skills.edaTools.map(s => s.name).join(', ')}

PROJECTS:
${PORTFOLIO_DATA.projects.map(p => `- ${p.name}: ${p.description}`).join('\n')}
`;
                  const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Arka_Bhattacharya_VLSI_Resume.txt';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="px-5 py-2.5 bg-[#e95420] hover:bg-[#ff6e3a] text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer text-xs flex items-center gap-2"
              >
                <span>📥</span>
                <span>Download Resume (CV)</span>
              </button>

              <a
                href="https://github.com/arka-vlsi"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all cursor-pointer text-xs flex items-center gap-2"
              >
                <span>🐙</span>
                <span>View GitHub Profile</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              Note: Full CV specifications will be populated upon your prompt submission!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};