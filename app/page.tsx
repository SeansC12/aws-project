import Image from "next/image";
import { JobPostForm } from "@/components/JobPostForm";

export default function Home() {
  return <div className="">
    <div className="flex justify-center items-center h-[100vh]"><JobPostForm /></div>
  </div>
}
