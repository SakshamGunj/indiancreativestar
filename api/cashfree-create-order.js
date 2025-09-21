// Cashfree Order Creation API
// This endpoint creates orders for Cashfree payment processing

const express = require('express');
const cors = require('cors');
const { Cashfree, CFEnvironment } = require('cashfree-pg');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cashfree Configuration
const CASHFREE_CONFIG = {
  CLIENT_ID: process.env.CASHFREE_CLIENT_ID || 'TEST_CLIENT_ID',
  CLIENT_SECRET: process.env.CASHFREE_CLIENT_SECRET || 'TEST_CLIENT_SECRET',
  ENVIRONMENT: process.env.CASHFREE_ENVIRONMENT || 'sandbox'
};

// Initialize Cashfree SDK
const cashfree = new Cashfree(
  CASHFREE_CONFIG.ENVIRONMENT === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
  CASHFREE_CONFIG.CLIENT_ID,
  CASHFREE_CONFIG.CLIENT_SECRET
);

// Create Order Endpoint
app.post('/api/cashfree/create-order', async (req, res) => {
  try {
    const {
      order_amount,
      order_currency = 'INR',
      customer_details,
      order_meta = {},
      order_note = 'Test Order'
    } = req.body;

    // Validate required fields
    if (!order_amount || !customer_details) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: order_amount and customer_details are required'
      });
    }

    // Prepare order data
    const orderData = {
      order_amount: order_amount.toString(),
      order_currency,
      customer_details: {
        customer_id: customer_details.customer_id || `customer_${Date.now()}`,
        customer_name: customer_details.customer_name || 'Test Customer',
        customer_email: customer_details.customer_email || 'test@example.com',
        customer_phone: customer_details.customer_phone || '9999999999'
      },
      order_meta: {
        return_url: order_meta.return_url || `${req.protocol}://${req.get('host')}/payment-success`,
        ...order_meta
      },
      order_note
    };

    // Create order with Cashfree SDK
    const result = await cashfree.PGCreateOrder(orderData);
    
    if (!result || !result.data) {
      console.error('Cashfree SDK Error:', result);
      return res.status(500).json({
        success: false,
        message: 'Failed to create order with Cashfree',
        error: result
      });
    }

    // Return successful response
    res.json({
      success: true,
      data: {
        order_id: result.order_id,
        payment_session_id: result.payment_session_id,
        order_status: result.order_status,
        order_amount: result.order_amount,
        order_currency: result.order_currency,
        customer_details: result.customer_details,
        order_meta: result.order_meta,
        created_at: result.created_at
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get Order Status Endpoint
app.get('/api/cashfree/order-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Get order status from Cashfree SDK
    const result = await cashfree.PGFetchOrder("2023-08-01", orderId);
    
    if (!result || !result.data) {
      console.error('Cashfree SDK Error:', result);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch order status',
        error: result
      });
    }

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/cashfree/health', (req, res) => {
  res.json({
    success: true,
    message: 'Cashfree API is running',
    environment: CASHFREE_CONFIG.ENVIRONMENT,
    timestamp: new Date().toISOString()
  });
});

// Export the app for Vercel
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Cashfree API server running on port ${PORT}`);
    console.log(`Environment: ${CASHFREE_CONFIG.ENVIRONMENT}`);
  });
}
