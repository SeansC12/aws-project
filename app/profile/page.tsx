"use client";

import React from "react";
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

function page() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="grid w-full max-w-xl items-center gap-5">
        <div>
          <Label>Name</Label>
          <Input placeholder="John" />
        </div>
        <div>
          <Label>Enrolment Type</Label>
          <Select>
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
          <Label>Enrolment Type</Label>
          <Select>
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
          <Input placeholder="Enter race" />
        </div>
        <div>
          <Label>Gender</Label>
          <Input placeholder="Gender" />
        </div>
        <div>
          <Label>Vaccination Status</Label>
          <Select>
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
          <Select>
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
          <Select>
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
          <Input placeholder="Tanjong Pagar GRC" />
        </div>
        <div>
          <Label>Workdays</Label>
          <Select>
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
        <div>
          <Label>Frequency (times a week)</Label>
          <Input placeholder="6" />
        </div>
        <div>
          <Label>IPS or ICU</Label>
          <Select>
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
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
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
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Department</Label>
          <Input placeholder="IPS 7" />
        </div>
        <div>
          <Label>Supervisor</Label>
          <Input placeholder="John" />
        </div>
        <div>
          <Label>Rating (out of 5)</Label>
          <Input placeholder="5" />
        </div>
        <div>
          <Label>Comments</Label>
          <Textarea placeholder="Type your comments here." />
        </div>
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default page;
