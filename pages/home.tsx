import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Client } from "@notionhq/client";
import type {
  ListBlockChildrenResponse,
  BlockObjectResponse,
  ChildDatabaseBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";

interface StaticPageProps {
  title: string;
  data?: ListBlockChildrenResponse | null;
  databases: Database[] | null;
}

type Database = {
  id: string;
  database: {
    title: string;
  };
};

function Home({
  title,
  databases,
  ...rest
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>{title}</h1>

      {databases?.map((item) => (
        <p key={item.id}>
          <Link href={`/resources/${item.id}`}>
            {item.database.title}
          </Link>
        </p>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<StaticPageProps> = async (_context) => {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const data = await notion.blocks.children.list({
    block_id: process.env.NOTION_PAGE_ID!,
  });

  const databases = data.results
    .map((result) => {
      const block = result as BlockObjectResponse;
      if (block.type === "child_database") {
        // const databaseBlock = block as ChildDatabaseBlockObjectResponse;
        return {
          id: block.id,
          database: {
            title: block?.child_database?.title,
          },
        };
      }
    })
    .filter((item): item is Database => !!item);
  // .filter(Boolean);

  console.log(databases);
  return {
    props: {
      title: "Home",
      data: null,
      databases,
    },
  };
};

export default Home;
