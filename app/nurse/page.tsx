import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TopJobCard({
  title,
  description,
}: {
  title: any;
  description: any;
}) {
  return (
    <Card className="w-full bg-gradient-to-r from-cyan-100 to-purple-100 mt-5">
      <CardHeader className="flex flex-col gap-[2px]">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-green-600 pt-4 pb-[-5px]">
          {`92% match`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>{description}</Label>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

function JobCard({
  title,
  description,
  match,
}: {
  title: any;
  description: any;
  match: any;
}) {
  return (
    <Card className="w-full bg-gradient-to-r from-cyan-100 to-purple-100 mt-5">
      <CardHeader className="flex flex-col gap-[2px]">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-green-600 pt-4 pb-[-5px]">
          {`${match}% match`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>{description}</Label>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

function page() {
  return (
    <div className="px-[24rem] flex items-center justify-center flex-col">
      <div className="text-3xl font-bold pt-4">
        Here is your top match
        <TopJobCard
          title={"Registered Nurse (RN) - Emergency Unit"}
          description={
            "The Registered Nurse will provide comprehensive nursing care to patients on the Medical/Surgical unit. Responsibilities include assessing patient conditions, administering medications, coordinating patient care plans, and collaborating with the healthcare team. The ideal candidate should possess strong clinical skills, excellent communication, and the ability to work in a fast-paced environment."
          }
        />
      </div>
      <hr className="border-1 border-black my-10 w-[60vw]" />
    </div>
  );
}

export default page;
