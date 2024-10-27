import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const PlatformSelector = ({ platforms, selectedPlatform, onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {platforms.map((platform) => (
        <div
          key={platform.id}
          className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 
            ${selectedPlatform === platform.id ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => onSelect(platform.id)}
        >
          <div className="flex items-center space-x-3 mb-2">
            <img src={platform.icon} alt={platform.name} className="w-12 h-12" />
            <h3 className="font-medium">{platform.name}</h3>
          </div>
          <div className="text-sm text-gray-600">
            Supported versions:
            <ul className="list-disc ml-4">
              {platform.versions.map((version) => (
                <li key={version}>{version}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const UseCaseSelector = ({ useCases, selectedUseCase, onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {useCases.map((useCase) => (
        <div
          key={useCase.id}
          className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500
            ${selectedUseCase === useCase.id ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => onSelect(useCase.id)}
        >
          <h3 className="font-medium mb-2">{useCase.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{useCase.description}</p>
          <div className="flex items-center text-sm text-orange-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            {useCase.requirements}
          </div>
        </div>
      ))}
    </div>
  );
};

const ModuleSelector = ({ modules, selectedModules, onToggle }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {modules.map((module) => (
        <div
          key={module.id}
          className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500
            ${selectedModules.includes(module.id) ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => onToggle(module.id)}
        >
          <h3 className="font-medium mb-2">{module.name}</h3>
          <div className="text-sm text-gray-600">
            <p>Size: {module.size}</p>
            <p>Performance: {module.performance}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const DeploymentSummary = ({ config, platforms, useCases, modules }) => {
  const platform = platforms.find(p => p.id === config.platform);
  const useCase = useCases.find(u => u.id === config.useCase);
  const selectedModules = modules.filter(m => config.modules.includes(m.id));

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-2">Selected Platform</h3>
        <p>{platform?.name}</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-2">Selected Use Case</h3>
        <p>{useCase?.name}</p>
        <p className="text-sm text-gray-600">{useCase?.description}</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-2">Selected Modules</h3>
        <ul className="list-disc ml-4">
          {selectedModules.map(module => (
            <li key={module.id}>{module.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PipexyDeployment = () => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    platform: '',
    useCase: '',
    modules: []
  });

  const platforms = [
    {
      id: 'rpi',
      name: 'Raspberry Pi',
      versions: ['Pi 3', 'Pi 4', 'Pi 5'],
      icon: "/api/placeholder/48/48"
    },
    {
      id: 'orangepi',
      name: 'Orange Pi',
      versions: ['5', '4 LTS', '3 LTS'],
      icon: "/api/placeholder/48/48"
    },
    {
      id: 'jetson',
      name: 'NVIDIA Jetson',
      versions: ['Nano', 'Xavier NX', 'Orin'],
      icon: "/api/placeholder/48/48"
    }
  ];

  const useCases = [
    {
      id: 'retail',
      name: 'Retail Analytics',
      description: 'People counting, heatmaps, queue detection',
      requirements: 'Min: RPi 4 4GB'
    },
    {
      id: 'security',
      name: 'Security & Surveillance',
      description: 'Object detection, face recognition, ANPR',
      requirements: 'Min: RPi 4 8GB'
    },
    {
      id: 'industrial',
      name: 'Industrial Quality Control',
      description: 'Defect detection, measurement, OCR',
      requirements: 'Min: Jetson Nano'
    }
  ];

  const modules = [
    {
      id: 'object-detection',
      name: 'Object Detection',
      size: '50MB',
      performance: 'Medium'
    },
    {
      id: 'face-recognition',
      name: 'Face Recognition',
      size: '100MB',
      performance: 'High'
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      size: '20MB',
      performance: 'Low'
    }
  ];

  const toggleModule = (moduleId) => {
    setConfig(prev => ({
      ...prev,
      modules: prev.modules.includes(moduleId)
        ? prev.modules.filter(id => id !== moduleId)
        : [...prev.modules, moduleId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Deploy Configuration</h2>
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={`flex items-center ${i <= step ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${i <= step ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                {i}
              </div>
              {i < 4 && <div className={`w-24 h-0.5 ${i < step ? 'bg-blue-600' : 'bg-gray-300'}`} />}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Select Your Platform"}
            {step === 2 && "Select Use Case"}
            {step === 3 && "Select Modules"}
            {step === 4 && "Deployment Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <PlatformSelector
              platforms={platforms}
              selectedPlatform={config.platform}
              onSelect={(platform) => setConfig({...config, platform})}
            />
          )}

          {step === 2 && (
            <UseCaseSelector
              useCases={useCases}
              selectedUseCase={config.useCase}
              onSelect={(useCase) => setConfig({...config, useCase})}
            />
          )}

          {step === 3 && (
            <ModuleSelector
              modules={modules}
              selectedModules={config.modules}
              onToggle={toggleModule}
            />
          )}

          {step === 4 && (
            <DeploymentSummary
              config={config}
              platforms={platforms}
              useCases={useCases}
              modules={modules}
            />
          )}

          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <Button onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            {step < 4 && (
              <Button
                className="ml-auto"
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !config.platform) ||
                  (step === 2 && !config.useCase) ||
                  (step === 3 && config.modules.length === 0)
                }
              >
                Next
              </Button>
            )}
            {step === 4 && (
              <Button className="ml-auto bg-green-600 hover:bg-green-700">
                Deploy Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

//export default PipexyDeployment;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PipexyDeployment;
}
