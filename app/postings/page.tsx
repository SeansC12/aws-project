"use client";

import { Metadata } from "next";
import Image from "next/image";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const supabase = createClientComponentClient();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [employer, setEmployer] = useState(
    "Farrer Park Hospital"
  );
  const [allCurrentJobPostings, setAllCurrentJobPostings] =
    useState<any[]>([]);
  const router = useRouter();

  async function handleSubmit() {
    const { error } = await supabase
      .from("Job Listings")
      .insert({
        employer: "Farrer Park Hospital",
        title: jobTitle,
        description: jobDescription,
        is_available: true,
      });

    await getJobPostings();
  }

  const getJobPostings = async () => {
    const { data, error } = await supabase
      .from("Job Listings")
      .select();

    data && setAllCurrentJobPostings(data);
  };

  useEffect(() => {
    getJobPostings();
  }, []);

  console.log(allCurrentJobPostings);

  return (
    <div className="w-full flex items-center justify-center flex-col gap-6">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Create job listing</CardTitle>
          <CardDescription>
            Open a job listing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Job Title</Label>
                <Input
                  placeholder="Job Title"
                  onChange={(e) =>
                    setJobTitle(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">
                  Job Description
                </Label>
                <textarea
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Job Description"
                  onChange={(e) =>
                    setJobDescription(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Employer</Label>
                <Input
                  placeholder="Name of your project"
                  defaultValue={employer}
                />
                {/* <Label htmlFor="framework">Type of role</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">
                      Doctor
                    </SelectItem>
                    <SelectItem value="sveltekit">
                      Nurse
                    </SelectItem>
                    <SelectItem value="astro">
                      Astro
                    </SelectItem>
                    <SelectItem value="nuxt">
                      Nuxt.js
                    </SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => handleSubmit()}>
            Publish
          </Button>
        </CardFooter>
      </Card>
      <div className="text-xl font-bold">{`Your Organisation's (${employer}) Job Postings`}</div>
      <div className="w-[500px] flex gap-4 flex-col">
        {allCurrentJobPostings.map((data: any, index) => (
          <div
            key={index}
            className="w-full cursor-pointer"
            onClick={() =>
              router.push(`/postings/${data.job_id}`)
            }
          >
            <Card>
              <CardHeader>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>
                  {data.description}
                </CardDescription>
                <div className="w-max">
                  {data.is_available ? (
                    <Badge className="bg-green-600">
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      Unavailable
                    </Badge>
                  )}
                </div>
              </CardHeader>
              {/* <CardContent></CardContent> */}
              {/* <CardFooter>
                <p className="text-gray-600 text-sm">
                  {employer}
                </p>
              </CardFooter> */}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
