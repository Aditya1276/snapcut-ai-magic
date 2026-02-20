import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, CreditCard, Zap } from "lucide-react";

const Dashboard = () => {
  // TODO: Wire up real user data from auth
  const user = { email: "user@example.com", plan: "Free", credits: 5 };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold font-display mb-8">
            Your <span className="gradient-text">Dashboard</span>
          </h1>

          <div className="grid gap-4">
            <div className="rounded-xl border border-border bg-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-cyan" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium">{user.plan}</p>
              </div>
              <Button variant="gradient" size="sm">Upgrade</Button>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credits Remaining</p>
                <p className="font-medium text-2xl font-display">{user.credits}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
