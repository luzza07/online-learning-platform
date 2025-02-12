"use client";
import { useEffect } from "react";
export default function AdBanner(props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", overflow: "hidden" }}
      data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENTID}`}
      data-ad-slot="1893951075"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
