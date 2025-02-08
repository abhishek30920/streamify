import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";

import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton";

export const TopBar = () => {
  const isAdmin = false;
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop:blur-md z-10 w-full">
      <img src="image.png" className="w-[35px]"/>
      <div className="flex gap-1 items-center font-serif size-1">Streamify</div>
      
      <div className="flex gap-4 items-center">
        {isAdmin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin DashBoard
          </Link>
        )}
        <SignedIn>
          <SignOutButton />
        </SignedIn>

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
      </div>
    </div>
  );
};
