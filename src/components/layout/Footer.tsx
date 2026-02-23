import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube } from 'lucide-react';
import { Button } from '../ui/Button';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    programs: [
      { name: 'Bachelor Performance Énergétique', href: '#' },
      { name: 'Master Cybersécurité & Green IT', href: '#' },
      { name: 'Master Management Durable', href: '#' },
      { name: 'Formation Continue', href: '#' },
    ],
    school: [
      { name: 'À propos', href: '#' },
      { name: 'Gouvernance', href: '#' },
      { name: 'Recherche & Innovation', href: '#' },
      { name: 'Vie étudiante', href: '#' },
      { name: 'Actualités', href: '#' },
    ],
    resources: [
      { name: 'Admissions', href: '#' },
      { name: 'Financement', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook,  href: 'https://www.facebook.com/greenupacademy',                    label: 'Facebook'  },
    { icon: Twitter,   href: 'https://x.com/greenupacademy',                               label: 'Twitter/X' },
    { icon: Linkedin,  href: 'https://www.linkedin.com/company/green-up-academy/',          label: 'LinkedIn'  },
    { icon: Instagram, href: 'https://www.instagram.com/green.up.academy/',                label: 'Instagram' },
    { icon: Youtube,   href: 'https://www.greenup-academy.fr',                             label: 'YouTube'   },
  ];

  return (
    <footer className="bg-[#F0F0F0] border-t border-[#E0E0E0]">
      {/* Newsletter Section */}
      <div className="border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Restez informé de la{' '}
                <span className="text-gradient">transition</span>
              </h3>
              <p className="text-gray-400 text-lg">
                Recevez nos actualités, conseils carrière et invitations aux événements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <Button className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white border-none whitespace-nowrap">
                S'abonner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/logo/logo.png"
                alt="Green Up Academy"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-[#696969] text-sm mb-6 leading-relaxed">
              L'école de référence pour les métiers de la transition écologique
              et du numérique responsable.
            </p>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#696969] hover:bg-[#1FAB89] hover:text-white transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-bold text-lg mb-6">Formations</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm underline-animate">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* School */}
          <div>
            <h4 className="font-bold text-lg mb-6">L'École</h4>
            <ul className="space-y-3">
              {footerLinks.school.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm underline-animate">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-6">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm underline-animate">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#2D2D2D]">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#696969] text-sm">
                <MapPin className="h-5 w-5 text-[#1FAB89] shrink-0 mt-0.5" />
                <span>15 rue des halles<br />75001 Paris, France</span>
              </li>
              <li className="flex items-center gap-3 text-[#6B6B6B] text-sm">
                <Phone className="h-5 w-5 text-[#1FAB89] shrink-0" />
                <a href="tel:+33751360944" className="hover:text-[#2D5016] transition-colors">
                  (+33) 7 51 36 09 44
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#6B6B6B] text-sm">
                <Mail className="h-5 w-5 text-[#1FAB89] shrink-0" />
                <a href="mailto:contact@green-up-academy.com" className="hover:text-[#2D5016] transition-colors">
                  contact@green-up-academy.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {currentYear} Green Up Academy. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">CGU</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}