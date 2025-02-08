import { Button } from "./ui/button";
import { useSignIn } from "@clerk/clerk-react";

const SignInOAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();

  const signinwithgoogle = () => {
    if (signIn) {
      signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/auth-callback",
      });
    }
  };
  if (!isLoaded) return null;
  return (
    <div>
      <Button
        onClick={signinwithgoogle}
        variant={"secondary"}
        className="w-full text-white border-zinc-200 h-11"
      >
        Sign in with Google
      </Button>
    </div>
  );
};

export default SignInOAuthButton;
