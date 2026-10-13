"use client";

import { useState } from "react";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm(){
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  }); 

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (
          error.code === "INVALID_CREDENTIALS" ||
          error.message?.toLowerCase().includes("credentials") ||
          error.message?.toLowerCase().includes("not found")
        ) {
          toast.error(
            "Invalid email or password. Please check your credentials or sign up."
          );
        } else {
          toast.error(error.message || "Login failed.");
        }

        return;
      }

      toast.success("Login successful!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
return (
  <div className="flex w-full max-w-sm flex-col gap-6">
    <div className="flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-card-foreground ring-1 ring-foreground/10">
      <div className="grid gap-1 px-4">
        <h2 className="text-2xl font-medium">
          Sign in
        </h2>

        <p className="text-sm text-muted-foreground">
          Welcome back to Task Tracker.
        </p>
      </div>

      <div className="px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup className="gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel htmlFor={field.name}>
                    Email
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="example@gmail.com"
                    autoComplete="email"
                    autoFocus
                    required
                    aria-invalid={fieldState.invalid}
                    className="h-9 rounded-lg px-2.5 text-sm"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field aria-invalid={fieldState.invalid} className="gap-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>
                      Password
                    </FieldLabel>

                    <a
                      href="/reset-password"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      aria-invalid={fieldState.invalid}
                      className="h-10 rounded-lg pr-14"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Field className="gap-2">
            <Button
              type="submit"
              disabled={loading}
              className="h-9 w-full rounded-lg"
            >
              {loading && <Spinner className="size-4" />}
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Field>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-x-0 border-t" />
            <span className="relative bg-card px-2 text-xs uppercase text-muted-foreground">
              Or
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-9 w-full rounded-lg"
            onClick={() => {
            }}
          >
            Sign in with a passkey
          </Button>
        </form>
      </div>
    </div>

    <p className="text-center text-sm text-muted-foreground">
      Accounts are provisioned by an administrator.
    </p>
  </div>
);
}
