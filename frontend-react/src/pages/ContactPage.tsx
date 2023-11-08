import Layout from '../components/Layout';

import { HeaderResponsive } from '../components/Header';
import { FooterSimple } from '../components/Footer'
import { ContactUs } from '../components/ContactForm'

export default function ContactPage() {
 
  const links = [
    { label: "Home", link: "" },
    { label: "About", link: "" },
    { label: "Our People", link: "" },
    { label: "Contact", link: "/" },
  ];
  const footerLinks = [
    { label: "Contact", link: "/" },
  ];

  const header = <header><HeaderResponsive links={links} /></header>;
  const content = <main>
    <ContactUs />
    </main>;
  const footer = <footer><FooterSimple footerLinks={footerLinks} /></footer>;

  return <Layout header={header} content={content} footer={footer} />;
}