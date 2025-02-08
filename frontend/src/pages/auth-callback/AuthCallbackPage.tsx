import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return;

      try {
        console.log("Starting auth callback sync...");
        syncAttempted.current = true;

        const response = await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });

        console.log("Auth callback successful:", response.data);
        
        // Add a small delay before navigation
        setTimeout(() => {
          console.log("Attempting navigation to /");
          navigate("/", { replace: true });
        }, 500);

      } catch (error) {
        console.error("Error in auth callback:", error);
        setError( "An error occurred during login");
        
        // Optional: Add automatic retry logic
        setTimeout(() => {
          syncAttempted.current = false;
        }, 2000);
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);

  // If there's an error, show it to the user
  if (error) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <p className="text-red-500">Error: {error}</p>
            <button 
              onClick={() => {
                setError(null);
                syncAttempted.current = false;
              }}
              className="px-4 py-2 bg-emerald-500 rounded-md hover:bg-emerald-600"
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">Logging you in</h3>
          <p className="text-zinc-400 text-sm">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;