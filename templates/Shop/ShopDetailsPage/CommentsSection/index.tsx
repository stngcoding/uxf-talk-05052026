"use client";

import { useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Tabs from "@/components/Tabs";
import Message from "@/components/Message";
import LikeButton from "@/components/LikeButton";
import { comments } from "@/mocks/comments";

type Props = {
    className?: string;
};

const tabs = [
    { id: 1, name: "Newest" },
    { id: 2, name: "Top comment" },
];

// The comment list is sourced from the existing comments mock.
const commentList = comments.slice(0, 3);

// The threaded reply (static) sits under the cybersecurity comment.
const reply = {
    author: "Luna Swift",
    login: "moonracer",
    avatar: "/images/avatars/5.png",
    time: "1s",
};

type CommentMetaProps = {
    login: string;
    time: string;
};

const CommentMeta = ({ login, time }: CommentMetaProps) => (
    <>
        <div className="text-sub-title-1 text-t-secondary/80">@{login}</div>
        <div className="mx-2 flex size-3 items-center justify-center">
            <div className="size-0.5 rounded-full bg-t-tertiary/50" />
        </div>
        <div className="text-sub-title-1 text-t-secondary/80">{time}</div>
    </>
);

const CommentsSection = ({ className }: Props) => {
    const [tab, setTab] = useState(tabs[0]);
    const [message, setMessage] = useState("");

    return (
        <section
            className={`bg-b-surface2 rounded-4xl shadow-widget px-15 py-12 max-md:px-6 max-md:py-8 ${
                className || ""
            }`}
        >
            <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
                <h2 className="text-h4 text-t-primary">Comments</h2>
                <Tabs
                    classButton="px-7"
                    items={tabs}
                    value={tab}
                    setValue={setTab}
                />
            </div>

            <div className="mt-10 flex flex-col gap-8">
                {commentList.map((comment) => {
                    const withReply = comment.id === commentList[0].id;
                    return (
                        <div className="flex gap-5" key={comment.id}>
                            <div className="shrink-0">
                                <Image
                                    className="size-12 rounded-full object-cover opacity-100"
                                    src={comment.avatar}
                                    width={48}
                                    height={48}
                                    alt={comment.author}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center">
                                    <div className="text-sub-title-1 text-t-primary">
                                        {comment.author}
                                    </div>
                                    <div className="ml-3 flex items-center">
                                        <CommentMeta
                                            login={comment.login}
                                            time={comment.time}
                                        />
                                    </div>
                                </div>
                                <div className="text-body-2 text-t-primary/80">
                                    {comment.content}
                                </div>

                                {withReply && (
                                    <div className="relative mt-4 flex before:absolute before:-left-11.5 before:-top-3.5 before:h-8 before:w-8.5 before:rounded-bl-[0.625rem] before:border-b before:border-l before:border-s-stroke2">
                                        <div className="shrink-0">
                                            <Image
                                                className="size-8 rounded-full object-cover opacity-100"
                                                src={reply.avatar}
                                                width={32}
                                                height={32}
                                                alt={reply.author}
                                            />
                                        </div>
                                        <div className="w-[calc(100%-2rem)] pl-4">
                                            <div className="flex items-center">
                                                <div className="text-sub-title-1 text-t-primary">
                                                    {reply.author}
                                                </div>
                                                <div className="ml-3 flex items-center">
                                                    <CommentMeta
                                                        login={reply.login}
                                                        time={reply.time}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-body-2 text-t-primary/80">
                                                Hey{" "}
                                                <span className="underline">
                                                    @samstoo
                                                </span>
                                                ! 😊 We&apos;re working on cool
                                                stuff in the cybersecurity
                                                space. Stay tuned, and thanks for
                                                the awesome idea! 🔍✨
                                            </div>
                                            <div className="-ml-1 mt-2 flex flex-wrap gap-2">
                                                <button className="action">
                                                    <Icon name="reply" />
                                                    Reply
                                                </button>
                                                <LikeButton />
                                                <button className="action">
                                                    <Icon name="trash" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                <Message
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Post a comment"
                />
            </div>
        </section>
    );
};

export default CommentsSection;
