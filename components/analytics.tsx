import Script from 'next/script'

// Optional third-party analytics. Nothing loads unless the matching environment variable is
// set in Vercel (Project → Settings → Environment Variables):
//   NEXT_PUBLIC_GA_MEASUREMENT_ID   e.g. G-XXXXXXXXXX  (Google Analytics 4)
//   NEXT_PUBLIC_CLARITY_PROJECT_ID  e.g. abcd1234ef    (Microsoft Clarity)
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
const SAFE_ID = /^[A-Za-z0-9-]+$/

export function ThirdPartyAnalytics() {
  return (
    <>
      {GA_ID && SAFE_ID.test(GA_ID) && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {CLARITY_ID && SAFE_ID.test(CLARITY_ID) && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}
    </>
  )
}
