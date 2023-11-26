"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";

import { SocialLoginTypes, Variant } from "@/types/models";

import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";

const socialLogins: Array<{
  type: SocialLoginTypes;
  icon: IconType;
}> = [
  { type: "github", icon: BsGithub },
  { type: "google", icon: BsGoogle },
];

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      if (variant === "REGISTER") {
        await axios.post("/api/register", data);
        const signInResponse = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (signInResponse?.error) {
          toast.error("Invalid creds");
        } else if (signInResponse?.ok) {
          toast.success("Logged in");
          router.push("/users");
        }
      }

      if (variant === "LOGIN") {
        const signInResponse = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (signInResponse?.error) {
          toast.error("Invalid creds");
        } else if (signInResponse?.ok) {
          toast.success("Logged in");
          router.push("/users");
        }
      }
    } catch {
      toast.error("Some error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const socialActions = async (action: SocialLoginTypes) => {
    try {
      setIsLoading(true);
      const signInResponse = await signIn(action, { redirect: false });
      if (signInResponse?.error) {
        toast.error("Invalid creds");
      } else if (signInResponse?.ok) {
        toast.success("Logged in");
      }
    } catch {
      toast.error("Some error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id="name" label="Name" register={register} errors={errors} />
          )}

          <Input
            id="email"
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />

          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            {socialLogins.map(({ type, icon }) => (
              <IconButton
                key={type}
                icon={icon}
                onClick={() => socialActions(type)}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div className=" underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
