"use client";

import React, { useEffect, useState } from "react";
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
        <CardDescription className="text-green-600 pt-4 pb-[-5px] font-bold">
          {`${Math.floor(Math.random() * 4) + 91}% match`}
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
  ips_or_icu,
  department,
}: {
  title: any;
  description: any;
  match: any;
  ips_or_icu: any;
  department: any;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-[2px]">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-green-600 pt-4 pb-[-5px] font-bold">
          {`${match}% match`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Label>{description}</Label>
        <Label>{ips_or_icu}</Label>
        <Label>{department}</Label>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

function page() {
  const [jobs, setJobs] = useState<any>();
  const [loading, setLoading] = useState<any>();

  useEffect(() => {
    setLoading(true);
    async function load() {
      await timeout(3000);
    }
    load();
    setLoading(false);
    const data = localStorage.getItem("allJobs");

    if (data !== null) {
      setJobs(JSON.parse(data));
    }
  }, []);

  return (
    <div className="px-[24rem] flex items-center justify-center flex-col">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="text-3xl font-bold pt-4 text-center">
            Here are your top matches
          </div>
          <div className="flex flex-col gap-3">
            {jobs &&
              jobs.map((e: any, key: any) => {
                if (key === 0) {
                  return (
                    <TopJobCard
                      title={e.title}
                      description={e.description}
                    />
                  );
                }
                return (
                  <JobCard
                    title={e.title}
                    description={e.description}
                    department={e.department}
                    ips_or_icu={e.ips_or_icu}
                    match={
                      (10 - key) * 10 +
                      Math.floor(Math.random() * 4)
                    }
                    key={key}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
