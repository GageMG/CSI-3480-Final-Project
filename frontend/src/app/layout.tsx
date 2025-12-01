import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import ThemeProvider from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/Sonner';

import { ProvideDek } from '@/hooks/dek';
import { ProvideUser } from '@/hooks/user';

import '@/styles/globals.css';

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
            <ProvideUser>
              {children}
            </ProvideUser>
          </ProvideDek>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

export default RootLayout;
