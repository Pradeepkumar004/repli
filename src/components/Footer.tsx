
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { subscribeToNewsletter } from "@/utils/supabaseService";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    const success = await subscribeToNewsletter(email);
    
    if (success) {
      setEmail("");
    }
    
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Replu</h2>
            <p className="text-slate-300 mb-6 max-w-md">
              The first platform that lets fans pay to get personal replies from their favorite influencers and celebrities.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-4">Subscribe to get updates on our launch and early access opportunities.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="bg-slate-800 border-slate-700 text-white"
                required
              />
              <Button type="submit" variant="default" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2025 Replu. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <Link to="/terms" className="text-slate-400 hover:text-white text-sm">Terms & Conditions</Link>
            <Link to="/privacy" className="text-slate-400 hover:text-white text-sm">Privacy Policy</Link>
            <Link to="/refund" className="text-slate-400 hover:text-white text-sm">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
