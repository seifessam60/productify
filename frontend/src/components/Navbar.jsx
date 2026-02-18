import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { Link } from "react-router";
import { ShoppingBag, PlusIcon, UserIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <div className="navbar bg-base-200 shadow-sm px-4">
      <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl gap-2">
            <ShoppingBag className="size-5 text-primary" />
            <span className="text-lg font-bold font-mono tracking-widest uppercase">
              Productify
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSelector />
          {isSignedIn && (
            <>
              <Link to="/create" className="btn btn-ghost btn-sm gap-1">
                <PlusIcon size={16} />
                <span className="hidden sm:inline">Create</span>
              </Link>
              <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
                <UserIcon size={16} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <UserButton />
            </>
          )}

          {!isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button className="btn btn-ghost btn-sm">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-ghost btn-sm">Get Started</button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
