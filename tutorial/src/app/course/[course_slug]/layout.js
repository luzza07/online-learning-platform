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
import Footer from "../../components/footer";
import axiosInstance from "../../utility/tools";
import { use } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Styled component for content that handles dark mode
const ContentWrapper = styled(Box)(({ theme }) => ({
  '& p, & h1, & h2, & h3, & h4, & h5, & h6, & li, & a, & span, & div': {
    color: `${theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary} !important`,
  },
  '& *': {
    color: 'inherit'
  }
}));

export default function CourseLayout({ children, params: paramsPromise }) {
  const params = use(paramsPromise);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [subjectTopic, setSubjectTopic] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subjectDetail, setSubjectDetail] = useState(null);

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
      })
      .catch((error) => {
        console.log("Error fetching subject details:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [params.course_slug]);

  useEffect(() => {
    if (subjectTopic && subjectTopic.length > 0) {
      console.log(
        "Subject Topic Structure:",
        JSON.stringify(subjectTopic, null, 2)
      );
    }
  }, [subjectTopic]);

  const drawerContent = (
    <Box
      sx={{
        width: isMobile ? 250 : 300,
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
      role="presentation"
      onClick={isMobile ? toggleDrawer(false) : null}
    >
      {subjectDetail && subjectDetail.length > 0 && (
        <Link
          href={`/course/${subjectDetail[0]?.slug}`}
          style={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
            fontSize: "2rem",
            padding: "10px 20px",
            backgroundColor: theme.palette.action.selected,
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center",
          }}
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
                        <Typography sx={{ color: theme.palette.text.primary }}>
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
                          color: theme.palette.primary.main,
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
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                        backgroundColor:
                          params.topic_slug === topic.slug
                            ? theme.palette.action.selected
                            : theme.palette.background.paper,
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
                              color: theme.palette.primary.main,
                            }}
                          />
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: "bold",
                              color: params.topic_slug === topic.slug
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary,
                            }}
                          >
                            {topic.title
                              ? topic.title.toLocaleUpperCase()
                              : "NO TITLE"}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            color: params.topic_slug === topic.slug
                              ? theme.palette.primary.main
                              : theme.palette.text.secondary,
                          }}
                        >
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
            backgroundColor: theme.palette.primary.main,
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
          <Grid size={{ md: 3, sx: 12, sm: 12 }}>
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
                  backgroundColor: theme.palette.background.paper,
                },
              }}
            >
              {drawerContent}
            </Drawer>
          </Grid>
          <Grid
            size={{ md: 8, sx: 12, sm: 12 }}
            sx={{
              flexGrow: 1,
              padding: 3,
              marginLeft: isMobile ? 0 : "350px", // Offset content for drawer width on desktop
              height: "calc(100vh - 64px)", // Full height minus AppBar height
              overflowY: "auto", // Make content scrollable
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
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

            {/* Course Content */}
            <ContentWrapper>{children}</ContentWrapper>
            <Footer />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}