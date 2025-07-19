"use client";

import { ReactNode, useState } from "react";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
export default function QueryProvider({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState: unknown;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
