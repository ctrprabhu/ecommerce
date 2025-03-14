import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu, LogOut, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  onCartClick?: () => void;
  cartItemCount?: number;
  onSearchSubmit?: (query: string) => void;
}

const Header = ({
  onCartClick = () => {},
  cartItemCount = 3,
  onSearchSubmit = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-primary">
            ElectroShop
          </a>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 mx-8 relative"
        >
          <Input
            type="text"
            placeholder="Search for products..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0"
          >
            <Search className="h-5 w-5" />
          </Button>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCartClick}
                  className="relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id || "user"}`}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Hi, {user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/profile?tab=orders")}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/profile?tab=wishlist")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSearchSubmit} className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
          <div className="space-y-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left block p-2 hover:bg-gray-100 rounded-md"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/profile?tab=orders")}
                  className="w-full text-left block p-2 hover:bg-gray-100 rounded-md"
                >
                  Orders
                </button>
                <button
                  onClick={() => navigate("/profile?tab=wishlist")}
                  className="w-full text-left block p-2 hover:bg-gray-100 rounded-md"
                >
                  Wishlist
                </button>
                <button
                  onClick={signOut}
                  className="w-full text-left block p-2 hover:bg-gray-100 rounded-md"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="w-full text-left block p-2 hover:bg-gray-100 rounded-md"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full text-left block p-2 hover:bg-gray-100 rounded-md"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
