import React from "react";
import localFont from "next/font/local";
import BaseAppBar from "./components/baseAppbar";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import Head from "next/head";
import AdBanner from "./components/adbanner";
import GoogleAdSense from "./components/adsense";
import GoogleAnalytics from "./components/googleanalytics";

import "./globals.css";
import { ThemeProviderWrapper } from "./context/ThemeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Easy Explanation online web tutorials",
  description:
    "Explore comprehensive computer science tutorials and programming resources on our platform. Learn programming languages such as Python, Java, and JavaScript. Master data structures, algorithms, and web development. Enhance your coding skills with hands-on examples, practical projects, and expert guidance. Whether you're a beginner or an experienced developer, discover valuable insights to excel in the world of computer science. Start your coding journey with our engaging and educational tutorials today.",
  keywords:
    "computer science tutorials, programming languages, coding tutorials, Python tutorials, Java programming, JavaScript learning, data structures, algorithms, web development, coding projects, programming for beginners, software development, coding skills, programming education, learn coding online, computer science resources, coding practice, programming exercises, coding projects for students, programming community, tech tutorials",
  author: "Infography Technologies",
  icons: {
    icon: "https://yt3.googleusercontent.com/u-7NgX9EATY6VnW6w2Ux0bRlkeEi8-IdUZujnrOwRj6nGc6RRd3aK45mcDK958okYu5kTmnK7Q=s900-c-k-c0x00ffffff-no-rj",
  },
};

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <GoogleAnalytics />

      <ThemeProviderWrapper>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <AdBanner />
          <Grid container spacing={2} rowSpacing={4}>
            <Grid size={12} marginBottom={6}>
              <Box>
                <BaseAppBar />
              </Box>
            </Grid>
            <Grid container spacing={2}>
              <Grid item size={{ md: 12, sm: 12 }}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </body>
      </ThemeProviderWrapper>
      <GoogleAdSense />
    </html>
  );
}
