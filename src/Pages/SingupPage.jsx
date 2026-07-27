import { UserSchema } from "../lib/validations/UserSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@/Features/Auth/auth.mutation";
export default function SignupPage() {



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

    const { mutate, isPending, isError, error } = useSignUp();
  const onSubmit = async (data) => {
    mutate(data, {
    onSuccess: () => {
      toast.dismiss();
      toast.success("Registered successfully!!");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.message || "Registration failed!!");
    }
  });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-3  py-5">
      <Card className="w-full max-w-md shadow-lg px-2">
        <CardHeader>
          <CardTitle className="text-xl  font-semibold text-center">
            Create your Career Copilot account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 mt-6 px-4"
          >
            {/* Full Name */}
            <div className="space-y-2">
              <Label className="text-gray-500 ">Full Name</Label>
              <Input
                className=" focus-visible:ring-1 focus-visible::ring-blue-500  focus:outline-none"
                {...register("fullname")}
              />
              <p className=" text-red-500 text-sm">
                {errors.fullname?.message}
              </p>
            </div>

         

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
                className=" focus-visible:ring-1 focus-visible::ring-blue-500  focus:outline-none"
                type="password"
                {...register("password")}
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            {/* Bio (optional) */}
            <div className="space-y-2">
              <Label className="text-gray-500 ">Bio (optional)</Label>
              <Input
                className=" focus-visible:ring-1 focus-visible::ring-blue-500  focus:outline-none"
                {...register("bio")}
              />
              <p className="text-red-500 text-sm">{errors.bio?.message}</p>
            </div>

         
            <Button
              type="submit"
              className="w-full h-12  text-white"
              disabled={isPending}
            >
              {isPending ? "Creating account..." : "Sign Up"}
            </Button>
            <div>Already have an account?<a className="text-foreground " href="/login"> Login</a></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
