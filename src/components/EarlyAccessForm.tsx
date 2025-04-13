import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { submitToSupabase } from "@/utils/supabaseService";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface EarlyAccessFormProps {
  userType: "user" | "influencer";
}

const EarlyAccessForm = ({ userType: initialUserType }: EarlyAccessFormProps) => {
  const [userType, setUserType] = useState<"user" | "influencer">(initialUserType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    const userData = {
      name,
      email,
      userType,
      category: userType === "influencer" ? category : undefined,
      message: message || undefined
    };
    
    const success = await submitToSupabase(userData);
    
    if (success) {
      // Show thank you screen
      setIsSubmitted(true);
      
      // Reset form
      setName("");
      setEmail("");
      setCategory("");
      setMessage("");
    }
    
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-none">
        <CardContent className="flex flex-col items-center justify-center pt-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
          <p className="text-gray-600">We'll keep you updated on our launch and early access opportunities.</p>
          <Button 
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => setIsSubmitted(false)}
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Type Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button
          type="button"
          className={`py-3 px-4 rounded-lg transition-colors text-center ${
            userType === "user" 
              ? "bg-indigo-600 text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setUserType("user")}
        >
          I'm a Fan
        </button>
        <button
          type="button"
          className={`py-3 px-4 rounded-lg transition-colors text-center ${
            userType === "influencer" 
              ? "bg-indigo-600 text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setUserType("influencer")}
        >
          I'm a Creator/Celebrity
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <Input 
            id="name"
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input 
            id="email"
            type="email" 
            placeholder="Your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {userType === "influencer" && (
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Content Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beauty">Beauty & Fashion</SelectItem>
                <SelectItem value="fitness">Fitness & Health</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="business">Business & Finance</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {userType === "user" 
              ? "Which creators/Celebrity would you like to connect with?" 
              : "Tell us about your audience and content"
            }
          </label>
          <Textarea 
            id="message"
            placeholder={userType === "user" 
              ? "Enter names of creators/Celebrity you follow..." 
              : "Tell us about your content and audience size..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Join Waitlist"}
      </Button>
    </form>
  );
};

export default EarlyAccessForm;