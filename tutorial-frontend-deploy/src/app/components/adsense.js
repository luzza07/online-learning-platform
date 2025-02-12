import Script from "next/script";
export default function GoogleAdSense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENTID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
