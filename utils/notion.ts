import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_SECRET,
});


export const listBlocks = async (pageId: string) => {
    const response = await notion.blocks.children.list({
        block_id: pageId,
    });
    return { response, results: response.results };
};

export const getDatabase = async (databaseId: string) => {
    const response = await notion.databases.retrieve({
        database_id: databaseId,
    });
    return response;
}

export default notion;