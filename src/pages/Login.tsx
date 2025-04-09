import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import AuthLayout from '@/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/authService';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsAuthenticating(true);
    toast.loading('Logging in...');

    try {
      const response = await authService.login(values.email, values.password);

      if (response.error) {
        toast.dismiss();
        toast.error('Login failed', {
          description: response.error,
        });
        return;
      }

      toast.dismiss();
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.dismiss();
      toast.error('Login failed', {
        description: 'An unexpected error occurred',
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleThirdPartyLogin = (provider: string) => {
    toast.loading(`Connecting to ${provider}...`);

    // In a real implementation, this would redirect to the OAuth provider
    setTimeout(() => {
      toast.dismiss();
      toast('Not implemented', {
        description: `${provider} login is not implemented in this demo`,
      });
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your account"
      showSignUpLink
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link to="/forgot-password" className="text-xs text-imperial hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">Remember me for 30 days</FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-imperial hover:bg-imperial/90" disabled={isAuthenticating}>
            {isAuthenticating ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="flex gap-2" 
          onClick={() => handleThirdPartyLogin('X')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
          X
        </Button>
        <Button 
          variant="outline" 
          className="flex gap-2"
          onClick={() => handleThirdPartyLogin('Apple')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>
          Apple
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Login;