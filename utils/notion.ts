import { Client } from "@notionhq/client";
import { CreatePageParameters, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
    auth: process.env.NOTION_SECRET,
});


export const listBlocks = async (pageId: string) => {
    const response = await notion.blocks.children.list({
        block_id: pageId,
    });
    return { response, results: response.results };
};

// type CreateDatabaseProperties = Pick<CreatePageParameters, "properties">;

type NotionIdProperty = { [index: string]: Omit<PageObjectResponse["properties"], "id"> };



export const notionPropertiesById = (
    properties: PageObjectResponse["properties"]
): Record<string, Omit<PageObjectResponse["properties"], "id">[string]> => {
    return Object.values(properties).reduce((obj, property) => {
        const { id, ...rest } = property;
        return { ...obj, [id]: rest };
    }, {});
}

export const getDatabase = async (databaseId: string) => {
    const response = await notion.databases.retrieve({
        database_id: databaseId,
    });
    return response;
}

export default notion;