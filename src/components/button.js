import styled from 'styled-components';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

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

const Button = (props) => (
  <StyledButton className="mb-5">
    <p className=" items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-900 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 mb-10">
      {props.label}
    </p>
  </StyledButton>
);

Button.propTypes = {
  label: PropTypes.string,
};
export default Button;
