"use client"; // Add this line at the top of your file

import React, { useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";

import Divider from "@mui/material/Divider";

import Link from "next/link";

import { useTheme, useMediaQuery, Button } from "@mui/material";

import Footer from "@/app/components/footer";

import axiosInstance from "@/app/utility/tools";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { motion, AnimatePresence } from "framer-motion";

// Rest of your code here...

export default function CourseLayout({ children }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const params = useParams();

  const router = useRouter(); // Added for navigation

  const [open, setOpen] = useState(!isMobile);

  const [subjectTopic, setSubjectTopic] = useState([]);

  const [subjectDetail, setSubjectDetail] = useState(null);

  const [expandedChapters, setExpandedChapters] = useState({});

  const [currentTopicIndex, setCurrentTopicIndex] = useState(null);

  // Toggle drawer

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Toggle chapter expansion

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,

      [chapterId]: !prev[chapterId],
    }));
  };

  // Fetch data

  const fetchData = async () => {
    try {
      const topicsResponse = await axiosInstance.get(
        `/topic/by/subject/${params.course_slug}/`
      );

      setSubjectTopic(topicsResponse.data);

      const index = topicsResponse.data.findIndex(
        (topic) => topic.slug === params.topic_slug
      );

      setCurrentTopicIndex(index);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }

    try {
      const subjectResponse = await axiosInstance.get(
        `/subjects/detail/${params.course_slug}/`
      );

      setSubjectDetail(subjectResponse.data);
    } catch (error) {
      console.error("Error fetching subject details:", error);
    }
  };

  useEffect(() => {
    if (params.course_slug) {
      fetchData();
    }
  }, [params.course_slug, params.topic_slug]);

  // Determine next and previous topic

  const previousTopic =
    currentTopicIndex !== null && currentTopicIndex > 0
      ? subjectTopic[currentTopicIndex - 1]
      : null;

  const nextTopic =
    currentTopicIndex !== null && currentTopicIndex < subjectTopic.length - 1
      ? subjectTopic[currentTopicIndex + 1]
      : null;

  // Drawer content

  const drawerContent = (
    <Box sx={{ width: isMobile ? 250 : 300, padding: 2 }} role="presentation">
      {subjectDetail && (
        <Link
          href={`/course/${subjectDetail[0]?.slug}`}
          style={{
            color: "#3f51b5",

            fontWeight: "bold",

            fontSize: "1.5rem",

            padding: "10px 20px",

            backgroundColor: "#e3f2fd",

            borderRadius: "8px",

            textDecoration: "none",

            display: "block",

            textAlign: "center",

            marginBottom: "1rem",
          }}
        >
          {subjectDetail[0]?.title.toLocaleUpperCase()}
        </Link>
      )}

      <List>
        {subjectTopic.map((topics, index) => {
          const chapterId = topics[0]?.chapter.uid;

          const isExpanded = expandedChapters[chapterId] || false;

          return (
            <div key={index}>
              <ListItem
                onClick={() => toggleChapter(chapterId)}
                sx={{
                  display: "flex",

                  justifyContent: "space-between",

                  alignItems: "center",

                  padding: "8px 16px",

                  backgroundColor: isExpanded ? "#e8eaf6" : "transparent",

                  borderRadius: "4px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#3f51b5" }}
                >
                  {topics[0]?.chapter.title}
                </Typography>

                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {topics.map((topic, topicIndex) => (
                      <Link
                        key={topicIndex}
                        href={`/course/content/${params.course_slug}/${topic.slug}`}
                        style={{
                          textDecoration: "none",

                          color:
                            params.topic_slug === topic.slug
                              ? "#3f51b5"
                              : "#555",

                          backgroundColor:
                            params.topic_slug === topic.slug
                              ? "#e8eaf6"
                              : "#f5f5f5",

                          borderRadius: "4px",

                          padding: "8px 16px",

                          display: "block",

                          margin: "4px 0",

                          transition: "background-color 0.3s ease",
                        }}
                      >
                        <Typography variant="body1">
                          {topic.title.toLocaleUpperCase()}
                        </Typography>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <Divider sx={{ margin: "1rem 0" }} />
            </div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: "#3f51b5",

            zIndex: theme.zIndex.drawer + 1,

            position: "sticky",

            width: "100%",
          }}
        >
          <Toolbar sx={{ height: "64px" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Course Topics
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: "flex", marginTop: "64px" }}>
          <Drawer
            variant={isMobile ? "temporary" : "persistent"}
            open={open}
            onClose={toggleDrawer}
            sx={{
              "& .MuiDrawer-paper": {
                width: isMobile ? 250 : 300,

                boxSizing: "border-box",

                marginTop: "64px",
              },
            }}
          >
            {drawerContent}
          </Drawer>

          <Box
            sx={{
              flexGrow: 1,

              padding: 3,

              marginLeft: isMobile ? 0 : "300px",

              transition: "margin 0.3s ease",
            }}
          >
            {children}

            {/* Add the Next and Previous Buttons */}

            <Box
              sx={{
                display: "flex",

                justifyContent: "space-between",

                marginTop: "2rem",
              }}
            >
              {previousTopic ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    router.push(
                      `/course/content/${params.course_slug}/${previousTopic.slug}`
                    )
                  }
                >
                  ← {previousTopic.title}
                </Button>
              ) : (
                <Box />
              )}

              {nextTopic ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    router.push(
                      `/course/content/${params.course_slug}/${nextTopic.slug}`
                    )
                  }
                >
                  {nextTopic.title} →
                </Button>
              ) : (
                <Box />
              )}
            </Box>

            <Footer />
          </Box>
        </Box>
      </Box>
    </>
  );
}
