"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";

import axiosInstance from "@/app/utility/tools";

export default function CourseContentPage({ courseSlug }) {
  // console.log(params);
  const course_slug = courseSlug;

  const [subjectDetail, setSubjectDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axiosInstance
      .get(`/subjects/detail/${course_slug}/`)
      .then((response) => {
        setSubjectDetail(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false even if there's an error
      });
  };

  useEffect(() => {
    fetchData();
  }, [courseSlug]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#3f51b5" }}
          >
            {subjectDetail[0]?.title || "Course Material"}
          </Typography>
          <Divider sx={{ marginBottom: "1.5rem" }} />

          <Box
            sx={{
              padding: "1.5rem",
              //   backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              //   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              "& img": {
                maxWidth: "100%", // Make images responsive
                height: "auto",
                margin: "1rem 0",
                borderRadius: "4px", // Slightly round the corners of images
              },
              "& h2": {
                fontWeight: "bold",
                marginTop: "1.5rem",
                color: "#3f51b5",
              },
              "& h3": {
                marginTop: "1.2rem",
                color: "#3f51b5",
              },
              "& p": {
                marginBottom: "1rem",
                lineHeight: "1.6",
                color: "#333", // A slightly darker color for better readability
              },
              // Override the font-family for rich text content
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              "& *": {
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Ensure all child elements use the custom font
              },
            }}
            dangerouslySetInnerHTML={{ __html: subjectDetail[0]?.description }}
          />
        </>
      )}
    </>
  );
}
