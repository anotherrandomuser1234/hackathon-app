"use client";

import * as React from "react"
import { X, Plus, Send } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useFinApi } from "@/hooks/useFinApi.hook";
import { useChatStore } from "@/lib/store";
import { Skeleton } from "../ui/skeleton";

const users = [
    {
        name: "Olivia Martin",
        email: "m@example.com",
        avatar: "/avatars/01.png",
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        avatar: "/avatars/03.png",
    },
    {
        name: "Emma Wilson",
        email: "emma@example.com",
        avatar: "/avatars/05.png",
    },
    {
        name: "Jackson Lee",
        email: "lee@example.com",
        avatar: "/avatars/02.png",
    },
    {
        name: "William Kim",
        email: "will@email.com",
        avatar: "/avatars/04.png",
    },
] as const

type User = (typeof users)[number]

export default function FinApiChat() {
    const [open, setOpen] = React.useState(false)
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])

    const addMessage = useChatStore((state) => state.addMessage)

    const removeMessage = useChatStore((state) => state.removeMessage)

    const persistedMessages = useChatStore((state) => state.messages)

    // const [messages, setMessages] = React.useState(persistedMessages)
    const [input, setInput] = React.useState("")
    const inputLength = input.trim().length
    const { data, isPending, isError, mutateAsync } = useFinApi();
    console.log("🚀 ~ FinApiChat ~ isLoading:", isPending)

    React.useEffect(() => {
        if (data) {
            addMessage(
                {
                    role: "agent",
                    content: data,
                    id: ""
                },
            )
        }
    }, [data])

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src="/avatars/01.png" alt="Image" />
                            <AvatarFallback>MA</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium leading-none">Murak Abdel Al Tahini</p>
                            <p className="text-sm text-muted-foreground">murak_abdel@tahini.wtf</p>
                        </div>
                    </div>
                    <TooltipProvider delayDuration={0}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="ml-auto rounded-full"
                                    onClick={() => setOpen(true)}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">New message</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={10}>New message</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {persistedMessages.map((message, index) => (
                            <>
                                <div
                                    key={index}
                                    className={cn(
                                        "flex flex-row w-max max-w-[500px] gap-2 rounded-lg px-3 py-2 text-sm",
                                        message.role === "user"
                                            ? "ml-auto bg-primary text-primary-foreground"
                                            : "bg-muted"
                                    )}
                                >
                                    {message.content}

                                    <X className="cursor-pointer min-h-[20px] min-w-[20px]" onClick={() => removeMessage(message)} />
                                </div>


                            </>
                        ))}

                        {isPending && <Skeleton className={cn("flex flex-row w-[29.5%] h-[50px] gap-2 rounded-lg px-3 py-2 text-sm")} />}
                    </div>
                </CardContent>
                <CardFooter>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            if (inputLength === 0) return

                            mutateAsync(input);
                            addMessage({
                                role: "user",
                                content: input,
                                id: "",
                            })
                            setInput("")
                        }}
                        className="flex w-full items-center space-x-2"
                    >
                        <Input
                            id="message"
                            placeholder="Type your message..."
                            className="flex-1"
                            autoComplete="off"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                        />
                        <Button type="submit" size="icon" disabled={inputLength === 0}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>
            {/* <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="gap-0 p-0 outline-none">
                    <DialogHeader className="px-4 pb-4 pt-5">
                        <DialogTitle>New message</DialogTitle>
                        <DialogDescription>
                            Invite a user to this thread. This will create a new group
                            message.
                        </DialogDescription>
                    </DialogHeader>
                    <Command className="overflow-hidden rounded-t-none border-t">
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                            <CommandEmpty>No users found.</CommandEmpty>
                            <CommandGroup className="p-2">
                                {users.map((user) => (
                                    <CommandItem
                                        key={user.email}
                                        className="flex items-center px-2"
                                        onSelect={() => {
                                            if (selectedUsers.includes(user)) {
                                                return setSelectedUsers(
                                                    selectedUsers.filter(
                                                        (selectedUser) => selectedUser !== user
                                                    )
                                                )
                                            }

                                            return setSelectedUsers(
                                                [...users].filter((u) =>
                                                    [...selectedUsers, user].includes(u)
                                                )
                                            )
                                        }}
                                    >
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt="Image" />
                                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2">
                                            <p className="text-sm font-medium leading-none">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                        {selectedUsers.includes(user) ? (
                                            <Check className="ml-auto flex h-5 w-5 text-primary" />
                                        ) : null}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                    <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                        {selectedUsers.length > 0 ? (
                            <div className="flex -space-x-2 overflow-hidden">
                                {selectedUsers.map((user) => (
                                    <Avatar
                                        key={user.email}
                                        className="inline-block border-2 border-background"
                                    >
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                Select users to add to this thread.
                            </p>
                        )}
                        <Button
                            disabled={selectedUsers.length < 2}
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
        </>
    )
}