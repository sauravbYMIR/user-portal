// app/providers.js

'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { cookieConsentGiven } from '@/components/CookieModal/CookieModal';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    persistence:
      cookieConsentGiven() === 'yes' ? 'localStorage+cookie' : 'memory',
    person_profiles: 'identified_only', // or 'always' to create profiles for all users only
    // capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  if (cookieConsentGiven() === 'yes') {
    posthog.identify();
  }
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
