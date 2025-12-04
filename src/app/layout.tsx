import '@/styles/global.css';

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Toaster } from 'sonner';

import CookieModal from '@/components/CookieModal/CookieModal';
import { PHProvider } from '@/utils/PHProvider';
import Providers from '@/utils/providers';

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Medipath',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/drfasttrackfavicon.ico',
    },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      />
      <PHProvider>
        <body>
          <iframe
            id="myIframe"
            src={`${process.env.NEXT_PUBLIC_WEBFLOW_URL}`}
            style={{ display: 'none' }}
            title="Webflow Communication Iframe"
          />
          <PostHogPageView />
          <CookieModal />
          <Toaster position="top-center" richColors closeButton />
          <Providers>{props.children}</Providers>
        </body>
      </PHProvider>
    </html>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
