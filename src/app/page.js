import LoginForm from "@/components/LoginForm";
import LeftSection from "@/components/LestSection";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const initialEmail = typeof params?.email === "string" ? params.email : "";

  return (
    <div className="bg-gray-100">
      <div className="w-full flex items-center ">
        <LeftSection />
        <div className="mx-auto">

          <LoginForm />
        </div>
      </div>

    </div>
  );
}
