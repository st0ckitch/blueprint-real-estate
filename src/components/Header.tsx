import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-foreground">Estately</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              Condos
            </a>
            <a href="#" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              Houses
            </a>
            <a href="#" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              Commercial
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-foreground hover:text-foreground/80 transition-colors">
                For rent
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Apartments</DropdownMenuItem>
                <DropdownMenuItem>Houses</DropdownMenuItem>
                <DropdownMenuItem>Commercial</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              About
            </a>
            <a href="#" className="text-sm text-foreground hover:text-foreground/80 transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  USD
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
                <DropdownMenuItem>GBP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Log in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
