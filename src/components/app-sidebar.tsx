"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  CalendarDays,
  ChartColumn,
  ChartNoAxesGantt,
  ChevronRight,
  ChevronsUpDown,
  Gauge,
  Kanban,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Rocket,
  Settings,
  TrendingUp,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog"

const planningItems = [
  {
    title: "Sprints",
    href: "/sprints",
    icon: Rocket,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: ListTodo,
  },
  {
    title: "Timeline",
    href: "/timeline",
    icon: ChartNoAxesGantt,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
]

const insightItems = [
  {
    title: "Progress",
    href: "/progress",
    icon: TrendingUp,
  },
  {
    title: "Workload",
    href: "/workload",
    icon: Gauge,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: ChartColumn,
  },
]

export function AppSidebar() {

  const params = useParams()
  const boardId = params.id

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <WorkspaceMenu />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem
                title="Dashboard"
                href="/dashboard"
                icon={LayoutDashboard}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Planning</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <BoardsMenu />

              {planningItems.map((item) => (
                <NavItem key={item.title} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Insights</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {insightItems.map((item) => (
                <NavItem key={item.title} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem
                title="Settings"
                href="/settings"
                icon={Settings}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}

function NavItem({
  title,
  href,
  icon: Icon,
}: {
  title: string
  href: string
  icon: React.ElementType
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={title}
        render={<Link href={href} />}
      >
        <Icon />
        <span>{title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function BoardsMenu() {
  const [open, setOpen] = React.useState(true)
  const params = useParams()
  const boardId = params.id
  const { state, isMobile } = useSidebar()

  const isCollapsed = state === "collapsed" && !isMobile

  if (isCollapsed) {
    return (
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SidebarMenuButton tooltip="Boards" />}
          >
            <Kanban />
            <span>Boards</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="right" align="start" className="w-48">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Boards
            </div>

            <DropdownMenuItem
              render={<Link href={`/boards/${boardId}`} />}
          >
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip="Boards"
        onClick={() => setOpen((value) => !value)}
        render={<button type="button" />}
      >
        <Kanban />
        <span>Boards</span>

        <span className="bg-sidebar-accent text-muted-foreground ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-medium tabular-nums select-none">
          1
        </span>

        <ChevronRight
          className={`size-4 transition-transform duration-200 ${
            open ? "rotate-90" : ""
          }`}
        />
      </SidebarMenuButton>

      {open && (
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton
              isActive
              render={<Link href={`/boards/${boardId}`} />}
            >
              <span>Data Team</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  )
}

function WorkspaceMenu() {
  return (
    <DropdownMenu>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" tooltip="Exovie" />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
              E
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Exovie</span>
              <span className="truncate text-xs text-sidebar-foreground/60">
                manager
              </span>
            </div>

            <ChevronsUpDown className="ml-auto size-4 opacity-60" />
          </DropdownMenuTrigger>
        </SidebarMenuItem>
      </SidebarMenu>
    </DropdownMenu>
  )
}

function UserMenu() {
  const { state } = useSidebar()
  const { data: session } = authClient.useSession()

  const [logoutOpen, setLogoutOpen] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const user = session?.user

  const name = user?.name || "User"
  const email = user?.email || ""

  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)

      const { error } = await authClient.signOut()

      if (error) {
        console.error("Logout failed:", error)
        setIsLoggingOut(false)
        return
      }

      window.location.replace("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton size="lg" tooltip={name} />
              }
            >
              <Avatar className="size-8 rounded-lg">
                {user?.image && (
                  <AvatarImage
                    src={user.image}
                    alt={name}
                  />
                )}

                <AvatarFallback className="rounded-lg">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {name}
                </span>

                <span className="truncate text-xs text-sidebar-foreground/60">
                  {email}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4 opacity-60" />
            </DropdownMenuTrigger>
          </SidebarMenuItem>
        </SidebarMenu>

        <DropdownMenuContent
          align="end"
          side={state === "collapsed" ? "right" : "top"}
          className="w-52"
        >
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut className="size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={logoutOpen}
        onOpenChange={(open) => {
          if (!isLoggingOut) {
            setLogoutOpen(open)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>

            <AlertDialogDescription>
              You will need to sign in again to access your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoggingOut}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault()
                handleLogout()
              }}
              disabled={isLoggingOut}
              className="bg-accent-soft text-primary hover:bg-accent-soft/90"
            >
              {isLoggingOut ? "Logging out..." : "Log out"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}