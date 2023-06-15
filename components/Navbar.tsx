import { ThemeToggle } from "@/app/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import pocketbaseServer from "@/lib/pocketbase-server";
import { cn } from "@/lib/utils";
import {
  AlignLeft,
  GiftIcon,
  Home,
  MenuSquare,
  PersonStanding,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Logout from "./Logout";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    name: "Customers",
    icon: PersonStanding,
    href: "/dashboard/customers",
  },
  {
    name: "Requests",
    icon: MenuSquare,
    href: "/dashboard/requests",
  },
  {
    name: "Approved Requests",
    icon: GiftIcon,
    href: "/dashboard/approved",
  },
];

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pocketbase = pocketbaseServer();

  const user = pocketbase?.authStore.model;

  return (
    <>
      <nav
        className={cn(
          "flex items-center justify-between p-2 space-x-4 mx-auto lg:space-x-6",
          className
        )}
        {...props}
      >
        <Sheet>
          <SheetTrigger asChild>
            <AlignLeft className="cursor-pointer" size={30} />
          </SheetTrigger>
          <SheetContent
            position="left"
            className="w-full max-w-sm flex flex-col flex-1 justify-between"
          >
            <SheetDescription className="mt-4">
              <ul className="flex flex-col w-full gap-2 text-sm">
                {sidebarItems.map(({ name, icon: Icon, href }, index) => (
                  <li key={index} className="my-3">
                    <SheetClose asChild>
                      <Link
                        className="flex flex-row items-center gap-4"
                        href={href}
                      >
                        <Icon size={19} />{" "}
                        <span className="font-medium text-sm">{name}</span>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
                <Accordion type="multiple">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex flex-row items-center gap-4">
                        <Settings size={19} /> Settings
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <SheetClose asChild>
                        <Link href="/dashboard/user-settings">
                          User Account Settings
                        </Link>
                      </SheetClose>
                    </AccordionContent>
                    <AccordionContent>
                      <SheetClose asChild>
                        <Link href="/dashboard/gift-settings">
                          Gift Voucher Settings
                        </Link>
                      </SheetClose>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ul>
            </SheetDescription>
            <div className="flex flex-col w-full items-start">
              <Label className="text-lg mb-4">{user?.email}</Label>
              <Logout />
            </div>
          </SheetContent>
        </Sheet>
        <Input className="max-w-lg" placeholder="Search" />
        <ThemeToggle />
      </nav>
      <Separator />
    </>
  );
}
