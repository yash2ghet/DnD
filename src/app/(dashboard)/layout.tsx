"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "../../../lib/api"

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        await api.get("/api/me")

        setCheckingAuth(false)
      } catch (error) {
        console.error("Session check failed:", error)
        router.replace("/login")
      }
    }

    checkSession()
  }, [router])

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Checking authentication...
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="h-svh min-w-0 overflow-hidden">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}