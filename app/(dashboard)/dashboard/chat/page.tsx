import FinApiChat from "@/components/chat/finapi-chat";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function page() {

  interface ChatBot {
    name: string;
    url: string;
  }

  const chatBots: ChatBot[] = [
    {
      name: "FinApi",
      url: "/dashboard/chat/finapi",
    },

    {
      name: "FinApi",
      url: "/dashboard/chat/finapi",
    },

  ]

  return (
    <ScrollArea className="h-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Begin chatting
          </CardTitle>
        </CardHeader>
        <CardContent>

          <FinApiChat />
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
