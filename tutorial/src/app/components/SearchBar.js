import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../utility/tools"; // Update the path if necessary

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseDestinations, setCourseDestinations] = useState({});
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/list/subjects/");
      const courses = response.data;

      const mapping = {};
      courses.forEach((course) => {
        if (course.is_active) {
          mapping[course.title.toLowerCase()] = `/course/${course.slug}`;
        }
      });

      setCourseDestinations(mapping);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      const query = searchQuery.trim().toLowerCase();
      const destination = courseDestinations[query];

      if (destination) {
        router.push(destination);
      } else {
        router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  );
}
