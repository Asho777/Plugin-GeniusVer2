import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const templates = [
  {
    id: 'social-share',
    title: 'Social Share Buttons',
    description: 'Add customizable social sharing buttons to your posts and pages',
    type: 'content',
    image: 'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'related-posts',
    title: 'Related Posts Widget',
    description: 'Display related posts based on categories or tags',
    type: 'widget',
    image: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'contact-form',
    title: 'Simple Contact Form',
    description: 'Add a customizable contact form via shortcode',
    type: 'shortcode',
    image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'seo-meta',
    title: 'SEO Meta Fields',
    description: 'Add custom SEO meta fields to posts and pages',
    type: 'admin',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'cookie-notice',
    title: 'Cookie Consent Notice',
    description: 'Display a customizable cookie consent notice',
    type: 'custom',
    image: 'https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'product-gallery',
    title: 'Enhanced Product Gallery',
    description: 'Improve WooCommerce product galleries with zoom and lightbox',
    type: 'ecommerce',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export function TemplatesPage() {
  const navigate = useNavigate();

  const handleUseTemplate = (template) => {
    // Navigate to create page with template data
    navigate(`/create?template=${template.id}&type=${template.type}&title=${encodeURIComponent(template.title)}&description=${encodeURIComponent(template.description)}`);
  };

  return (
    <div className="flex-1 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Plugin Templates</h1>
        <p className="text-gray-600 mb-8">
          Start with a pre-built template and customize it to your needs.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="h-48 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full px-2 py-1">
                    {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex space-x-3">
                  <Button onClick={() => handleUseTemplate(template)}>
                    Use Template
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/templates/${template.id}`}>
                      Preview
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
