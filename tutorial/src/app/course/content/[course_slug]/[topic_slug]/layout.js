"use client";

import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useTheme, useMediaQuery } from "@mui/material";
import Footer from "../../../../components/footer";
import axiosInstance from "../../../../utility/tools";
import { use } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CourseLayout({ children, params: paramsPromise }) {
  const params = use(paramsPromise);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [subjectTopic, setSubjectTopic] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subjectDetail, setSubjectDetail] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const StyledContentWrapper = styled(Box)(({ theme }) => ({
    '& p, & h1, & h2, & h3, & h4, & h5, & h6, & li, & a, & span, & div': {
      color: `${theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary} !important`,
    },
    '& *': {
      color: 'inherit'
    }
  }));

  const currentTopicIndex = subjectTopic
    .flatMap((chapter) => chapter.topic)
    .findIndex((topic) => topic.slug === params.topic_slug);

  const allTopics = subjectTopic.flatMap((chapter) => chapter.topic);
  const nextTopic = allTopics[currentTopicIndex + 1];
  const prevTopic = allTopics[currentTopicIndex - 1];

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic.uid);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const fetchData = () => {
    setLoading(true); // Start loading
    axiosInstance
      .get(`/topic/by/subject/${params.course_slug}/`)
      .then((response) => {
        setSubjectTopic(response.data);
        console.log("Subject topic data:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching subject topics:", error);
      });

    axiosInstance
      .get(`/subjects/detail/${params.course_slug}/`)
      .then((response) => {
        setSubjectDetail(response.data);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.log("Error fetching subject details:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  };

  useEffect(() => {
    fetchData();
  }, [params.course_slug]);

  if (loading) {
    return <Typography>Loading...</Typography>; // Show a loading indicator
  }

  if (!subjectTopic || subjectTopic.length === 0) {
    return <Typography>No topics available.</Typography>; // Fallback if no data
  }

  const drawerContent = (
    <Box
      sx={{ width: isMobile ? 250 : 300, padding: 2 }}
      role="presentation"
      onClick={isMobile ? toggleDrawer(false) : null}
    >
      {subjectDetail && subjectDetail.length > 0 && (
        <Link
          style={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : "#3f51b5",
            fontWeight: "bold",
            fontSize: "2rem",
            padding: "10px 20px",
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "#e3f2fd",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center",
          }}
          href={`/course/${subjectDetail[0]?.slug}`}
        >
          {subjectDetail[0]?.title
            ? subjectDetail[0].title.toLocaleUpperCase()
            : "COURSE"}
        </Link>
      )}
      <List>
        {subjectTopic &&
          subjectTopic.map((chapter, index) => {
            if (!chapter || !chapter.topic || !chapter.topic.length) {
              return (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography color="textPrimary">
                          Chapter information unavailable
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider style={{ margin: "1rem 0" }} />
                </div>
              );
            }

            return (
              <div key={index}>
                <ListItem style={{ display: "flex", alignItems: "center" }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        style={{
                          fontWeight: "bold",
                          color:
                            theme.palette.mode === "dark"
                              ? theme.palette.primary.light
                              : "#3f51b5",
                          margin: 0,
                        }}
                      >
                        {chapter.title || "Untitled Chapter"}
                      </Typography>
                    }
                  />
                </ListItem>

                {/* Topics under this chapter */}
                <ListItem
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {chapter.topic.map((topic, topicIndex) => (
                    <Link
                      key={topicIndex}
                      href={`/course/content/${params.course_slug}/${topic.slug}`}
                      style={{
                        textDecoration: "none",
                        color:
                          params.topic_slug === topic.slug
                            ? theme.palette.mode === "dark"
                              ? theme.palette.primary.light
                              : "#3f51b5"
                            : theme.palette.mode === "dark"
                            ? theme.palette.text.secondary
                            : "#555",
                        backgroundColor:
                          params.topic_slug === topic.slug
                            ? theme.palette.mode === "dark"
                              ? theme.palette.background.paper
                              : "#e8eaf6"
                            : theme.palette.mode === "dark"
                            ? theme.palette.background.default
                            : "#f5f5f5",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        transition: "background-color 0.3s ease",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                      onClick={() => handleTopicClick(topic)}
                    >
                      {params.topic_slug === topic.slug ? (
                        <Box display="flex" alignItems="center">
                          <AdjustIcon
                            sx={{
                              mr: 1,
                              color:
                                theme.palette.mode === "dark"
                                  ? theme.palette.primary.light
                                  : "#3f51b5",
                            }}
                          />
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {topic.title
                              ? topic.title.toLocaleUpperCase()
                              : "NO TITLE"}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body1">
                          {topic.title
                            ? topic.title.toLocaleUpperCase()
                            : "NO TITLE"}
                        </Typography>
                      )}
                    </Link>
                  ))}
                </ListItem>
                <Divider style={{ margin: "1rem 0" }} />
              </div>
            );
          })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, marginTop: 0 }}>
      {isMobile && (
        <AppBar
          position="static"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "#3f51b5",
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ flexFlow: 1 }}>
        <Grid container spacing={2}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Drawer
              variant={isMobile ? "temporary" : "permanent"}
              open={isMobile ? open : true}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 350,
                  boxSizing: "border-box",
                  marginTop: 4,
                  top: 64,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? theme.palette.background.default
                      : "#fff",
                },
              }}
            >
              {drawerContent}
            </Drawer>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={6} sx={{ marginLeft: { md: "350px" }, marginRight: { md: "350px" } }}>
            <Box
              sx={{
                flexGrow: 1,
                padding: 3,
                height: "calc(100vh - 64px)", // Full height minus AppBar height
                overflowY: "auto", // Make content scrollable
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : "#fff",
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : "#000",
              }}
            >
              {/* Next and Previous Buttons */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  disabled={!prevTopic}
                  component={Link}
                  href={`/course/content/${params.course_slug}/${prevTopic?.slug}`}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  disabled={!nextTopic}
                  component={Link}
                  href={`/course/content/${params.course_slug}/${nextTopic?.slug}`}
                >
                  Next
                </Button>
              </Box>

              <StyledContentWrapper>{children}</StyledContentWrapper>
              <Footer />
            </Box>
          </Grid>

          {/* Right Side - Recommended Video and Quiz Button */}
          <Grid item xs={12} md={3} sx={{ position: "fixed", right: 0, top: 64, width: "350px", height: "calc(100vh - 64px)", overflowY: "auto" }}>
            <Box
              sx={{
                padding: 3,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.background.paper
                    : "#f5f5f5",
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : "#000",
              }}
            >
              {/* Recommended YouTube Video */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Recommended Video
                </Typography>
                <iframe
                  width="100%"
                  height="200"
                  src="https://www.youtube.com/embed/93wuRtpftgY"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <iframe
                  width="100%"
                  height="200"
                  src="https://www.youtube.com/embed/8JIlH4OAB_Q&list=PLYwrDCC_pg4F2CGFmMByWEWgIBQnk1vXM"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <iframe
                  width="100%"
                  height="200"
                  src="https://www.youtube.com/embed/93wuRtpftgY"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>

              {/* Quiz Button */}
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  href="/quiz"
                  sx={{ fontSize: '1.2rem', padding: '10px 20px', width: '100%' }}
                >
                  Take Quiz
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}