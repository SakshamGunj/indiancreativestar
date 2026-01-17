
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

        // 🔴 THESE KEYS SHOULD BE IN YOUR .env OR SUPABASE SECRETS
        // For now, using what you provided for the Sandbox
        const APP_ID = "TEST43081579b14abcb389514d7571518034"
        const SECRET_KEY = "TEST4d671e6275b581ff8679fec50d5088ee7d7d9a11"
        const API_URL = "https://sandbox.cashfree.com/pg/orders"

        // Unique Order ID
        const orderId = `WAR_${Date.now()}_${Math.floor(Math.random() * 1000)}`

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "x-client-id": APP_ID,
                "x-client-secret": SECRET_KEY,
                "x-api-version": "2023-08-01",
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
