import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CreditCard, PaypalIcon } from 'lucide-react';

const ShoppingCart = ({ config, costs, onCheckout }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        
        {/* Hardware */}
        {config.hardware && (
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <h4 className="font-medium">{config.hardware.name}</h4>
              <p className="text-sm text-gray-600">Hardware Device</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${config.hardware.price}</p>
              <p className="text-sm text-gray-500">One-time</p>
            </div>
          </div>
        )}

        {/* Pipelines */}
        {config.pipelines.map((pipelineId, index) => {
          const pipeline = pipelineTemplates.find(t => t.id === pipelineId);
          return (
            <div key={index} className="flex justify-between items-center py-3 border-b">
              <div>
                <h4 className="font-medium">{pipeline.name}</h4>
                <p className="text-sm text-gray-600">Pipeline License</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${pipeline.id === 'security' ? 39 : pipeline.id === 'industrial' ? 49 : 29}</p>
                <p className="text-sm text-gray-500">One-time</p>
              </div>
            </div>
          );
        })}

        {/* Subscription */}
        <div className="flex justify-between items-center py-3 border-b">
          <div>
            <h4 className="font-medium">Basic Support & Updates</h4>
            <p className="text-sm text-gray-600">Monthly Subscription</p>
          </div>
          <div className="text-right">
            <p className="font-medium">${costs.subscription}/month</p>
            <p className="text-sm text-gray-500">Recurring</p>
          </div>
        </div>

        {/* Total */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">One-time Payment</span>
            <span className="font-bold">${costs.hardware + costs.pipelines}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Monthly Subscription</span>
            <span className="font-bold">${costs.subscription}</span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <span className="text-lg font-bold">Total Today</span>
            <span className="text-lg font-bold text-blue-600">${costs.total}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PayPal */}
          <div 
            className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all
              ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPaymentMethod('paypal')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                <img src="/api/placeholder/48/48" alt="PayPal" className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-medium">PayPal</h4>
                <p className="text-sm text-gray-600">Pay securely with PayPal</p>
              </div>
            </div>
          </div>

          {/* Credit Card */}
          <div 
            className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all
              ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium">Credit Card</h4>
                <p className="text-sm text-gray-600">All major cards accepted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Action */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          disabled={!paymentMethod}
          onClick={() => onCheckout(paymentMethod)}
        >
          {paymentMethod === 'paypal' ? 'Pay with PayPal' : 'Complete Purchase'}
        </Button>
      </div>
    </div>
  );
};

const handleCheckout = async (paymentMethod) => {
  if (paymentMethod === 'paypal') {
    // Tutaj dodamy integrację z PayPal
    const paypalOrder = {
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: costs.total.toString(),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: (costs.hardware + costs.pipelines).toString()
            },
            shipping: {
              currency_code: "USD",
              value: "0.00"
            }
          }
        },
        items: [
          {
            name: config.hardware.name,
            unit_amount: {
              currency_code: "USD",
              value: config.hardware.price.toString()
            },
            quantity: "1"
          },
          ...config.pipelines.map(pipelineId => ({
            name: pipelineTemplates.find(t => t.id === pipelineId).name,
            unit_amount: {
              currency_code: "USD",
              value: (pipelineId === 'security' ? "39.00" : pipelineId === 'industrial' ? "49.00" : "29.00")
            },
            quantity: "1"
          }))
        ]
      }]
    };
    
    // Tu dodamy logikę inicjalizacji PayPal
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create(paypalOrder);
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(function(details) {
          // Sukces płatności
          setStep(4); // Przechodzimy do ostatniego kroku
        });
      }
    }).render('#paypal-button-container');
  }
};

// Eksport komponentu
//export default ShoppingCart;
