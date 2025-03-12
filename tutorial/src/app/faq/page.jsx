"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Container,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  Button,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import Footer from "../components/footer";
import pic from "../../../public/background/faq.png"; // Your image
import faqsData from "./faqs.json"; // Importing the JSON file

const FAQPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 13;

  // Filtered FAQs based on search query
  const filteredFAQs = faqsData.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate the FAQs
  const paginatedFAQs = filteredFAQs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 5, pb: 5, position: "relative" }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            color: "text.primary",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            transition: "color 0.3s ease",
          }}
        >
          Frequently Asked Questions
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search question here"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 4,
            backgroundColor: "background.default",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        />

        <Grid container spacing={4}>
          {/* FAQ Section */}
          <Grid item xs={12} md={7}>
            {paginatedFAQs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  mb: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ color: "text.primary" }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "text.secondary" }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={5}>
            <Image
              src={pic}
              alt="FAQ Background"
              layout="responsive"
              width={600}
              height={400}
              objectFit="cover"
              quality={100}
            />
          </Grid>
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(filteredFAQs.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>

        {/* Contact Section */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "text.primary",
              textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            Still have questions?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/contact"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              padding: "12px 24px",
              letterSpacing: "1px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default FAQPage;
