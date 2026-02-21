import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronDown } from
'lucide-react';
import { Button } from '../ui/Button';
interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}
export function Header({
  theme,
  toggleTheme,
  onNavigate,
  currentPage
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = [
  {
    name: 'Accueil',
    id: 'home'
  },
  {
    name: "L'École",
    id: 'school',
    dropdown: [
    {
      name: 'Gouvernance',
      id: 'governance'
    },
    {
      name: 'Recherche & Innovation',
      id: 'research'
    },
    {
      name: 'Vie Étudiante',
      id: 'student-life'
    }]

  },
  {
    name: 'Programmes',
    id: 'programs'
  },
  {
    name: 'Admissions',
    id: 'admissions'
  },
  {
    name: 'Actualités',
    id: 'blog'
  },
  {
    name: 'Contact',
    id: 'contact'
  },
  {
    name: 'Dashboard',
    id: 'dashboard'
  }];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>

      {/* Top Bar */}
      <div
        className={`bg-[#696969] text-white py-2 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden py-0 opacity-0' : 'h-auto opacity-100'}`}>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(+33) 7 51 36 09 44</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contact@green-up-academy.com</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>15 rue des halles, 75001 Paris</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/80 transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="hover:text-white/80 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`${isScrolled ? 'glass-nav py-3 shadow-md' : 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm py-4'} transition-all duration-300`}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavClick('home')}>

              <img 
               src="/public/images/logo/logo.png"
               alt="Green Up Academy" 
                className="h-12 sm:h-14 w-auto group-hover:opacity-80 transition-opacity"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) =>
              <div key={item.name} className="relative group">
                  <button
                  onClick={() => !item.dropdown && handleNavClick(item.id)}
                  className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors py-2 ${currentPage === item.id || item.dropdown && item.dropdown.some((d) => d.id === currentPage) ? 'text-[#1FAB89]' : 'text-[#696969] hover:text-[#1FAB89]'}`}>

                    {item.name}
                    {item.dropdown && <ChevronDown className="h-4 w-4" />}
                  </button>

                  {/* Dropdown */}
                  {item.dropdown &&
                <div className="absolute top-full left-0 w-48 bg-white dark:bg-dark-surface shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 border-t-4 border-[#1FAB89]">
                      {item.dropdown.map((subItem) =>
                  <button
                    key={subItem.name}
                    onClick={() => handleNavClick(subItem.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-[#696969] hover:bg-[#F0F0F0] hover:text-[#1FAB89] transition-colors">

                          {subItem.name}
                        </button>
                  )}
                    </div>
                }
                </div>
              )}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavClick('dashboard')}
                className="text-xs border-gray-200 dark:border-gray-700">
                Admin
              </Button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                aria-label="Toggle theme">

                {theme === 'dark' ?
                <Sun className="h-5 w-5" /> :

                <Moon className="h-5 w-5" />
                }
              </button>
              <Button
                size="md"
                className="bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/20 border-none"
                onClick={() => handleNavClick('admissions')}>

                Postuler
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300">

                {theme === 'dark' ?
                <Sun className="h-5 w-5" /> :

                <Moon className="h-5 w-5" />
                }
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">

                {isMobileMenuOpen ?
                <X className="h-6 w-6 text-gray-900 dark:text-white" /> :

                <Menu className="h-6 w-6 text-gray-900 dark:text-white" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-white dark:bg-dark-bg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{
            top: isScrolled ? '60px' : '100px',
            height: 'calc(100vh - 60px)'
          }}>

          <div className="p-4 space-y-2 overflow-y-auto h-full pb-20">
            {navItems.map((item) =>
            <div key={item.name}>
                <button
                onClick={() =>
                item.dropdown ?
                setActiveDropdown(
                  activeDropdown === item.name ? null : item.name
                ) :
                handleNavClick(item.id)
                }
                className="flex items-center justify-between w-full px-4 py-3 text-lg font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">

                  {item.name}
                  {item.dropdown &&
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />

                }
                </button>

                {item.dropdown && activeDropdown === item.name &&
              <div className="pl-8 space-y-1 mt-1 mb-2 border-l-2 border-gray-100 dark:border-gray-800 ml-4">
                    {item.dropdown.map((subItem) =>
                <button
                  key={subItem.name}
                  onClick={() => handleNavClick(subItem.id)}
                  className="block w-full text-left px-4 py-2 text-base text-gray-600 dark:text-gray-400 hover:text-primary">

                        {subItem.name}
                      </button>
                )}
                  </div>
              }
              </div>
            )}
            <div className="pt-6 px-4">
              <Button
                className="w-full justify-center bg-accent hover:bg-accent-dark text-white"
                size="lg"
                onClick={() => handleNavClick('admissions')}>

                Postuler maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>);

}