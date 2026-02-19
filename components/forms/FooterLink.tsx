import Link from "next/link";
import React from "react";

const FooterLink = ({ href, linkText, text }: FooterLinkProps) => {
  return (
    <div className="text-center pt-4">
      <p className="text-sm to-gray-500">
        {text}
        {`  `}
        <Link href={href} className="footer-link">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default FooterLink;
