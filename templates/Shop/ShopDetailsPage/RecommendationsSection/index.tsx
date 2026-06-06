import Button from "@/components/Button";
import ShopItem from "@/components/ShopItem";
import { shopItems } from "@/mocks/shopItems";

type Props = {
    className?: string;
};

const RecommendationsSection = ({ className }: Props) => {
    return (
        <div className={`flex flex-col gap-8 ${className || ""}`}>
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-h4 text-t-primary max-md:text-h5">
                    You may also like
                </h2>
                <Button isStroke as="link" href="/shop">
                    View all
                </Button>
            </div>
            <div className="flex flex-wrap gap-6 max-md:gap-3">
                {shopItems.slice(0, 3).map((item) => (
                    <ShopItem
                        className="w-[calc(33.333%-1rem)] max-lg:w-[calc(50%-0.75rem)] max-md:w-full"
                        value={item}
                        key={item.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendationsSection;
