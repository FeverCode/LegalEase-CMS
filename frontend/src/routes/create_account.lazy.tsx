import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { signup } from "@/api-helper";
import { useNavigate } from "@tanstack/react-router";

export function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handle_submit = () => {
    setIsLoading(true);
    setIsError(false);

    const do_signup = async () => {
      const res = await signup(email, password);

      if (res != null) {
        setIsError(true);
        setError(res);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigate({ to: "/login" });
    };

    do_signup();
  };

  // const { isLoading, isError, error, refetch } = useQuery({
  //   queryKey: ['id'],
  //   enabled: false,
  //   staleTime: 1200000000,
  //   queryFn: () =>
  //     fetch('/users/create', {
  //       method: 'POST',
  //       headers: {
  //         'accept': "application/json",
  //         'Content-Type': "application/json",
  //       },
  //       body: JSON.stringify({ email: email, password: password})
  //     }).then(res => res.json()
  //     ).then(data => {
  //       if (data["detail"] != undefined) {
  //         throw new Error(data["detail"])
  //       }
  //       return data
  //     })
  //     .catch((error) => { throw new Error(error) })
  // })

  return (
    <Card className="max-w-lg w-full rounded-none">
      <CardHeader>
        <CardTitle className="text-xl">SignUp</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isError && (
          <div className="flex w-full items-center justify-center rounded-sm bg-destructive text-center p-2 my-4">
            {error}
          </div>
        )}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2 mb-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center  rounded-lg focus:ring-4"
            onClick={() => handle_submit()}
          >
            {isLoading ? (
              <div className="border-b-secondary-foreground h-5 w-5 animate-spin rounded-full border-2 border-t-primary-foreground" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export const Route = createLazyFileRoute("/create_account")({
  component: () => {
    return (
      <div className="w-full h-full pt-28 mt-14 flex items-center justify-center">
        <CreateAccount />
      </div>
    );
  },
});
