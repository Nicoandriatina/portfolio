import type { Metadata } from 'next'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import '../globals.css'

export const metadata: Metadata = {
  title: 'Nico - Portfolio JavaScript Developer ',
  description: 'Portfolio of Nico, JavaScript Developer specialized in React, Next.js and React Native',
  icons: {
    icon: '/icon.jpg',
  },
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Await params pour Next.js 15+
  const {locale} = await params;
  const messages = await getMessages();
 
  return (
    <html lang={locale} className="scroll-smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}