"use client";

import { ReactNode, useState } from "react";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { QueryClient, DehydratedState } from "@tanstack/react-query";
export default function QueryProvider({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState: DehydratedState | null | undefined;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
