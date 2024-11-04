import Head from "next/head";


interface MetadataProps {
  title: string;
  description: string
}

export const Metadata = ({title, description}: MetadataProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name={title} content={description} />
    </Head>
  )
};