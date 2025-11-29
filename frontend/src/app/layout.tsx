import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import ThemeProvider from '@/components/ThemeProvider';

import '@/styles/globals.css';
import { ProvideDek } from '@/hooks/dek';

const roboto = Roboto({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Password Manager',
  description: 'Password manager for CSI 3480.'
};

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <ProvideDek>
            {children}
          </ProvideDek>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
