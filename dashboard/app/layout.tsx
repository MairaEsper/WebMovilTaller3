// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import ReduxProvider from '@/lib/ReduxProvider';

export const metadata: Metadata = {
  title: 'DataMobile Dashboard',
  description: 'Dynamic data visualization web mobile application.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Envolvemos la aplicación con ReduxProvider */}
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}