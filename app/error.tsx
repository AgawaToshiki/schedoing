'use client';
import { useEffect } from 'react';
import SectionField from './components/layouts/SectionField';
import BackToHomeLink from './components/BackToHomeLink';

export default function Error({
  error
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="w-full min-h-screen p-6 bg-blue-100">
        <SectionField sectionTitle="Error">
          <div>
            <p className="mb-2">{error.message}</p>
            <BackToHomeLink />
          </div>
        </SectionField>
      </div>
    </>
  );
}