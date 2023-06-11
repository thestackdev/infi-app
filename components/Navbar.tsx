import { ThemeToggle } from "@/app/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    name: "Customers",
    icon: PersonStanding,
    href: "/customers",
  },
  {
    name: "Requests",
    icon: MenuSquare,
    href: "/requests",
  },
  {
    name: "Approved Requests",
    icon: GiftIcon,
    href: "/approved",
  },
];

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
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
          <SheetTrigger>
            <AlignLeft size={30} />
          </SheetTrigger>
          <SheetContent position="left" className="w-[300px]">
            <SheetHeader>
              <SheetDescription>
                <ul className="flex flex-col w-full gap-2 text-sm">
                  {sidebarItems.map(({ name, icon: Icon, href }, index) => (
                    <li key={index} className="my-3">
                      <Link
                        className="flex flex-row items-center gap-4"
                        href={href}
                      >
                        <Icon size={19} />{" "}
                        <span className="font-medium text-sm">{name}</span>
                      </Link>
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
                        <Link href="/user-settings">User Account Settings</Link>
                      </AccordionContent>
                      <AccordionContent>
                        <Link href="/gift-settings">Gift Voucher Settings</Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Input className="max-w-lg" placeholder="Search" />
        <div className="flex items-center justify-center">
          <ThemeToggle />
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage
                  className="w-9 h-9 rounded-full aspect-square"
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link href="/settings">Settings</Link>
                </li>
                <li>
                  <Link href="/settings">Logout</Link>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
      <Separator />
    </>
  );
}
