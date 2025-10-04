import ClientWrapper from './ClientWrapper';
import './globals.css';

export const metadata = {
  title: 'ResearchConnect',
  description: 'Find your next research opportunity.',
};

// The fix is in the line below
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}