import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles"; // Import useTheme hook

const courses = [
  {
    title: "Programming Languages and Paradigms",
    subtopics: [
      {
        name: "C Programming",
        image: "/course/C-Programming.png", // Replace with actual image URL
        shortDesc: "C is a powerful and foundational programming language...",
      },
      {
        name: "Python Programming",
        image: "/course/Python.png", // Replace with actual image URL
        shortDesc: "Python is a versatile and beginner-friendly language...",
      },
      {
        name: "OOP(Object Oriented Programming)",
        image: "/course/OOPs.png", // Replace with actual image URL
        shortDesc: "OOP is a programming paradigm that organizes code...",
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
        shortDesc: "A DBMS is essential for organizing, storing...",
      },
      {
        name: "Big Data Technologies",
        image: "/course/bigData.png",
        shortDesc: "Big Data technologies enable the processing...",
      },
    ],
  },
  {
    title: "Web and Internet Technologies",
    subtopics: [
      {
        name: "Web Technology",
        image: "/course/webtech.png",
        shortDesc: "Web technologies are the building blocks...",
      },
      {
        name: "Internet and Intranet",
        image: "/course/interintra.png",
        shortDesc: "The internet connects the world...",
      },
      {
        name: "E-Governance",
        image: "/course/egovernance.png",
        shortDesc: "E-Governance uses digital technologies...",
      },
    ],
  },
  {
    title: "Networking and Security",
    subtopics: [
      {
        name: "Computer Network and Security",
        image: "/course/computernw.png", // Replace with actual image URL
        shortDesc: "Computer network and security focus on connecting...",
      },
      {
        name: "Network Security and Analysis",
        image: "/course/nwsecurity.png", // Replace with actual image URL
        shortDesc: "Network security and analysis involve protecting...",
      },
      {
        name: "Distributed System",
        image: "/course/distributed.png", // Replace with actual image URL
        shortDesc: "Distributed systems involve multiple computers...",
      },
    ],
  },
];

const TopCourses = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const router = useRouter();
  const theme = useTheme(); // Use the useTheme hook to access the current theme

  const handleToggle = (index) => {
    setSelectedCourseIndex(selectedCourseIndex === index ? null : index);
  };

  // This function will generate the slug based on the course name
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleSubtopicClick = (subtopicName) => {
    const slug = generateSlug(subtopicName);
    router.push(`/course/${slug}`); // Navigate to the designated course page
  };

  return (
    <div style={{ margin: "40px 0", padding: "0 10px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ fontWeight: "bold", color: theme.palette.primary.main }}
      >
        Top Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              style={{
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
                  style={{
                    textAlign: "center",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                  }}
                >
                  {course.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Subtopics Section */}
      {selectedCourseIndex !== null && (
        <Box
          sx={{
            marginTop: "30px",
            padding: "30px",
            backgroundColor: theme.palette.background.paper, // Dynamic background color based on theme
            borderRadius: "10px",
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            {courses[selectedCourseIndex].title}
          </Typography>
          <Grid container spacing={3}>
            {courses[selectedCourseIndex].subtopics.map(
              (subtopic, subIndex) => (
                <Grid item xs={12} sm={6} md={4} key={subIndex}>
                  <Card
                    onClick={() => handleSubtopicClick(subtopic.name)}
                    style={{
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
                        style={{ marginTop: "10px", fontWeight: "500" }}
                      >
                        {subtopic.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ marginTop: "8px" }}
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
