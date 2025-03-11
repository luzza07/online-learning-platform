"use client";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { Slide, Fade } from "@mui/material";

import SloganCarousel from "./components/carousel";
import Footer from "./components/footer";
import CourseList from "./components/courses";
import YouTubeVideoGallery from "./components/videos";
import TopCourses from "./components/TopCourses";
import ThemeToggle from "./components/ThemeToggle";

function RootPage() {
  const router = useRouter();
  const [fadeIn, setFadeIn] = useState(false);

  // Triggering fade-in effect after initial render
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Box>
      <Fade in={fadeIn} timeout={1500}>
        <Grid container spacing={4} sx={{ px: 2 }}>
          {/* Slogan Carousel Section */}
          <Grid item xs={12} md={12}>
            <Slide direction="down" in={fadeIn} timeout={1000}>
              <Box>
                <SloganCarousel />
              </Box>
            </Slide>
          </Grid>

          {/* Top Courses Section */}
          <Grid item xs={12} md={12}>
            <Slide direction="up" in={fadeIn} timeout={1000}>
              <Box>
                <TopCourses />
              </Box>
            </Slide>
          </Grid>

          {/* YouTube Video Gallery Section */}
          <Grid item xs={12} md={12}>
            <Slide direction="up" in={fadeIn} timeout={1200}>
              <Box>
                <YouTubeVideoGallery />
              </Box>
            </Slide>
          </Grid>

          {/* Footer Section */}
          <Grid item xs={12} md={12}>
            <Fade in={fadeIn} timeout={1500}>
              <Box>
                <Footer />
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Fade>
    </Box>
  );
}

export default RootPage;
