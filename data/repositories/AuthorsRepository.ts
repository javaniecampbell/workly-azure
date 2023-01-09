import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import notion, { notionPropertiesById } from "../../utils/notion";
import { RelationshipFields, AuthorFields } from "../enums";


type Field = {
    type: AuthorFields;
    value: any;
}

type Author = {
    authorId: string;
    name: string;
    email: string;
    pageId?: string
}
const createAuthorEntry = async (author: Omit<Author, "pageId">) => {
    // const props = properties as CreatePageParameters["properties"];
    const response = await notion.pages.create({
        parent: {
            database_id: RelationshipFields.Authors,
        },
        properties: {
            [AuthorFields.AuthorId]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: author.authorId,
                        },
                    },
                ],

            },
            [AuthorFields.Name]: {
                type: "title",
                title: [
                    {
                        type: "text",
                        text: {
                            content: author.name,
                        },
                    },
                ],
            },
            [AuthorFields.Email]: {
                type: "email",
                email: author.email,
            },
        }
    });
    return response;
}

class AuthorsRepository {
    constructor() {

    }

    public async getAuthors(): Promise<Author[]> {
        const authors: Author[] = [];

        const response = await notion.databases.query({
            database_id: RelationshipFields.Authors,
            filter: {
                property: AuthorFields.AuthorId,
                rich_text: {
                    is_not_empty: true,
                },
            },
        });

        response.results.forEach((item) => {
            const result = item as PageObjectResponse;
            const query = notionPropertiesById(result.properties);
            const resultsByIds = query as any;
            //as unknown as { [index: string]: Partial<Omit<PageObjectResponse["properties"], "id">> };
            // console.dir(result, { depth: Infinity, colors: true });
            console.dir(query, { depth: Infinity, colors: true });
            // const authorId = AuthorFields.AuthorId. toString()
            const author: Author = {
                authorId: resultsByIds[AuthorFields.AuthorId]?.rich_text[0]?.text?.content,
                name: resultsByIds[AuthorFields.Name]?.title[0]?.text?.content,
                email: resultsByIds[AuthorFields.Email]?.email,
                pageId: result.id
            };
            authors.push(author);
        });
        return authors.filter((author) => author.authorId !== undefined);
    }

    public async getAuthorById(authorId: string): Promise<Author> {
        const authors: Author[] = [];
        const response = await notion.databases.query({
            database_id: RelationshipFields.Authors,
            filter: {
                property: AuthorFields.AuthorId,
                rich_text: {
                    contains: authorId,
                },
            },
        });

        response.results.forEach((item) => {
            const result = item as PageObjectResponse;
            const query = notionPropertiesById(result.properties);
            const resultsByIds = query as any;
            //as unknown as { [index: string]: Partial<Omit<PageObjectResponse["properties"], "id">> };
            // console.dir(result, { depth: Infinity, colors: true });
            // console.dir(query[AuthorFields.AuthorId], { depth: Infinity, colors: true });
            // const authorId = AuthorFields.AuthorId.toString()
            const author: Author = {
                authorId: resultsByIds[AuthorFields.AuthorId]?.rich_text[0]?.text?.content,
                name: resultsByIds[AuthorFields.Name]?.title[0]?.text?.content,
                email: resultsByIds[AuthorFields.Email]?.email,
                pageId: result.id
            };
            authors.push(author);
        });
        return authors[0];
    }

    public async createAuthor(author: Author): Promise<boolean> {
        try {
            await createAuthorEntry(author);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }


}

export default AuthorsRepository;