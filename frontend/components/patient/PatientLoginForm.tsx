"use client";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { patientLogin } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User, Lock, Eye, EyeOff, HeartPulse, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const PatientLoginSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  password: z.string().min(6, 'Password is required'),
});

export default function PatientLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof PatientLoginSchema>>({
    resolver: zodResolver(PatientLoginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (values: z.infer<typeof PatientLoginSchema>) => {
    try {
      setSubmitting(true);
      setError(null);
      const resp = await patientLogin(values);
      const { accessToken, user } = resp.data;
      if (!accessToken || !user) throw new Error('Invalid response');
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login Successful', {
        description: 'Welcome back!',
      });
      router.replace('/patient/dashboard');
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message || e.message || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error('Login Failed', {
        description: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-[450px] shadow-xl border-muted/50">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <HeartPulse className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <p className="text-muted-foreground text-sm">Enter your credentials to access your account</p>
      </CardHeader>
      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-4 rounded-lg border-2 flex items-start gap-3 bg-destructive/10 border-destructive/20">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-destructive" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">{error}</p>
            </div>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField name="username" control={form.control} render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Username</FormLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input className="pl-10 h-11 rounded-md" placeholder="your.username" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )} />
            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Password</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input type={showPassword ? 'text' : 'password'} className="pl-10 pr-10 h-11 rounded-md" {...field} />
                  </FormControl>
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword((s) => !s)} tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )} />
            <div className="text-right">
              <Button variant="link" className="text-sm px-0 font-medium" type="button" onClick={() => console.log('Reset password')}>
                Forgot password?
              </Button>
            </div>
            <Button type="submit" className="w-full h-11 rounded-md font-medium transition-all" disabled={submitting}>
              {submitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
