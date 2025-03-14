import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { User, Settings, ShoppingBag, Heart, LogOut } from "lucide-react";
import { userService } from "../services/userService";
import OrderHistory from "../components/profile/OrderHistory";
import WishList from "../components/profile/WishList";

const ProfilePage = () => {
  const { user, signOut, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [avatarSeed, setAvatarSeed] = useState(user?.id || "user");

  if (!user) {
    navigate("/signin");
    return null;
  }

  const handleUpdateProfile = async () => {
    if (isEditing) {
      await updateUserProfile({ name, avatarSeed });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleGenerateNewAvatar = () => {
    const newSeed = Math.random().toString(36).substring(2, 8);
    setAvatarSeed(newSeed);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed || avatarSeed}`}
                    />
                    <AvatarFallback>
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="profile"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  orientation="vertical"
                  className="w-full"
                >
                  <TabsList className="flex flex-col items-stretch h-auto bg-transparent space-y-1">
                    <TabsTrigger
                      value="profile"
                      className="justify-start px-3 py-2 data-[state=active]:bg-primary/10 text-left"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="orders"
                      className="justify-start px-3 py-2 data-[state=active]:bg-primary/10 text-left"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Order History
                    </TabsTrigger>
                    <TabsTrigger
                      value="wishlist"
                      className="justify-start px-3 py-2 data-[state=active]:bg-primary/10 text-left"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="justify-start px-3 py-2 data-[state=active]:bg-primary/10 text-left"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button
                  variant="outline"
                  className="w-full mt-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => {
                    signOut();
                    navigate("/");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      View and update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">
                          Personal Details
                        </h3>
                        <Button variant="outline" onClick={handleUpdateProfile}>
                          {isEditing ? "Save Changes" : "Edit Profile"}
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name</label>
                          {isEditing ? (
                            <Input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          ) : (
                            <p className="text-gray-700">{user.name}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <p className="text-gray-700">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Profile Picture</h3>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                          />
                          <AvatarFallback>
                            {user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            variant="outline"
                            onClick={handleGenerateNewAvatar}
                          >
                            Generate New Avatar
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">
                        Account Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Member Since
                          </label>
                          <p className="text-gray-700">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Account Status
                          </label>
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                            <p className="text-gray-700">Active</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-0">
                <OrderHistory userId={user.id} />
              </TabsContent>

              <TabsContent value="wishlist" className="mt-0">
                <WishList userId={user.id} />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Password</h3>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Notifications</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Email Notifications
                          </label>
                          <input
                            type="checkbox"
                            className="toggle"
                            defaultChecked
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Order Updates
                          </label>
                          <input
                            type="checkbox"
                            className="toggle"
                            defaultChecked
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Promotional Emails
                          </label>
                          <input type="checkbox" className="toggle" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Danger Zone</h3>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
