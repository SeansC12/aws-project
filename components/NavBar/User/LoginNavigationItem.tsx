import React from "react";

import Link from "next/link";

import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

function LoginNavigationItem() {
  return (
    <div>
      <Link href="/login" legacyBehavior passHref>
        <NavigationMenuLink
          className={navigationMenuTriggerStyle()}
        >
          Login
        </NavigationMenuLink>
      </Link>
    </div>
  );
}

export default LoginNavigationItem;
