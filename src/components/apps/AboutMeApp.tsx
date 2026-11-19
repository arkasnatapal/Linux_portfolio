/**
 * ARKA OS — "About Arka" Portfolio Application
 * 
 * Recreates the exact layout and visual structure from the user's reference:
 * - Left Sidebar with Ubuntu Orange active category highlighting:
 *   - About Me, Education, Skills, Projects, Achievements, Resume
 * - Right Content Pane:
 *   - Avatar illustration with "hi" greeting
 *   - "my name is Arkasnata Pal ,"
 *   - "I'm a Digital VLSI Engineer!" (vibrant pink/magenta accent)
 *   - Centered divider with bullet
 *   - Detailed emoji-bulleted biography matching Arkasnata Pal's exact CV
 *   - Interactive tabs for Education, Skills, Projects, Achievements, and Resume (with PDF Viewer Modal)
 */

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import { PDFViewerModal } from './PDFViewerModal';

type TabKey = 'about' | 'education' | 'skills' | 'projects' | 'achievements' | 'resume';

interface AboutMeAppProps {
  theme?: 'dark' | 'light';
}

export const AboutMeApp: React.FC<AboutMeAppProps> = ({ theme = 'dark' }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  return (
    <div className={`flex-1 flex h-full font-ubuntu select-none overflow-hidden transition-colors ${
      theme === 'light' ? 'bg-[#fafafa] text-slate-800' : 'bg-[#18181b] text-slate-100'
    }`}>
      {/* Left Sidebar Navigation */}
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

          {/* 5. Achievements */}
          <button
            onClick={() => setActiveTab('achievements')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer text-left ${
              activeTab === 'achievements'
                ? 'bg-[#e95420] text-white font-bold shadow-md'
                : theme === 'light' ? 'text-slate-700 hover:bg-black/5 hover:text-black' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-sm">🏆</span>
            <span>Achievements</span>
          </button>

          {/* 6. Resume */}
          <button
            onClick={() => setActiveTab('resume')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer text-left ${
              activeTab === 'resume'
                ? 'bg-[#e95420] text-white font-bold shadow-md'
                : theme === 'light' ? 'text-slate-700 hover:bg-black/5 hover:text-black' : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-sm">📥</span>
            <span>Resume (PDF)</span>
          </button>
        </div>

        {/* Bottom: LinkedIn & Contact */}
        <div className={`px-3 pt-2 border-t space-y-1.5 ${theme === 'light' ? 'border-black/10' : 'border-white/5'}`}>
          <a
            href={PORTFOLIO_DATA.engineer.linkedin}
            target="_blank"
            rel="noreferrer"
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium transition-colors cursor-pointer border ${
              theme === 'light'
                ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
                : 'bg-[#25252b] hover:bg-[#2d2d34] border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <span className="text-sky-400 text-xs font-bold">in</span>
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </aside>

      {/* Right Main Content Pane */}
      <main className={`flex-1 p-6 md:p-8 overflow-y-auto transition-colors ${
        theme === 'light' ? 'bg-[#ffffff] text-slate-800' : 'bg-[#121214] text-slate-200'
      }`}>
        {/* TAB 1: ABOUT ME */}
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
              <div className="absolute -top-1 -right-3 bg-white text-black font-extrabold text-[11px] px-2 py-0.5 rounded-full shadow-lg border border-black/10 select-none">
                hi 👋
              </div>
            </div>

            {/* Headline matching user reference */}
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

            {/* Divider with centered bullet */}
            <div className="w-full flex items-center justify-center my-2 max-w-xs">
              <div className={`flex-1 h-[1px] ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700'}`} />
              <div className={`w-2.5 h-2.5 rounded-full mx-3 shadow-[0_0_8px_rgba(255,255,255,0.8)] ${
                theme === 'light' ? 'bg-[#e95420]' : 'bg-white'
              }`} />
              <div className={`flex-1 h-[1px] ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700'}`} />
            </div>

            {/* Emoji Bullet List */}
            <div className={`w-full text-left space-y-4 text-xs md:text-sm leading-relaxed font-sans pt-1 ${
              theme === 'light' ? 'text-slate-700' : 'text-slate-300'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">🏫</span>
                <p>
                  I'm a <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>B.Tech Electronics and Communication Engineering undergraduate</strong> at <strong>Jalpaiguri Government Engineering College</strong> (2024 - 2028, SGPA: 8.14).
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">🏆</span>
                <p>
                  <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>National Finalist at Smart India Hackathon 2024 (SIH 2024)</strong> and completed the <strong>NPTEL Course in Digital Design Using Verilog (IIT Guwahati)</strong> with <strong>Elite Certification</strong>.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">⚡</span>
                <p>
                  My core technical expertise centers on <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>Verilog HDL</strong>, Digital Electronics, Logic Design, Electronic Devices, and Signals & Systems.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">💻</span>
                <p>
                  Hands-on engineering projects include a <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>Multi-Mode Parameterized SPI Master Controller</strong> supporting all 4 SPI modes, a <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>UART Transceiver</strong> at 9600 baud, a <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>PWM Generator with dynamic duty cycle control</strong>, and a <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>Synchronous FIFO</strong> using Xilinx Vivado, Icarus Verilog, and GTKWave.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg leading-none shrink-0">🌟</span>
                <p>
                  Areas of Interest: <strong className={theme === 'light' ? 'text-slate-950 font-bold' : 'text-white font-bold'}>Digital VLSI Design | RTL Design and Verification | FPGA Development | Analog VLSI Design</strong>.
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
                Arkasnata Pal's verified academic qualifications and coursework
              </p>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className={`p-4 rounded-xl space-y-2 border ${
                  theme === 'light' ? 'bg-white border-slate-200 shadow-sm text-slate-800' : 'bg-black/40 border-white/10 text-slate-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className={`font-bold text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{edu.institution}</span>
                    <span className="text-xs font-mono text-[#e95420] font-semibold">{edu.period}</span>
                  </div>
                  <div className={`text-xs font-medium ${theme === 'light' ? 'text-sky-700' : 'text-cyan-300'}`}>{edu.degree}</div>
                  <div className="text-xs">
                    Score: <strong className={theme === 'light' ? 'text-slate-900' : 'text-white'}>{edu.score}</strong>
                  </div>
                  
                  {edu.coursework && (
                    <div className={`pt-2 text-xs ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                      <strong className={theme === 'light' ? 'text-slate-800' : 'text-slate-300'}>Coursework:</strong> {edu.coursework.join(', ')}
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
                <span>🛠️</span> Technical Skills
              </h2>
              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Hardware Description Languages, Programming, Core Subjects, and EDA Tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* HDL */}
              <div className={`p-4 rounded-xl border space-y-2 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  theme === 'light' ? 'text-emerald-700' : 'text-[#8ae234]'
                }`}>
                  <span>⚡</span> Hardware Description Languages
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills.hardwareDescriptionLanguages.map(s => (
                    <span key={s.name} className={`px-2.5 py-1 rounded text-xs font-mono font-semibold ${
                      theme === 'light' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-emerald-900/30 text-emerald-200 border border-emerald-700/50'
                    }`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Programming Languages */}
              <div className={`p-4 rounded-xl border space-y-2 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  theme === 'light' ? 'text-blue-700' : 'text-[#729fcf]'
                }`}>
                  <span>💻</span> Programming Languages
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills.programmingLanguages.map(s => (
                    <span key={s.name} className={`px-2.5 py-1 rounded text-xs font-mono font-semibold ${
                      theme === 'light' ? 'bg-sky-50 text-sky-900 border border-sky-200' : 'bg-sky-900/30 text-sky-200 border border-sky-700/50'
                    }`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Subjects */}
              <div className={`p-4 rounded-xl border space-y-2 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  theme === 'light' ? 'text-amber-700' : 'text-amber-400'
                }`}>
                  <span>📚</span> Core Subjects
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills.coreSubjects.map(s => (
                    <span key={s.name} className={`px-2 py-1 rounded text-xs font-sans ${
                      theme === 'light' ? 'bg-slate-100 text-slate-800 border border-slate-200' : 'bg-white/5 text-slate-200'
                    }`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* EDA & Simulation Tools */}
              <div className={`p-4 rounded-xl border space-y-2 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10'
              }`}>
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  theme === 'light' ? 'text-purple-700' : 'text-purple-400'
                }`}>
                  <span>⚙️</span> Tools & EDA Suites
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PORTFOLIO_DATA.skills.tools.map(s => (
                    <span key={s.name} className={`px-2.5 py-1 rounded text-xs font-mono font-semibold ${
                      theme === 'light' ? 'bg-purple-50 text-purple-900 border border-purple-200' : 'bg-purple-900/30 text-purple-200 border border-purple-700/50'
                    }`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Coursework & Interests */}
            <div className={`p-4 rounded-xl border space-y-3 ${
              theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/10'
            }`}>
              <div>
                <strong className="text-xs uppercase tracking-wider text-[#e95420]">Relevant Coursework:</strong>
                <p className="text-xs mt-1 text-slate-300">
                  {PORTFOLIO_DATA.skills.relevantCoursework.join(' | ')}
                </p>
              </div>
              <div>
                <strong className="text-xs uppercase tracking-wider text-[#e95420]">Areas of Interest:</strong>
                <p className="text-xs mt-1 text-slate-300">
                  {PORTFOLIO_DATA.skills.areasOfInterest.join(' | ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className={`border-b pb-3 ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}>
              <h2 className={`text-xl font-bold flex items-center gap-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                <span>💻</span> Projects
              </h2>
              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Verilog HDL hardware designs and Vivado simulation implementations
              </p>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.projects.map(p => (
                <div key={p.id} className={`p-4 rounded-xl border space-y-2.5 ${
                  theme === 'light' ? 'bg-white border-slate-200 shadow-sm text-slate-800' : 'bg-black/40 border-white/10 text-slate-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className={`font-bold text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{p.name}</span>
                    <span className="text-[11px] font-mono text-[#e95420] font-semibold">{p.technologies.slice(0, 2).join(' | ')}</span>
                  </div>

                  <ul className="list-disc ml-5 space-y-1 text-xs leading-relaxed text-slate-300">
                    {p.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
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

        {/* TAB 5: ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className={`border-b pb-3 ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}>
              <h2 className={`text-xl font-bold flex items-center gap-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                <span>🏆</span> Achievements & Honors
              </h2>
              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                National hackathons and elite academic certifications
              </p>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.achievements.map((ach, idx) => (
                <div key={idx} className={`p-4 rounded-xl border space-y-2 ${
                  theme === 'light' ? 'bg-white border-slate-200 shadow-sm text-slate-800' : 'bg-black/40 border-white/10 text-slate-200'
                }`}>
                  <div className="flex justify-between items-baseline">
                    <span className={`font-bold text-sm ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {ach.title}
                    </span>
                    <span className="text-xs font-mono text-[#e95420] font-bold">{ach.year}</span>
                  </div>
                  <div className={`text-xs font-medium ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>
                    {ach.organization}
                  </div>
                  <p className={`text-xs leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: RESUME */}
        {activeTab === 'resume' && (
          <div className="max-w-xl mx-auto flex flex-col items-center text-center space-y-6 animate-fade-in pt-4">
            <div className="w-16 h-16 rounded-2xl bg-[#e95420]/20 text-[#e95420] flex items-center justify-center text-3xl shadow-lg border border-[#e95420]/30">
              📄
            </div>

            <div>
              <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Curriculum Vitae / Resume
              </h2>
              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                {PORTFOLIO_DATA.engineer.fullName} &bull; {PORTFOLIO_DATA.engineer.title}
              </p>
            </div>

            <div className={`p-4 rounded-xl border text-xs space-y-2 max-w-md text-left ${
              theme === 'light' ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-black/40 border-white/10 text-slate-300'
            }`}>
              <div className="text-emerald-500 font-mono font-bold">● Contact & Academic Credentials:</div>
              <div>• Phone: {PORTFOLIO_DATA.engineer.phone}</div>
              <div>• Email: {PORTFOLIO_DATA.engineer.email}</div>
              <div>• Institution: Jalpaiguri Government Engineering College (B.Tech ECE)</div>
              <div>• Achievements: SIH 2024 Finalist | NPTEL Elite Certification (IIT Guwahati)</div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="px-5 py-2.5 bg-[#e95420] hover:bg-[#ff6e3a] text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95 cursor-pointer text-xs flex items-center gap-2"
              >
                <span>🔍</span>
                <span>Open PDF Viewer Modal</span>
              </button>

              <a
                href="/Arkasnata_Pal_Resume.pdf"
                download="Arkasnata_Pal_Resume.pdf"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all cursor-pointer text-xs flex items-center gap-2 border border-white/10"
              >
                <span>📥</span>
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href={PORTFOLIO_DATA.engineer.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-sky-700 hover:bg-sky-600 text-white font-bold rounded-xl transition-all cursor-pointer text-xs flex items-center gap-2"
              >
                <span>in</span>
                <span>LinkedIn</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 font-mono">
              Click 'Open PDF Viewer Modal' to inspect Arkasnata Pal's exact CV directly inside ARKA OS!
            </p>
          </div>
        )}
      </main>

      {/* Embedded PDF Viewer Modal */}
      <PDFViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        theme={theme}
      />
    </div>
  );
};
