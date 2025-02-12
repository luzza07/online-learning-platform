import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

const courses = [
  {
    title: 'Programming Languages and Paradigms',
    subtopics: [
      {
        name: 'C Programming',
        image: '/course/C-Programming.png', // Replace with actual image URL
        shortDesc: 'C is a powerful and foundational programming language that serves as the backbone for many modern technologies. Learning C enhances your understanding of how computers work and equips you with skills to build efficient, high-performance applications.',
      },
      {
        name: 'Python Programming',
        image: '/course/Python.png', // Replace with actual image URL
        shortDesc: 'Python is a versatile and beginner-friendly language used in web development, data science, automation, and more. Its simple syntax and powerful libraries make it an excellent choice for both beginners and experienced developers looking to solve real-world problems efficiently.',
      },
      {
        name: 'OOP(Object Oriented Programming)',
        image: '/course/OOPs.png', // Replace with actual image URL
        shortDesc: 'OOP is a programming paradigm that organizes code into reusable objects, making it easier to manage and scale complex software systems. By learning OOP, you gain the skills to design cleaner, more efficient code that mirrors real-world structures.',
      },
      
    ],
  },
  {
    title: 'Data Structures and Machine Learning',
    subtopics: [
      {
        name: 'Data Structures and Algorithm',
        image: '/course/dsa.png',
        shortDesc: 'DSA is the foundation of efficient problem-solving in programming. Mastering DSA helps you solve complex problems, optimize performance, and write scalable code by choosing the right data structures and algorithms for different tasks.',
      },
      {
        name: 'Database Management System',
        image: '/course/dbms.png',
        shortDesc: 'A DBMS is essential for organizing, storing, and managing large amounts of data efficiently. Learning DBMS helps you understand how to design, query, and maintain databases, which are crucial for building scalable and reliable applications.',
      },
      {
        name: 'Big Data Technologies',
        image: '/course/bigData.png',
        shortDesc: 'Big Data technologies enable the processing and analysis of vast amounts of data at high speed. By mastering tools like Hadoop, Spark, and NoSQL databases, you can unlock valuable insights from large data sets, driving innovation and informed decision-making in any industry.',
      },
    ],
  },
  {
    title: 'Web and Internet Technologies',
    subtopics: [
      {
        name: 'Web Technology',
        image: '/course/webtech.png',
        shortDesc: 'Web technologies are the building blocks for creating dynamic and interactive websites and applications. Learning web technologies like HTML, CSS, JavaScript, and frameworks helps you design user-friendly, responsive websites that power the modern internet experience.',
      },
      {
        name: 'Internet and Intranet',
        image: '/course/interintra.png',
        shortDesc: 'The internet connects the world, enabling global communication and access to information, while intranets provide secure, private networks for organizations. Understanding both helps you leverage the full potential of online connectivity and internal data sharing in business environments.',
      },
      {
        name: 'E-Governance',
        image: '/course/egovernance.png',
        shortDesc: ' E-Governance uses digital technologies to improve government services, enhance transparency, and engage citizens. It aims to make government processes more efficient, accessible, and accountable through online platforms.',
      },
    ],
  },
  {
    title: 'Networking and Security',
    subtopics: [
      {
        name: 'Computer Network and Security',
        image: '/course/computernw.png', // Replace with actual image URL
        shortDesc: 'Computer network and security focus on connecting systems and ensuring their protection from unauthorized access, attacks, and data breaches. Understanding this field equips you with the skills to build secure networks and safeguard sensitive information in an interconnected world.',
      },
      {
        name: 'Network Security and Analysis',
        image: '/course/nwsecurity.png', // Replace with actual image URL
        shortDesc: 'Network security and analysis involve protecting networks from cyber threats and monitoring traffic for vulnerabilities. By mastering this field, you learn to defend networks, detect intrusions, and ensure the integrity of data transmission across systems.',
      },
      {
        name: 'Distributed System',
        image: '/course/distributed.png', // Replace with actual image URL
        shortDesc: 'Distributed systems involve multiple computers working together to solve a problem, offering scalability, reliability, and fault tolerance. By learning about them, you can build more resilient and efficient applications, which are essential in todays cloud-based and data-driven world.',
      },
      
    ],
  },
];

const TopCourses = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const router = useRouter();

  const handleToggle = (index) => {
    setSelectedCourseIndex(selectedCourseIndex === index ? null : index);
  };

  // This function will generate the slug based on the course name
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const handleSubtopicClick = (subtopicName) => {
    const slug = generateSlug(subtopicName);
    router.push(`/course/${slug}`); // Navigate to the designated course page
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Top Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  onClick={() => handleToggle(index)}
                  style={{ cursor: 'pointer' }}
                  align="center"
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
            height: '30rem',
            width: '105rem',
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            {courses[selectedCourseIndex].title}
          </Typography>
          <Grid container spacing={3}>
            {courses[selectedCourseIndex].subtopics.map((subtopic, subIndex) => (
              <Grid item xs={12} sm={6} md={4} key={subIndex}>
                <Card onClick={() => handleSubtopicClick(subtopic.name)} style={{ cursor: 'pointer' }}>
                  <CardContent>
                    <img
                      src={subtopic.image}
                      alt={subtopic.name}
                      style={{
                        width: '100%',
                        height: '275px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                    <Typography variant="h6" style={{ marginTop: '10px' }}>
                      {subtopic.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {subtopic.shortDesc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default TopCourses;