import Head from "next/head";
import React from "react";

interface MetaInfoProps {
  title?: string;
  keywords?: string;
  description?: string;
}

const MetaInfo = ({ title, keywords, description }: MetaInfoProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />

      <title>{title}</title>
    </Head>
  );
};

MetaInfo.defaultProps = {
  title: "Pane Gallery - View over a thousand images",
  keywords: "pane gallery pixabay images",
  description: "Gallery built with pixabay api",
};

export default MetaInfo;
