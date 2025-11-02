"use client";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { patientRegister } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Eye, EyeOff, UserRound, HeartPulse, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const PatientRegisterSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((v) => v.password === v.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords don't match",
});

export default function PatientRegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof PatientRegisterSchema>>({
    resolver: zodResolver(PatientRegisterSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (values: z.infer<typeof PatientRegisterSchema>) => {
    try {
      setSubmitting(true);
      setError(null);
      const { confirmPassword, ...payload } = values;
      const resp = await patientRegister(payload);
      const { accessToken, user } = resp.data;
      if (accessToken && user) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Registration Successful', {
          description: 'Your account has been created successfully!',
        });
        router.replace('/patient/dashboard');
      } else {
        // If backend does not auto-login, redirect to login
        toast.success('Registration Successful', {
          description: 'Please sign in to continue.',
          duration: 3000,
        });
        setTimeout(() => {
          router.push('/auth?tab=login&role=patient');
        }, 1500);
      }
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message || e.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error('Registration Failed', {
        description: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-[500px] shadow-xl border-muted/50">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <HeartPulse className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Create Patient Account</CardTitle>
        <p className="text-muted-foreground text-sm">Register to access your healthcare portal</p>
      </CardHeader>
      <CardContent className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="username" control={form.control} render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Username</FormLabel>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input className="pl-10 h-11 rounded-md" placeholder="your.username" {...field} />
                  </FormControl>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )} />
            <FormField name="email" control={form.control} render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input className="pl-10 h-11 rounded-md" placeholder="patient@example.com" type="email" {...field} />
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
                    <Input className="pl-10 pr-10 h-11 rounded-md" type={showPassword ? 'text' : 'password'} {...field} />
                  </FormControl>
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword((s) => !s)} tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )} />
            <FormField name="confirmPassword" control={form.control} render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input className="pl-10 pr-10 h-11 rounded-md" type={showConfirmPassword ? 'text' : 'password'} {...field} />
                  </FormControl>
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword((s) => !s)} tabIndex={-1}>
                    {showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                  </button>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )} />
            <Button type="submit" className="w-full h-11 rounded-md font-medium transition-all" disabled={submitting}>
              {submitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
