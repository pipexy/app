// ShoppingCart.js component
const ShoppingCart = ({ config, costs, onPurchase }) => {
    const [paymentMethod, setPaymentMethod] = React.useState('paypal');
    const [isProcessing, setIsProcessing] = React.useState(false);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Review & Payment</h2>
            
            {/* Cart Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                
                {/* Hardware */}
                <div className="border-b pb-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium">{config.hardware.name}</h4>
                            <p className="text-sm text-gray-600">Single Board Computer</p>
                        </div>
                        <span className="font-bold">${config.hardware.price}</span>
                    </div>
                </div>

                {/* Pipelines */}
                <div className="border-b pb-4 mb-4">
                    <h4 className="font-medium mb-2">Selected Pipelines</h4>
                    {config.pipelines.map(pipelineId => {
                        const pipeline = pipelineTemplates.find(t => t.id === pipelineId);
                        return (
                            <div key={pipelineId} className="flex justify-between text-sm mb-2">
                                <span>{pipeline.name}</span>
                                <span>${pipeline.id === 'retail' ? '29' : pipeline.id === 'security' ? '39' : '49'}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Subscription */}
                <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="font-medium">Monthly Subscription</h4>
                            <p className="text-sm text-gray-600">Basic Support & Updates</p>
                        </div>
                        <span>${costs.subscription}/month</span>
                    </div>
                </div>

                {/* Total */}
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                        <span>Hardware:</span>
                        <span>${costs.hardware}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Setup & Pipelines:</span>
                        <span>${costs.pipelines}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Monthly Subscription:</span>
                        <span>${costs.subscription}/month</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Total Today:</span>
                        <span>${costs.total}</span>
                    </div>
                    <p className="text-sm text-gray-600 text-right">
                        + ${costs.subscription}/month after trial
                    </p>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                
                <div className="space-y-4">
                    {/* PayPal Option */}
                    <div 
                        className={`border rounded-lg p-4 cursor-pointer ${
                            paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => setPaymentMethod('paypal')}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-8 flex items-center">
                                <img 
                                    src="/api/placeholder/48/32" 
                                    alt="PayPal" 
                                    className="w-full object-contain"
                                />
                            </div>
                            <div>
                                <h4 className="font-medium">PayPal</h4>
                                <p className="text-sm text-gray-600">
                                    Safe payment through PayPal
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Credit Card Option (Disabled for demo) */}
                    <div className="border rounded-lg p-4 opacity-50 cursor-not-allowed">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-8 flex items-center">
                                <img 
                                    src="/api/placeholder/48/32" 
                                    alt="Credit Card" 
                                    className="w-full object-contain"
                                />
                            </div>
                            <div>
                                <h4 className="font-medium">Credit Card</h4>
                                <p className="text-sm text-gray-600">
                                    Coming soon
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
                <p className="mb-2">By proceeding with the purchase you agree to:</p>
                <ul className="list-disc ml-5 space-y-1 text-gray-600">
                    <li>Pipexy Terms of Service</li>
                    <li>Monthly subscription billing after trial</li>
                    <li>Refund policy for hardware</li>
                </ul>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-end items-center gap-4">
                <button
                    className="px-6 py-2 rounded-lg border hover:bg-gray-50"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
                <button
                    className={`px-8 py-3 rounded-lg bg-blue-600 text-white flex items-center gap-2 ${
                        isProcessing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                    onClick={async () => {
                        setIsProcessing(true);
                        // Tutaj dodać integrację z PayPal
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        onPurchase();
                        setIsProcessing(false);
                    }}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <span className="animate-spin">⚪</span>
                            Processing...
                        </>
                    ) : (
                        <>
                            <span>Checkout with PayPal</span>
                            <span>${costs.total}</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
