"use client";

import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function page({ params }: { params: { job_id: string } }) {
  const supabase = createClientComponentClient();
  const [postingData, setPostingData] = useState<any>();
  const [loading, setLoading] = useState<any>();

  const getJobDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Job Listings")
      .select()
      .eq("job_id", params.job_id);

    data && setPostingData(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  return (
    <div className="px-[30rem] flex items-center justify-center flex-col">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">
            {postingData && postingData.title}
          </h1>
          <h2 className="text-lg">
            {postingData && postingData.description}
          </h2>
        </div>
      )}
    </div>
  );
}

export default page;
