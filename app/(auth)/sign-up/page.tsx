"use client";

import CountrySelectInput from "@/components/forms/CountrySelectInput";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import React from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      country: "IN",
      email: "",
      fullName: "",
      investmentGoals: "Growth",
      password: "",
      preferredIndustry: "Technology",
      riskTolerance: "Medium",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.log("hello");
      console.log(error);
    }
  };
  return (
    <>
      <h1 className="form-title">Sign Up and Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full name is required", minLength: 2 }}
        />

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

        <CountrySelectInput
          name={"country"}
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <SelectField
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />
        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <Button
          className="yellow-btn w-full mt-5"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Creating Account" : "Start Your Investing Journey"}
        </Button>

        <FooterLink
          href="/sign-in"
          linkText="Sign in"
          text="Already have an Account"
        />
      </form>
    </>
  );
};

export default page;
