import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import ContactDialog from "./ContactDialog";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return <header className="bg-card border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-semibold text-foreground">ModeX</h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              მთავარი
            </Link>
            <Link to="/renders" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              რენდერები
            </Link>
            <Link to="/projects/saburtalo" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              პროექტები
            </Link>
            <Link to="/blog" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              ბლოგი
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
                  🇬🇧 EN
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>🇬🇧 English</DropdownMenuItem>
                <DropdownMenuItem>🇬🇪 ქართული</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <ContactDialog>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                დაგვიკავშირდი
              </Button>
            </ContactDialog>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;