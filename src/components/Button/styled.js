import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.div)`
  padding: 10 20;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-block;
  p {
    margin: 0;
  }
`;

export { StyledButton };
