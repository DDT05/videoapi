import type React from 'react';
import { motion } from 'framer-motion';

const FeatureItem: React.FC<{ feature: string; delay: number }> = ({ feature, delay }) => {
  return (
    <motion.li
      className="flex items-start"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      viewport={{ once: true }}
    >
      <motion.svg
        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{
          delay: delay + 0.1,
          type: "spring",
          stiffness: 400
        }}
        viewport={{ once: true }}
      >
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </motion.svg>
      <span className="text-gray-600">{feature}</span>
    </motion.li>
  );
};

const PricingCard: React.FC<{
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  delay: number;
}> = ({ title, price, features, isPopular = false, delay }) => {
  return (
    <motion.div
      className={`bg-white rounded-lg p-6 border ${isPopular ? 'border-blue-500' : 'border-gray-200'} relative`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        y: -10,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 400 }
      }}
    >
      {isPopular && (
        <motion.div
          className="absolute -top-3 right-6 bg-blue-500 text-white px-3 py-1 text-xs font-semibold rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: delay + 0.3,
            type: "spring",
            stiffness: 300
          }}
        >
          Most Popular
        </motion.div>
      )}
      <motion.h3
        className="text-xl font-bold mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        viewport={{ once: true }}
      >
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-500 text-sm">/month</span>
      </motion.div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <FeatureItem
            key={`${title}-${feature}`}
            feature={feature}
            delay={delay + 0.3 + (index * 0.1)}
          />
        ))}
      </ul>
      <motion.button
        className={`w-full py-3 rounded-md font-medium transition-colors ${isPopular ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-900 hover:bg-black text-white'}`}
        whileHover={{
          scale: 1.03,
          boxShadow: isPopular
            ? "0px 5px 15px rgba(59, 130, 246, 0.4)"
            : "0px 5px 15px rgba(0, 0, 0, 0.2)"
        }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: delay + 0.5,
          duration: 0.3
        }}
        viewport={{ once: true }}
      >
        Start Free Trial
      </motion.button>
    </motion.div>
  );
};

const Pricing: React.FC = () => {
  const pricingData = [
    {
      title: 'Starter',
      price: '29',
      features: [
        '20 videos per month',
        'Basic templates',
        'Email support',
      ],
    },
    {
      title: 'Business',
      price: '79',
      features: [
        '100 videos per month',
        'Premium templates',
        'Priority support',
        'Custom branding',
      ],
      isPopular: true,
    },
    {
      title: 'Agency',
      price: '199',
      features: [
        '500 videos per month',
        'All premium features',
        '24/7 priority support',
        'API access',
        'White-label solution',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Start free and scale as you grow
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingData.map((plan, index) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              delay={0.2 + (index * 0.2)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
