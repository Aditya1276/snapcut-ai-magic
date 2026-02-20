// Razorpay checkout service
// TODO: Set up VITE_RAZORPAY_KEY

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export const openRazorpayCheckout = (onSuccess: (response: PaymentResponse) => void) => {
  const key = import.meta.env.VITE_RAZORPAY_KEY;

  if (!key) {
    console.error("Razorpay key not configured");
    return;
  }

  const options = {
    key,
    amount: 99900, // ₹999 in paise
    currency: "INR",
    name: "SnapCut AI",
    description: "Pro Plan - Monthly",
    handler: onSuccess,
    theme: { color: "#A855F7" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
