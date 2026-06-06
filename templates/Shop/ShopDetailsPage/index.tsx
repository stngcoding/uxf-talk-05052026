"use client";

import Layout from "@/components/Layout";
import ProductHeader from "./ProductHeader";
import ImageGallery from "./ImageGallery";
import OverviewSection from "./OverviewSection";
import CommentsSection from "./CommentsSection";
import RecommendationsSection from "./RecommendationsSection";

const ShopDetailsPage = () => {
    return (
        <Layout hideSidebar>
            <div className="w-full max-w-310 mx-auto">
                <ProductHeader />
                <ImageGallery className="mt-12 max-md:mt-8" />
                <OverviewSection className="mt-22 max-md:mt-16" />
                <CommentsSection className="mt-22 max-md:mt-16" />
                <RecommendationsSection className="mt-22 max-md:mt-16" />
            </div>
        </Layout>
    );
};

export default ShopDetailsPage;
