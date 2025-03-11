import CourseContentPage from "./coursecontent";
// Keep the import in case we need it later
import axiosInstance from "../../utility/tools";

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    
    if (!resolvedParams?.course_slug) {
      throw new Error("Missing course_slug");
    }

    const course_slug = resolvedParams.course_slug;
    
    // Use the course_slug to generate metadata without API call
    return {
      title: `${course_slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | EzExplanation`,
      keywords: "computer science tutorials, programming languages, coding tutorials, ezexplanation",
      openGraph: {
        url: `/course/${course_slug}`,
        title: `${course_slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | EzExplanation`,
        description: "Explore comprehensive computer science tutorials and programming resources with EzExplanation.",
        image: "https://yt3.googleusercontent.com/u-7NgX9EATY6VnW6w2Ux0bRlkeEi8-IdUZujnrOwRj6nGc6RRd3aK45mcDK958okYu5kTmnK7Q=s900-c-k-c0x00ffffff-no-rj",
      },
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error.message);

    // Fallback metadata for any errors
    return {
      
      title: "Course | Easy Explanation online web tutorials",
      description: "Explore our tutorials and resources to enhance your skills.",
      keywords: "Easy Explanation, tutorials, programming",
      openGraph: {
        url: "https://ezexplanation.com",
        title: "Easy Explanation Tutorials",
        description: "Explore our tutorials and resources to enhance your skills.",
        image: "https://yt3.googleusercontent.com/u-7NgX9EATY6VnW6w2Ux0bRlkeEi8-IdUZujnrOwRj6nGc6RRd3aK45mcDK958okYu5kTmnK7Q=s900-c-k-c0x00ffffff-no-rj",
      },
    };
  }
}

export default async function CoursePage({ params }) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.course_slug) {
    return <div>Loading...</div>;
  }

  return <CourseContentPage courseSlug={resolvedParams.course_slug} />;
}