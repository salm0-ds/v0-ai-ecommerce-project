'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, User, Search, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'Sleep', href: '/category/sleep' },
  { name: 'Gut Health', href: '/category/gut-health' },
  { name: 'Focus', href: '/category/focus' },
  { name: 'Energy', href: '/category/energy' },
  { name: 'Stress', href: '/category/stress' },
]

interface HeaderProps {
  onOpenChat?: () => void
}

export function Header({ onOpenChat }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartCount = 2 // Mock cart count

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">Vitalis</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenChat}
            className="relative"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Shop
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {categories.map((category) => (
                <DropdownMenuItem key={category.name} asChild>
                  <Link href={category.href}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/shop" className="font-medium">View All</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {category.name}
            </Link>
          ))}

          <Link
            href="/science"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Science
          </Link>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenChat}
            className="gap-2 text-foreground/80 hover:text-foreground"
          >
            <Search className="h-4 w-4" />
            <span className="text-sm">Search</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/account" aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            asChild
          >
            <Link href="/cart" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="border-t border-border/50 px-4 py-6 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Categories
            </p>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-border/50 pt-4 space-y-2">
            <Link
              href="/science"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Science
            </Link>
            <Link
              href="/account"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
