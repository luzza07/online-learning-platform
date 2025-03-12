"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import axiosInstance from "../utility/tools";
import ThemeToggle from "./ThemeToggle";

const pages = ["HOME", "COURSES", "NEC LICENSE", "YOUTUBE"];
const pageLinks = [
  "/",
  "/course",
  "/neclicense",
  "https://www.youtube.com/@easyexplanation9220",
];

export default function BaseAppBar() {
  const theme = useTheme();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [courseDestinations, setCourseDestinations] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/list/subjects/");
        const courses = response.data;

        const mapping = {};
        courses.forEach((course) => {
          if (course.is_active) {
            mapping[course.title.toLowerCase()] = `/course/${course.slug}`;
          }
        });

        setCourseDestinations(mapping);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      const matchedCourse = Object.entries(courseDestinations).find(([title]) =>
        title.includes(query)
      );

      router.push(
        matchedCourse
          ? matchedCourse[1]
          : `/search?query=${encodeURIComponent(searchQuery)}`
      );
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo - Aligned to the Left */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/">
              <img
                src="/logo/logo.jpg"
                alt="Logo"
                style={{
                  width: 45,
                  height: 45,
                  marginRight: 10,
                  borderRadius: "50%",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Link>
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                textDecoration: "none",
                letterSpacing: 1,
              }}
            >
              EasyExplanation
            </Typography>
          </Box>

          {/* Desktop Navigation - Centered */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => router.push(pageLinks[index])}
                sx={{
                  mx: 2,
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  padding: "6px 16px",
                  transition: "border-bottom 0.3s ease-in-out",
                  borderBottom:
                    pathname === pageLinks[index]
                      ? `2px solid ${theme.palette.primary.main}`
                      : "none",
                  "&:hover": {
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Search Bar & Theme Toggle - Aligned to the Right */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Search Bar */}
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "#f0f0f0"
                    : "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                width: { xs: "100%", sm: "260px" },
                marginRight: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.text.secondary,
                  },
                },
              }}
            />

            {/* Theme Toggle */}
            <ThemeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
