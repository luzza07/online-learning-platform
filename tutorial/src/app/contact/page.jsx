"use client";
import ContactForm from "../components/contactForm";
import Footer from "../components/footer";
import { Box, Typography, Grid, Container, Paper ,useTheme} from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";

const ContactPage = () => {
    const theme = useTheme();
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 5, pb: 5 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Grid container spacing={6} alignItems="stretch">
          {/* Left Section - Contact Details */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: "100%" }}>
              <Typography variant="h4" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" gutterBottom>
                Feel free to use the form or drop us an email. Old-fashioned
                phone calls work too.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Phone sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">+977-9840143772</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Email sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">info@infographytech.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <LocationOn sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Jwagal, Lalitpur, Nepal</Typography>
              </Box>
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
            </Paper>
          </Grid>

          {/* Right Section - Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: "100%" }}>
              <ContactForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ContactPage;
