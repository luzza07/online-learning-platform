import CourseContentPage from "./coursecontent";
import axiosInstance from "@/app/utility/tools";

// ✅ Ensure params.course_slug is awaited correctly
export async function generateMetadata({ params }) {
  try {
    if (!params?.course_slug) throw new Error("Missing course_slug");

    // Fetch SEO data for the course
    const response = await axiosInstance.get(`/seo/detail/${params.course_slug}`);
    const course_seo = response.data;

    // ✅ Ensure course_seo exists before using its properties
    return {
      title: course_seo?.title
        ? `${course_seo.title} | Easy Explanation online web tutorials`
        : "Easy Explanation online web tutorials",
      description: course_seo?.meta_description || "Explore comprehensive computer science tutorials and programming resources...",
      keywords: course_seo?.keywords || "computer science tutorials, programming languages, coding tutorials...",
      openGraph: {
        url: course_seo ? `/topic/${params.course_slug}` : "https://ezexplanation.com",
        title: course_seo?.title || "EzExplanation Computer Engineering Web Tutorial",
        description: course_seo?.meta_description || "Explore comprehensive computer science tutorials and programming resources...",
        image: course_seo?.logo ? `/media/${course_seo.logo}` : "https://yt3.googleusercontent.com/u-7NgX9EATY6VnW6w2Ux0bRlkeEi8-IdUZujnrOwRj6nGc6RRd3aK45mcDK958okYu5kTmnK7Q=s900-c-k-c0x00ffffff-no-rj",
      },
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error.message);

    // ✅ Fallback metadata for API failures or missing slug
    return {
      title: "Course Not Found | Easy Explanation online web tutorials",
      description: "The requested course could not be found or is currently unavailable. Explore our tutorials and resources to enhance your skills.",
      keywords: "404, course not found, Easy Explanation, tutorials, programming",
      openGraph: {
        url: "https://ezexplanation.com",
        title: "Course Not Found",
        description: "The requested course could not be found or is currently unavailable. Explore our tutorials and resources to enhance your skills.",
        image: "https://yt3.googleusercontent.com/u-7NgX9EATY6VnW6w2Ux0bRlkeEi8-IdUZujnrOwRj6nGc6RRd3aK45mcDK958okYu5kTmnK7Q=s900-c-k-c0x00ffffff-no-rj",
      },
    };
  }
}

// ✅ Ensure params.course_slug is checked before rendering
export default function CoursePage({ params }) {
  if (!params?.course_slug) {
    return <div>Loading...</div>; // ✅ Show a loading state if slug is missing
  }

  return <CourseContentPage courseSlug={params.course_slug} />;
}
