// PipexyConfig.js
const PipexyConfig = () => {
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

    // Możemy wydzielić dane do osobnych plików
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
        // ... więcej opcji
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <HardwareSelector 
                options={hardwareOptions}
                selected={config.hardware}
                onSelect={(hw) => setConfig({...config, hardware: hw})}
            />
            
            <PipelineSelector
                templates={pipelineTemplates}
                selected={config.pipelines}
                onSelect={(pipelines) => setConfig({...config, pipelines})}
            />
            
            <ConfigSummary config={config} />
            
            {/* Navigation */}
            <div className="flex justify-between mt-8">
                <button
                    className="px-6 py-2 rounded-lg bg-gray-600 text-white"
                    onClick={() => activeStep > 1 && setActiveStep(activeStep - 1)}
                    disabled={activeStep === 1}
                >
                    Previous
                </button>
                <button
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white"
                    onClick={() => activeStep < 4 && setActiveStep(activeStep + 1)}
                >
                    {activeStep === 4 ? 'Deploy' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default PipexyConfig;
