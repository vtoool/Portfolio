import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ro' }];
}

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  const title = locale === 'ro'
    ? 'Victor Bujor | Inginer de Sisteme'
    : 'Victor Bujor | Systems Engineer';

  const description = locale === 'ro'
    ? 'Construirea de Instrumente Interne și Automatizări cu Focus pe Venituri.'
    : 'Building Revenue-Focused Internal Tools & Automations.';

  return {
    metadataBase: new URL("https://portfolio-next-eight-khaki.vercel.app"),
    title,
    description,
    alternates: {
      languages: {
        'en': '/en',
        'ro': '/ro'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!['en', 'ro'].includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark scroll-smooth">
      <body className={inter.className}>
        <ErrorBoundary>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
