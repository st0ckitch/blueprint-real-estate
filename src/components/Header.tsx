import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return <header className="bg-card border-b border-border/50 sticky top-0 z-50">
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
            <a href="#" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              რენდერები
            </a>
            <a href="#" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              პროექტები
            </a>
            <Link to="/blog" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              ბლოგი
            </Link>
            <a href="#" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              კონტაქტი
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  🇬🇧 EN
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>🇬🇧 English</DropdownMenuItem>
                <DropdownMenuItem>🇬🇪 ქართული</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              დაგვიკავშირდი
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;