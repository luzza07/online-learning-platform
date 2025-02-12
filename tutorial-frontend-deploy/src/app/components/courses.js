import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import axiosInstance from "../utility/tools";
import Grid from "@mui/material/Grid2";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  const fetchData = () => {
    axiosInstance
      .get("/list/subjects/")
      .then((response) => {
        setCourses(response.data);
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
          <img
            src="/background/image5.jpg"
            width="80%"
            height="auto"
            alt="Background"
          />
        </Grid>

        {/* Right side: Course List */}
        <Grid item size={{ md: 6, sm: 12 }}>
          <Grid container spacing={2}>
            {courses.map(
              (course, index) =>
                course.is_active && (
                  <Grid item size={{ md: 6, sm: 12 }} key={index}>
                    <Card sx={{ width: 320 }}>
                      <CardContent>
                        {" "}
                        <Stack direction="row" spacing={2}>
                          <Avatar
                            src={`https://ezexplanation.com/${course.logo}`}
                            alt={course.title}
                            sx={{ width: 70, height: 70 }}
                          />
                          <Typography
                            // variant="h6"
                            component={Link}
                            href={`/course/${course.slug}`}
                            sx={{
                              textDecoration: "none",
                              color: "primary.main",
                              fontWeight: "bold",
                            }}
                          >
                            {course.title}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                )
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
