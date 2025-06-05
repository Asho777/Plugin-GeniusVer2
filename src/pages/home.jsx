import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function HomePage() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create WordPress Plugins <span className="text-primary">Without Coding</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Turn your ideas into fully functional WordPress plugins in minutes using AI. No programming knowledge required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/create">Create Your Plugin</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/templates">Browse Templates</Link>
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent z-10 h-20 bottom-0 top-auto"></div>
            <img 
              src="https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="PluginGenius Dashboard" 
              className="rounded-lg shadow-2xl mx-auto max-w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M12 18v-6"></path>
                  <path d="M8 18v-1"></path>
                  <path d="M16 18v-3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Describe Your Plugin</h3>
              <p className="text-gray-600">
                Simply describe what you want your plugin to do in plain English. No technical jargon needed.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                  <path d="M12 8v-2"></path>
                  <path d="M12 18v-2"></path>
                  <path d="M16 12h2"></path>
                  <path d="M6 12h2"></path>
                  <path d="m14.83 9.17 1.41-1.41"></path>
                  <path d="m7.76 16.24 1.41-1.41"></path>
                  <path d="m7.76 7.76 1.41 1.41"></path>
                  <path d="m14.83 14.83 1.41 1.41"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI Generates Code</h3>
              <p className="text-gray-600">
                Our advanced AI transforms your description into professional WordPress plugin code.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Download & Install</h3>
              <p className="text-gray-600">
                Download your custom plugin as a ZIP file and install it on your WordPress site.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Plugin Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Create Any Type of Plugin</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            From simple widgets to complex functionality, PluginGenius can create a wide variety of WordPress plugins.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Widgets</h3>
              <p className="text-gray-600 mb-4">
                Create custom sidebar widgets to display content, forms, or dynamic information.
              </p>
              <Link to="/create?type=widget" className="text-primary font-medium hover:underline">
                Create a Widget →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Shortcodes</h3>
              <p className="text-gray-600 mb-4">
                Build shortcodes to insert custom content or functionality anywhere in your posts or pages.
              </p>
              <Link to="/create?type=shortcode" className="text-primary font-medium hover:underline">
                Create a Shortcode →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Admin Enhancements</h3>
              <p className="text-gray-600 mb-4">
                Extend the WordPress admin with custom settings pages, meta boxes, or dashboard widgets.
              </p>
              <Link to="/create?type=admin" className="text-primary font-medium hover:underline">
                Create Admin Features →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Content Enhancements</h3>
              <p className="text-gray-600 mb-4">
                Automatically modify or enhance your content with additional features or formatting.
              </p>
              <Link to="/create?type=content" className="text-primary font-medium hover:underline">
                Create Content Features →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Custom Functionality</h3>
              <p className="text-gray-600 mb-4">
                Build plugins with custom functionality tailored to your specific needs.
              </p>
              <Link to="/create?type=custom" className="text-primary font-medium hover:underline">
                Create Custom Plugin →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">E-commerce Extensions</h3>
              <p className="text-gray-600 mb-4">
                Extend WooCommerce or other e-commerce platforms with custom features.
              </p>
              <Link to="/create?type=ecommerce" className="text-primary font-medium hover:underline">
                Create E-commerce Plugin →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael Johnson</h4>
                  <p className="text-gray-600 text-sm">WordPress Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "PluginGenius has revolutionized how I create custom solutions for my clients. What used to take days now takes minutes."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Williams</h4>
                  <p className="text-gray-600 text-sm">Blog Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone with zero coding experience, I never thought I could create my own plugins. PluginGenius made it possible and incredibly easy!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">David Chen</h4>
                  <p className="text-gray-600 text-sm">E-commerce Store Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I needed a custom solution for my WooCommerce store that didn't exist. PluginGenius helped me build exactly what I needed without hiring a developer."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your WordPress Plugin?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of WordPress users who are building custom plugins without writing a single line of code.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/create">Get Started for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
