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
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";

import SloganCarousel from "./components/carousel";
import Footer from "./components/footer";
import CourseList from "./components/courses";
import YouTubeVideoGallery from "./components/videos";

function RootPage() {
  return (
    <Box>
      {" "}
      <Grid container spacing={2}>
        <Grid item size={{ md: 12, sm: 12 }}>
          <SloganCarousel />
        </Grid>
        <Grid item size={{ md: 12, sm: 12 }}>
          {" "}
          <CourseList />
        </Grid>
        <Grid item size={{ md: 12, sm: 12 }}>
          <YouTubeVideoGallery />
        </Grid>
        <Grid item size={{ md: 12, sm: 12 }}>
          {" "}
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}
export default RootPage;
