import React, { useState, useEffect } from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axiosInstance from "../utility/tools";

export default function YouTubeVideoGallery() {
  const [youtubeUrls, setYoutubeUrls] = useState([]);

  const fetchData = () => {
    axiosInstance
      .get("/list/youtube/")
      .then((response) => {
        setYoutubeUrls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching YouTube URLs:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      flexGrow={1}
      sx={{
        alignItems: "center",
        marginTop: 8,
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginBottom: 4, fontWeight: "bold" }}
      >
        Top Playlist
      </Typography>
      <Grid container spacing={4}>
        {youtubeUrls.map((item, index) => {
          const embedUrl = item.url;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                <CardMedia
                  component="iframe"
                  height="250"
                  src={embedUrl}
                  title={`YouTube video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sx={{
                    borderRadius: 2,
                  }}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
