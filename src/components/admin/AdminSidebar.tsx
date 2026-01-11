import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Building2,
  Home,
  FileText,
  Settings,
  Image,
  ChevronDown,
  ChevronRight,
  List,
  SlidersHorizontal,
  FolderOpen,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import logoIcon from '@/assets/logo-icon.svg';
import logoFull from '@/assets/logo-full.svg';

interface NavItem {
  title: string;
  titleKa: string;
  icon: React.ElementType;
  href?: string;
  children?: {
    title: string;
    titleKa: string;
    href: string;
    icon: React.ElementType;
  }[];
}

const navItems: NavItem[] = [
  {
    title: 'Projects',
    titleKa: 'პროექტები',
    icon: Building2,
    children: [
      { title: 'List', titleKa: 'სია', href: '/admin/projects', icon: List },
      { title: 'Parameters', titleKa: 'პარამეტრები', href: '/admin/projects/parameters', icon: SlidersHorizontal },
    ],
  },
  {
    title: 'Apartments',
    titleKa: 'ბინები',
    icon: Home,
    children: [
      { title: 'List', titleKa: 'სია', href: '/admin/apartments', icon: List },
      { title: 'Parameters', titleKa: 'პარამეტრები', href: '/admin/apartments/parameters', icon: SlidersHorizontal },
    ],
  },
  {
    title: 'Blog',
    titleKa: 'ბლოგი',
    icon: FileText,
    children: [
      { title: 'Posts', titleKa: 'პოსტები', href: '/admin/blog', icon: FolderOpen },
      { title: 'Categories', titleKa: 'კატეგორიები', href: '/admin/blog/categories', icon: SlidersHorizontal },
    ],
  },
];

const settingsItems: NavItem[] = [
  {
    title: 'Information',
    titleKa: 'ინფორმაცია',
    icon: Info,
    href: '/admin/settings',
  },
  {
    title: 'Banner',
    titleKa: 'ბანერი',
    icon: Image,
    href: '/admin/banner',
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
}

const AdminSidebar = ({ isCollapsed }: AdminSidebarProps) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(['Projects', 'Apartments', 'Blog']);

  const toggleMenu = (title: string) => {
    setOpenMenus(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children?: { href: string }[]) =>
    children?.some(child => location.pathname.startsWith(child.href));

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-primary to-primary/90 text-primary-foreground transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-primary-foreground/20 px-3">
        {!isCollapsed ? (
          <img src={logoFull} alt="MODX" className="h-7 invert" />
        ) : (
          <img src={logoIcon} alt="MODX" className="h-8 invert" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        {!isCollapsed && (
          <span className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
            მენიუ
          </span>
        )}

        {navItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <Collapsible
                open={!isCollapsed && openMenus.includes(item.title)}
                onOpenChange={() => toggleMenu(item.title)}
              >
                <CollapsibleTrigger
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary-foreground/10',
                    isParentActive(item.children) && 'bg-primary-foreground/15'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.titleKa}</span>
                      {openMenus.includes(item.title) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </>
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pl-4 pt-1">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.href}
                      to={child.href}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-primary-foreground/10',
                          isActive && 'bg-primary-foreground/20 font-medium'
                        )
                      }
                    >
                      <child.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span>{child.titleKa}</span>}
                    </NavLink>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <NavLink
                to={item.href!}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary-foreground/10',
                    isActive && 'bg-primary-foreground/20'
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.titleKa}</span>}
              </NavLink>
            )}
          </div>
        ))}

        {/* Separator */}
        <div className="my-3 border-t border-primary-foreground/20" />

        {!isCollapsed && (
          <span className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">
            ინფორმაცია
          </span>
        )}

        {settingsItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href!}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary-foreground/10',
                isActive && 'bg-primary-foreground/20'
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>{item.titleKa}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
