"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, Stethoscope, Mail, Lock, User, IdCard, Briefcase, Loader2, AlertCircle } from "lucide-react";
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

// Registration schema
const DoctorRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  medicalRegistrationId: z.string().min(5, "Medical Registration ID must be at least 5 characters").max(50),
  specialty: z.string().min(2, "Specialty must be at least 2 characters").max(100),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading: authLoading, error: authError, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const form = useForm<z.infer<typeof DoctorRegistrationSchema>>({
    resolver: zodResolver(DoctorRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      medicalRegistrationId: "",
      specialty: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof DoctorRegistrationSchema>) {
    try {
      clearError();
      setLocalError(null);

      const { confirmPassword, ...registerData } = values;

      await register(registerData);

      toast.success("Registration Successful", {
        description: "Your account has been created and is pending verification. You'll be able to login once an administrator approves your account.",
        duration: 6000,
      });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed. Please try again.";
      setLocalError(errorMessage);
      toast.error("Registration Failed", {
        description: errorMessage,
      });
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Card className="w-[500px] shadow-xl border-muted/50">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Create Doctor Account</CardTitle>
        <p className="text-muted-foreground text-sm">
          Register to access the MedMitra portal
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {(authError || localError) && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
            <p className="text-sm text-destructive">{authError || localError}</p>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="Dr. John Smith"
                        {...field}
                        className="pl-10 h-11 rounded-md"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Email */}
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
                        type="email"
                        {...field}
                        className="pl-10 h-11 rounded-md"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Medical Registration ID */}
            <FormField
              control={form.control}
              name="medicalRegistrationId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Medical Registration ID</FormLabel>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="MED123456"
                        {...field}
                        className="pl-10 h-11 rounded-md"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Specialty */}
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Specialty</FormLabel>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="Cardiology"
                        {...field}
                        className="pl-10 h-11 rounded-md"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Password */}
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

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium">Confirm Password</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                        className="pl-10 pr-10 h-11 rounded-md"
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={toggleConfirmPasswordVisibility}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
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

            <Button
              type="submit"
              className="w-full h-11 rounded-md font-medium transition-all"
              disabled={authLoading}
            >
              {authLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Button
                variant="link"
                className="px-0 font-medium"
                type="button"
                onClick={() => router.push("/login")}
              >
                Login here
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
