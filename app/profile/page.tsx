"use client";

import React, {
  useState,
  useReducer,
  useEffect,
} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const initialFormState = {
  name: "Chong Zi Qi",
  enrolment_type: "Registered Nurse",
  conditional: "General",
  race: "Chinese",
  gender: "Female",
  vaccination_status: "Partially Vaccinated",
  experience: "Nursing Home",
  specialisation: "Emergency",
  grc: "Tanjong Pagar GRC",
  workdays: "Weekdays",
  frequency: "4",
  ips_or_icu: "ICU",
  starting_date: 0,
  ending_date: 0,
  department: "IPS 7",
  supervisor: "Peter",
  rating: 0,
  comments:
    "Excellent quality of work. Best service. Kind to patients",
};

const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "text":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "date":
      if (!action.payload) return;
      let differenceInTime =
        action.payload.getTime() -
        new Date("00/00/2023").getTime();
      let differenceInDays = Math.round(
        differenceInTime / (1000 * 3600 * 24)
      );
      return {
        ...state,
        [action.field]: differenceInDays * 86400,
      };
  }
};

function array_move(
  arr: any,
  old_index: any,
  new_index: any
) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

function page() {
  const [startingDate, setStartingDate] = useState<Date>();
  const [endingDate, setEndingDate] = useState<Date>();
  const [state, dispatch] = useReducer(
    formReducer,
    initialFormState
  );
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setStartingDate(new Date());
    setEndingDate(new Date("06/02/2024"));
  }, []);

  const handleTextChange = (field: any, payload: any) => {
    dispatch({
      type: "text",
      field: field,
      payload: payload,
    });
  };

  const handleDateChange = (field: any, payload: any) => {
    dispatch({
      type: "date",
      field: field,
      payload: payload,
    });
  };

  const submit = () => {
    const data = localStorage.getItem("allJobs");

    if (data !== null) {
      let jobs = JSON.parse(data);

      if (state.experience === "NICU") {
        const index = jobs.findIndex((e: any) =>
          e.title.includes("Neonatal")
        );
        array_move(jobs, index, 0);
      } else if (
        state.enrolment_type === "Registered Nurse"
      ) {
        const index = jobs.findIndex((e: any) =>
          e.title.includes("Registered Nurse")
        );
        array_move(jobs, index, 0);
      } else if (state.specialisation === "Critical Care") {
        const index = jobs.findIndex((e: any) =>
          e.title.includes("Critical Care")
        );
        array_move(jobs, index, 0);
      }

      localStorage.setItem("allJobs", JSON.stringify(jobs));

      console.log(jobs);
    }

    toast({
      title: "Settings saved.",
      description:
        "Please check the homepage for your updated matching",
      action: (
        <ToastAction
          altText="Goto schedule to undo"
          onClick={() => router.push("/nurse")}
        >
          Home
        </ToastAction>
      ),
    });
  };

  useEffect(() => {
    handleDateChange("starting_date", startingDate);
  }, [startingDate]);

  useEffect(() => {
    handleDateChange("ending_date", endingDate);
  }, [endingDate]);

  // async function submit() {
  //   console.log("submit");
  //   const url = new URLSearchParams(state);
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_FLASK_SERVER_ENDPOINT}/api/rank?${url}`
  //   );
  //   const data = await res.json();
  //   console.log(data);
  // }

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="grid w-full max-w-xl items-center gap-5">
        <div>
          <Label>Name</Label>
          <Input
            placeholder="John"
            onChange={(e) =>
              handleTextChange("name", e.target.value)
            }
            defaultValue={initialFormState.name}
          />
        </div>
        <div>
          <Label>Enrolment Type</Label>
          <Select
            onValueChange={(e) =>
              handleTextChange("enrolment_type", e)
            }
            defaultValue={initialFormState.enrolment_type}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an enrolment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Registered Nurse">
                  Registered Nurse
                </SelectItem>
                <SelectItem value="Enrolled Nurse">
                  Enrolled Nurse
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Conditional</Label>
          <Select
            onValueChange={(e) =>
              handleTextChange("conditional", e)
            }
            defaultValue={initialFormState.conditional}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a conditional" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="General">
                  General
                </SelectItem>
                <SelectItem value="General (conditional)">
                  General Conditional
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Race (Chinese, Indian etc)</Label>
          <Input
            placeholder="Enter race"
            onChange={(e) =>
              handleTextChange("race", e.target.value)
            }
            defaultValue={initialFormState.race}
          />
        </div>
        <div>
          <Label>Gender</Label>
          <Input
            placeholder="Gender"
            onChange={(e) =>
              handleTextChange("gender", e.target.value)
            }
            defaultValue={initialFormState.gender}
          />
        </div>
        <div>
          <Label>Vaccination Status</Label>
          <Select
            onValueChange={(e) =>
              handleTextChange("vaccination_status", e)
            }
            defaultValue={
              initialFormState.vaccination_status
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a vaccination status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Fully Vaccinated">
                  Fully Vaccinated
                </SelectItem>
                <SelectItem value="Partially Vaccinated">
                  Partially Vaccinated
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Experience</Label>
          <Select
            onValueChange={(e) =>
              handleTextChange("experience", e)
            }
            defaultValue={initialFormState.experience}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Nursing Home">
                  Nursing Home
                </SelectItem>
                <SelectItem value="Emergency Clinic">
                  Emergency Clinic
                </SelectItem>
                <SelectItem value="ICU">ICU</SelectItem>
                <SelectItem value="NICU">
                  NICU/Nursery
                </SelectItem>
                <SelectItem value="Day Ward">
                  Day Ward
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Specialisation</Label>
          <Select
            onValueChange={(e) =>
              handleTextChange("specialisation", e)
            }
            defaultValue={initialFormState.specialisation}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your specialisation" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Community Home">
                  Community Home
                </SelectItem>
                <SelectItem value="Critical Care">
                  Critical Care
                </SelectItem>
                <SelectItem value="Emergency">
                  Emergency
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>GRC</Label>
          <Input
            placeholder="Tanjong Pagar GRC"
            onChange={(e) =>
              handleTextChange("grc", e.target.value)
            }
            defaultValue={initialFormState.grc}
          />
        </div>
        <div>
          <Label>Workdays</Label>
          <Select
            onValueChange={(e) =>
              handleTextChange("workdays", e)
            }
            defaultValue={initialFormState.workdays}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your work days" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Weekdays">
                  Weekdays
                </SelectItem>
                <SelectItem value="Weekends">
                  Weekends
                </SelectItem>
                <SelectItem value="Weekdays + Weekends">
                  Weekdays + Weekends
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <div>
          <Label>Frequency (times a week)</Label>
          <Input
            placeholder="6"
            onChange={(e) =>
              handleTextChange("frequency", e.target.value)
            }
            defaultValue={initialFormState.frequency}
          />
        </div>
        <div>
          <Label>IPS or ICU</Label>
          <Select
            onValueChange={(e) =>
              handleTextChange("ips_or_icu", e)
            }
            defaultValue={initialFormState.ips_or_icu}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select IPS or ICU" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="IPS">IPS</SelectItem>
                <SelectItem value="ICU">ICU</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Starting Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startingDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startingDate ? (
                  format(startingDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startingDate}
                onSelect={setStartingDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Ending Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endingDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endingDate ? (
                  format(endingDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endingDate}
                onSelect={setEndingDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Department</Label>
          <Input
            placeholder="IPS 7"
            onChange={(e) =>
              handleTextChange("department", e.target.value)
            }
            defaultValue={initialFormState.department}
          />
        </div>
        <div>
          <Label>Supervisor</Label>
          <Input
            placeholder="John"
            onChange={(e) =>
              handleTextChange("supervisor", e.target.value)
            }
            defaultValue={initialFormState.supervisor}
          />
        </div>
        <div>
          <Label>Rating (out of 5)</Label>
          <Input
            placeholder="5"
            onChange={(e) =>
              handleTextChange("rating", e.target.value)
            }
            defaultValue={initialFormState.rating}
          />
        </div>
        <div>
          <Label>Comments</Label>
          <Textarea
            placeholder="Type your comments here."
            onChange={(e) =>
              handleTextChange("comments", e.target.value)
            }
            defaultValue={initialFormState.comments}
          />
        </div> */}
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  );
}

export default page;
