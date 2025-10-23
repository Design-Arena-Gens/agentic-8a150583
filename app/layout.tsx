import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'M.S.N Health Automation Evaluator',
  description: 'Evaluate health automation ideas with an expert clinical framework.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-container">
          <header className="site-header">
            <h1>M.S.N — Health Automation Evaluator</h1>
            <p className="tagline">Master-level prompt optimization specialist and senior medical doctor</p>
          </header>
          <main>{children}</main>
          <footer className="site-footer">
            <p className="disclaimer">
              Educational use only. Not a substitute for professional medical diagnosis or treatment.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
