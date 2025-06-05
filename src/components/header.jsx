import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
            <path d="M7 7h.01"></path>
          </svg>
          <span className="text-xl font-bold">PluginGenius</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <Link to="/templates" className="text-sm font-medium hover:text-primary">Templates</Link>
          <Link to="/docs" className="text-sm font-medium hover:text-primary">Documentation</Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
