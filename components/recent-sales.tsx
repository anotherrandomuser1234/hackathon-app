"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function RecentSales() {
  const clients = [
    {
      name: "Olivia Martin",
      avatar: "/avatars/01.png",
      currency: "ETH",
      profit: "+$1,999.00",
    },
    {
      name: "Kate Kateson",
      avatar: "/avatars/02.png",
      currency: "Binance Coin",
      profit: "+$3129.00",
    },
    {
      name: "The Vatican Pope",
      avatar: "/avatars/03.png",
      currency: "Solana",
      profit: "+Divine Profit",
    },
    {
      name: "Your average Züri inhabitant",
      avatar: "/avatars/04.png",
      currency: "Dogecoin",
      profit: "-$1512.00",
    },
    {
      name: "Peter",
      avatar: "/avatars/05.png",
      currency: "Polygon",
      profit: "-$0.05",
    },
  ];

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);

    console.log("show modal");
  };

  return (
    <div className="space-y-8">
      {clients.map((client, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={client.avatar} alt="Avatar" />
            <AvatarFallback>
              {client.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 cursor-pointer outline-offset-2">
            <p className="text-sm font-medium leading-none">{client.name}</p>
            <p className="text-sm text-muted-foreground">{client.currency}</p>
          </div>
          <div
            className={`ml-auto font-medium ${
              client.profit.startsWith("-") ? "text-red-300" : "text-green-300"
            }`}
          >
            {client.profit}
          </div>

          {/* {showModal && ( */}
          <Sheet>
            <SheetTrigger>
              <Button
                className="ml-4 text-sm font-medium"
                onClick={handleClick}
              >
                View
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Client Summary</SheetTitle>
                <SheetDescription>
                  Some summary to be added
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          {/* )} */}
        </div>
      ))}
    </div>
  );
}
