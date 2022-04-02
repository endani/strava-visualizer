import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SkeletonCard = styled(motion.div)`
  width: 100%;
  display: flex;
  height: 150px;
  opacity: 1;
  opacity: 0.5;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  &:first-of-type {
    margin-top: 0;
  }
`;

const Stack = styled(motion.div)`
  width: 100%;
`;

const StackVariants = {
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.3 },
  },
  hide: { opacity: 0.5 },
};

const SkeletonVariants = {
  show: { opacity: 1 },
  hide: { opacity: 0.5 },
};

function Skeleton(props) {
  return (
    <>
      <Stack animate="show" variants={StackVariants}>
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.1 }}
        />
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.2 }}
        />
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.3 }}
        />
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.4 }}
        />
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.5 }}
        />
      </Stack>
      <Stack animate="show" variants={StackVariants}>
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.1 }}
        />
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.2 }}
        />
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.3 }}
        />
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.4 }}
        />
        <SkeletonCard
          variants={SkeletonVariants}
          className="flex-col flex"
          animate="show"
          transition={{ duration: 0.6, yoyo: Infinity, delay: 0.5 }}
        />
      </Stack>
    </>
  );
}

export default Skeleton;
