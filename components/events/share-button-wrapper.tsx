"use client";

import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR
const SocialShareSection = dynamic(
  () => import('@/components/events/social-share-section'),
  { ssr: false }
);

interface ShareButtonWrapperProps {
  title: string;
}

export default function ShareButtonWrapper({ title }: ShareButtonWrapperProps) {
  return <SocialShareSection title={title} />;
}
