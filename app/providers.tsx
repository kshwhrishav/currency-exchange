'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";


export default function Providers({ children }: {children: React.ReactNode}) {
    const [queryclient] = useState(() => new QueryClient());

    return(
        <QueryClientProvider client={queryclient}>
            {children}
        </QueryClientProvider>
    );
}