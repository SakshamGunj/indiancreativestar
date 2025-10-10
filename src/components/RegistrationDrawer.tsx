import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Image, Palette, Shield, Lock, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { load } from '@cashfreepayments/cashfree-js';
import { useNavigate } from 'react-router-dom';
import { sendInitiateCheckoutWebhook, sendPurchaseWebhook, getBrowserInfo, getFBCookies } from '@/utils/webhookOptimized';

interface RegistrationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contestType?: 'art' | 'kids';
}

export const RegistrationDrawer: React.FC<RegistrationDrawerProps> = ({
  isOpen,
  onClose,
  contestType = 'art'
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    age: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Helper function to normalize phone number to Indian format (91XXXXXXXXXX)
  const normalizePhoneNumber = (phone: string): string => {
    // Remove all spaces, dashes, parentheses, and trim
    let cleaned = phone.replace(/[\s\-\(\)]/g, '').trim();
    
    // Remove + prefix if exists
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    }
    
    // If 10 digits, add 91 prefix
    if (cleaned.length === 10 && /^\d{10}$/.test(cleaned)) {
      return `91${cleaned}`;
    }
    
    // If 12 digits starting with 91, return as is
    if (cleaned.length === 12 && cleaned.startsWith('91') && /^\d{12}$/.test(cleaned)) {
      return cleaned;
    }
    
    // Return cleaned version (validation will catch invalid formats)
    return cleaned;
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      // 🎯 GTM Event: Registration drawer opened
      console.log('🎯 [GTM] Registration Drawer Opened');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'registration_started',
        event_category: 'Registration',
        event_action: 'Drawer Opened',
        event_label: contestType,
        contest_type: contestType,
        timestamp: new Date().toISOString()
      });
      console.log('✅ [GTM] registration_started event pushed');
      
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Get the main app container (the landing page)
      const appRoot = document.getElementById('root') || document.body;
      
      // Lock scroll on body and html
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Additional iOS Safari fix
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      
      // Prevent touch move on document (mobile)
      const preventTouchMove = (e: TouchEvent) => {
        const drawer = document.querySelector('[data-drawer-content]');
        const target = e.target as Element;
        
        // Only allow scroll inside the drawer content area
        if (drawer && drawer.contains(target)) {
          // Check if the drawer content is actually scrollable
          const drawerScrollable = drawer.scrollHeight > drawer.clientHeight;
          if (!drawerScrollable) {
            e.preventDefault();
          }
        } else {
          // Prevent scroll on backdrop and outside drawer
          e.preventDefault();
        }
      };
      
      // Prevent mouse wheel scroll (desktop)
      const preventWheel = (e: WheelEvent) => {
        const drawer = document.querySelector('[data-drawer-content]');
        const target = e.target as Element;
        
        if (!drawer || !drawer.contains(target)) {
          e.preventDefault();
        }
      };
      
      // Add event listeners
      document.addEventListener('touchmove', preventTouchMove, { passive: false });
      document.addEventListener('wheel', preventWheel, { passive: false });
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';
        
        // Remove event listeners
        document.removeEventListener('touchmove', preventTouchMove);
        document.removeEventListener('wheel', preventWheel);
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Phone number validation with Indian format normalization
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else {
      // Remove all spaces, dashes, parentheses
      let cleanPhone = formData.whatsapp.replace(/[\s\-\(\)]/g, '');
      
      // Remove + prefix if exists
      if (cleanPhone.startsWith('+')) {
        cleanPhone = cleanPhone.substring(1);
      }
      
      // Check length and format
      if (cleanPhone.length === 10) {
        // Valid: 7250504240 (10 digits)
        if (!/^\d{10}$/.test(cleanPhone)) {
          newErrors.whatsapp = 'Phone number must contain only digits';
        }
      } else if (cleanPhone.length === 12) {
        // Valid: 917250504240 (12 digits starting with 91)
        if (!cleanPhone.startsWith('91')) {
          newErrors.whatsapp = 'For 12-digit numbers, must start with 91 (India code)';
        } else if (!/^\d{12}$/.test(cleanPhone)) {
          newErrors.whatsapp = 'Phone number must contain only digits';
        }
      } else {
        newErrors.whatsapp = 'Enter 10 digits (e.g., 7250504240) or 12 digits with country code (e.g., 917250504240)';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 5 || age > 100) {
        newErrors.age = 'Age must be between 5 and 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle payment submission
  const handlePaymentSubmit = async () => {
    if (!validateForm()) {
      // 🎯 GTM Event: Form validation failed
      console.log('🎯 [GTM] Form Validation Failed');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_validation_failed',
        event_category: 'Registration',
        event_action: 'Validation Failed',
        error_fields: Object.keys(errors).join(', ')
      });
      console.log('✅ [GTM] form_validation_failed event pushed');
      
      toast({
        title: 'Validation Error',
        description: 'Please fill all fields correctly',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log('🚀 [REGISTRATION] Starting payment process...');
      
      // Get or retrieve persistent external_id for this user
      const getOrCreateExternalId = () => {
        const storageKey = 'ics_external_id';
        let externalId = localStorage.getItem(storageKey);
        
        if (!externalId) {
          // Generate new unique external_id (same algorithm as PageView)
          const timestamp = Date.now();
          const random1 = Math.random().toString(36).substr(2, 12);
          const random2 = Math.random().toString(36).substr(2, 12);
          const browserFingerprint = navigator.userAgent.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
          }, 0).toString(36);
          
          externalId = `EXT_ICS_${timestamp}_${random1}_${random2}_${browserFingerprint}`;
          localStorage.setItem(storageKey, externalId);
          console.log('🆔 [EXTERNAL ID] Created new external_id:', externalId);
        } else {
          console.log('🆔 [EXTERNAL ID] Retrieved existing external_id:', externalId);
        }
        
        return externalId;
      };
      
      const externalId = getOrCreateExternalId();
      
      // Prepare normalized customer data (Meta format)
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = (nameParts[0] || '').toLowerCase();
      const lastName = (nameParts.slice(1).join(' ') || '').toLowerCase();
      const normalizedPhone = normalizePhoneNumber(formData.whatsapp);
      const normalizedEmail = formData.email.trim().toLowerCase();
      
      // Generate event_id upfront (will be used for tracking and as order_id)
      const eventId = `ORDER_ICS_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Get Facebook Pixel cookies (fbp and fbc) for tracking
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return undefined;
      };
      
      const fbp = getCookie('_fbp');
      const fbc = getCookie('_fbc');
      
      // 🎯 GTM Event: InitiateCheckout - BEFORE PAYMENT (Custom Trigger for GTM)
      console.log('🎯 [GTM] InitiateCheckout Event - User clicked "Pay & Submit"');
      console.log('🆔 [INITIATE CHECKOUT] Event ID:', eventId);
      console.log('🆔 [INITIATE CHECKOUT] External ID:', externalId);
      console.log('🍪 [INITIATE CHECKOUT] FBP:', fbp || 'not_available');
      console.log('🍪 [INITIATE CHECKOUT] FBC:', fbc || 'not_available');
      
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'initiate_checkout_custom',           // ✅ Custom trigger name for GTM
        event_id: eventId,                           // ✅ Unique ID for deduplication
        external_id: externalId,                     // ✅ Persistent user identifier (same across all events)
        event_name: 'InitiateCheckout',              // ✅ Standard FB event name
        event_time: Math.floor(Date.now() / 1000),  // ✅ Unix timestamp
        
        // Facebook Attribution
        fbp: fbp || 'not_available',                 // ✅ Facebook browser ID
        fbc: fbc || 'not_available',                 // ✅ Facebook click ID
        
        // Transaction Details (NO payment info yet)
        value: 249,                                  // ✅ Purchase value
        currency: 'INR',                             // ✅ Currency code
        
        // Product/Content Details (Same as Purchase event)
        content_ids: ['INDIAN_CREATIVE_STAR_ART_COMP_2025_ENTRY'],  // ✅ Fixed product ID
        content_type: 'competition_entry',           // ✅ Content type
        content_name: 'Indian Creative Star Art Competition Entry',
        content_category: 'art',                     // ✅ Hardcoded 'art' (consistent with PageView)
        num_items: 1,                                // ✅ Number of items
        
        // Customer Information (Meta format - lowercase, normalized)
        email: normalizedEmail,                      // ✅ Meta: 'em' parameter
        phone_number: normalizedPhone,               // ✅ Meta: 'ph' parameter
        first_name: firstName,                       // ✅ Meta: 'fn' parameter
        last_name: lastName,                         // ✅ Meta: 'ln' parameter
        country: 'in',                               // ✅ Meta: 'country' parameter
        
        // Legacy fields (for backwards compatibility)
        customer_email: normalizedEmail,
        customer_phone: normalizedPhone,
        customer_first_name: firstName,
        customer_last_name: lastName,
        customer_name: formData.fullName,
        customer_age: formData.age,
        
        // Contest Info
        contest_type: contestType,
        registration_type: contestType,
        
        // Page Info
        page_url: window.location.href,
        page_path: window.location.pathname,
        referrer: document.referrer || 'direct',
        
        // Browser Info
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        
        // Timestamps
        client_timestamp: new Date().toISOString(),
        event_timestamp: new Date().toISOString(),
        
        // Event Category
        event_category: 'Checkout',
        event_action: 'Initiate Checkout',
        event_label: 'Pay & Submit Button Clicked'
      });
      
      console.log('✅ [GTM] initiate_checkout_custom event pushed to GTM dataLayer');
      console.log('📊 [GTM] Configure GTM trigger for "initiate_checkout_custom" event');
      console.log('📊 [INITIATE CHECKOUT] Complete Data (Meta Format):', {
        'Event ID': eventId,
        'Event Name': 'InitiateCheckout',
        'Value': '₹249',
        'Currency': 'INR',
        'Customer Name': formData.fullName,
        'First Name (lowercase)': firstName,
        'Last Name (lowercase)': lastName,
        'Email (lowercase)': normalizedEmail,
        'Phone (with country code)': normalizedPhone,
        'Country': 'in (India)',
        'Age': formData.age,
        'Contest Type': contestType,
        'Content IDs': ['INDIAN_CREATIVE_STAR_ART_COMP_2025_ENTRY'],
        'Content Type': 'competition_entry',
        'Content Name': 'Indian Creative Star Art Competition Entry',
        'FBP Cookie': fbp || 'not_available',
        'FBC Cookie': fbc || 'not_available',
        'Note': '✅ All PII will be AUTO-HASHED by Facebook Pixel'
      });
      
      // 🔥 Send InitiateCheckout event to Make.com webhook (OPTIMIZED - NON-BLOCKING)
      // ✅ SENDING EXACT SAME DATA AS GTM DATALAYER
      console.log('📤 [INITIATE CHECKOUT WEBHOOK] Sending to Make.com (non-blocking)...');
      
      const { browser, deviceType } = getBrowserInfo();
      
      // Fire and forget - won't block payment flow
      sendInitiateCheckoutWebhook({
        // ✅ SAME AS GTM DATALAYER - ALL FIELDS
        event: 'initiate_checkout_custom',           // GTM trigger name
        event_id: eventId,
        external_id: externalId,
        event_name: 'InitiateCheckout',
        event_time: Math.floor(Date.now() / 1000),
        
        // Facebook Attribution
        fbp: fbp || 'not_available',
        fbc: fbc || 'not_available',
        
        // Transaction Details
        value: 249,
        currency: 'INR',
        
        // Product/Content Details
        content_ids: ['INDIAN_CREATIVE_STAR_ART_COMP_2025_ENTRY'],
        content_type: 'competition_entry',
        content_name: 'Indian Creative Star Art Competition Entry',
        content_category: 'art',
        num_items: 1,
        
        // Customer Information (Meta format)
        email: normalizedEmail,
        phone_number: normalizedPhone,
        first_name: firstName,
        last_name: lastName,
        country: 'in',
        
        // Legacy fields
        customer_email: normalizedEmail,
        customer_phone: normalizedPhone,
        customer_first_name: firstName,
        customer_last_name: lastName,
        customer_name: formData.fullName,
        customer_age: formData.age,
        
        // Contest Info
        contest_type: contestType,
        registration_type: contestType,
        
        // Page Info
        page_url: window.location.href,
        page_path: window.location.pathname,
        referrer: document.referrer || 'direct',
        
        // Browser Info
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        
        // Timestamps
        client_timestamp: new Date().toISOString(),
        event_timestamp: new Date().toISOString(),
        
        // Event Category
        event_category: 'Checkout',
        event_action: 'Initiate Checkout',
        event_label: 'Pay & Submit Button Clicked'
      });
      
      // Save registration data to sessionStorage (including external_id)
      const registrationData = {
        fullName: formData.fullName,
        whatsapp: formData.whatsapp,
        email: formData.email,
        age: formData.age,
        contestType,
        external_id: externalId,                     // ✅ Store external_id for Purchase event
        timestamp: Date.now()
      };
      
      sessionStorage.setItem('ics_last_registration', JSON.stringify(registrationData));
      console.log('💾 [SESSION] Registration data saved (with external_id)');
      console.log('🆔 [SESSION] External ID stored:', externalId);

      // Call backend to create Cashfree order (use variables already declared above)
      const response = await fetch('https://backendcashfree.vercel.app/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.whatsapp,
          amount: 249,
          customerId: `CUST_${Date.now()}`,
          orderNote: `Indian Creative Star - Registration Fee`,
          customOrderId: eventId
        })
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const orderData = await response.json();
      console.log('✅ [PAYMENT] Order created:', orderData);

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      const { payment_session_id, order_id } = orderData.data;

      // 🎯 GTM Event: Order created
      console.log('🎯 [GTM] Order Created Successfully');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'order_created',
        event_category: 'Payment',
        event_action: 'Order Created',
        order_id: order_id,
        payment_session_id: payment_session_id ? 'Generated' : 'Missing',
        value: 249,
        currency: 'INR'
      });
      console.log('✅ [GTM] order_created event pushed with Order ID:', order_id);

      // Initialize Cashfree SDK
      const cashfree = await load({
        mode: "production" // ✅ Production mode
      });

      console.log('💳 [CASHFREE] Opening checkout...');

      // 🎯 GTM Event: Cashfree modal opened
      console.log('🎯 [GTM] Cashfree Payment Modal Opened');
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'cashfree_modal_opened',
        event_category: 'Payment',
        event_action: 'Payment Gateway Opened',
        order_id: order_id,
        payment_gateway: 'Cashfree'
      });
      console.log('✅ [GTM] cashfree_modal_opened event pushed');

      // Open Cashfree Checkout
      const result = await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal"
      });

      console.log('📊 [CASHFREE] Result:', result);

      if (result.error) {
        console.error('❌ [CASHFREE] Payment error:', result.error);
        
        // Normalize customer data for Meta format
        const nameParts = formData.fullName.trim().split(' ');
        const firstName = (nameParts[0] || '').toLowerCase();
        const lastName = (nameParts.slice(1).join(' ') || '').toLowerCase();
        const normalizedPhone = normalizePhoneNumber(formData.whatsapp);  // Use helper function
        const normalizedEmail = formData.email.trim().toLowerCase();
        
        // 🎯 GTM Event: Payment cancelled/failed - WITH CUSTOMER DATA
        console.log('🎯 [GTM] Payment Cancelled or Failed');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'payment_failed',
          event_category: 'Payment',
          event_action: 'Payment Cancelled',
          event_label: contestType,
          
          // Transaction Details
          order_id: order_id,
          transaction_id: order_id,
          event_id: order_id,
          value: 249,
          currency: 'INR',
          
          // Customer Details (Meta format - normalized)
          email: normalizedEmail,
          phone_number: normalizedPhone,
          first_name: firstName,
          last_name: lastName,
          country: 'in',
          
          // Legacy fields
          customer_email: normalizedEmail,
          customer_phone: normalizedPhone,
          customer_name: formData.fullName,
          customer_age: formData.age,
          
          // Error Details
          error_message: result.error.message || 'User cancelled payment',
          payment_gateway: 'Cashfree',
          contest_type: contestType,
          
          // Timestamp
          event_timestamp: new Date().toISOString()
        });
        console.log('✅ [GTM] payment_failed event pushed with full customer data');
        console.log('📊 [GTM] Failed Payment Data (Meta Format):', {
          'Order ID': order_id,
          'Customer': formData.fullName,
          'First Name (lowercase)': firstName,
          'Last Name (lowercase)': lastName,
          'Email (lowercase)': normalizedEmail,
          'Phone (with +91)': normalizedPhone,
          'Country': 'in (India)',
          'Value': '₹249',
          'Note': '✅ All PII will be AUTO-HASHED by Facebook Pixel'
        });
        
        toast({
          title: 'Payment Cancelled',
          description: 'Payment was cancelled or failed. Please try again.',
          variant: 'destructive'
        });
        setIsProcessing(false);
        return;
      }

      if (result.paymentDetails) {
        console.log('✅ [CASHFREE] Payment completed');
        
        // Get external_id from sessionStorage or localStorage
        const getExternalId = () => {
          // First try to get from registration data in sessionStorage
          const regData = sessionStorage.getItem('ics_last_registration');
          if (regData) {
            try {
              const parsed = JSON.parse(regData);
              if (parsed.external_id) {
                console.log('🆔 [PURCHASE] Retrieved external_id from session:', parsed.external_id);
                return parsed.external_id;
              }
            } catch (e) {
              console.warn('⚠️ [PURCHASE] Failed to parse registration data');
            }
          }
          
          // Fallback: get from localStorage
          const externalId = localStorage.getItem('ics_external_id');
          if (externalId) {
            console.log('🆔 [PURCHASE] Retrieved external_id from localStorage:', externalId);
            return externalId;
          }
          
          console.warn('⚠️ [PURCHASE] No external_id found - this should not happen');
          return 'not_available';
        };
        
        const externalId = getExternalId();
        
        // Split name for Facebook Pixel format & normalize to lowercase (Meta requirement)
        const nameParts = formData.fullName.trim().split(' ');
        const firstName = (nameParts[0] || '').toLowerCase();
        const lastName = (nameParts.slice(1).join(' ') || '').toLowerCase();
        
        // Normalize phone number with country code +91 (India) - handles all formats
        const normalizedPhone = normalizePhoneNumber(formData.whatsapp);  // Use helper function
        
        // Normalize email to lowercase (Meta requirement)
        const normalizedEmail = formData.email.trim().toLowerCase();
        
        // 🎯 GTM Event: Payment success (client-side) - COMPLETE CONVERSION DATA
        console.log('🎯 [GTM] Payment Completed Successfully (Client-side)');
        console.log('🆔 [PURCHASE] Event ID:', order_id);
        console.log('🆔 [PURCHASE] External ID:', externalId);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'payment_success_client',
          event_category: 'Payment',
          event_action: 'Payment Completed',
          event_label: contestType,
          
          // Transaction Details (Critical for conversion tracking)
          event_id: order_id,                          // Unique event ID for deduplication
          external_id: externalId,                     // ✅ Persistent user identifier (same across all events)
          transaction_id: order_id,                    // Order/Transaction ID
          order_id: order_id,                          // Cashfree Order ID
          value: 249,                                  // Purchase value
          currency: 'INR',                             // Currency code
          
          // Product/Content Details (Fixed for all purchases)
          content_ids: ['INDIAN_CREATIVE_STAR_ART_COMP_2025_ENTRY'],  // Fixed product ID
          content_type: 'competition_entry',           // Content type
          content_name: 'Indian Creative Star Art Competition Entry',
          content_category: 'art',                     // ✅ Hardcoded 'art' (consistent with PageView)
          num_items: 1,                                // Number of items
          
          // Customer Information (Meta format - lowercase, normalized, will be auto-hashed by Pixel)
          email: normalizedEmail,                      // Meta: 'em' parameter
          phone_number: normalizedPhone,               // Meta: 'ph' parameter (with country code)
          first_name: firstName,                       // Meta: 'fn' parameter (lowercase)
          last_name: lastName,                         // Meta: 'ln' parameter (lowercase)
          country: 'in',                               // Meta: 'country' parameter (ISO code)
          
          // Legacy fields (for backwards compatibility)
          customer_email: normalizedEmail,
          customer_phone: normalizedPhone,
          customer_first_name: firstName,
          customer_last_name: lastName,
          customer_name: formData.fullName,
          customer_age: formData.age,
          
          // Payment Details
          payment_method: result.paymentDetails?.payment_method || 'Unknown',
          payment_status: 'completed',
          payment_gateway: 'Cashfree',
          
          // Additional Tracking
          contest_type: contestType,
          registration_type: contestType,
          
          // Timestamps
          event_timestamp: new Date().toISOString(),
          event_time: Math.floor(Date.now() / 1000)    // Unix timestamp for Meta
        });
        console.log('✅ [GTM] payment_success_client event pushed with FULL conversion data');
        
        // 🔥 Send Purchase event to Make.com webhook (OPTIMIZED - NON-BLOCKING)
        // ✅ SENDING EXACT SAME DATA AS GTM DATALAYER
        console.log('📤 [WEBHOOK] Sending Purchase event to Make.com (non-blocking)...');
        
        const { fbp, fbc } = getFBCookies();
        const { browser, deviceType } = getBrowserInfo();
        
        // Fire and forget - won't block redirect to thank you page
        sendPurchaseWebhook({
          // ✅ SAME AS GTM DATALAYER - ALL FIELDS (EXACT MATCH)
          event: 'payment_success_client',
          event_category: 'Payment',
          event_action: 'Payment Completed',
          event_label: contestType,
          
          // Transaction Details
          event_id: order_id,
          external_id: externalId,
          transaction_id: order_id,
          order_id: order_id,
          value: 249,
          currency: 'INR',
          
          // Product/Content Details
          content_ids: ['INDIAN_CREATIVE_STAR_ART_COMP_2025_ENTRY'],
          content_type: 'competition_entry',
          content_name: 'Indian Creative Star Art Competition Entry',
          content_category: 'art',
          num_items: 1,
          
          // Customer Information (Meta format)
          email: normalizedEmail,
          phone_number: normalizedPhone,
          first_name: firstName,
          last_name: lastName,
          country: 'in',
          
          // Legacy fields (for backwards compatibility)
          customer_email: normalizedEmail,
          customer_phone: normalizedPhone,
          customer_first_name: firstName,
          customer_last_name: lastName,
          customer_name: formData.fullName,
          customer_age: formData.age,
          
          // Payment Details
          payment_method: result.paymentDetails?.payment_method || 'Unknown',
          payment_status: 'completed',
          payment_gateway: 'Cashfree',
          
          // Additional Tracking
          contest_type: contestType,
          registration_type: contestType,
          
          // Timestamps (✅ event_time in Unix timestamp format)
          event_timestamp: new Date().toISOString(),
          event_time: Math.floor(Date.now() / 1000)  // ✅ Unix timestamp (same as GTM)
        });
        console.log('💳 [GTM] Payment Details:', result.paymentDetails);
        console.log('📊 [GTM] Complete Conversion Data (Meta Pixel Format):', {
          'Event ID': order_id,
          'Transaction ID': order_id,
          'Value': '₹249',
          'Currency': 'INR',
          'Customer Name': formData.fullName,
          'First Name (lowercase)': firstName,
          'Last Name (lowercase)': lastName,
          'Email (lowercase)': normalizedEmail,
          'Phone (with +91)': normalizedPhone,
          'Country': 'in (India)',
          'Age': formData.age,
          'Payment Method': result.paymentDetails?.payment_method || 'Unknown',
          'Contest Type': contestType,
          'Content IDs': ['INDIAN_CREATIVE_STAR_ART_COMP_2025_ENTRY'],
          'Content Type': 'competition_entry',
          'Content Name': 'Indian Creative Star Art Competition Entry',
          'Note': '✅ All PII will be AUTO-HASHED by Facebook Pixel'
        });
        
        // Close drawer
        onClose();
        
        // Show success toast
        toast({
          title: 'Payment Successful!',
          description: 'Redirecting to confirmation page...',
        });

        // Redirect to thank you page with user details
        const thankYouUrl = `/thank-you?type=${contestType}&name=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.whatsapp)}&age=${encodeURIComponent(formData.age)}&whatsapp=${encodeURIComponent(formData.whatsapp)}&orderId=${order_id}&payment=success&from=/indiancreativestar/v2`;
        
        setTimeout(() => {
          navigate(thankYouUrl);
        }, 500);
      } else {
        // Handle unexpected result
        console.warn('⚠️ [CASHFREE] Unexpected result format:', result);
        toast({
          title: 'Payment Status Unclear',
          description: 'Please check your email for confirmation or contact support.',
          variant: 'default'
        });
        setIsProcessing(false);
      }

    } catch (error) {
      console.error('❌ [PAYMENT] Error:', error);
      toast({
        title: 'Payment Error',
        description: error instanceof Error ? error.message : 'Failed to process payment',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              touchAction: 'none'
            }}
            onClick={onClose}
            onTouchMove={(e) => e.preventDefault()}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
            stiffness: 300,
            duration: 0.4 
          }}
          className="z-[9999] max-h-[95vh] bg-white rounded-t-[32px] shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ 
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            touchAction: 'pan-y'
          }}
          data-drawer-content
        >
          <div className="overflow-y-auto max-h-[95vh]">
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-2 bg-white sticky top-0 z-10">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* Content Container */}
            <div className="px-4 pb-6 sm:px-6 sm:pb-8 md:px-8 md:pb-10 max-w-2xl mx-auto bg-white">                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-20 bg-white/80 backdrop-blur-sm"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </button>

                {/* Banner Image */}
                <div className="relative mb-4 sm:mb-6 overflow-hidden rounded-2xl sm:rounded-3xl mx-auto max-w-xs sm:max-w-sm">
                  <img 
                    src="https://i.ibb.co/5Pcjhz7/Daami-Presents1920x1080px1000x1000px.jpg"
                    alt="Indian Creative Star Competition Banner" 
                    className="w-full h-auto object-contain"
                    loading="eager"
                    onError={(e) => {
                      // Fallback to local file if CDN fails
                      (e.target as HTMLImageElement).src = "/Daami Presents (1920 x 1080 px).webp";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-3 sm:mb-4"
                  >
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Register Now
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">
                    Join India's Prestigious Art Competition
                  </p>

                  {/* Important Details Section - Mobile Optimized */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-5 border border-blue-200 mb-4 sm:mb-6">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center justify-center gap-2">
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                      Important Details
                    </h3>
                    
                    {/* Mobile: Stacked Layout, Desktop: Pills */}
                    <div className="hidden sm:flex flex-wrap justify-center gap-2 md:gap-3">
                      <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-full border border-red-200 shadow-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs md:text-sm font-bold text-red-700 whitespace-nowrap">Only 112 Seats Left</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-full border border-blue-200 shadow-sm">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium text-blue-700 whitespace-nowrap">Deadline: 19th Oct</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-full border border-green-200 shadow-sm">
                        <Image className="h-3 w-3 md:h-4 md:w-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium text-green-700 whitespace-nowrap">Up to 2 Artworks</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white rounded-full border border-orange-200 shadow-sm">
                        <Palette className="h-3 w-3 md:h-4 md:w-4 text-orange-600 flex-shrink-0" />
                        <span className="text-xs md:text-sm font-medium text-orange-700 whitespace-nowrap">Open Theme</span>
                      </div>
                    </div>

                    {/* Mobile: 2x2 Grid Layout */}
                    <div className="grid grid-cols-2 gap-2 sm:hidden">
                      <div className="flex flex-col gap-1 px-2 py-2 bg-white rounded-lg border border-red-200">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                          <span className="text-[10px] font-semibold text-gray-700">Seats</span>
                        </div>
                        <span className="text-[10px] text-red-700 font-bold leading-tight text-left">Only 112 left!</span>
                      </div>
                      <div className="flex flex-col gap-1 px-2 py-2 bg-white rounded-lg border border-blue-200">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 text-blue-600 flex-shrink-0" />
                          <span className="text-[10px] font-semibold text-gray-700">Deadline</span>
                        </div>
                        <span className="text-[10px] text-blue-700 leading-tight text-left">19th October</span>
                      </div>
                      <div className="flex flex-col gap-1 px-2 py-2 bg-white rounded-lg border border-green-200">
                        <div className="flex items-center gap-1.5">
                          <Image className="h-3 w-3 text-green-600 flex-shrink-0" />
                          <span className="text-[10px] font-semibold text-gray-700">Artworks</span>
                        </div>
                        <span className="text-[10px] text-green-700 leading-tight text-left">Up to 2</span>
                      </div>
                      <div className="flex flex-col gap-1 px-2 py-2 bg-white rounded-lg border border-orange-200">
                        <div className="flex items-center gap-1.5">
                          <Palette className="h-3 w-3 text-orange-600 flex-shrink-0" />
                          <span className="text-[10px] font-semibold text-gray-700">Theme</span>
                        </div>
                        <span className="text-[10px] text-orange-700 leading-tight text-left">Open</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4 sm:space-y-6">
                  
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`h-11 sm:h-12 text-sm sm:text-base ${errors.fullName ? 'border-red-500' : ''}`}
                      disabled={isProcessing}
                    />
                    {errors.fullName && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <Label htmlFor="whatsapp" className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="7250504240 or +917250504240"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className={`h-11 sm:h-12 text-sm sm:text-base ${errors.whatsapp ? 'border-red-500' : ''}`}
                      disabled={isProcessing}
                    />
                    {errors.whatsapp && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.whatsapp}
                      </p>
                    )}
                    {!errors.whatsapp && formData.whatsapp && (
                      <p className="text-xs text-gray-500 mt-1">
                        ✓ Accepts: 10 digits (7250504240) or with +91
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`h-11 sm:h-12 text-sm sm:text-base ${errors.email ? 'border-red-500' : ''}`}
                      disabled={isProcessing}
                    />
                    {errors.email && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <Label htmlFor="age" className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                      Age <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className={`h-11 sm:h-12 text-sm sm:text-base ${errors.age ? 'border-red-500' : ''}`}
                      disabled={isProcessing}
                      min="5"
                      max="100"
                    />
                    {errors.age && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.age}
                      </p>
                    )}
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-green-200">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
                          100% Secure Payment
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Protected by Cashfree's bank-grade encryption. All transactions are secure.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Spacing for fixed button */}
                  <div className="h-24"></div>

                </div>

              </div>
            </div>

            {/* Fixed Payment Button */}
            <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 sm:px-6 sm:py-4 shadow-lg">
              <Button
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden"
                style={{
                  background: isProcessing 
                    ? 'linear-gradient(to right, rgb(22, 163, 74), rgb(5, 150, 105))' 
                    : 'linear-gradient(90deg, rgb(22, 163, 74) 0%, rgb(16, 185, 129) 30%, rgba(255, 255, 255, 0.15) 50%, rgb(16, 185, 129) 70%, rgb(5, 150, 105) 100%)',
                  backgroundSize: isProcessing ? '100% 100%' : '200% auto',
                  animation: isProcessing ? 'none' : 'shine-right-to-left 6s ease-in-out infinite, pulse-glow 2s ease-in-out infinite',
                  boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)'
                }}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm sm:text-base">Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">Pay ₹249 & Submit 2 Artworks</span>
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                )}
              </Button>
              <p className="text-[10px] sm:text-xs text-center text-gray-500 mt-1.5 sm:mt-2 flex items-center justify-center gap-1">
                <Lock className="h-3 w-3 text-green-600" />
                <span>100% Secure Payment • Protected by Cashfree</span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
