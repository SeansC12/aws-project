"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Logo from "../public/vercel.svg";

export default function NavBar() {
  return (
    <NavigationMenu className="border-b-[1px] border-fiord-300 h-16 justify-between pr-20 w-full bg-white bg-opacity-80 backdrop-blur-md">
      <NavigationMenuList className="pl-20">
        <NavigationMenuItem>
          <a href="/">
            <img src={Logo.src} className="h-10" alt="ES" />
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList className="">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} text-esorange 2xl:text-[1.2rem] bg-transparent`}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="2xl:text-[1.2rem] bg-transparent">
            Properties
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex justify-end">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/listings"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Properties
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/listings" title="Rent">
                Find a room to rent
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="2xl:text-[1.2rem] bg-transparent">
            Company
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex justify-end">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/listings"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Our company
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/about-us" title="About Us">
                Our mission, our values
              </ListItem>
              <ListItem href="/why-us" title="Why Us">
                Why choose us?
              </ListItem>
              <ListItem
                href="/contact-us"
                title="Contact Us"
              >
                Got questions or feedback? Drop us a line,
                anytime.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-md font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
