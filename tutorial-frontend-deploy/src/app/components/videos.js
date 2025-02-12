import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box flexGrow={1} sx={{ alignItems: "center", marginTop: 8, margin: 2 }}>
      <Grid container spacing={4}>
        {/* Left side: Image */}
        <Grid item size={{ md: 6, sm: 12 }}>
          <Grid container spacing={4}>
            {" "}
            {youtubeUrls.map((item, index) => {
              // const videoId = url.split("v=")[1];
              // const embedUrl = `https://www.youtube.com/embed/${videoId}`;
              const embedUrl = item.url;

              return (
                <Grid item size={{ md: 6 }} key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="iframe"
                      height="200"
                      src={embedUrl}
                      title={`YouTube video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        {/* Right side: Course List */}
        <Grid item size={{ md: 6, sm: 12 }}>
          <img
            src="/background/image4.jpg"
            width="80%"
            height="auto"
            alt="Background"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
