import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
} from "@mui/material";

import { Facebook, YouTube, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const courseSections = [
    {
      title: "Programming Languages and Paradigms",
      id: "programming-languages-and-paradigms",
      index: 0,
    },
    {
      title: "Data Structures and Machine Learning",
      id: "data-structures-and-machine-learning",
      index: 1,
    },
    {
      title: "Web and Internet Technologies",
      id: "web-and-internet-technologies",
      index: 2,
    },
    {
      title: "Networking and Security",
      id: "networking-and-security",
      index: 3,
    },
  ];

  const scrollToAndOpenSection = (sectionId, index) => {
    const topCoursesSection = document.getElementById("top-courses");
    if (topCoursesSection) {
      topCoursesSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const courseCard = document
          .getElementById(sectionId)
          ?.querySelector(".MuiCard-root");
        if (courseCard) {
          courseCard.click();
        } else {
          localStorage.setItem("selectedCourseIndex", index);
          window.location.href = "/";
        }
      }, 500);
    } else {
      localStorage.setItem("selectedCourseIndex", index);
      window.location.href = "/";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: { xs: "2rem 1rem", sm: "3rem 2rem" },
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: "auto",
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* Catalog Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            Catalog
          </Typography>
          {courseSections.map((item, index) => (
            <Typography
              key={index}
              sx={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}
            >
              <Link
                component="button"
                color="inherit"
                underline="hover"
                onClick={() => scrollToAndOpenSection(item.id, item.index)}
                sx={{
                  textAlign: "left",
                  display: "inline-block",
                  cursor: "pointer",
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                ➔ {item.title}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Quick Links Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            Quick Links
          </Typography>
          {[
            { label: "Home", href: "/" },
            { label: "Courses", href: "/course" },
            { label: "NEC License", href: "/neclicense" },
            { label: "YouTube", href: "https://www.youtube.com/@easyexplanation9220" },
          ].map((link, index) => (
            <Typography key={index} sx={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
              <Link
                href={link.href}
                color="inherit"
                underline="hover"
                sx={{
                  display: "inline-block",
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                ➔ {link.label}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Map Location Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            Our Office
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "200px",
              borderRadius: "8px",
              overflow: "hidden",
              border: `1px solid ${theme.palette.divider}`,
              marginBottom: "1.5rem",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.035157864446!2d85.31824907497423!3d27.685308226464123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b4255a79d1%3A0x41453d073175c461!2sInfography%20Technologies!5e0!3m2!1sen!2snp!4v1735306956109!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </Box>
          <Typography sx={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
            Jwagal, Lalitpur, Nepal
          </Typography>
          <Typography sx={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
            Phone: +977-9840143772
          </Typography>
          <Typography sx={{ fontSize: "0.9rem" }}>
            Email:{" "}
            <Link
              href="mailto:info@infographytech.com"
              color="inherit"
              sx={{ "&:hover": { color: theme.palette.primary.main } }}
            >
              info@infographytech.com
            </Link>
          </Typography>
        </Grid>

        {/* About Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
            About
          </Typography>
          {["About Us", "Contact Us", "FAQ"].map((item, index) => (
            <Typography
              key={index}
              sx={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}
            >
              <Link
                href="/contactus"
                color="inherit"
                underline="hover"
                sx={{
                  display: "inline-block",
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                ➔ {item}
              </Link>
            </Typography>
          ))}
          <Box sx={{ marginTop: "1.5rem" }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Support Us
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <IconButton
                href="https://www.facebook.com/InfographyTechnologies"
                color="inherit"
                sx={{ "&:hover": { color: "#3b5998" } }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://www.youtube.com/@easyexplanation9220"
                color="inherit"
                sx={{ "&:hover": { color: "#FF0000" } }}
              >
                <YouTube />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/company/infographytechnologies/"
                color="inherit"
                sx={{ "&:hover": { color: "#0A66C2" } }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          marginTop: "3rem",
          color: theme.palette.text.secondary,
          fontSize: "0.85rem",
        }}
      >
        © 2024 Infography Technologies Pvt. Ltd. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;