import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { FiEdit } from "react-icons/fi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { userProfile, updateUser, updateBioChange } from "@/redux/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
    userData()
  }, [])

  let userData = async () => {
    let data = await userProfile()
    setUser(data.user);
  }

  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [updateUserIsLoading, setUpdateUserIsLoading] = useState(false)
  const [bio, setBio] = useState("")

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    setUpdateUserIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    const data = await updateUser(formData);
    if (data?.success) {
      localStorage.setItem("photoUrl", data?.user.photoUrl)
    } else {
      toast.error(data.message)
    }
    setUpdateUserIsLoading(false);
    userData();
  };

  const handleBioChange = async (e) => {
    setUpdateUserIsLoading(true);
    e.preventDefault()
    const data = { bio: bio }
    const res = await updateBioChange(data)
    toast.success(res?.message)
    userData()
    setUpdateUserIsLoading(false)
  };


  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl}
              alt="@shadcn"
            />
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>


        </div>
        <div className="flex flex-col gap-10 md:gap-0">
          <div className="flex flex-col md:flex-row gap-2 h-5 space-x-4 text-sm">
            <Separator orientation="vertical" className="hidden sm:block" />

            <div>
              <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                Name:
                <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                  {user?.name}
                </span>
              </h1>
            </div>
            <Separator orientation="vertical" className="hidden sm:block" />
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                Email:
                <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                  {user?.email}
                </span>
              </h1>
            </div>
            <Separator orientation="vertical" className="hidden sm:block" />
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                Role:
                <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                  {user?.role}
                </span>
              </h1>
            </div>
            <Separator orientation="vertical" className="hidden sm:block" />

          </div>
          <div className=" pt-6 ">
            <Separator className="hodden sm:block" />
            <div className="flex gap-2 items-center  mb-2 pt-4">
              <span className="text-sm font-medium leading-none">Bio</span>
              <Dialog>
                <DialogTrigger asChild>
                  <span><FiEdit className="text-blue-600 cursor-pointer" /></span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Bio</DialogTitle>
                    <DialogDescription>
                      Make changes to your Bio here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground">
                    <Textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={5} />
                  </p>
                  <DialogFooter>
                    <Button
                      disabled={updateUserIsLoading}
                      onClick={handleBioChange}
                    >
                      {updateUserIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                          wait
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-sm text-muted-foreground">
              <Textarea value={user?.bio} rows={5} />
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user?.enrolledCourses?.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user?.enrolledCourses?.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;