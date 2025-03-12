import React from "react";
import localFont from "next/font/local";
import BaseAppBar from "./components/baseAppbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AdBanner from "./components/adbanner";
import GoogleAdSense from "./components/adsense";
import GoogleAnalytics from "./components/googleanalytics";
import "./globals.css";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import BasicPopover from "./components/popover";
import { QuizContextProvider } from "./quiz/QuizContext";

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

export default function RootLayout({ children }) {
  // Check if components exist before rendering
  const hasGoogleAnalytics = typeof GoogleAnalytics === 'function';
  const hasAdBanner = typeof AdBanner === 'function';
  const hasBaseAppBar = typeof BaseAppBar === 'function';
  const hasBasicPopover = typeof BasicPopover === 'function';
  const hasGoogleAdSense = typeof GoogleAdSense === 'function';
  
  return (
    <ThemeProviderWrapper>
      <html lang="en">
        <head>
          {/* In Next.js App Router, you don't need a Head component */}
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />
          <meta name="author" content={metadata.author} />
          <link rel="icon" href={metadata.icons.icon} />
        </head>
        {hasGoogleAnalytics && <GoogleAnalytics />}
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {hasAdBanner && <AdBanner />}
          <Grid container spacing={2} rowSpacing={4}>
            <Grid item xs={12} sx={{ marginBottom: 6 }}>
              <Box>
                {hasBaseAppBar && <BaseAppBar />}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <QuizContextProvider>
                    {children}
                  </QuizContextProvider>
                  {hasBasicPopover && <BasicPopover />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </body>
        {hasGoogleAdSense && <GoogleAdSense />}
      </html>
    </ThemeProviderWrapper>
  );
}