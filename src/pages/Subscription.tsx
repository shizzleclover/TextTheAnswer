
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  
  const handleSubscribe = (plan: string) => {
    toast.loading('Processing subscription...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Subscription successful!', {
        description: `You are now a premium member with a ${plan} subscription.`,
      });
    }, 2000);
  };
  
  const handleCancelSubscription = () => {
    toast.loading('Processing cancellation...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Subscription cancelled successfully!', {
        description: "You'll continue to have access until the end of your billing period.",
      });
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-montserrat tracking-tight">Subscription Plans</h1>
          <p className="text-gray-500">Choose a plan that works for you</p>
        </div>
        
        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="manage">Manage Subscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans" className="space-y-6">
            <div className="bg-gradient-to-r from-imperial/5 via-dutch-white/20 to-imperial/5 p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-semibold text-imperial mb-2">
                Upgrade to Premium
              </h2>
              <p className="text-gray-600 mb-4">
                Get access to all premium features and enjoy an ad-free experience.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Monthly Plan */}
                <div 
                  className={`bg-white border rounded-xl p-6 transition-all ${
                    selectedPlan === 'monthly' 
                      ? 'border-imperial/50 shadow-lg shadow-imperial/10' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Monthly</h3>
                      <div className="text-sm text-gray-500">Billed monthly</div>
                    </div>
                    <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                      {selectedPlan === 'monthly' && (
                        <div className="h-3 w-3 rounded-full bg-imperial"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$4.99</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Ad-free experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Unlimited daily quizzes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Custom multiplayer lobbies</span>
                    </li>
                  </ul>
                  
                  <Button 
                    onClick={() => handleSubscribe('monthly')}
                    className="w-full bg-imperial hover:bg-imperial/90"
                  >
                    Choose Monthly
                  </Button>
                </div>
                
                {/* Annual Plan */}
                <div 
                  className={`bg-white border rounded-xl p-6 transition-all ${
                    selectedPlan === 'annual' 
                      ? 'border-imperial/50 shadow-lg shadow-imperial/10' 
                      : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPlan('annual')}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Annual</h3>
                      <div className="text-sm text-gray-500">Billed annually</div>
                      <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded mt-1">
                        Save 33%
                      </div>
                    </div>
                    <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                      {selectedPlan === 'annual' && (
                        <div className="h-3 w-3 rounded-full bg-imperial"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold">$39.99</span>
                    <span className="text-gray-500">/year</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Ad-free experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Unlimited daily quizzes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Custom multiplayer lobbies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Premium question packs</span>
                    </li>
                  </ul>
                  
                  <Button 
                    onClick={() => handleSubscribe('annual')}
                    className="w-full bg-imperial hover:bg-imperial/90"
                  >
                    Choose Annual
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Premium Monthly</div>
                    <div className="text-sm text-gray-500">Active subscription</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">$4.99/month</div>
                    <div className="text-sm text-gray-500">Next billing: May 15, 2023</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 mt-6 pt-6">
                  <h3 className="font-medium mb-4">Billing Information</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-gray-500">Payment Method</div>
                      <div className="col-span-2">Visa ending in 4242</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-gray-500">Billing Address</div>
                      <div className="col-span-2">123 Main St, Anytown, USA</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={handleCancelSubscription}
                  >
                    Cancel Subscription
                  </Button>
                </div>
                <Button variant="outline">Update Payment Method</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Subscription;
