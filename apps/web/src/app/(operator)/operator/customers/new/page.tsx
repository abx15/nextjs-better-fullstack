"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    password: "password123", // Default for now
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/operator/customers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Registration failed");
      
      toast.success("ग्राहक सफलतापूर्वक पंजीकृत!");
      router.push("/operator");
    } catch (error) {
      console.error(error);
      toast.error("पंजीकरण विफल");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/operator">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[#1a3a6b]">नया ग्राहक पंजीकृत करें</h1>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>पूरा नाम (Full Name)</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="उदा: राहुल कुमार"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>ईमेल (Email)</Label>
              <Input 
                type="email"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="rahul@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>मोबाइल नंबर (Phone)</Label>
              <Input 
                type="tel"
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="99XXXXXXXX"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Link href="/operator">
              <Button variant="outline" type="button">रद्द करें</Button>
            </Link>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 min-w-[150px]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
              पंजीकृत करें (Register)
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
