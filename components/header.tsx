import { MainNav } from "./main-nav";
import UserButton from "./user-button";
import "./header.module.css";
import { SignOut } from "./auth-components";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <MainNav />
        {session && (
          <div>
            <SignOut />
          </div>
        )}
        <UserButton />
      </div>
    </header>
  );
}
