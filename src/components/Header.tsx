import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "./NavLink";
import ContactDialog from "./ContactDialog";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import logoFull from "@/assets/logo-full.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="bg-card border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="w-full px-8 py-4 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between relative">
          <Link to="/">
            <img src={logoFull} alt="MODX" className="h-8 dark:invert" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink 
              to="/" 
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
              activeClassName="bg-accent text-foreground font-medium"
            >
              {t('nav.home')}
            </NavLink>
            <NavLink 
              to="/projects/themka" 
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
              activeClassName="bg-accent text-foreground font-medium"
            >
              {t('nav.projects')}
            </NavLink>
            <NavLink 
              to="/blog" 
              className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
              activeClassName="bg-accent text-foreground font-medium"
            >
              {t('nav.blog')}
            </NavLink>
            <div className="flex items-center gap-2 ml-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <ContactDialog>
                <Button size="sm" className="ml-2">{t('nav.contact')}</Button>
              </ContactDialog>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg z-50">
              <nav className="flex flex-col p-4 gap-1">
                <NavLink 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
                  activeClassName="bg-accent text-foreground font-medium"
                >
                  {t('nav.home')}
                </NavLink>
                <NavLink 
                  to="/projects/themka" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
                  activeClassName="bg-accent text-foreground font-medium"
                >
                  {t('nav.projects')}
                </NavLink>
                <NavLink 
                  to="/blog" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
                  activeClassName="bg-accent text-foreground font-medium"
                >
                  {t('nav.blog')}
                </NavLink>
                <div onClick={() => setIsMenuOpen(false)}>
                  <ContactDialog>
                    <Button size="sm" className="w-full">{t('nav.contact')}</Button>
                  </ContactDialog>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
