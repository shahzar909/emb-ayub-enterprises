'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Ventures', href: '/#ventures' },
  { label: 'Services', href: '/#services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#2C114B]/90 backdrop-blur-xl border-b border-[#C89A45]/15 shadow-lg'
            : 'bg-[#431E6F]/70 backdrop-blur-xl border-b border-white/10'
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}

            <Link href="/" className="flex items-center gap-2">

              <img
                src="/logo.png"
                alt="EMB Ayub Enterprises"
                className="h-8 w-auto object-contain"
              />
              <span className="hidden sm:block text-white text-[20px] font-bold tracking-wide">
                EMB Ayub Enterprises
              </span>

            </Link>

            {/* Desktop Navigation */}

            <div className="hidden md:flex items-center gap-1">

              {navLinks.map((link) => (

                <Link
                  key={link.label}
                  href={link.href}
                  className="
px-4
py-2
rounded-xl
text-[15px]
font-semibold
tracking-wide
text-white
hover:text-[#D8B25C]
hover:bg-white/10
transition-all
duration-300
"
                >
                  {link.label}
                </Link>

              ))}

            </div>

            {/* CTA */}

            <div className="hidden md:flex items-center">

              <Link
                href="/#ventures"
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#C89A45]
                px-5
                py-2.5
                text-[15px]
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:bg-[#D8B25C]
                hover:shadow-xl
                active:scale-95
                "
              >
                Explore Ventures

                <ChevronRight className="w-4 h-4" />

              </Link>

            </div>

            {/* Mobile Button */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="
              md:hidden
              rounded-xl
              p-2.5
              text-white
              hover:bg-white/10
              transition-all
              duration-300
              "
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
            fixed
            inset-x-0
            top-16
            z-40
            bg-[#2C114B]/95
            backdrop-blur-xl
            border-b
            border-white/10
            md:hidden
            "
          >

            <div className="container-wide py-4 space-y-1">

              {navLinks.map((link, i) => (

                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >

                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="
                    block
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-white/75
                    hover:bg-white/10
                    hover:text-[#D8B25C]
                    transition-all
                    duration-300
                    "
                  >
                    {link.label}
                  </Link>

                </motion.div>

              ))}

              <div className="pt-2 pb-1">

                <Link
                  href="/#ventures"
                  onClick={() => setMobileOpen(false)}
                  className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#C89A45]
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#D8B25C]
                  "
                >
                  Explore Ventures

                  <ChevronRight className="w-4 h-4" />

                </Link>

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}