"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    // console.log(user)
    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.imageUrl,
    });
    // console.log(data)
    // console.log(error)
    if(data){
      // toast
      redirect('/')
    }
    if(error){
      // toast
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream dark:bg-forest-dark">
      <div className="w-full max-w-md rounded-2xl border border-sage-light/40 bg-white p-8 shadow-lg dark:border-sage/30 dark:bg-forest">
        {/* Header */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-forest-dark dark:text-cream">
            Create an Account
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-sage-light">
            Join StudyNook and find your perfect study room.
          </p>
        </div>

        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          {/* Name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
              Name
            </Label>

            <Input
              placeholder="John Doe"
              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
            />

            <FieldError className="mt-1 text-sm text-red-500" />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
              Email
            </Label>

            <Input
              placeholder="john@example.com"
              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
            />

            <FieldError className="mt-1 text-sm text-red-500" />
          </TextField>

          {/* Image URL */}
          <TextField name="imageUrl">
            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
              Image URL
            </Label>

            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
            />

            <FieldError className="mt-1 text-sm text-red-500" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-forest-dark dark:text-cream">
              Password
            </Label>

            <Input
              placeholder="Enter your password"
              className="mt-1 rounded-lg border border-sage-light/60 bg-white px-3 text-forest-dark outline-none placeholder:text-gray-400 focus:border-forest dark:border-sage/50 dark:bg-forest-dark dark:text-cream dark:placeholder:text-sage-light"
            />

            <Description className="mt-1 text-xs text-gray-500 dark:text-sage-light">
              Must be at least 8 characters with 1 uppercase, 1 lowercase and 1
              number
            </Description>

            <FieldError className="mt-1 text-sm text-red-500" />
          </TextField>

          {/* Buttons */}
          <div className="mt-2 flex w-full gap-3">
            <Button
              type="submit"
              className="flex-1 rounded-lg bg-forest px-4 py-2.5 font-medium text-white transition hover:bg-forest-dark"
            >
              Register
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="rounded-lg border border-sage bg-transparent px-4 py-2.5 font-medium text-forest-dark transition hover:bg-sage-light/20 dark:text-cream dark:hover:bg-sage/20"
            >
              Reset
            </Button>
          </div>
          <div className="mt-2 text-center text-sm text-gray-600 dark:text-sage-light">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-forest hover:text-forest-dark hover:underline dark:text-sage-light dark:hover:text-cream"
            >
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
