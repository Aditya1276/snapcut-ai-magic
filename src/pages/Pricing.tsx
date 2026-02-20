import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";

const Pricing = () => {
  const handleUpgrade = () => {
    // TODO: Wire up Razorpay checkout
    console.log("Opening Razorpay checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-display mb-3">
              Choose Your <span className="gradient-text">Plan</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Start free, upgrade when you need more. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <PricingCard
              name="Free"
              price="₹0"
              features={[
                "5 images per day",
                "Standard quality output",
                "PNG download",
                "Community support",
              ]}
              ctaLabel="Get Started Free"
              onCta={() => {}}
            />
            <PricingCard
              name="Pro"
              price="₹999"
              period="month"
              popular
              features={[
                "Unlimited images",
                "HD quality output",
                "Priority processing",
                "API access",
                "Email support",
              ]}
              ctaLabel="Upgrade to Pro"
              onCta={handleUpgrade}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
