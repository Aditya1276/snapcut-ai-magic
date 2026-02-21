import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Wand2, Download, Zap, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";
import logo from "@/assets/logo.svg";

const steps = [
  { icon: Upload, title: "Upload Image", desc: "Drag & drop or select your image" },
  { icon: Wand2, title: "AI Removes BG", desc: "Our AI processes your image instantly" },
  { icon: Download, title: "Download Result", desc: "Get your transparent PNG in seconds" },
];

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Results in under 5 seconds" },
  { icon: Shield, title: "Privacy First", desc: "No images stored permanently" },
  { icon: Clock, title: "Always Available", desc: "24/7 cloud-powered processing" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img src={logo} alt="SnapCut AI" className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 leading-tight">
              Remove Image Background
              <br />
              <span className="gradient-text">in One Click</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              AI-powered background removal. Upload, process, and download — all in seconds. No signup required for your first 5 images.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/editor">Try It Free</Link>
              </Button>
              <Button variant="gradient-outline" size="lg" asChild>
                <Link to="/pricing">View Plans</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-display text-center mb-12">
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-display text-center mb-12">
            Why <span className="gradient-text">SnapCut AI</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <f.icon className="w-8 h-8 text-cyan mb-3" />
                <h3 className="font-display font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-display text-center mb-12">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <PricingCard
              name="Free"
              price="₹0"
              features={["5 images per day", "Standard quality", "PNG download"]}
              ctaLabel="Get Started"
              onCta={() => {}}
            />
            <PricingCard
              name="Pro"
              price="₹999"
              period="month"
              popular
              features={["Unlimited images", "HD quality", "Priority processing", "API access"]}
              ctaLabel="Upgrade Now"
              onCta={() => {}}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
