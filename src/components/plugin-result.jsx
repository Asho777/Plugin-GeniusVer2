import React, { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export function PluginResult({ plugin }) {
  const [activeTab, setActiveTab] = useState('preview');
  
  const handleDownload = async () => {
    const zip = new JSZip();
    
    // Add main plugin file
    zip.file(`${plugin.slug}/${plugin.slug}.php`, plugin.mainFile);
    
    // Add additional files
    if (plugin.additionalFiles) {
      Object.entries(plugin.additionalFiles).forEach(([path, content]) => {
        zip.file(`${plugin.slug}/${path}`, content);
      });
    }
    
    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${plugin.slug}.zip`);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-800">
        <h3 className="text-lg font-medium">Plugin Generated Successfully!</h3>
        <p className="mt-1">Your WordPress plugin "{plugin.name}" is ready to download and install.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleDownload} className="flex-1">
          Download Plugin (ZIP)
        </Button>
        <Button variant="outline" className="flex-1">
          Save to My Projects
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="p-4 border rounded-md mt-2">
          <div className="prose max-w-none">
            <h3>Plugin Details</h3>
            <ul>
              <li><strong>Name:</strong> {plugin.name}</li>
              <li><strong>Type:</strong> {plugin.type}</li>
              <li><strong>Description:</strong> {plugin.description}</li>
            </ul>
            
            <h3>Features</h3>
            <ul>
              {plugin.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="mt-2">
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 text-sm font-medium border-b">
              {plugin.slug}.php
            </div>
            <pre className="p-4 overflow-auto text-sm bg-gray-50 max-h-[400px]">
              <code>{plugin.mainFile}</code>
            </pre>
          </div>
          
          {plugin.additionalFiles && Object.entries(plugin.additionalFiles).map(([path, content]) => (
            <div key={path} className="border rounded-md overflow-hidden mt-4">
              <div className="bg-gray-100 px-4 py-2 text-sm font-medium border-b">
                {path}
              </div>
              <pre className="p-4 overflow-auto text-sm bg-gray-50 max-h-[400px]">
                <code>{content}</code>
              </pre>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="instructions" className="p-4 border rounded-md mt-2">
          <div className="prose max-w-none">
            <h3>Installation Instructions</h3>
            <ol>
              <li>Download the plugin ZIP file using the "Download Plugin" button above.</li>
              <li>Log in to your WordPress admin dashboard.</li>
              <li>Navigate to Plugins → Add New → Upload Plugin.</li>
              <li>Choose the downloaded ZIP file and click "Install Now".</li>
              <li>After installation completes, click "Activate Plugin".</li>
            </ol>
            
            <h3>Usage Instructions</h3>
            <div dangerouslySetInnerHTML={{ __html: plugin.instructions }} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
