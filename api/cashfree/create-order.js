// Vercel API endpoint for Cashfree order creation
const { Cashfree, CFEnvironment } = require('cashfree-pg');

// Initialize Cashfree SDK
const cashfree = new Cashfree(
  CFEnvironment.PRODUCTION, // Always use production for live deployment
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

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
        return_url: order_meta.return_url || `${req.headers.origin || 'http://localhost:8081'}/payment-success`,
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
        order_id: result.data.order_id,
        payment_session_id: result.data.payment_session_id,
        order_status: result.data.order_status,
        order_amount: result.data.order_amount,
        order_currency: result.data.order_currency,
        customer_details: result.data.customer_details,
        order_meta: result.data.order_meta,
        created_at: result.data.created_at
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
};
