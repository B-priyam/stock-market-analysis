"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success) {
        toast.success("Welcome to signalist");
        router.push("/");
      }
    } catch (error) {
      toast.error("Sign In failed", {
        description:
          error instanceof Error ? error.message : "Failed to sign in",
      });
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="form-title">Log In Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          register={register}
          error={errors.email}
          validation={{
            required: "email is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email address is required",
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
          type="password"
        />

        <Button
          className="yellow-btn w-full mt-5"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Creating Account" : "Start Your Investing Journey"}
        </Button>

        <FooterLink
          href="/sign-up"
          linkText="Sign Up"
          text="Don't have an account"
        />
      </form>
    </>
  );
};

export default page;
