"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AdjustIcon from "@mui/icons-material/Adjust";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTheme, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/app/components/footer";
import axiosInstance from "@/app/utility/tools";

export default function CourseLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const params = useParams();
  
  const [open, setOpen] = useState(!isMobile);
  const [subjectTopic, setSubjectTopic] = useState([]);
  const [subjectDetail, setSubjectDetail] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [currentTopicIndex, setCurrentTopicIndex] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicsResponse = await axiosInstance.get(`/topic/by/subject/${params.course_slug}/`);
        setSubjectTopic(topicsResponse.data);

        const subjectResponse = await axiosInstance.get(`/subjects/detail/${params.course_slug}/`);
        setSubjectDetail(subjectResponse.data);
        
        // Find current topic index
        if (params.topic_slug) {
          const allTopics = topicsResponse.data.flat();
          const currentIndex = allTopics.findIndex((topic) => topic.slug === params.topic_slug);
          setCurrentTopicIndex(currentIndex);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (params.course_slug) {
      fetchData();
    }
  }, [params.course_slug, params.topic_slug]);

  // Toggle drawer
  const toggleDrawer = () => setOpen(!open);

  // Toggle chapter expansion
  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Get previous and next topics
  const previousTopic = currentTopicIndex !== null && currentTopicIndex > 0
    ? subjectTopic.flat()[currentTopicIndex - 1]
    : null;
  const nextTopic = currentTopicIndex !== null && currentTopicIndex < subjectTopic.flat().length - 1
    ? subjectTopic.flat()[currentTopicIndex + 1]
    : null;

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#3f51b5", zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            {subjectDetail ? subjectDetail[0]?.title.toUpperCase() : "Loading..."}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", marginTop: "64px" }}>
        {/* Sidebar */}
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
          <Box sx={{ width: "100%", padding: 2 }}>
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
                {subjectDetail[0]?.title.toUpperCase()}
              </Link>
            )}
            <List>
              {subjectTopic.map((topics, index) => {
                const chapterId = topics[0]?.chapter.uid;
                const isExpanded = expandedChapters[chapterId] || false;

                return (
                  <div key={index}>
                    <ListItem button onClick={() => toggleChapter(chapterId)}>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
                            {topics[0]?.chapter.title}
                          </Typography>
                        }
                      />
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
                                color: params.topic_slug === topic.slug ? "#3f51b5" : "#555",
                                backgroundColor: params.topic_slug === topic.slug ? "#e8eaf6" : "#f5f5f5",
                                borderRadius: "4px",
                                padding: "8px 16px",
                                display: "block",
                                margin: "4px 0",
                              }}
                            >
                              <AdjustIcon sx={{ mr: 1, color: params.topic_slug === topic.slug ? "#3f51b5" : "#555" }} />
                              {topic.title.toUpperCase()}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Divider sx={{ my: 1 }} />
                  </div>
                );
              })}
            </List>
          </Box>
        </Drawer>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, padding: 3, marginLeft: isMobile ? 0 : "300px" }}>
          {children}

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            {previousTopic ? (
              <Link href={`/course/content/${params.course_slug}/${previousTopic.slug}`}>
                <Button variant="contained" color="primary">
                  ← {previousTopic.title.toUpperCase()}
                </Button>
              </Link>
            ) : (
              <Box />
            )}

            {nextTopic ? (
              <Link href={`/course/content/${params.course_slug}/${nextTopic.slug}`}>
                <Button variant="contained" color="primary">
                  {nextTopic.title.toUpperCase()} →
                </Button>
              </Link>
            ) : (
              <Box />
            )}
          </Box>

          <Footer />
        </Box>
      </Box>
    </>
  );
}
