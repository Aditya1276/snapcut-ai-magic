import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-secondary py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="SnapCut AI" className="h-8 w-8" />
            <span className="font-display font-bold text-lg gradient-text">SnapCut AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            AI-powered background removal in one click. Fast, simple, beautiful.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Product</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/editor" className="hover:text-primary transition-colors">Editor</Link>
            <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Account</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/login" className="hover:text-primary transition-colors">Log In</Link>
            <Link to="/signup" className="hover:text-primary transition-colors">Sign Up</Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Legal</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SnapCut AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
