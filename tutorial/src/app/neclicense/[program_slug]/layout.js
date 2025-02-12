"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import AdjustIcon from "@mui/icons-material/Adjust";

import { useTheme, useMediaQuery } from "@mui/material";
import Footer from "@/app/components/footer";
// import Footer from "../components/footer";
import axiosInstance from "@/app/utility/tools";
// import axiosInstance from "../utility/tools";

export default function CourseLayout({ children, params }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [subjectTopic, setSubjectTopic] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [subjectDetail, setSubjectDetail] = useState(null);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic.uid); // Update selected topic on click
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const fetchData = () => {
    axiosInstance
      .get(`/nec/exam/topic/list/${params.program_slug}/`)
      .then((response) => {
        setSubjectTopic(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosInstance
      .get(`/nec/exam/program/detail/${params.program_slug}/`)
      .then((response) => {
        setSubjectDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const drawerContent = (
    <Box
      sx={{ width: isMobile ? 250 : 300, padding: 2 }}
      role="presentation"
      onClick={isMobile ? toggleDrawer : null}
    >
      {subjectDetail && (
        <Link
          variant="h1"
          style={{
            color: "#3f51b5",
            fontWeight: "bold",
            fontSize: "2rem",
            padding: "10px 20px",
            backgroundColor: "#e3f2fd",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            textAlign: "center",
          }}
          href={`/course/${subjectDetail[0]?.slug}`}
        >
          {subjectDetail[0]?.title.toLocaleUpperCase()}
        </Link>
      )}
      <List>
        {subjectTopic &&
          subjectTopic.map((topics, index) => (
            <div key={index}>
              <ListItem style={{ display: "flex", alignItems: "center" }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        margin: 0,
                      }}
                    >
                      {topics[0]?.chapter.title}
                    </Typography>
                  }
                />
              </ListItem>

              {/* Topics under this chapter */}
              <ListItem
                style={{
                  paddingLeft: "2rem",
                  display: "flex",
                  flexWrap: "wrap", // Keeps topics in a single line and wraps as needed
                  gap: "8px", // Adds spacing between topics
                }}
              >
                {topics.map((topic, topicIndex) => (
                  <Link
                    key={topicIndex}
                    href={`/neclicense/content/${params.program_slug}/${topic.slug}`}
                    style={{
                      textDecoration: "none",
                      color:
                        params.topic_slug === topic.slug ? "#3f51b5" : "#555",
                      backgroundColor:
                        params.topic_slug === topic.slug
                          ? "#e8eaf6"
                          : "#f5f5f5", // Highlight selected topic
                      borderRadius: "4px",
                      padding: "6px 12px", // Adds padding for better visual
                      transition: "background-color 0.3s ease", // Smooth hover transition
                      display: "inline-flex", // Keeps links in a single line
                      alignItems: "center",
                    }}
                    onClick={() => handleTopicClick(topic)}
                  >
                    {params.topic_slug === topic.slug ? (
                      <Box display="flex" alignItems="center">
                        <AdjustIcon sx={{ mr: 1, color: "#3f51b5" }} />
                        <Typography
                          variant="body1"
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {topic.title.toLocaleUpperCase()}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body1">
                        {topic.title.toLocaleUpperCase()}
                      </Typography>
                    )}
                  </Link>
                ))}
              </ListItem>
              <Divider style={{ margin: "1rem 0" }} />
            </div>
          ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, marginTop: 0 }}>
      {isMobile && (
        <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
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

            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/">Easy Explanation</Link>
            </Typography>
            <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ flexFlow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ md: 3, sx: 12 }}>
            {" "}
            <Drawer
              variant={isMobile ? "temporary" : "permanent"}
              open={isMobile ? open : true}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 350,
                  boxSizing: "border-box",
                  marginTop: 4,
                  // position: "fixed",
                  top: 64,
                },
              }}
            >
              {drawerContent}
            </Drawer>
          </Grid>
          <Grid
            size={{ md: 8, sx: 12 }}
            sx={{
              flexGrow: 1,
              padding: 3,
              marginLeft: isMobile ? 0 : "340px", // Offset content for drawer width on desktop
              height: "calc(100vh - 64px)", // Full height minus AppBar height
              overflowY: "auto", // Make content scrollable
            }}
          >
            {" "}
            {children}
            <Footer />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
