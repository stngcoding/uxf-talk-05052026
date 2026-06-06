import Image from "@/components/Image";

type Props = {
    className?: string;
};

const ImageGallery = ({ className }: Props) => {
    return (
        <div
            className={`flex gap-3 aspect-[1240/600] max-md:flex-col max-md:aspect-auto ${
                className || ""
            }`}
        >
            <div className="relative h-full flex-1 overflow-hidden rounded-4xl max-md:h-auto max-md:flex-none max-md:aspect-[863/600]">
                <Image
                    className="object-cover"
                    src="/images/gallery-pic-1.png"
                    fill
                    alt="Bento Pro — main preview"
                    sizes="(max-width: 767px) 100vw, (max-width: 1280px) 70vw, 868px"
                    priority
                />
            </div>
            <div className="flex h-full w-[365px] shrink-0 flex-col gap-3 max-md:h-auto max-md:w-full max-md:flex-row">
                <div className="relative flex-1 overflow-hidden rounded-4xl max-md:aspect-[365/294]">
                    <Image
                        className="object-cover"
                        src="/images/gallery-pic-2.png"
                        fill
                        alt="Bento Pro — preview 2"
                        sizes="(max-width: 767px) 50vw, 365px"
                    />
                </div>
                <div className="relative flex-1 overflow-hidden rounded-4xl max-md:aspect-[365/294]">
                    <Image
                        className="object-cover"
                        src="/images/gallery-pic-3.png"
                        fill
                        alt="Bento Pro — preview 3"
                        sizes="(max-width: 767px) 50vw, 365px"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
