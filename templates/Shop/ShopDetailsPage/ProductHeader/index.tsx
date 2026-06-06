import Image from "@/components/Image";
import Button from "@/components/Button";

type Props = {};

const ProductHeader = ({}: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <h1 className="text-h3 text-t-primary max-md:text-h4">
                    Bento Pro: Multipurpose 2.0
                </h1>
                <div className="flex items-center gap-3 max-md:w-full">
                    <Button className="max-md:flex-1" isStroke>
                        Preview
                    </Button>
                    <Button className="max-md:flex-1" isBlack>
                        Purchase
                        <span className="ml-2">$98</span>
                    </Button>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 shrink-0 rounded-full bg-b-dark1">
                    <Image
                        className="size-4 opacity-100"
                        src="/images/figma.svg"
                        width={16}
                        height={16}
                        alt="Figma"
                    />
                </div>
                <div className="text-h6 text-t-secondary max-md:text-sub-title-1">
                    36 fully editable UI Bento Cards for Figma
                </div>
            </div>
        </div>
    );
};

export default ProductHeader;
