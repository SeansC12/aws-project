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
                <SelectItem value="Fully">
                  Fully Vaccinated
                </SelectItem>
                <SelectItem value="Partial">
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
        <Button
          onClick={() => {
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
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default page;
