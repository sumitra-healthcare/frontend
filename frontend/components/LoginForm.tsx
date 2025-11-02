"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, Stethoscope, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,

  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoctorLoginSchema } from "@/lib/schemas";

export function LoginForm() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading, error: authError, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const form = useForm<z.infer<typeof DoctorLoginSchema>>({
    resolver: zodResolver(DoctorLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof DoctorLoginSchema>) {
    try {
      clearError();
      setLocalError(null);
      
      await login(values.email, values.password);
      
      toast.success("Login Successful", {
        description: "Welcome back!",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Login failed. Please try again.";
      setLocalError(errorMessage);
      toast.error("Login Failed", {
        description: errorMessage,
      });
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = () => {
    toast.info("Google OAuth", {
      description: "Google login will be available soon.",
    });
  };

  return (
    <Card className="w-[450px] shadow-xl border-muted/50">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <p className="text-muted-foreground text-sm">Enter your credentials to access your account</p>
      </CardHeader>
      <CardContent className="p-6">
        {(authError || localError) && (
          <div className={`mb-4 p-4 rounded-lg border-2 flex items-start gap-3 ${
            (authError || localError)?.includes('pending verification')
              ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700'
              : 'bg-destructive/10 border-destructive/20'
          }`}>
            <AlertCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
              (authError || localError)?.includes('pending verification')
                ? 'text-amber-600 dark:text-amber-500'
                : 'text-destructive'
            }`} />
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                (authError || localError)?.includes('pending verification')
                  ? 'text-amber-800 dark:text-amber-300'
                  : 'text-destructive'
              }`}>
                {authError || localError}
              </p>
              {(authError || localError)?.includes('pending verification') && (
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
                  Your registration has been received. An administrator will review and activate your account shortly.
                </p>
              )}
            </div>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        placeholder="doctor@example.com" 
                        {...field} 
                        className="pl-10 h-11 rounded-md"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Password</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        {...field} 
                        className="pl-10 pr-10 h-11 rounded-md"
                      />
                    </FormControl>
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Button 
                variant="link" 
                className="text-sm px-0 font-medium" 
                type="button"
                onClick={() => console.log('Reset password')}
              >
                Forgot password?
              </Button>
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 rounded-md font-medium transition-all" 
              disabled={authLoading}
            >
              {authLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 rounded-md font-medium transition-all"
              onClick={handleGoogleLogin}
              disabled={authLoading}
            >
              {authLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </div>
              )}
            </Button>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Button 
                variant="link" 
                className="px-0 font-medium" 
                type="button"
                onClick={() => router.push('/register')}
              >
                Register here
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
