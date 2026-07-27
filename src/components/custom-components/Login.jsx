import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../lib/validations/LoginSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLogin } from "@/Features/Auth/auth.mutation";
import { useCurrentUser } from "@/Features/Auth/auth.query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Login({ onLoginSuccess }) {
const navigate=useNavigate()
  const { data: user, isLoading } = useCurrentUser();
 useEffect(() => {
   if (user) {
     navigate("/", { replace: true });
   }
 }, [user, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const { mutate, isPending } = useLogin();
  const onSubmit = async (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.dismiss();
        toast("Logged in successfully!! ");
        if (onLoginSuccess) onLoginSuccess();
      },
      onError: (error) => {
        toast.dismiss();
        toast(error?.message || "Logged in failed!!");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-3 px-4">
      {/* Email */}
      <div className="space-y-2">
        <Label className="text-gray-500 ">Email</Label>
        <Input
          className=" focus-visible:ring-1 focus-visible::ring-blue-500  focus:outline-none"
          type="email"
          {...register("email")}
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label className="text-gray-500 ">Password</Label>
        <Input
          className="flex h-10 focus-visible:ring-1 focus-visible::ring-blue-500  focus:outline-none"
          type="password"
          {...register("password")}
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full h-12  text-white"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
      <div>Don't have an account? <a href="/signup" className="text-foreground">Signup</a></div>
    </form>
  );
}
