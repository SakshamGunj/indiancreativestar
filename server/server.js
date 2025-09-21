import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning', 'X-Requested-With']
}));

// PhonePe Production credentials
const MERCHANT_KEY = "72922294-4990-4ecf-a106-c561f2c0e8e0";
const MERCHANT_ID = "M22FRRQLYTSI4";

// Cashfree production credentials
const CASHFREE_CLIENT_ID = "50613090c329a15663b2765f45031605";
const CASHFREE_CLIENT_SECRET = "cfsk_ma_prod_6165faf46209e032eab4c853d3226b66_b90a4aa0";
const CASHFREE_BASE_URL = "https://api.cashfree.com/pg";

// Production URLs
const MERCHANT_BASE_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
const MERCHANT_STATUS_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status";

// Local redirect URLs
const redirectUrl = "http://localhost:3001/payment-status";

// Dynamic URLs based on request origin
const getRedirectUrls = (req) => {
  const origin = req.get('origin') || req.get('referer') || 'http://localhost:8080';
  const baseUrl = origin.includes('localhost') ? origin : 'http://localhost:8080';
  return {
    successUrl: `${baseUrl}/indiancreativestar/dashboard?payment=success`,
    failureUrl: `${baseUrl}/indiancreativestar/dashboard?payment=failed`
  };
};

// Create payment order
app.post('/create-payment', async (req, res) => {
  try {
    const { name, mobileNumber, email } = req.body;
    
    if (!name || !mobileNumber || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const orderId = uuidv4();
    const amount = 1; // ₹1 payment

    // Payment payload - Based on working documentation format
    const paymentPayload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: orderId,
      merchantUserId: 'MUID' + Date.now(),
      name: name,
      amount: amount * 100, // Convert to paise (₹1 = 100 paise)
      redirectUrl: `${redirectUrl}?id=${orderId}`,
      redirectMode: 'POST',
      mobileNumber: mobileNumber,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };
    
    console.log('Payment Payload:', JSON.stringify(paymentPayload, null, 2));

    const payload = JSON.stringify(paymentPayload);
    const payloadMain = Buffer.from(payload).toString('base64');
    const keyIndex = 1;
    const string = payloadMain + '/pg/v1/pay' + MERCHANT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const requestData = {
      method: 'POST',
      url: MERCHANT_BASE_URL,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      data: {
        request: payloadMain
      }
    };

    const response = await axios.request(requestData);

    const data = response.data;
    console.log('PhonePe Payment Response:', JSON.stringify(data, null, 2));
    console.log('Expected Amount: ₹1 (100 paise)');
    console.log('Merchant ID:', MERCHANT_ID);
    
    if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      console.log('✅ Payment URL generated successfully');
      console.log('Order ID:', orderId);
      console.log('Amount: ₹1 (100 paise)');
      console.log('Merchant:', MERCHANT_ID);
      res.status(200).json({
        success: true,
        paymentUrl: data.data.instrumentResponse.redirectInfo.url,
        orderId: orderId
      });
    } else {
      console.error('PhonePe API Error:', data);
      // Enhanced error handling
      if (data.message && data.message.includes('Api Mapping Not Found')) {
        res.status(500).json({ 
          error: 'Merchant account not activated for production. Please contact PhonePe support.',
          details: data 
        });
      } else if (data.code === 'BAD_REQUEST') {
        res.status(400).json({ 
          error: 'Invalid request format. Please check merchant credentials.',
          details: data 
        });
      } else {
        res.status(500).json({ 
          error: 'Payment initiation failed', 
          details: data,
          merchantId: MERCHANT_ID,
          expectedAmount: '₹1 (100 paise)'
        });
      }
    }

  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Payment status verification (handle both POST and GET)
app.all('/payment-status', async (req, res) => {
  try {
    const merchantTransactionId = req.query.id;
    const { successUrl, failureUrl } = getRedirectUrls(req);

    if (!merchantTransactionId) {
      console.log('No transaction ID found');
      return res.redirect(failureUrl);
    }

    console.log('Checking status for transaction:', merchantTransactionId);

    const keyIndex = 1;
    const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const options = {
      method: 'GET',
      url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': MERCHANT_ID
      }
    };

    const response = await axios.request(options);
    const data = response.data;
    console.log('PhonePe Status Response:', JSON.stringify(data, null, 2));

    if (data.success === true && data.data?.responseCode === 'SUCCESS') {
      console.log('✅ Payment successful');
      return res.redirect(successUrl);
    } else {
      console.log('❌ Payment failed:', data);
      return res.redirect(failureUrl);
    }

  } catch (error) {
    console.error('Payment status error:', error);
    const { failureUrl } = getRedirectUrls(req);
    return res.redirect(failureUrl);
  }
});

// Create Cashfree Order for Hosted Checkout
app.post('/create-cashfree-order', async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body;
    
    if (!name || !email || !phone || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const orderId = `ORDER_${Date.now()}`;

    const payload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: name,
        customer_email: email,
        customer_phone: phone
      },
      order_meta: {
        return_url: `https://7cf5aae3a448.ngrok-free.app/indiancreativestar/dashboard?payment=cashfree-success`,
        notify_url: `https://37a39fff3e1d.ngrok-free.app/cashfree-webhook`
      }
    };

    console.log('Cashfree Order Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.post(`${CASHFREE_BASE_URL}/orders`, payload, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_CLIENT_ID,
        'x-client-secret': CASHFREE_CLIENT_SECRET
      }
    });

    console.log('Cashfree Order Response:', JSON.stringify(response.data, null, 2));

    if (response.data && response.data.payment_session_id) {
      res.status(200).json({
        success: true,
        order_id: response.data.order_id,
        payment_session_id: response.data.payment_session_id
      });
    } else {
      res.status(500).json({ error: 'Failed to create order' });
    }

  } catch (error) {
    console.error('Cashfree order error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Cashfree Payment Link
app.post('/create-cashfree-link', async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body;
    
    if (!name || !email || !phone || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const linkId = `LINK_${Date.now()}`;
    const expireAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const payload = {
      link_id: linkId,
      link_amount: amount,
      link_currency: 'INR',
      link_purpose: 'Indian Creative Star - Entry Fee',
      customer_details: {
        customer_name: name,
        customer_email: email,
        customer_phone: phone
      },
      link_expiry_time: expireAt,
      link_notify: {
        send_sms: false,
        send_email: true
      },
      link_auto_reminders: true,
      link_notes: {
        competition: 'Indian Creative Star',
        entry_fee: 'true'
      },
      link_meta: {
        notify_url: `https://37a39fff3e1d.ngrok-free.app/cashfree-webhook`
      }
    };

    console.log('Cashfree Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.post(`${CASHFREE_BASE_URL}/links`, payload, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': CASHFREE_CLIENT_ID,
        'x-client-secret': CASHFREE_CLIENT_SECRET
      }
    });

    console.log('Cashfree Response:', JSON.stringify(response.data, null, 2));

    if (response.data && response.data.link_url) {
      res.status(200).json({
        success: true,
        link_url: response.data.link_url,
        link_id: response.data.link_id,
        cf_link_id: response.data.cf_link_id
      });
    } else {
      res.status(500).json({ error: 'Failed to create payment link' });
    }

  } catch (error) {
    console.error('Cashfree error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cashfree Webhook Handler
app.post('/cashfree-webhook', (req, res) => {
  try {
    console.log('\n🔔 Cashfree Webhook Received:');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    const webhookData = req.body;
    
    // Handle different webhook types
    if (webhookData.type === 'PAYMENT_SUCCESS_WEBHOOK') {
      console.log('✅ Payment Success Webhook');
      console.log('Order ID:', webhookData.data?.order?.order_id);
      console.log('Order Status:', webhookData.data?.order?.order_status);
      console.log('Amount:', webhookData.data?.order?.order_amount);
      console.log('Customer:', webhookData.data?.order?.customer_details?.customer_name);
      
    } else if (webhookData.type === 'PAYMENT_FAILED_WEBHOOK') {
      console.log('❌ Payment Failed Webhook');
      console.log('Order ID:', webhookData.data?.order?.order_id);
      console.log('Failure Reason:', webhookData.data?.order?.order_status);
      
    } else if (webhookData.data?.form) {
      console.log('📋 Payment Form Webhook');
      console.log('Form ID:', webhookData.data.form.form_id);
      console.log('Order Status:', webhookData.data.order.order_status);
      console.log('Amount:', webhookData.data.order.order_amount);
      console.log('Customer:', webhookData.data.order.customer_details?.customer_name);
      
    } else {
      console.log('🔄 Other Webhook Type:', webhookData.type || 'Unknown');
    }
    
    res.status(200).json({ 
      status: 'success',
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Cashfree webhook error:', error);
    res.status(500).json({ 
      error: 'Webhook processing failed',
      message: error.message 
    });
  }
});

const PORT = 3001;
// Handle preflight requests
app.options('*', cors());

// Middleware to handle ngrok headers and CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, ngrok-skip-browser-warning');
  res.header('Access-Control-Max-Age', '86400');
  
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  
  if (req.method === 'OPTIONS') {
    console.log('Handling preflight request');
    res.status(200).end();
    return;
  }
  next();
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Payment Server running on http://localhost:${PORT}`);
  console.log(`📱 PhonePe endpoint: http://localhost:${PORT}/create-payment`);
  console.log(`💳 Cashfree Link: http://localhost:${PORT}/create-cashfree-link`);
  console.log(`🛒 Cashfree Checkout: http://localhost:${PORT}/create-cashfree-order`);
  console.log(`🔔 Cashfree Webhook: http://localhost:${PORT}/cashfree-webhook`);
  console.log(`✅ Status endpoint: http://localhost:${PORT}/payment-status`);
  console.log('\n📝 Setup ngrok for HTTPS:');
  console.log('1. ngrok http 3001 (for backend)');
  console.log('2. ngrok http 8080 (for frontend)');
  console.log('3. Update URLs in Cashfree dashboard');
});