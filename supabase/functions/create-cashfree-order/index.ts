
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { orderAmount, customerName, customerPhone, customerEmail, returnUrlBase } = await req.json()

        // 🔴 Secrets are now managed via Supabase Secrets (Production Secure)
        const APP_ID = Deno.env.get("CASHFREE_APP_ID")
        const SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY")
        const API_URL = Deno.env.get("CASHFREE_API_URL") || "https://api.cashfree.com/pg/orders"

        if (!APP_ID || !SECRET_KEY) {
            throw new Error("Missing Cashfree Credentials in Edge Function Secrets")
        }

        // Unique Order ID
        const orderId = `WAR_${Date.now()}_${Math.floor(Math.random() * 1000)}`

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "x-client-id": APP_ID,
                "x-client-secret": SECRET_KEY,
                "x-api-version": "2025-01-01",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                order_id: orderId,
                order_amount: orderAmount,
                order_currency: "INR",
                customer_details: {
                    customer_id: customerPhone.replace(/\D/g, ''), // Clean phone
                    customer_name: customerName,
                    customer_email: customerEmail,
                    customer_phone: customerPhone
                },
                order_meta: {
                    // Use dynamic return URL from client, or fallback
                    return_url: returnUrlBase
                        ? `${returnUrlBase}?order_id=${orderId}`
                        : `http://localhost:5173/payment-success?order_id=${orderId}`
                }
            })
        })

        const data = await response.json()
        console.log("Cashfree Response:", data)

        return new Response(
            JSON.stringify(data),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )
    }
})
