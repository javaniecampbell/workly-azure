import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  GetDatabaseResponse,
  PartialDatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import notion, { getDatabase, listBlocks } from "../../utils/notion";

interface StaticPageProps {
  title: string;
  properties: PartialDatabaseObjectResponse["properties"];
}

interface StaticPathParams extends ParsedUrlQuery {
  id: string;
}

function Resources({
  title,
  properties,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>Resources: {title}</h1>

      <pre>{JSON.stringify(properties, null, 2)}</pre>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const paths: any[] = [];
  const { results } = await listBlocks(process.env.NOTION_PAGE_ID!);

  results.forEach((result) => {
    const block = result as BlockObjectResponse;
    if (block.type === "child_database") {
      paths.push({
        params: {
          id: block.id,
        },
      });
    }
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  StaticPageProps,
  StaticPathParams
> = async (context) => {
  const { id } = context.params as StaticPathParams;
  const response = await getDatabase(id);
  console.log(response);
  const database = response as DatabaseObjectResponse;
  return {
    props: {
      title: database.title[0].plain_text || "Untitled",
      properties: database.properties,
    },
  };
};

export default Resources;
