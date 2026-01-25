import { notFound } from 'next/navigation';

export async function getMessages(locale: string) {
  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'ro'].includes(locale)) {
    notFound();
  }

  return (await import(`./messages/${locale}.json`)).default;
}

