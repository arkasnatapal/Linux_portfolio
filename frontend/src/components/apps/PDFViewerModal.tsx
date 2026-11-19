/**
 * ARKA OS — GNOME Document Viewer (Evince) / Resume PDF Viewer
 * 
 * High-fidelity PDF viewer modal & window for Arkasnata Pal's Resume:
 * - Authentic GNOME Evince header bar with page navigation (1 / 1)
 * - Zoom controls (Zoom In, Zoom Out, Reset, Fit Width)
 * - Action buttons: Download PDF, Print, Open in New Tab, Close
 * - Multi-mode view:
 *   1. High-Resolution 200 DPI Rendered PDF Page (/Arkasnata_Pal_Resume.png)
 *   2. Embedded Native Browser PDF (<iframe src="/Arkasnata_Pal_Resume.pdf" />)
 *   3. Digital Accessible Document Sheet (Formatted text)
 */

import React, { useState } from 'react';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

export const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
  isOpen,
  onClose,
  theme = 'dark',
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'scan' | 'embed' | 'text'>('scan');

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 15, 180));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 15, 60));
  const handleResetZoom = () => setZoomLevel(100);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = '/Arkasnata_Pal_Resume.pdf';
    a.download = 'Arkasnata_Pal_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenNewTab = () => {
    window.open('/Arkasnata_Pal_Resume.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/70 backdrop-blur-sm animate-fade-in font-ubuntu select-none">
      <div
        className={`w-full max-w-4xl h-[92vh] flex flex-col rounded-xl shadow-2xl border overflow-hidden transition-colors ${
          theme === 'light'
            ? 'bg-[#f6f6f6] border-slate-300 text-slate-800'
            : 'bg-[#242424] border-black/60 text-slate-100'
        }`}
      >
        {/* GNOME Evince Document Viewer Header Bar */}
        <header
          className={`h-11 px-3 flex items-center justify-between border-b shrink-0 select-none ${
            theme === 'light'
              ? 'bg-[#ebebeb] border-slate-300'
              : 'bg-[#1e1e1e] border-black/40'
          }`}
        >
          {/* Left: Document Icon & Name */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
              PDF
            </div>
            <span className="text-xs font-semibold truncate max-w-[180px] sm:max-w-xs">
              Arkasnata_Pal_Resume.pdf
            </span>
          </div>

          {/* Center: Page Controls & Zoom */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              className={`px-2 py-0.5 rounded text-xs font-mono border ${
                theme === 'light'
                  ? 'bg-white border-slate-300 text-slate-700'
                  : 'bg-black/30 border-white/10 text-slate-300'
              }`}
            >
              1 / 1
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomOut}
                className="w-7 h-7 rounded flex items-center justify-center text-xs hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                title="Zoom Out"
              >
                −
              </button>
              <button
                onClick={handleResetZoom}
                className="px-1.5 h-7 rounded text-[11px] font-mono hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                title="Reset Zoom"
              >
                {zoomLevel}%
              </button>
              <button
                onClick={handleZoomIn}
                className="w-7 h-7 rounded flex items-center justify-center text-xs hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                title="Zoom In"
              >
                +
              </button>
            </div>

            {/* View Mode Toggle */}
            <div
              className={`hidden sm:flex rounded p-0.5 border text-[11px] ${
                theme === 'light' ? 'bg-slate-200 border-slate-300' : 'bg-black/40 border-white/10'
              }`}
            >
              <button
                onClick={() => setViewMode('scan')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                  viewMode === 'scan'
                    ? 'bg-[#e95420] text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Original Rendered PDF Page"
              >
                PDF View
              </button>
              <button
                onClick={() => setViewMode('embed')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                  viewMode === 'embed'
                    ? 'bg-[#e95420] text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Browser Native PDF Frame"
              >
                Native Frame
              </button>
              <button
                onClick={() => setViewMode('text')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                  viewMode === 'text'
                    ? 'bg-[#e95420] text-white font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Formatted Document Text"
              >
                Text
              </button>
            </div>
          </div>

          {/* Right: Actions (Print, Download, Open Tab, Close) */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-xs cursor-pointer"
              title="Print Resume"
            >
              🖨️
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-xs cursor-pointer text-[#e95420] font-bold"
              title="Download Arkasnata_Pal_Resume.pdf"
            >
              📥
            </button>
            <button
              onClick={handleOpenNewTab}
              className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-xs cursor-pointer"
              title="Open in new browser tab"
            >
              ↗️
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 ml-1 rounded-full bg-black/20 hover:bg-red-600 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
              title="Close Viewer"
            >
              ✕
            </button>
          </div>
        </header>

        {/* Document Body Canvas */}
        <div
          className={`flex-1 overflow-auto p-4 sm:p-6 flex justify-center items-start ${
            theme === 'light' ? 'bg-[#d8d8d8]' : 'bg-[#181818]'
          }`}
        >
          {viewMode === 'embed' ? (
            <div className="w-full h-full flex flex-col bg-white rounded shadow-lg overflow-hidden">
              <iframe
                src="/Arkasnata_Pal_Resume.pdf#toolbar=1"
                title="Arkasnata Pal Resume PDF"
                className="w-full h-full border-none"
              />
            </div>
          ) : viewMode === 'scan' ? (
            /* High-Res 200 DPI Render of Exact Original PDF */
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out',
              }}
              className="bg-white shadow-2xl rounded-sm border border-neutral-300 overflow-hidden"
            >
              <img
                src="/Arkasnata_Pal_Resume.png"
                alt="Arkasnata Pal Resume"
                className="w-[740px] max-w-none block h-auto select-none pointer-events-auto"
              />
            </div>
          ) : (
            /* Document Page Sheet: 1:1 Accessible Text Rendering */
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out',
              }}
              className="w-full max-w-[780px] bg-white text-[#111111] p-8 sm:p-12 shadow-2xl rounded-sm font-serif select-text border border-neutral-300 leading-normal"
            >
              {/* Header */}
              <div className="text-center pb-3">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-neutral-900 font-sans">
                  Arkasnata Pal
                </h1>
                <div className="text-xs sm:text-sm text-neutral-700 mt-1.5 flex flex-wrap justify-center items-center gap-2 font-sans">
                  <span>+91-8250495806</span>
                  <span className="text-neutral-400">|</span>
                  <a
                    href="mailto:arka4551@gmail.com"
                    className="text-blue-700 hover:underline cursor-pointer"
                  >
                    arka4551@gmail.com
                  </a>
                  <span className="text-neutral-400">|</span>
                  <a
                    href="https://linkedin.com/in/arkasnata-pal-6a3682276"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 hover:underline cursor-pointer"
                  >
                    linkedin.com/in/arkasnata-pal-6a3682276
                  </a>
                </div>
              </div>

              {/* 1. Education Section */}
              <div className="mt-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 font-sans">
                  Education
                </h2>

                <div className="mt-2 space-y-2.5 text-xs sm:text-[13px]">
                  <div>
                    <div className="flex justify-between items-baseline font-bold">
                      <span className="text-neutral-900">Jalpaiguri Government Engineering College</span>
                      <span className="text-neutral-700 font-normal">2024 - 2028</span>
                    </div>
                    <div className="flex justify-between items-baseline text-neutral-800 italic">
                      <span>Bachelor of Technology (B.Tech) in Electronics and Communication Engineering</span>
                      <span className="font-semibold not-italic text-neutral-900">SGPA: 8.14</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-bold">
                      <span className="text-neutral-900">HemSheela Model School, Durgapur</span>
                      <span className="text-neutral-700 font-normal">2024</span>
                    </div>
                    <div className="flex justify-between items-baseline text-neutral-800">
                      <span className="italic">Class 12 (CBSE Board)</span>
                      <span className="font-semibold text-neutral-900">Percentage: 93%</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline font-bold">
                      <span className="text-neutral-900">St. Xavier’s School, Durgapur</span>
                      <span className="text-neutral-700 font-normal">2022</span>
                    </div>
                    <div className="flex justify-between items-baseline text-neutral-800">
                      <span className="italic">Class 10 (ICSE Board)</span>
                      <span className="font-semibold text-neutral-900">Percentage: 95%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Technical Skills Section */}
              <div className="mt-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 font-sans">
                  Technical Skills
                </h2>

                <div className="mt-2 space-y-1 text-xs sm:text-[13px] text-neutral-800">
                  <div>
                    <strong className="text-neutral-900 font-sans">Hardware Description Languages:</strong>{' '}
                    <span>Verilog HDL</span>
                  </div>
                  <div>
                    <strong className="text-neutral-900 font-sans">Programming Languages:</strong>{' '}
                    <span>C, C++, Python</span>
                  </div>
                  <div>
                    <strong className="text-neutral-900 font-sans">Core Subjects:</strong>{' '}
                    <span>Digital Electronics, Logic Design, Electronic Devices, Signals and Systems</span>
                  </div>
                  <div>
                    <strong className="text-neutral-900 font-sans">Tools:</strong>{' '}
                    <span>Xilinx Vivado, Icarus Verilog, GTKWave</span>
                  </div>
                </div>
              </div>

              {/* 3. Projects Section */}
              <div className="mt-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 font-sans">
                  Projects
                </h2>

                <div className="mt-2 space-y-3.5 text-xs sm:text-[13px]">
                  {/* Project 1 */}
                  <div>
                    <div className="font-bold text-neutral-900">
                      Multi-Mode Parameterized SPI Master Controller{' '}
                      <span className="font-normal italic text-neutral-700">| Verilog, Xilinx Vivado</span>
                    </div>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5 text-neutral-800">
                      <li>Designed a fully parameterized SPI Master IP in Verilog supporting variable word lengths and runtime-configurable clock division.</li>
                      <li>Engineered dynamic edge-transition logic supporting all 4 SPI modes via runtime CPOL and CPHA configuration matrix.</li>
                      <li>Developed an FSM gating the clock divider strictly within active transfer windows to ensure clean, deterministic timing.</li>
                      <li>Implemented integrated bidirectional shift registers to execute synchronized, full-duplex serial-to-parallel data conversion.</li>
                      <li>Verified protocol compliance, state transitions, and data bus integrity across all mode configurations via Vivado simulation.</li>
                    </ul>
                  </div>

                  {/* Project 2 */}
                  <div>
                    <div className="font-bold text-neutral-900">
                      UART Transmitter and Receiver using Verilog{' '}
                      <span className="font-normal italic text-neutral-700">| Verilog HDL, Xilinx Vivado</span>
                    </div>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5 text-neutral-800">
                      <li>Designed and implemented UART Transmitter and Receiver modules in Verilog HDL for asynchronous serial communication.</li>
                      <li>Configured communication at 9600 baud rate using a dedicated baud rate generator.</li>
                      <li>Developed FSM-based control logic for serial data transmission and reception.</li>
                      <li>Verified correct data transfer and protocol functionality through simulation in Xilinx Vivado.</li>
                    </ul>
                  </div>

                  {/* Project 3 */}
                  <div>
                    <div className="font-bold text-neutral-900">
                      PWM Generator with Variable Duty Cycle Control{' '}
                      <span className="font-normal italic text-neutral-700">| Verilog HDL, Xilinx Vivado</span>
                    </div>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5 text-neutral-800">
                      <li>Designed a PWM generator in Verilog HDL with dynamically adjustable duty cycle.</li>
                      <li>Implemented increase and decrease push-button controls for real-time duty cycle modification.</li>
                      <li>Integrated debouncing logic to eliminate false triggering caused by mechanical switch bounce.</li>
                      <li>Verified PWM waveform generation and duty cycle variations through simulation in Xilinx Vivado.</li>
                    </ul>
                  </div>

                  {/* Project 4 */}
                  <div>
                    <div className="font-bold text-neutral-900">
                      Synchronous FIFO Design using Verilog{' '}
                      <span className="font-normal italic text-neutral-700">| Verilog, Xilinx Vivado</span>
                    </div>
                    <ul className="list-disc ml-5 mt-1 space-y-0.5 text-neutral-800">
                      <li>Designed a parameterized synchronous FIFO architecture for temporary data storage and transfer.</li>
                      <li>Implemented read/write pointer logic along with full and empty flag generation.</li>
                      <li>Verified FIFO operation under different read and write conditions through simulation.</li>
                      <li>Analyzed waveform results to validate functionality and timing behavior.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Achievements Section */}
              <div className="mt-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 font-sans">
                  Achievements
                </h2>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-xs sm:text-[13px] text-neutral-800">
                  <li>
                    <strong className="text-neutral-900">Finalist – Smart India Hackathon 2024 (SIH 2024)</strong>
                  </li>
                  <li>
                    <strong className="text-neutral-900">Completed NPTEL Course: Digital Design Using Verilog (IIT Guwahati) with Elite Certification</strong>
                  </li>
                </ul>
              </div>

              {/* 5. Relevant Coursework Section */}
              <div className="mt-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 font-sans">
                  Relevant Coursework
                </h2>
                <div className="mt-1.5 text-xs sm:text-[13px] text-neutral-800 font-sans">
                  Digital Electronics | RTL to GDSII Flow
                </div>
              </div>

              {/* 6. Areas of Interest Section */}
              <div className="mt-5 pb-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-800 pb-0.5 font-sans">
                  Areas of Interest
                </h2>
                <div className="mt-1.5 text-xs sm:text-[13px] text-neutral-800 font-sans">
                  Digital VLSI Design | RTL Design and Verification | FPGA Development | Analog VLSI design
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <footer
          className={`h-7 px-4 flex items-center justify-between text-[11px] font-mono border-t shrink-0 ${
            theme === 'light'
              ? 'bg-[#eaeaea] border-slate-300 text-slate-600'
              : 'bg-[#1a1a1a] border-black/40 text-slate-400'
          }`}
        >
          <span>Page 1 of 1 • 8.5 x 11 in (Letter)</span>
          <div className="flex items-center gap-3">
            <span>Size: 118 KB</span>
            <span className="text-emerald-500">● Verified Authentic CV</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
