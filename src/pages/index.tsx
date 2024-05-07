import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/services";
import { useRouter } from "next/router";
import useAppStore from "@/store";

export default function SignupFormDemo() {
  const [isLogin, setIsLogin] = useState(true);
  const authData = useAppStore((state) => state.authData);
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const setAuthData = useAppStore((state) => state.setAuthData);

  const { mutate: loginMutateFn, isPending: loginLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuthData(data);
      router.push("/chat");
    },
    onError: (err) => {
      alert(err?.message);
    },
  });

  const { mutate: registerMutateFn, isPending: registerLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setIsLogin(true);
      setForm({ ...form, password: "", confirmPassword: "", email: "" });
    },
    onError: (err) => {
      alert(err?.message);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, confirmPassword, password } = form;
    if (!email) {
      alert("Email is required");
      return;
    }
    if (!password) {
      alert("Password is required");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (isLogin) {
      loginMutateFn({ email, password });
    } else {
      // register logic
      registerMutateFn({ email, password, confirmPassword });
    }
  };

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authData?.token) {
      router.push("/chat");
      return;
    }
  }, [authData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161616]">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          {isLogin ? "Login" : "Register"} to Mercor Chat
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-300 font-semibold underline cursor-pointer"
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              name="email"
              onChange={handleInputChange}
              value={form.email}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              onChange={handleInputChange}
              value={form.password}
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>
          {!isLogin && (
            <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Confirm</Label>
              <Input
                name="confirmPassword"
                onChange={handleInputChange}
                value={form.confirmPassword}
                id="twitterpassword"
                placeholder="••••••••"
                type="twitterpassword"
              />
            </LabelInputContainer>
          )}

          <button
            disabled={registerLoading || loginLoading}
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {registerLoading || loginLoading
              ? "Loading.."
              : isLogin
              ? "Login"
              : "Register"}{" "}
            &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
