import CourseContentPage from "./coursecontent";
import axiosInstance from "@/app/utility/tools";
export async function generateMetadata({ params, searchParams }, parent) {
  // Retrieve route parameters
  const course_slug = params.course_slug;

  // Fetch SEO data for the course
  const course_seo = (await axiosInstance.get(`/seo/detail/${course_slug}`))
    .data;

  // Return metadata for the page
  return {
    title: course_seo
      ? `${course_seo.title} | Easy Explanation online web tutorials`
      : "Easy Explanation online web tutorials",
    description: course_seo
      ? course_seo.meta_description
      : "Explore comprehensive computer science tutorials and programming resources on our platform. Learn programming languages such as Python, Java, and JavaScript. Master data structures, algorithms, and web development. Enhance your coding skills with hands-on examples, practical projects, and expert guidance. Whether you're a beginner or an experienced developer, discover valuable insights to excel in the world of computer science. Start your coding journey with our engaging and educational tutorials today.",
    keywords: course_seo
      ? course_seo.keywords
      : "computer science tutorials, programming languages, coding tutorials, Python tutorials, Java programming, JavaScript learning, data structures, algorithms, web development, coding projects, programming for beginners, software development, coding skills, programming education, learn coding online, computer science resources, coding practice, programming exercises, coding projects for students, programming community, tech tutorials",
    openGraph: {
      url: course_seo ? `/topic/${course_slug}` : "https://ezexplanation.com",
      title: course_seo
        ? course_seo.title
        : "EzExplanation Computer engineering web Tutorial",
      description: course_seo
        ? course_seo.meta_description
        : "Explore comprehensive computer science tutorials and programming resources on our platform. Learn programming languages such as Python, Java, and JavaScript. Master data structures, algorithms, and web development. Enhance your coding skills with hands-on examples, practical projects, and expert guidance. Whether you're a beginner or an experienced developer, discover valuable insights to excel in the world of computer science. Start your coding journey with our engaging and educational tutorials today.",
      image: course_seo
        ? `/media/${course_seo.logo}`
        : "https://yt3.googleusercontent.com/u-7NgX9EATY6VnW6w2Ux0bRlkeEi8-IdUZujnrOwRj6nGc6RRd3aK45mcDK958okYu5kTmnK7Q=s900-c-k-c0x00ffffff-no-rj",
    },
  };
}

export default function CoursePage({ params }) {
  return <CourseContentPage courseSlug={params.course_slug} />;
}
