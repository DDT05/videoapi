import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

const StarRating: React.FC = () => {
  return (
    <div className="flex text-yellow-400 mb-3">
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <motion.svg
          key={`star-${starNumber}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.3 + ((starNumber - 1) * 0.1),
            type: "spring",
            stiffness: 300
          }}
          whileHover={{ scale: 1.2, rotate: 5 }}
        >
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </motion.svg>
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<{
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  quote: string;
  index: number;
}> = ({ id, name, initials, role, company, quote, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.2,
            ease: "easeOut"
          }
        }
      }}
      whileHover={{
        y: -10,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 400 }
      }}
    >
      <div className="flex items-center mb-4">
        <motion.div
          className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-lg">{initials}</span>
          </div>
        </motion.div>
        <div>
          <motion.h3
            className="font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
          >
            {name}
          </motion.h3>
          <motion.p
            className="text-gray-600 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
          >
            {role} at {company}
          </motion.p>
        </div>
      </div>
      <StarRating />
      <motion.blockquote
        className="text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
      >
        "{quote}"
      </motion.blockquote>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: "testimonial-1",
      name: "Sarah test",
      initials: "ST",
      role: "Founder",
      company: "StyleHub",
      quote: "VideoSnap AI increased our conversion rate by 19% in the first month. The ROI is incredible."
    },
    {
      id: "testimonial-2",
      name: "Marcus Johnson",
      initials: "MJ",
      role: "Marketing Director",
      company: "TechGadgets",
      quote: "We've cut our video production costs by 78% while increasing engagement by 31%."
    },
    {
      id: "testimonial-3",
      name: "Jennifer Lopez",
      initials: "JL",
      role: "E-commerce Manager",
      company: "BeautyEssentials",
      quote: "Our product page bounce rate dropped by 42% after implementing these videos."
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          Loved by E-commerce Leaders
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              id={testimonial.id}
              name={testimonial.name}
              initials={testimonial.initials}
              role={testimonial.role}
              company={testimonial.company}
              quote={testimonial.quote}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
