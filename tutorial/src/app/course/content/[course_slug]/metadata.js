import axiosInstance from "@/app/utility/tools";

export async function generateMetadata({ params }) {
  try {
    // Await the params object
    const resolvedParams = await params;
    const course_slug = resolvedParams.course_slug;

    // Fetch SEO metadata for the course
    const { data: course_seo } = await axiosInstance.get(`/seo/detail/${course_slug}`);

    return {
      title: course_seo
        ? `${course_seo.title} | Easy Explanation online web tutorials`
        : "Easy Explanation online web tutorials",
      description: course_seo?.meta_description || "Explore comprehensive computer science tutorials...",
      keywords: course_seo?.keywords || "computer science tutorials, programming, coding projects...",
      openGraph: {
        url: course_seo ? `/topic/${course_slug}` : "https://ezexplanation.com",
        title: course_seo?.title || "EzExplanation Computer engineering web Tutorial",
        description: course_seo?.meta_description || "Explore comprehensive computer science tutorials...",
        image: course_seo?.logo ? `/media/${course_seo.logo}` : "https://yt3.googleusercontent.com/...default.jpg",
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Easy Explanation online web tutorials",
      description: "Explore comprehensive computer science tutorials...",
      keywords: "computer science tutorials, programming, coding projects...",
    };
  }
}