import BreadCrumb from "@/components/breadcrumb";
import FinApiChat from "@/components/chat/finapi-chat";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function page() {
  interface ChatBot {
    name: string;
    url: string;
  }

  // const chatBots: ChatBot[] = [
  //   {
  //     name: "FinApi",
  //     url: "/dashboard/chat/finapi",
  //   },

  //   {
  //     name: "FinApi",
  //     url: "/dashboard/chat/finapi",
  //   },
  // ];

  const breadcrumbItems = [{ title: "Chat", link: "/dashboard/chat" }];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
      </div>

      {/* <div className="flex items-start justify-between">
        <Heading
          title={`Chat`}
          description="Talk to our chat bot"
          className=""
        />
      </div> */}
        <ScrollArea className="h-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              {/* <CardTitle className="text-sm font-medium">
              Begin chatting
            </CardTitle> */}
            </CardHeader>
            <CardContent>
              <FinApiChat />
            </CardContent>
          </Card>
        </ScrollArea>
      
    </>
  );
}
