import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2, ArrowLeft, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface OrderStatusResponse {
  success: boolean;
  data: {
    order_id: string;
    order_status: string;
    order_amount: string;
    order_currency: string;
    customer_details: {
      customer_name: string;
      customer_email: string;
      customer_phone: string;
    };
    order_meta: any;
    payment_details?: any;
    created_at: string;
    order_expiry_time: string;
  };
}

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderStatus, setOrderStatus] = useState<OrderStatusResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get order ID from URL parameters
  const orderId = searchParams.get('order_id') || searchParams.get('orderId');
  const paymentSessionId = searchParams.get('payment_session_id') || searchParams.get('paymentSessionId');

  useEffect(() => {
    const fetchOrderStatus = async () => {
      if (!orderId) {
        setError('No order ID found in URL');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/cashfree/order-status?orderId=${orderId}`);
        const result: OrderStatusResponse = await response.json();

        if (result.success) {
          setOrderStatus(result.data);
          
          // Show appropriate toast based on payment status
          if (result.data.order_status.toLowerCase() === 'paid') {
            toast.success('Payment completed successfully!');
          } else if (result.data.order_status.toLowerCase() === 'failed') {
            toast.error('Payment failed. Please try again.');
          } else {
            toast.info(`Payment status: ${result.data.order_status}`);
          }
        } else {
          throw new Error(result.message || 'Failed to fetch order status');
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
        setError(`Failed to fetch order status: ${error instanceof Error ? error.message : 'Unknown error'}`);
        toast.error('Failed to fetch order status');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'failed':
      case 'cancelled':
        return <XCircle className="h-12 w-12 text-red-500" />;
      default:
        return <CheckCircle className="h-12 w-12 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'text-green-500';
      case 'failed':
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'Payment Successful!';
      case 'failed':
        return 'Payment Failed';
      case 'cancelled':
        return 'Payment Cancelled';
      default:
        return `Payment Status: ${status}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-white/70 text-lg">Verifying payment status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/5 border-white/10">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-white">Error</CardTitle>
            <CardDescription className="text-white/70">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/cashfree-test">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Test Page
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#1a1a2e] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/5 border-white/10">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {orderStatus && getStatusIcon(orderStatus.order_status)}
          </div>
          <CardTitle className={`text-2xl ${getStatusColor(orderStatus?.order_status || '')}`}>
            {orderStatus && getStatusMessage(orderStatus.order_status)}
          </CardTitle>
          <CardDescription className="text-white/70">
            Payment verification completed
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Details */}
          {orderStatus && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-white font-medium">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Order ID:</span>
                      <span className="text-white font-mono">{orderStatus.order_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Amount:</span>
                      <span className="text-white font-medium">
                        {orderStatus.order_currency} {orderStatus.order_amount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Status:</span>
                      <span className={`font-medium ${getStatusColor(orderStatus.order_status)}`}>
                        {orderStatus.order_status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white font-medium">Customer Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Name:</span>
                      <span className="text-white">{orderStatus.customer_details.customer_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Email:</span>
                      <span className="text-white">{orderStatus.customer_details.customer_email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Phone:</span>
                      <span className="text-white">{orderStatus.customer_details.customer_phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-white font-medium mb-3">Transaction Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Created:</span>
                    <span className="text-white">{formatDate(orderStatus.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Expires:</span>
                    <span className="text-white">{formatDate(orderStatus.order_expiry_time)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              {orderStatus.payment_details && (
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-white font-medium mb-3">Payment Details</h3>
                  <div className="bg-black/20 p-4 rounded-lg">
                    <pre className="text-xs text-white/70 overflow-auto">
                      {JSON.stringify(orderStatus.payment_details, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            <Link to="/cashfree-test" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Test Page
              </Button>
            </Link>
            
            {orderStatus?.order_status.toLowerCase() === 'paid' && (
              <Button 
                variant="outline" 
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={() => window.print()}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Print Receipt
              </Button>
            )}
          </div>

          {/* Additional Info */}
          <div className="text-center text-white/50 text-xs">
            <p>
              This is a test payment page for Cashfree integration.
              {orderStatus?.order_status.toLowerCase() === 'paid' && 
                ' In a real application, you would redirect users to a success page or dashboard.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
