// PipexyConfigurator.js
const PipexyConfiguratorV2 = () => {
    const [activeStep, setActiveStep] = React.useState(1);
    const [config, setConfig] = React.useState({
        hardware: null,
        pipelines: [],
        modules: [],
        deployment: {
            type: 'local',
            settings: {}
        }
    });

    const hardwareOptions = [
        {
            id: 'rpi4',
            name: 'Raspberry Pi 4',
            type: 'SBC',
            specs: {
                cpu: 'Quad core Cortex-A72',
                ram: '8GB',
                gpu: 'VideoCore VI'
            },
            price: 75,
            image: '/api/placeholder/200/150'
        },
        {
            id: 'jetson',
            name: 'NVIDIA Jetson Nano',
            type: 'AI Computer',
            specs: {
                cpu: 'Quad core ARM A57',
                ram: '4GB',
                gpu: '128-core Maxwell'
            },
            price: 99,
            image: '/api/placeholder/200/150'
        },
        {
            id: 'orangepi',
            name: 'Orange Pi 5',
            type: 'SBC',
            specs: {
                cpu: 'RK3588S',
                ram: '8GB',
                gpu: 'Mali-G610'
            },
            price: 89,
            image: '/api/placeholder/200/150'
        }
    ];

    const pipelineTemplates = [
        {
            id: 'retail',
            name: 'Retail Analytics',
            description: 'People counting, heatmaps, behavior analysis',
            modules: ['object-detection', 'tracking', 'analytics'],
            requirements: {
                minRam: 4,
                minCpu: 4,
                gpu: true
            }
        },
        {
            id: 'security',
            name: 'Security & Surveillance',
            description: 'Object detection, face recognition, alerts',
            modules: ['face-recognition', 'object-detection', 'alerts'],
            requirements: {
                minRam: 8,
                minCpu: 4,
                gpu: true
            }
        },
        {
            id: 'industrial',
            name: 'Quality Control',
            description: 'Defect detection, measurements, OCR',
            modules: ['quality-check', 'measurement', 'reporting'],
            requirements: {
                minRam: 4,
                minCpu: 4,
                gpu: false
            }
        }
    ];

    // Hardware Selection Component
    const HardwareSelection = () => (
        <div>
            <h2 className="text-2xl font-bold mb-6">Select Hardware</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hardwareOptions.map(hw => (
                    <div 
                        key={hw.id}
                        className={`
                            hardware-card relative rounded-lg border-2 p-4 cursor-pointer
                            ${config.hardware?.id === hw.id ? 'border-blue-500' : 'border-gray-200'}
                        `}
                        onClick={() => setConfig({...config, hardware: hw})}
                    >
                        <img 
                            src={hw.image} 
                            alt={hw.name}
                            className="w-full h-32 object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{hw.name}</h3>
                        <p className="text-gray-600 mb-2">{hw.type}</p>
                        <ul className="text-sm text-gray-500">
                            <li>CPU: {hw.specs.cpu}</li>
                            <li>RAM: {hw.specs.ram}</li>
                            <li>GPU: {hw.specs.gpu}</li>
                        </ul>
                        <div className="mt-4">
                            <span className="text-lg font-bold">${hw.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Pipeline Selection Component
    const PipelineSelection = () => (
        <div>
            <h2 className="text-2xl font-bold mb-6">Select Pipeline Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pipelineTemplates.map(template => (
                    <div
                        key={template.id}
                        className={`
                            pipeline-node rounded-lg border-2 p-6 cursor-pointer
                            ${config.pipelines.includes(template.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                        `}
                        onClick={() => {
                            const pipelines = config.pipelines.includes(template.id)
                                ? config.pipelines.filter(id => id !== template.id)
                                : [...config.pipelines, template.id];
                            setConfig({...config, pipelines});
                        }}
                    >
                        <h3 className="text-xl font-semibold mb-3">{template.name}</h3>
                        <p className="text-gray-600 mb-4">{template.description}</p>
                        <div className="text-sm text-gray-500">
                            <p>Requirements:</p>
                            <ul className="list-disc ml-4">
                                <li>RAM: {template.requirements.minRam}GB</li>
                                <li>CPU: {template.requirements.minCpu} cores</li>
                                <li>GPU: {template.requirements.gpu ? 'Required' : 'Optional'}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
        
        // Dodajemy helper do kalkulacji kosztów
        const calculateCosts = (config, pipelineTemplates) => {
            const costs = {
                hardware: config.hardware?.price || 0,
                pipelines: 0,
                subscription: 0,
                total: 0
            };
        
            // Koszt pipeline'ów
            config.pipelines.forEach(pipelineId => {
                const pipeline = pipelineTemplates.find(t => t.id === pipelineId);
                switch(pipeline?.id) {
                    case 'retail':
                        costs.pipelines += 29;
                        break;
                    case 'security':
                        costs.pipelines += 39;
                        break;
                    case 'industrial':
                        costs.pipelines += 49;
                        break;
                    default:
                        break;
                }
            });
        
            // Koszt subskrypcji miesięcznej (bazowy)
            if (config.pipelines.length > 0) {
                costs.subscription = 19.99;
            }
        
            // Całkowity koszt
            costs.total = costs.hardware + costs.pipelines + costs.subscription;
        
            return costs;
        };
        
        // Zaktualizowany komponent ConfigurationSummary
        const ConfigurationSummary = () => {
            const costs = calculateCosts(config, pipelineTemplates);
        
            return (
                <div className="bg-gray-100 rounded-lg p-6 mt-6">
                    <h3 className="text-xl font-semibold mb-4">Configuration Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded p-4">
                            <h4 className="font-medium mb-2">Selected Hardware</h4>
                            <p className="text-gray-600">
                                {config.hardware ? config.hardware.name : 'Not selected'}
                            </p>
                            {config.hardware && (
                                <p className="text-sm text-blue-600 mt-1">
                                    ${config.hardware.price}
                                </p>
                            )}
                        </div>
                        <div className="bg-white rounded p-4">
                            <h4 className="font-medium mb-2">Selected Pipelines</h4>
                            <p className="text-gray-600">
                                {config.pipelines.length 
                                    ? config.pipelines.map(id => 
                                        pipelineTemplates.find(t => t.id === id)?.name
                                      ).join(', ')
                                    : 'None selected'
                                }
                            </p>
                            {config.pipelines.length > 0 && (
                                <p className="text-sm text-blue-600 mt-1">
                                    ${costs.pipelines} total
                                </p>
                            )}
                        </div>
                        <div className="bg-white rounded p-4">
                            <h4 className="font-medium mb-2">Monthly Subscription</h4>
                            <p className="text-gray-600">
                                {costs.subscription > 0 
                                    ? 'Basic Support & Updates'
                                    : 'No subscription selected'
                                }
                            </p>
                            {costs.subscription > 0 && (
                                <p className="text-sm text-blue-600 mt-1">
                                    ${costs.subscription}/month
                                </p>
                            )}
                        </div>
                        <div className="bg-white rounded p-4">
                            <h4 className="font-medium mb-2">Total Cost</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Hardware:</span>
                                    <span className="font-medium">${costs.hardware}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Pipelines:</span>
                                    <span className="font-medium">${costs.pipelines}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Monthly Sub:</span>
                                    <span className="font-medium">${costs.subscription}</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between items-center font-bold">
                                        <span>Total:</span>
                                        <span className="text-blue-600">${costs.total}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        + ${costs.subscription}/month
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    {/* Dodatkowe informacje o kosztach */}
                    {costs.total > 0 && (
                        <div className="mt-4 bg-blue-50 rounded-lg p-4">
                            <h4 className="font-medium text-blue-800 mb-2">Cost Breakdown</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">One-time costs:</span>
                                    <ul className="list-disc ml-4 text-blue-800">
                                        <li>Hardware: ${costs.hardware}</li>
                                        <li>Setup: ${costs.pipelines}</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="text-gray-600">Monthly costs:</span>
                                    <ul className="list-disc ml-4 text-blue-800">
                                        <li>Subscription: ${costs.subscription}</li>
                                        <li>Support: Included</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="text-gray-600">Includes:</span>
                                    <ul className="list-disc ml-4 text-blue-800">
                                        <li>Free updates</li>
                                        <li>Community support</li>
                                        <li>Basic monitoring</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Pipexy Configuration Studio
                </h1>
                <p className="text-gray-600 text-lg">
                    Build and deploy your custom pipeline in minutes
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-12">
                {[1, 2, 3, 4].map(step => (
                    <div 
                        key={step} 
                        className={`flex items-center ${
                            step <= activeStep ? 'text-blue-600' : 'text-gray-400'
                        }`}
                    >
                        <div className={`
                            w-10 h-10 rounded-full border-2 flex items-center justify-center
                            ${step <= activeStep ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}
                        `}>
                            {step}
                        </div>
                        {step < 4 && (
                            <div className={`w-32 h-1 ${
                                step < activeStep ? 'bg-blue-600' : 'bg-gray-300'
                            }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                {activeStep === 1 && <HardwareSelection />}
                {activeStep === 2 && <PipelineSelection />}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        className={`px-6 py-2 rounded-lg ${
                            activeStep > 1 
                                ? 'bg-gray-600 text-white' 
                                : 'bg-gray-300 text-gray-500'
                        }`}
                        onClick={() => activeStep > 1 && setActiveStep(activeStep - 1)}
                        disabled={activeStep === 1}
                    >
                        Previous
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg ${
                            (activeStep === 1 && config.hardware) ||
                            (activeStep === 2 && config.pipelines.length > 0)
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-300 text-white'
                        }`}
                        onClick={() => {
                            if (activeStep < 4 && (
                                (activeStep === 1 && config.hardware) ||
                                (activeStep === 2 && config.pipelines.length > 0)
                            )) {
                                setActiveStep(activeStep + 1);
                            }
                        }}
                    >
                        {activeStep === 4 ? 'Deploy' : 'Next'}
                    </button>
                </div>
            </div>

            <ConfigurationSummary />
        </div>
    );
};

// Export component
window.PipexyConfiguratorV2 = PipexyConfiguratorV2;
