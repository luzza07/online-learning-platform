"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "../utility/tools"; 
import ThemeToggle from "./ThemeToggle";

const pages = ["COURSES", "NEC LICENSE", "YOUTUBE"];
const pageLinks = [
  "course",
  "/neclicense",
  "https://www.youtube.com/@easyexplanation9220",
];

export default function BaseAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseDestinations, setCourseDestinations] = useState({});
  const router = useRouter();

  // Fetch courses and map titles to destinations
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

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
  
      // Fuzzy match: Find the first course that includes the query in its title
      const matchedCourse = Object.entries(courseDestinations).find(([title]) =>
        title.includes(query)
      );
  
      if (matchedCourse) {
        const [, destination] = matchedCourse;
        router.push(destination); // Navigate to the matched course page
      } else {
        router.push(`/search?query=${encodeURIComponent(searchQuery)}`); // Default search page
      }
    }
  };
  

  const handleNavMenuOpen = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white", // Plain white background
        color: "black", // Black text
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)", // Minimal shadow
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and EasyExplanation */}
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <Link href="/">
              <img
                src="/logo/logo.jpg"
                alt="Logo"
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 12,
                  cursor: "pointer",
                }}
              />
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                fontWeight: "bold",
                color: "black",
                textDecoration: "none",
                letterSpacing: 1.2,
              }}
            >
              EasyExplanation
            </Typography>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleNavMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleNavMenuClose}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleNavMenuClose();
                    router.push(
                      page === "YouTube" ? pageLinks[index] : `/${pageLinks[index]}`
                    );
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu - Centered Items */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() =>
                  router.push(
                    page === "YouTube" ? pageLinks[index] : pageLinks[index]
                  )
                }
                sx={{
                  my: 2,
                  color: "black", // Black text
                  fontWeight: "medium",
                  fontSize: "1rem",
                  marginLeft: 2,
                  marginRight: 2,
                  textTransform: "none", // Keeps text simple without uppercase
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" }, // Light hover effect
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Search Bar on the Right */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 0 }}>
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
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#f5f5f5", // Light gray for search bar
                borderRadius: 2,
                width: { xs: "100%", sm: "300px" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#cccccc",
                  },
                },
              }}
            />
            
          </Box>
          <ThemeToggle/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
