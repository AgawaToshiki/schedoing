'use client'
import SectionField from './components/layouts/SectionField';
import BackToHomeLink from './components/BackToHomeLink';
 
export default function NotFound() {

  return (
    <>
      <div className="w-full min-h-dvh p-6 bg-blue-100">
        <SectionField sectionTitle="404 Not Found">
          <div>
            <p className="mb-2">ページが見つかりませんでした。</p>
            <BackToHomeLink />
          </div>
        </SectionField>
      </div>
    </>

  )
}