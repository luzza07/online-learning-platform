import React from "react";
import { Box, Container, Link, Typography, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#172d13",
        color: "white",
        py: 4,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* About Us Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Explore the vast world of computer science with our comprehensive
              tutorials and resources. Whether you're a beginner taking your
              first steps into coding or an experienced programmer seeking
              advanced knowledge, our curated content covers a wide range of
              computer science-related subjects. Dive into programming
              languages, algorithms, data structures, artificial intelligence,
              machine learning, web development, and more. Stay curious, keep
              coding, and empower yourself with the skills to thrive in the
              dynamic field of computer science. Happy learning!.
            </Typography>
          </Grid>

          {/* Important Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Important Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
            </Box>
            <Box>
              <Link href="/about" color="inherit" underline="hover">
                About Us
              </Link>
            </Box>
            <Box>
              <Link href="/services" color="inherit" underline="hover">
                Services
              </Link>
            </Box>
            <Box>
              <Link href="/contact" color="inherit" underline="hover">
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              <br />
              Jwagal,Lalitpur,Nepal
              <br />
              Phone: +977-9840143772
              <br />
              Email: info@infographytech.com
            </Typography>
            <Box sx={{ mt: 1 }}>
              <IconButton
                href="https://www.facebook.com/InfographyTechnologies"
                target="_blank"
                color="inherit"
              >
                <Facebook />
              </IconButton>
              {/* <IconButton
                href="https://twitter.com"
                target="_blank"
                color="inherit"
              >
                <Twitter />
              </IconButton> */}
              <IconButton
                href="https://www.linkedin.com/company/infographytechnologies/?viewAsMember=true"
                target="_blank"
                color="inherit"
              >
                <LinkedIn />
              </IconButton>
              {/* <IconButton
                href="https://instagram.com"
                target="_blank"
                color="inherit"
              >
                <Instagram />
              </IconButton> */}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Infography Technologies Pvt Ltd. All
            rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
