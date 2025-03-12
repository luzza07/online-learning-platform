import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";

const courses = [
  {
    title: "Programming Languages and Paradigms",
    subtopics: [
      {
        name: "C Programming",
        image: "/course/C-Programming.png",
        shortDesc: "C is a powerful and foundational programming language...",
      },
      {
        name: "Python Programming",
        image: "/course/Python.png",
        shortDesc: "Python is a versatile and beginner-friendly language...",
      },
      {
        name: "OOP (Object Oriented Programming)",
        image: "/course/OOPs.png",
        shortDesc: "OOP organizes code using objects and classes...",
      },
    ],
  },
  {
    title: "Data Structures and Machine Learning",
    subtopics: [
      {
        name: "Data Structures and Algorithm",
        image: "/course/dsa.png",
        shortDesc: "DSA is the foundation of efficient problem-solving...",
      },
      {
        name: "Database Management System",
        image: "/course/dbms.png",
        shortDesc: "A DBMS is essential for organizing and storing data...",
      },
      {
        name: "Big Data Technologies",
        image: "/course/bigData.png",
        shortDesc:
          "Big Data technologies enable large-scale data processing...",
      },
    ],
  },
  {
    title: "Web and Internet Technologies",
    subtopics: [
      {
        name: "Web Technology",
        image: "/course/webtech.png",
        shortDesc: "Web technologies power modern websites and applications...",
      },
      {
        name: "Internet and Intranet",
        image: "/course/interintra.png",
        shortDesc:
          "The internet connects the world, while intranets provide private networks...",
      },
      {
        name: "E-Governance",
        image: "/course/egovernance.png",
        shortDesc:
          "E-Governance leverages digital technologies for public administration...",
      },
    ],
  },
  {
    title: "Networking and Security",
    subtopics: [
      {
        name: "Computer Network and Security",
        image: "/course/computernw.png",
        shortDesc: "Ensuring secure and reliable computer networks...",
      },
      {
        name: "Network Security and Analysis",
        image: "/course/nwsecurity.png",
        shortDesc: "Protecting digital networks from cyber threats...",
      },
      {
        name: "Distributed System",
        image: "/course/distributed.png",
        shortDesc:
          "Understanding systems that distribute computing across multiple machines...",
      },
    ],
  },
];

const TopCourses = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const router = useRouter();
  const theme = useTheme();

  // Check for localStorage on component mount
  useEffect(() => {
    // Check if there's a stored course index from the footer navigation
    const storedIndex = localStorage.getItem("selectedCourseIndex");
    if (storedIndex !== null) {
      setSelectedCourseIndex(parseInt(storedIndex));
      // Clear it after use
      localStorage.removeItem("selectedCourseIndex");
    }
  }, []);

  const handleToggle = (index) => {
    setSelectedCourseIndex(selectedCourseIndex === index ? null : index);
  };

  const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  const handleSubtopicClick = (subtopicName) => {
    router.push(`/course/${generateSlug(subtopicName)}`);
  };

  return (
    <div style={{ margin: "40px 0", padding: "0 10px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
      >
        Top Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            id={generateSlug(course.title)}
          >
            <Card
              sx={{
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                transition: "transform 0.3s ease",
                height: "100px",
                cursor: "pointer",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={() => handleToggle(index)}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: 500, color: theme.palette.text.primary }}
                >
                  {course.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedCourseIndex !== null && (
        <Box
          sx={{
            marginTop: "30px",
            padding: "30px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {courses[selectedCourseIndex].title}
          </Typography>
          <Grid container spacing={3}>
            {courses[selectedCourseIndex].subtopics.map(
              (subtopic, subIndex) => (
                <Grid item xs={12} sm={6} md={4} key={subIndex}>
                  <Card
                    onClick={() => handleSubtopicClick(subtopic.name)}
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <CardContent>
                      <img
                        src={subtopic.image}
                        alt={subtopic.name}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ marginTop: "10px", fontWeight: "500" }}
                      >
                        {subtopic.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginTop: "8px" }}
                      >
                        {subtopic.shortDesc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default TopCourses;