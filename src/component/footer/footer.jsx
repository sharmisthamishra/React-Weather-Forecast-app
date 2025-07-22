import { FOOTER_TITLE } from "../../constants/constants";

const Footer = () => {
  const thisYear = new Date().getFullYear();
  return <footer className='footer'>{`© ${thisYear} ${FOOTER_TITLE}`}</footer>;
};

export default Footer;
