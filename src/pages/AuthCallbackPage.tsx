import { useEffect } from "react";
import { useAuth } from "@/hooks/api/useAuth";
import { BlueprintCard } from "@/components/blueprint";

const AuthCallbackPage = () => {
  const { isLoading, error, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated, isLoading]);

  if (error) {
    return (
      <div className="min-h-screen bg-bp-bg bp-paper flex items-center justify-center px-4">
        <BlueprintCard
          className="max-w-md mx-auto p-8 text-center"
          tone="accent"
          bg="bg-bp-paper"
          noSnapCorners
        >
          <span className="font-mono text-[10px] tracking-tape text-bp-accent border border-bp-accent px-2 py-0.5">
            ✕ ERROR
          </span>
          <h1 className="font-bold text-bp-ink text-3xl tracking-tight mt-4">
            Authentication failed.
          </h1>
          <p className="text-bp-inkSoft text-sm mt-3">{error}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bp-btn bp-btn-graphite font-bold mt-6"
            style={{ fontSize: 16 }}
          >
            ← back to home
          </button>
        </BlueprintCard>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-bp-bg bp-paper flex items-center justify-center px-4">
        <BlueprintCard
          className="max-w-md mx-auto p-8 text-center"
          tone="accent2"
          bg="bg-bp-paper"
          noSnapCorners
        >
          <span className="font-mono text-[10px] tracking-tape text-bp-accent2 border border-bp-accent2 px-2 py-0.5">
            ✓ AUTHENTICATED
          </span>
          <h1 className="font-bold text-bp-ink text-3xl tracking-tight mt-4">
            you're in.
          </h1>
          <p className="text-bp-inkSoft text-sm mt-3">
            Redirecting to your dashboard...
          </p>
        </BlueprintCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bp-bg bp-paper flex items-center justify-center px-4">
      <BlueprintCard
        className="max-w-md mx-auto p-8 text-center"
        bg="bg-bp-paper"
        noSnapCorners
      >
        <span className="font-mono text-[10px] tracking-tape text-bp-inkSoft border border-bp-ink px-2 py-0.5">
          ● CHECKING
        </span>
        <h1 className="font-bold text-bp-ink text-3xl tracking-tight mt-4">
          Authenticating with GitHub.
        </h1>
        <p className="text-bp-inkSoft text-sm mt-3">
          <span className="bp-cursor inline-block h-3 mr-1" />
          please wait while we complete your sign-in...
        </p>
      </BlueprintCard>
    </div>
  );
};

export default AuthCallbackPage;
