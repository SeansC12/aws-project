"use client";
import React, { useEffect, useState } from "react";

// User components
import UserProfile from "./UserProfile";
import LoginNavigationItem from "./LoginNavigationItem";

// Supabase's "Database" type
import type { Database } from "@/lib/database.types";

// Imports to create serverSupabaseClient
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function User() {
  const supabase = createClientComponentClient<Database>();
  const [isLoggedIn, setIsLoggedIn] =
    useState<boolean>(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsLoggedIn(false);
        setUser({});
        return;
      }
      setIsLoggedIn(true);
      setUser(user);
    };

    getUser();
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <UserProfile user={user} />
      ) : (
        <LoginNavigationItem />
      )}
    </div>
  );
}

export default User;
