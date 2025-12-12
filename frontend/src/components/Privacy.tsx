import React from 'react';

const WhyChooseSection = () => {
    const features = [
        {
            title: "Secure and Transparent Buying & Selling",
            description: "IBO ensures that every transaction is safe, verified, and transparent. Whether you're selling your old gadgets, furniture, or electronics, you can connect with trusted buyers and dealers with confidence."
        },
        {
            title: "Best Online Auction Site",
            description: "Looking for the best auction website to get the best deals? IBO offers an interactive e-auction site where users can bid and buy products at competitive prices. With real-time bidding, buyers can get premium second-hand products at unbeatable prices."
        },
        {
            title: "Best Online Auction Site",
            description: "Looking for the best auction website to get the best deals? IBO offers an interactive e-auction site where users can bid and buy products at competitive prices. With real-time bidding, buyers can get premium second-hand products at unbeatable prices."
        },
        {
            title: "Best Online Auction Site",
            description: "Looking for the best auction website to get the best deals? IBO offers an interactive e-auction site where users can bid and buy products at competitive prices. With real-time bidding, buyers can get premium second-hand products at unbeatable prices."
        },
        {
            title: "Best Online Auction Site",
            description: "Looking for the best auction website to get the best deals? IBO offers an interactive e-auction site where users can bid and buy products at competitive prices. With real-time bidding, buyers can get premium second-hand products at unbeatable prices."
        },
        {
            title: "Best Online Auction Site",
            description: "Looking for the best auction website to get the best deals? IBO offers an interactive e-auction site where users can bid and buy products at competitive prices. With real-time bidding, buyers can get premium second-hand products at unbeatable prices."
        }
    ];

    return (

        <div className="w-full py-8 px-55  mx-auto p-6 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Why Choose YuvaX?
            </h2>

            <div className="space-y-6">
                {features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center w-6 h-6 text-center text-sm font-medium text-gray-700">
                                {index + 1}.
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-[14px]">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseSection;
