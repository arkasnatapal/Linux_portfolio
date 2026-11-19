/**
 * ARKA OS — Desktop Environment Type Definitions
 */

export type AppId =
  | 'terminal'
  | 'about'
  | 'files'
  | 'vscode'
  | 'chrome'
  | 'firefox'
  | 'settings'
  | 'textedit'
  | 'imageviewer'
  | 'music'
  | 'video'
  | 'trash'
  | 'pdfviewer';

export interface WindowInstance {
  id: string;
  appId: AppId;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  params?: any;
}

export interface AppMetadata {
  id: AppId;
  name: string;
  comment: string;
  icon: string;
  category: 'System' | 'Development' | 'Utilities' | 'Internet' | 'Media';
  defaultWidth: number;
  defaultHeight: number;
}
