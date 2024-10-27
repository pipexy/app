// HardwareSelector.js
const HardwareSelector = ({ options, selected, onSelect }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Select Hardware</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {options.map(hw => (
                    <div 
                        key={hw.id}
                        className={`
                            hardware-card relative rounded-lg border-2 p-4 cursor-pointer
                            ${selected?.id === hw.id ? 'border-blue-500' : 'border-gray-200'}
                        `}
                        onClick={() => onSelect(hw)}
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
};

export default HardwareSelector;
