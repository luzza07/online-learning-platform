import React, { useState, useEffect } from "react";
import {
 
  Typography,
  Stack,
  Avatar,
  Card,
 
  Skeleton,
  CardActionArea,
  useTheme,
  Alert,
  Fade,
  Grow,
  Container,
} from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import axiosInstance from "../utility/tools";
import Grid from "@mui/material/Grid";
import { School } from "@mui/icons-material";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const fetchData = () => {
    setLoading(true);
    axiosInstance
      .get("/list/subjects/")
      .then((response) => {
        setCourses(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load courses. Please try again later.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Explore Our Courses - Enhance Your Learning</title>
        <meta name="description" content="Discover a variety of courses designed to enhance your skills and knowledge. Browse our collection and start learning today!" />
        <meta name="keywords" content="online courses, education, learning platform, skill development" />
        <meta name="author" content="EzExplanation" />
      </Head>
      <Container maxWidth="lg" sx={{ py: 8, minHeight: "100vh" }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12}>
            <Fade in timeout={1000}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  mb: 6,
                  fontWeight: 900,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Explore Our Courses
              </Typography>
            </Fade>
          </Grid>

          <Grid item xs={12}>
            {error && (
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              {(loading ? Array.from(new Array(4)) : courses).map(
                (course, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    {loading ? (
                      <Skeleton
                        variant="rounded"
                        width="100%"
                        height={120}
                        animation="wave"
                      />
                    ) : (
                      course?.is_active && (
                        <Grow in timeout={index * 200 + 800}>
                          <Card
                            sx={{
                              position: "relative",
                              overflow: "hidden",
                              borderRadius: 4,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-8px)",
                                boxShadow: theme.shadows[8],
                                "& .course-gradient": {
                                  opacity: 1,
                                },
                              },
                            }}
                          >
                            <div
                              className="course-gradient"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                                opacity: 0.2,
                                transition: "opacity 0.3s ease",
                              }}
                            />

                            <Link href={`/course/${course.slug}`} passHref>
                              <CardActionArea sx={{ p: 3 }}>
                                <Stack
                                  direction="row"
                                  spacing={3}
                                  alignItems="center"
                                >
                                  <Avatar
                                    src={`https://ezexplanation.com/${course.logo}`}
                                    alt={course.title}
                                    sx={{
                                      width: 80,
                                      height: 80,
                                      bgcolor: theme.palette.primary.main,
                                      "&:hover": {
                                        transform: "rotate(15deg)",
                                      },
                                      transition: "transform 0.3s ease",
                                    }}
                                  >
                                    {!course.logo && <School fontSize="large" />}
                                  </Avatar>

                                  <Stack spacing={1}>
                                    <Typography
                                      variant="h6"
                                      component="h3"
                                      sx={{
                                        fontWeight: 700,
                                        color: theme.palette.text.primary,
                                      }}
                                    >
                                      {course.title}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          course.description ||
                                          "Explore this comprehensive course",
                                      }}
                                    />
                                  </Stack>
                                </Stack>
                              </CardActionArea>
                            </Link>
                          </Card>
                        </Grow>
                      )
                    )}
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}