import Image from "@/components/Image";
import Icon from "@/components/Icon";

type Props = {
    className?: string;
};

const highlights = [
    "36 Compositions",
    "Lightning-fast creation",
    "Beautiful light and dark mode",
    "Fully customizable",
    "Minimal & thoughtful designs",
];

const perfectFor = [
    "Analytics Platforms",
    "Crypto Dashboards",
    "Team Collaboration Tools",
    "Client Portals",
    "Marketing Websites",
    "Product Management Systems",
];

// 18px / 28px Inter Display Medium — no matching project typography token,
// so the exact Figma values are used as arbitrary utilities.
const bodyText = "text-[18px] leading-[28px] tracking-[-0.225px] font-medium";

const OverviewSection = ({ className }: Props) => {
    return (
        <div
            className={`flex gap-16 max-lg:gap-10 max-md:flex-col max-md:gap-10 ${
                className || ""
            }`}
        >
            {/* Left column — Overview */}
            <div className="flex flex-1 flex-col gap-8">
                <h2 className="text-h4 text-t-primary">Overview</h2>
                <div className={`${bodyText} text-t-primary`}>
                    <p>
                        Introducing the next evolution of our premium{" "}
                        <span className="font-bold underline">UI system</span>.
                        Bento Pro Vol.2 builds upon our foundation of minimal
                        design principles while{" "}
                        <span className="font-bold">
                            introducing advanced compositions
                        </span>{" "}
                        for modern digital experiences. This expanded collection
                        maintains our signature clean aesthetic with seamless
                        light and dark mode support, elevated by new,
                        thoughtfully crafted components.
                    </p>
                    <p className="mt-7">
                        {
                            "We've refined every detail to perfection, from enhanced gradient treatments to more sophisticated interactions. New dashboard layouts, expanded messaging interfaces, and innovative data visualizations provide even more tools for creating exceptional user experiences 🚀"
                        }
                    </p>
                    <p className="mt-7">
                        <span className="font-bold">🚀 Perfect for</span>:
                    </p>
                    <div>
                        {perfectFor.map((item) => (
                            <p key={item}>•&nbsp;&nbsp;&nbsp;{item}</p>
                        ))}
                    </div>
                    <p className="mt-7">
                        {
                            "Transform your design workflow with our most comprehensive release yet. Whether you're crafting fintech solutions, social platforms, or enterprise applications, Bento Pro Vol.2 delivers unmatched versatility with professional polish. 😎"
                        }
                    </p>
                </div>
            </div>

            {/* Right column — Highlights + author/rating */}
            <div className="flex w-[365px] shrink-0 flex-col gap-15 max-md:w-full">
                <div className="flex flex-col gap-8">
                    <h3 className="text-h4 text-t-primary">Highlights</h3>
                    <div className="w-full">
                        {highlights.map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 border-b-[1.5px] border-s-stroke2 py-5 last:border-b-0"
                            >
                                <Icon
                                    className="shrink-0 fill-t-primary"
                                    name="check-circle-fill"
                                />
                                <div className={`${bodyText} text-t-primary`}>
                                    {item}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Author / rating card */}
                <div className="w-full">
                    <div className="flex items-center gap-6 border-b-[1.5px] border-s-stroke2 pb-8">
                        <div className="relative size-17 shrink-0 overflow-hidden rounded-full">
                            <Image
                                className="object-cover"
                                src="/images/avatar.png"
                                fill
                                alt="Chelsie Haylie"
                                sizes="68px"
                            />
                        </div>
                        <div className="flex flex-1 flex-col">
                            <div className="text-h4 text-t-primary">
                                @chelsie
                            </div>
                            <div className={`${bodyText} text-t-secondary`}>
                                Chelsie Haylie
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex flex-1 flex-col border-r-[1.5px] border-s-stroke2 pr-8 pt-8">
                            <div className="flex items-center gap-2">
                                <div className="text-h4 text-t-primary">
                                    4.96
                                </div>
                                <Icon
                                    className="!size-4 fill-t-primary"
                                    name="star-fill"
                                />
                            </div>
                            <div className={`${bodyText} text-t-primary`}>
                                Ratings
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col pl-8 pt-8">
                            <div className="text-h4 text-t-primary">8+</div>
                            <div className={`${bodyText} text-t-primary`}>
                                Years selling
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
