"use client";
import { Box, Typography } from "@mui/material";
import CourseList from "../components/courses";
import SloganCarousel from "../components/carousel";
import Footer from "../components/footer";

export default function CourseListPage() {
  return (
    <Box>
      <SloganCarousel />
      <CourseList />
      <Footer />
    </Box>
  );
}
