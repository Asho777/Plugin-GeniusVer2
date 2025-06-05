import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PluginForm } from '../components/plugin-form';
import { PluginResult } from '../components/plugin-result';
import { generatePlugin } from '../services/plugin-service';

export function CreatePage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [plugin, setPlugin] = useState(null);
  
  // Get template data from URL parameters
  const templateId = searchParams.get('template') || '';
  const initialType = searchParams.get('type') || '';
  const initialTitle = searchParams.get('title') || '';
  const initialDescription = searchParams.get('description') || '';
  
  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const generatedPlugin = await generatePlugin(formData);
      setPlugin(generatedPlugin);
    } catch (error) {
      console.error('Error generating plugin:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex-1 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Create Your WordPress Plugin</h1>
        <p className="text-gray-600 mb-8">
          Describe what you want your plugin to do, and our AI will generate the code for you.
        </p>
        
        {!plugin ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <PluginForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              initialType={initialType}
              initialTitle={initialTitle}
              initialDescription={initialDescription}
              templateId={templateId}
            />
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <PluginResult plugin={plugin} />
          </div>
        )}
      </div>
    </div>
  );
}
