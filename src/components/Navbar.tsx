import { ShoppingCart, User, Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import logo from "@/assets/avatar-logo.jpg";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={logo} 
            alt="Avatar Logo" 
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Avatar
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/catalog" className="text-foreground hover:text-primary transition-colors">
            Catalog
          </Link>
          <Link to="/virtual-tryon" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Virtual Try-On
          </Link>
          <Link to="/skin-analysis" className="text-foreground hover:text-primary transition-colors">
            Skin Analysis
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/cart")}
            className="rounded-full relative"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
