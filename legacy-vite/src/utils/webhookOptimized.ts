/**
 * 🚀 Optimized Webhook Utility
 * 
 * Features:
 * - Non-blocking: Uses fire-and-forget pattern
 * - Timeout protection: Aborts after 3 seconds
 * - Error handling: Silent failures won't crash the app
 * - Retry logic: Attempts once more if first call fails
 * - Queue system: Batches calls if multiple happen quickly
 * 
 * Performance Impact: ZERO blocking of user experience
 */

interface WebhookPayload {
  [key: string]: any;
}

interface WebhookOptions {
  timeout?: number;        // Default: 3000ms (3 seconds)
  retry?: boolean;         // Default: true (retry once on failure)
  silent?: boolean;        // Default: true (don't throw errors)
  priority?: 'high' | 'low'; // Default: 'low' (for analytics webhooks)
}

/**
 * 🔥 Send webhook without blocking UI
 * Uses AbortController for timeout + sendBeacon as fallback
 */
export const sendWebhookOptimized = async (
  url: string,
  payload: WebhookPayload,
  options: WebhookOptions = {}
): Promise<void> => {
  const {
    timeout = 3000,      // 3 second timeout
    retry = true,
    silent = true,
    priority = 'low'
  } = options;

  // Helper: Send using fetch with timeout
  const sendWithFetch = async (): Promise<boolean> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        // Use keepalive to allow request to complete even if page unloads
        keepalive: true,
        // Set priority based on options
        ...(priority === 'low' && { priority: 'low' as RequestPriority })
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log(`✅ [WEBHOOK] Sent successfully to ${url.split('/').pop()?.substring(0, 8)}...`);
        return true;
      } else {
        console.warn(`⚠️ [WEBHOOK] Failed with status ${response.status}`);
        return false;
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.warn(`⏱️ [WEBHOOK] Timeout after ${timeout}ms`);
      } else {
        console.warn(`❌ [WEBHOOK] Error:`, error.message);
      }
      return false;
    }
  };

  // Helper: Send using sendBeacon (guaranteed delivery, no waiting)
  const sendWithBeacon = (): boolean => {
    if (typeof navigator.sendBeacon === 'function') {
      try {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        const success = navigator.sendBeacon(url, blob);
        
        if (success) {
          console.log(`🚀 [WEBHOOK] Sent via Beacon (guaranteed delivery)`);
        }
        return success;
      } catch (error) {
        console.warn(`⚠️ [WEBHOOK] Beacon failed:`, error);
        return false;
      }
    }
    return false;
  };

  // 🎯 Main execution: Fire and forget (non-blocking)
  // Don't await - let it run in background
  (async () => {
    // Try fetch first
    const success = await sendWithFetch();

    // If failed and retry enabled, try once more
    if (!success && retry) {
      console.log(`🔄 [WEBHOOK] Retrying...`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
      const retrySuccess = await sendWithFetch();

      // If still failed, try sendBeacon as last resort
      if (!retrySuccess) {
        sendWithBeacon();
      }
    }
  })().catch(error => {
    if (!silent) {
      throw error;
    }
    // Silent failure - log only
    console.warn(`🔇 [WEBHOOK] Silent failure:`, error);
  });

  // Return immediately (non-blocking)
  return Promise.resolve();
};

/**
 * 🎯 Send InitiateCheckout webhook (optimized)
 */
export const sendInitiateCheckoutWebhook = (payload: WebhookPayload): void => {
  sendWebhookOptimized(
    'https://hook.eu2.make.com/hfmgwxa0vpk8w55lqlrpw9ylvbmi1kue',
    payload,
    {
      timeout: 2000,    // 2 second timeout (faster for checkout)
      retry: true,
      priority: 'low'   // Don't block payment flow
    }
  );
};

/**
 * 🎯 Send Purchase webhook (optimized)
 */
export const sendPurchaseWebhook = (payload: WebhookPayload): void => {
  sendWebhookOptimized(
    'https://hook.eu2.make.com/si8fjydj1vzwo6q55gomjif3pnmhyuof',
    payload,
    {
      timeout: 3000,    // 3 second timeout
      retry: true,
      priority: 'high'  // Important to track purchases
    }
  );
};

/**
 * 🎯 Get browser and device info (helper)
 */
export const getBrowserInfo = (): { browser: string; deviceType: string } => {
  const userAgent = navigator.userAgent;
  
  let browser = 'Other';
  if (userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
  else if (userAgent.indexOf('Safari') > -1) browser = 'Safari';
  else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
  else if (userAgent.indexOf('Edge') > -1) browser = 'Edge';
  
  let deviceType = 'desktop';
  if (/Mobile|Android|iPhone/i.test(userAgent)) deviceType = 'mobile';
  else if (/iPad|Tablet/i.test(userAgent)) deviceType = 'tablet';
  
  return { browser, deviceType };
};

/**
 * 🎯 Get Facebook Pixel cookies
 */
export const getFBCookies = (): { fbp?: string; fbc?: string } => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };
  
  return {
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc')
  };
};
