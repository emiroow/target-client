import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/templates/components/Loading";

const Providers = ({ children }: { children: React.ReactElement }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Suspense>
  );
};

export default Providers;
