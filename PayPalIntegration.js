// PayPalIntegration.js
const initPayPalButton = (costs, onSuccess) => {
    // Upewnij się, że PayPal jest załadowany
    if (!window.paypal) {
        console.error('PayPal SDK not loaded');
        return;
    }

    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'blue',
            shape:  'rect',
            label:  'pay'
        },

        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: 'Pipexy Configuration Package',
                    amount: {
                        currency_code: 'USD',
                        value: costs.total,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: costs.hardware + costs.pipelines
                            },
                            shipping: {
                                currency_code: 'USD',
                                value: '0'
                            }
                        }
                    },
                    items: [
                        {
                            name: 'Hardware',
                            unit_amount: {
                                currency_code: 'USD',
                                value: costs.hardware
                            },
                            quantity: '1'
                        },
                        {
                            name: 'Pipeline Setup',
                            unit_amount: {
                                currency_code: 'USD',
                                value: costs.pipelines
                            },
                            quantity: '1'
                        }
                    ]
                }],
                application_context: {
                    shipping_preference: 'NO_SHIPPING'
                }
            });
        },

        onApprove: function(data, actions) {
            return actions.order.capture().then(function(orderData) {
                onSuccess(orderData);
            });
        },

        onError: function(err) {
            console.error('PayPal Error:', err);
            alert('There was an error processing your payment. Please try again.');
        }
    }).render('#paypal-button-container');
}
