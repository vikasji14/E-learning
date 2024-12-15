import { Menu, School } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useNavigate, Link } from "react-router-dom";
import { userLoggedOut } from "@/redux/api/authApi";
import { isAuth } from "@/isAuth";


const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    const data = await userLoggedOut();
    toast.success(data?.message)
    navigate("/login")
  }


  return (

    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <Link to="/" className="flex items-center gap-2">
          <School size={"30"} />
          {/* <div to="/"> */}
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
          {/* </div> */}
        </Link>
        {/* User icons and dark mode icon  */}
        <div className="flex items-center gap-8">
          {isAuth() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={localStorage.getItem("photoUrl")}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <Link to="profile">Profile</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {localStorage.getItem("role") === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><div to="/admin/dashboard">Dashboard</div></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")} >
                Login
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device  */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const data = await userLoggedOut();
    toast.success(data?.message)
    navigate("/login")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle> <div to="/">E-Learning</div></SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Profile</Link>
          <Link onClick={handleLogout} >Log out</Link>
        </nav>
        {localStorage.getItem("role") === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" >Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};