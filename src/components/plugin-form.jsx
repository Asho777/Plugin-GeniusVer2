import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { Badge } from './ui/badge';

const pluginTypes = [
  { value: 'widget', label: 'Widget' },
  { value: 'shortcode', label: 'Shortcode' },
  { value: 'admin', label: 'Admin Enhancement' },
  { value: 'content', label: 'Content Enhancement' },
  { value: 'custom', label: 'Custom Functionality' },
  { value: 'ecommerce', label: 'E-Commerce' },
];

export function PluginForm({ onSubmit, isLoading, initialType = '', initialTitle = '', initialDescription = '', templateId = '' }) {
  const [formData, setFormData] = useState({
    title: initialTitle,
    description: initialDescription,
    type: initialType,
    templateId: templateId
  });
  const { toast } = useToast();

  // Update form when props change (when coming from templates page)
  useEffect(() => {
    setFormData({
      title: initialTitle,
      description: initialDescription,
      type: initialType,
      templateId: templateId
    });
  }, [initialTitle, initialDescription, initialType, templateId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, type: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a plugin title",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please describe what your plugin should do",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.type) {
      toast({
        title: "Missing information",
        description: "Please select a plugin type",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {templateId && (
        <div className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">Template</Badge>
            <span className="font-medium">Using template as a starting point</span>
          </div>
          <p className="text-sm text-gray-600">
            You're using a template as a starting point. Feel free to modify the details below to customize your plugin.
          </p>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="title">Plugin Name</Label>
        <Input
          id="title"
          name="title"
          placeholder="My Amazing Plugin"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Plugin Type</Label>
        <Select value={formData.type} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select plugin type" />
          </SelectTrigger>
          <SelectContent>
            {pluginTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Describe Your Plugin</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe what you want your plugin to do in plain English. For example: 'I want a plugin that displays a random quote from a list in the sidebar' or 'Create a plugin that adds a contact form shortcode'"
          value={formData.description}
          onChange={handleChange}
          className="min-h-[150px]"
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Generating Plugin..." : "Generate Plugin"}
      </Button>
    </form>
  );
}
