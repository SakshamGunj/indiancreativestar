// Vercel API endpoint for Cashfree order status
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Extract order ID from query parameter
    const { orderId } = req.query;

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
      data: result.data
    });

  } catch (error) {
    console.error('Order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
