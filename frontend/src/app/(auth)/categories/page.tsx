import Category from "@/components/Category";
import Footer from "@/components/common/Footer";
import CourseDescription from "@/components/CourseDescription";


export default function CategoriesPage() {
  return (
    <div className="">
      {/* <HeroWithNavbar /> */}
      <CourseDescription showDemoBadge={true} />
      <Category/>
      <Footer />
    </div>
  );
}
