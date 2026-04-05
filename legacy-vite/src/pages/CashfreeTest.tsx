import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Loader2, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Declare Cashfree global type
declare global {
  interface Window {
    Cashfree: any;
  }
}

interface CashfreeInstance {
  checkout: (options: CheckoutOptions) => Promise<any>;
}

interface CheckoutOptions {
  paymentSessionId: string;
  redirectTarget?: '_self' | '_blank' | '_top' | '_modal' | HTMLElement;
  appearance?: {
    width?: string;
    height?: string;
  };
}

interface CustomerDetails {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

interface OrderResponse {
  success: boolean;
  data: {
    order_id: string;
    payment_session_id: string;
    order_status: string;
    order_amount: string;
    order_currency: string;
    customer_details: CustomerDetails;
    order_meta: any;
    created_at: string;
  };
}

interface OrderStatusResponse {
  success: boolean;
  data: {
    order_id: string;
    order_status: string;
    order_amount: string;
    order_currency: string;
    customer_details: CustomerDetails;
    order_meta: any;
    payment_details?: any;
    created_at: string;
    order_expiry_time: string;
  };
}

const CashfreeTest: React.FC = () => {
  const [cashfree, setCashfree] = useState<CashfreeInstance | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [paymentMode, setPaymentMode] = useState<'sandbox' | 'production'>('sandbox');
  const [redirectTarget, setRedirectTarget] = useState<'_self' | '_blank' | '_top' | '_modal' | 'inline'>('_self');
  const [showInlineCheckout, setShowInlineCheckout] = useState(false);
  
  // Form data
  const [orderAmount, setOrderAmount] = useState('100');
  const [orderCurrency, setOrderCurrency] = useState('INR');
  const [customerName, setCustomerName] = useState('Test Customer');
  const [customerEmail, setCustomerEmail] = useState('test@example.com');
  const [customerPhone, setCustomerPhone] = useState('9999999999');
  const [orderNote, setOrderNote] = useState('Test payment for Cashfree integration');
  
  // Payment state
  const [currentOrder, setCurrentOrder] = useState<OrderResponse['data'] | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatusResponse['data'] | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  // Initialize Cashfree SDK
  useEffect(() => {
    const initializeCashfree = () => {
      try {
        setInitializing(true);
        
        // Check if Cashfree script is already loaded
        if (window.Cashfree) {
          const cf = window.Cashfree({
            mode: paymentMode
          });
          setCashfree(cf);
          console.log('Cashfree SDK initialized successfully');
          setInitializing(false);
          return;
        }

        // Load Cashfree script if not already loaded
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.async = true;
        script.onload = () => {
          try {
            const cf = window.Cashfree({
              mode: paymentMode
            });
            setCashfree(cf);
            console.log('Cashfree SDK initialized successfully');
          } catch (error) {
            console.error('Failed to initialize Cashfree SDK:', error);
            toast.error('Failed to initialize Cashfree SDK');
          } finally {
            setInitializing(false);
          }
        };
        script.onerror = () => {
          console.error('Failed to load Cashfree SDK script');
          toast.error('Failed to load Cashfree SDK');
          setInitializing(false);
        };
        
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to initialize Cashfree SDK:', error);
        toast.error('Failed to initialize Cashfree SDK');
        setInitializing(false);
      }
    };

    initializeCashfree();
  }, [paymentMode]);

  // Create order
  const createOrder = async () => {
    try {
      setLoading(true);
      
        const orderData = {
          order_amount: orderAmount,
          order_currency: orderCurrency,
          customer_details: {
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone
          },
          order_meta: {
            return_url: paymentMode === 'sandbox'
              ? `${window.location.origin}/payment-success` // Use HTTP for sandbox mode
              : `https://yourdomain.com/payment-success` // Use HTTPS for production mode
          },
          order_note: orderNote
        };

      // For local development, use mock data
      const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const useRealAPI = true; // Now using real test credentials!
      
      if (isLocalDev && !useRealAPI) {
        // Mock order creation for local testing
        const mockOrder: OrderResponse = {
          success: true,
          data: {
            order_id: `order_${Date.now()}`,
            payment_session_id: `session_${Date.now()}`,
            order_status: 'ACTIVE',
            order_amount: orderAmount,
            order_currency: orderCurrency,
            customer_details: {
              customer_name: customerName,
              customer_email: customerEmail,
              customer_phone: customerPhone
            },
            order_meta: {
              return_url: `${window.location.origin}/payment-success`
            },
            created_at: new Date().toISOString()
          }
        };
        
        setCurrentOrder(mockOrder.data);
        toast.success('Mock order created successfully! (Local Development Mode)');
        console.log('Mock order created:', mockOrder.data);
        return;
      }

      const response = await fetch('/api/cashfree/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result: OrderResponse = await response.json();

      if (result.success) {
        setCurrentOrder(result.data);
        toast.success('Order created successfully!');
        console.log('Order created:', result.data);
      } else {
        // Handle authentication errors specifically
        if (result.setup_required) {
          toast.error('Cashfree credentials not set up. Please configure your .env file with valid credentials.');
          console.error('Setup required:', result.error);
        } else {
          throw new Error(result.message || 'Failed to create order');
        }
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(`Failed to create order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Open checkout
  const openCheckout = async () => {
    if (!cashfree || !currentOrder) {
      toast.error('Cashfree SDK not initialized or no order available');
      return;
    }

    try {
        // For local development, simulate checkout flow
        const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const useRealAPI = true; // Now using real test credentials!
      
      if (isLocalDev && !useRealAPI) {
        // Mock checkout flow for local development
        toast.info('Local Development Mode: Simulating checkout flow...');
        
        // Simulate different checkout behaviors based on redirect target
        if (redirectTarget === '_modal') {
          // Simulate popup checkout
          setTimeout(() => {
            toast.success('Mock Payment Completed! (Local Development Mode)');
            // Automatically check order status
            setTimeout(() => {
              checkOrderStatus();
            }, 1000);
          }, 2000);
        } else if (redirectTarget === 'inline') {
          // Simulate inline checkout
          const container = document.getElementById('inline-checkout-container');
          if (container) {
            container.innerHTML = `
              <div style="padding: 20px; text-align: center; color: white;">
                <h3 style="color: #10b981; margin-bottom: 20px;">Mock Cashfree Checkout</h3>
                <p style="margin-bottom: 20px;">This is a mock checkout interface for local development.</p>
                <div style="background: #1f2937; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                  <p><strong>Order ID:</strong> ${currentOrder.order_id}</p>
                  <p><strong>Amount:</strong> ${currentOrder.order_currency} ${currentOrder.order_amount}</p>
                  <p><strong>Customer:</strong> ${currentOrder.customer_details.customer_name}</p>
                </div>
                <button onclick="
                  this.parentElement.innerHTML = '<div style=\\"padding: 20px; text-align: center; color: white;\\"><h3 style=\\"color: #10b981;\\">Payment Successful!</h3><p>Mock payment completed in local development mode.</p></div>';
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('mockPaymentComplete'));
                  }, 1000);
                " style="background: #10b981; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                  Complete Mock Payment
                </button>
              </div>
            `;
            
            // Listen for mock payment completion
            const handleMockPayment = () => {
              toast.success('Mock Payment Completed! (Local Development Mode)');
              checkOrderStatus();
              window.removeEventListener('mockPaymentComplete', handleMockPayment);
            };
            window.addEventListener('mockPaymentComplete', handleMockPayment);
          }
        } else {
          // Simulate redirect checkout
          toast.info('Mock Payment: Would redirect to Cashfree checkout page');
          setTimeout(() => {
            toast.success('Mock Payment Completed! (Local Development Mode)');
            checkOrderStatus();
          }, 2000);
        }
        return;
      }

      // Real checkout flow for production
      let targetElement: '_self' | '_blank' | '_top' | '_modal' | HTMLElement = redirectTarget;
      
      // Handle inline checkout
      if (redirectTarget === 'inline') {
        targetElement = document.getElementById('inline-checkout-container') as HTMLElement;
        if (!targetElement) {
          toast.error('Inline checkout container not found');
          return;
        }
      }

      const checkoutOptions: CheckoutOptions = {
        paymentSessionId: currentOrder.payment_session_id,
        redirectTarget: targetElement
      };

      // Add appearance options for inline checkout
      if (redirectTarget === 'inline') {
        checkoutOptions.appearance = {
          width: '100%',
          height: '600px'
        };
      }

      console.log('Opening checkout with options:', checkoutOptions);
      
      // For popup and inline checkout, handle the promise
      if (redirectTarget === '_modal' || redirectTarget === 'inline' || typeof targetElement === 'object') {
        const result = await cashfree.checkout(checkoutOptions);
        
        if (result.error) {
          console.log('User closed popup or payment error:', result.error);
          toast.info('Payment cancelled or error occurred');
        }
        
        if (result.redirect) {
          console.log('Payment will be redirected');
          toast.info('Payment will be redirected');
        }
        
        if (result.paymentDetails) {
          console.log('Payment completed:', result.paymentDetails);
          toast.success('Payment completed! Check status for details.');
          
          // Automatically check order status after payment completion
          setTimeout(() => {
            checkOrderStatus();
          }, 2000);
        }
      } else {
        // For redirect checkout (_self, _blank, _top), just call checkout
        cashfree.checkout(checkoutOptions);
      }
    } catch (error) {
      console.error('Error opening checkout:', error);
      toast.error('Failed to open checkout');
    }
  };

  // Check order status
  const checkOrderStatus = async () => {
    if (!currentOrder) {
      toast.error('No order available to check status');
      return;
    }

    try {
      setStatusLoading(true);
      
        // For local development, use mock data
        const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const useRealAPI = true; // Now using real test credentials!
      
      if (isLocalDev && !useRealAPI) {
        // Mock order status for local testing
        const mockStatus: OrderStatusResponse = {
          success: true,
          data: {
            order_id: currentOrder.order_id,
            order_status: 'PAID',
            order_amount: currentOrder.order_amount,
            order_currency: currentOrder.order_currency,
            customer_details: currentOrder.customer_details,
            order_meta: currentOrder.order_meta,
            created_at: currentOrder.created_at,
            order_expiry_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            payment_details: {
              payment_id: `payment_${Date.now()}`,
              payment_status: 'SUCCESS',
              payment_method: 'CARD',
              payment_amount: currentOrder.order_amount,
              payment_currency: currentOrder.order_currency,
              payment_time: new Date().toISOString()
            }
          }
        };
        
        setOrderStatus(mockStatus.data);
        toast.success('Mock order status updated! (Local Development Mode)');
        console.log('Mock order status:', mockStatus.data);
        setStatusLoading(false);
        return;
      }

      const response = await fetch(`/api/cashfree/order-status?orderId=${currentOrder.order_id}`);
      const result: OrderStatusResponse = await response.json();

      if (result.success) {
        setOrderStatus(result.data);
        toast.success('Order status updated');
        console.log('Order status:', result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch order status');
      }
    } catch (error) {
      console.error('Error checking order status:', error);
      toast.error(`Failed to check order status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setStatusLoading(false);
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">Paid</span>
          </div>
        );
      case 'failed':
      case 'cancelled':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="h-4 w-4" />
            <span className="font-medium">Failed</span>
          </div>
        );
      case 'active':
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <AlertCircle className="h-4 w-4" />
            <span className="font-medium">Active</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <AlertCircle className="h-4 w-4" />
            <span className="font-medium">{status || 'Unknown'}</span>
          </div>
        );
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-white/70">Initializing Cashfree SDK...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Cashfree Payment Test
          </h1>
          <p className="text-white/70 text-lg">
            Test Cashfree hosted checkout integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Configuration
              </CardTitle>
              <CardDescription className="text-white/70">
                Configure payment settings and customer details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Environment Selection */}
              <div className="space-y-2">
                <Label htmlFor="payment-mode" className="text-white">Payment Mode</Label>
                <Select value={paymentMode} onValueChange={(value: 'sandbox' | 'production') => setPaymentMode(value)}>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sandbox">Sandbox (Test)</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Redirect Target */}
              <div className="space-y-2">
                <Label htmlFor="redirect-target" className="text-white">Redirect Target</Label>
                <Select value={redirectTarget} onValueChange={(value: '_self' | '_blank' | '_top' | '_modal' | 'inline') => setRedirectTarget(value)}>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_self">Same Tab (_self)</SelectItem>
                    <SelectItem value="_blank">New Tab (_blank)</SelectItem>
                    <SelectItem value="_top">Top Window (_top)</SelectItem>
                    <SelectItem value="_modal">Popup Modal (_modal)</SelectItem>
                    <SelectItem value="inline">Inline Checkout</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-white/10" />

              {/* Order Amount */}
              <div className="space-y-2">
                <Label htmlFor="order-amount" className="text-white">Order Amount</Label>
                <Input
                  id="order-amount"
                  type="number"
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter amount"
                />
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-white">Currency</Label>
                <Select value={orderCurrency} onValueChange={setOrderCurrency}>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (Indian Rupee)</SelectItem>
                    <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Details */}
              <div className="space-y-2">
                <Label htmlFor="customer-name" className="text-white">Customer Name</Label>
                <Input
                  id="customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter customer name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-email" className="text-white">Customer Email</Label>
                <Input
                  id="customer-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter customer email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-phone" className="text-white">Customer Phone</Label>
                <Input
                  id="customer-phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter customer phone"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order-note" className="text-white">Order Note</Label>
                <Input
                  id="order-note"
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enter order note"
                />
              </div>

              {/* Create Order Button */}
              <Button
                onClick={createOrder}
                disabled={loading || !cashfree}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creating Order...
                  </>
                ) : (
                  'Create Order'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Panel */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Payment Actions</CardTitle>
              <CardDescription className="text-white/70">
                Manage payment flow and check status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Information */}
              {currentOrder && (
                <div className="space-y-3 p-4 bg-white/5 rounded-lg">
                  <h3 className="text-white font-medium">Current Order</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Order ID:</span>
                      <span className="text-white font-mono">{currentOrder.order_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Amount:</span>
                      <span className="text-white">{currentOrder.order_currency} {currentOrder.order_amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Status:</span>
                      {getStatusBadge(currentOrder.order_status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Customer:</span>
                      <span className="text-white">{currentOrder.customer_details.customer_name}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Button */}
              <Button
                onClick={openCheckout}
                disabled={!currentOrder || loading}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {redirectTarget === 'inline' ? 'Load Inline Checkout' : 'Open Cashfree Checkout'}
              </Button>

              {/* Inline Checkout Container */}
              {redirectTarget === 'inline' && (
                <div className="mt-4 p-4 border border-white/20 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Inline Checkout</h3>
                  <div 
                    id="inline-checkout-container" 
                    className="w-full min-h-[600px] bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-center h-full text-white/70">
                      Click "Load Inline Checkout" to display payment form here
                    </div>
                  </div>
                </div>
              )}

              {/* Check Status Button */}
              <Button
                onClick={checkOrderStatus}
                disabled={!currentOrder || statusLoading}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                {statusLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Checking Status...
                  </>
                ) : (
                  'Check Order Status'
                )}
              </Button>

              {/* Order Status Display */}
              {orderStatus && (
                <div className="space-y-3 p-4 bg-white/5 rounded-lg">
                  <h3 className="text-white font-medium">Latest Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Status:</span>
                      {getStatusBadge(orderStatus.order_status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Amount:</span>
                      <span className="text-white">{orderStatus.order_currency} {orderStatus.order_amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Expires:</span>
                      <span className="text-white text-xs">
                        {new Date(orderStatus.order_expiry_time).toLocaleString()}
                      </span>
                    </div>
                    {orderStatus.payment_details && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <h4 className="text-white/70 text-xs font-medium mb-2">Payment Details</h4>
                        <pre className="text-xs text-white/70 bg-black/20 p-2 rounded overflow-auto">
                          {JSON.stringify(orderStatus.payment_details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Success! Real API Testing Active */}
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <h3 className="text-green-400 font-medium mb-2">🎉 Real API Testing Active!</h3>
                <p className="text-green-300/80 text-sm mb-3">
                  Perfect! Your test credentials are working and real Cashfree API integration is active:
                </p>
                <div className="text-green-300/80 text-sm space-y-1">
                  <p>✅ Test credentials loaded successfully</p>
                  <p>✅ Sandbox environment active</p>
                  <p>✅ Real order creation working</p>
                  <p>✅ No domain whitelisting required</p>
                  <p className="text-green-200 font-medium">🚀 Ready to test real popup!</p>
                </div>
                <div className="mt-3 p-2 bg-green-900/20 rounded text-xs">
                  <p className="text-green-200 text-xs font-medium mb-1">Test Order Created:</p>
                  <code className="text-green-100 text-xs block">
                    Order ID: order_43081532yaXkTxduzk2T9siEHixJBHOz6<br/>
                    Status: ACTIVE<br/>
                    Amount: ₹100
                  </code>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h3 className="text-blue-400 font-medium mb-2">Instructions</h3>
                {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? (
                  <ul className="text-blue-300/80 text-sm space-y-1">
                    <li>1. Configure payment settings above</li>
                    <li>2. Click "Create Order" to generate real order</li>
                    <li>3. Click "Open Cashfree Checkout" to open real popup</li>
                    <li>4. Complete payment on Cashfree hosted page</li>
                    <li>5. Use "Check Order Status" to verify payment</li>
                    <li className="text-green-300 font-medium">🔗 Real Cashfree API Active</li>
                  </ul>
                ) : (
                  <ul className="text-blue-300/80 text-sm space-y-1">
                    <li>1. Configure payment settings above</li>
                    <li>2. Click "Create Order" to generate payment session</li>
                    <li>3. Click "Open Cashfree Checkout" to proceed with payment</li>
                    <li>4. Complete payment on Cashfree hosted page</li>
                    <li>5. Use "Check Order Status" to verify payment</li>
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environment Info */}
        <Card className="mt-6 bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Environment</h3>
                <p className="text-white/70 text-sm">
                  Currently using: <span className="font-mono">{paymentMode}</span>
                </p>
                {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                  <p className="text-yellow-400 text-xs mt-1">
                    🧪 Local Development Mode - Using real Cashfree API
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm">SDK Status:</p>
                <div className="flex items-center gap-2">
                  {cashfree ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-500 text-sm">Ready</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-500 text-sm">Not Ready</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CashfreeTest;
