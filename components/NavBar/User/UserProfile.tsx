"use client";

import React from "react";

// Shadcn User Library
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons (Where is this from????)
import { Icons } from "@/components/icons";

function convertEmailToName(email: string) {
  const firstHalfOfEmail = email.split("@")[0];
  if (firstHalfOfEmail.includes("_")) {
    return firstHalfOfEmail.split("_")[0];
  }
  return firstHalfOfEmail.split(".")[0];
}

function capitaliseFirstLetter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function UserProfile({
  user,
}: {
  user: any;
}) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex flex-row">
            <Icons.user /> Welcome,{" "}
            {capitaliseFirstLetter(
              convertEmailToName(user.email)
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600 focus:text-red-600">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
