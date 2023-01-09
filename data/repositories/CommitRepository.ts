// import notion client
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import notion, { notionPropertiesById } from "../../utils/notion";
import { CommitFields, RelationshipFields } from "../enums";


// data type for a commit
type Commit = {
    commitId: string;
    name: string;
    type: string;
    date: string;
    subject: string;
    body: string;
    message?: string;
    pageId?: string;
}

// create a commit entry
const createCommitEntry = async (commit: Omit<Commit, "pageId">) => {
    const response = await notion.pages.create({
        parent: {
            database_id: RelationshipFields.Commits,
        },
        properties: {
            [CommitFields.CommitId]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: commit.commitId,
                        },
                    },
                ],
            },
            [CommitFields.Name]: {
                type: "title",
                title: [
                    {
                        type: "text",
                        text: {
                            content: commit.name,
                        },
                    },
                ],
            },
            [CommitFields.Type]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: commit.type,
                        },
                    },
                ],
            },
            [CommitFields.Date]: {
                type: "date",
                date: {
                    start: commit.date,
                },
            },
            [CommitFields.Subject]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: commit.subject,
                        },
                    },
                ],
            },
            [CommitFields.Body]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: commit.body,
                        },
                    },
                ],
            },
            // [CommitFields.Message]: {
            //     type: "rich_text",
            //     rich_text: [
            //         {
            //             type: "text",
            //             text: {
            //                 content: commit.message,
            //             },
            //         },
            //     ],
            // },
        },
    });

    return response;
}


// class for commit repository
class CommitRepository {
    constructor() {

    }

    // get a commit by id
    public async getCommitById(commitId: string): Promise<Commit> {
        const response = await notion.databases.query({
            database_id: RelationshipFields.Commits,
            filter: {
                property: CommitFields.CommitId,
                rich_text: {
                    contains: commitId,
                },
            },
        });
        const page = response.results[0] as PageObjectResponse;
        const commits = notionPropertiesById(page.properties) as any;

        return {
            commitId: commits[CommitFields.CommitId]?.rich_text[0]?.text?.content,
            name: commits[CommitFields.Name]?.title[0]?.text?.content,
            type: commits[CommitFields.Type]?.select?.id,
            date: commits[CommitFields.Date]?.date?.start,
            subject: commits[CommitFields.Subject]?.rich_text[0]?.text?.content,
            body: commits[CommitFields.Body]?.rich_text[0]?.text?.content,
            //message: commits[CommitFields.Message]?.rich_text[0]?.text?.content,
            pageId: page.id,
        };
    }

    // get all commits
    public async getAllCommits(): Promise<Commit[]> {
        const response = await notion.databases.query({
            database_id: RelationshipFields.Commits,
            filter: {
                property: CommitFields.CommitId,
                rich_text: {
                    is_not_empty: true,
                },
            },
        });
        const pages = response.results as PageObjectResponse[];
        const commits = pages.map((page) => {
            const commit = notionPropertiesById(page.properties) as any;
            return {
                commitId: commit[CommitFields.CommitId]?.rich_text[0]?.text?.content,
                name: commit[CommitFields.Name]?.title[0]?.text?.content,
                type: commit[CommitFields.Type]?.select?.id,
                date: commit[CommitFields.Date]?.date?.start,
                subject: commit[CommitFields.Subject]?.rich_text[0]?.text?.content,
                body: commit[CommitFields.Body]?.rich_text[0]?.text?.content,
                //message: commit[CommitFields.Message]?.rich_text[0]?.text?.content,
                pageId: page.id,
            };
        });

        return commits;
    }

            

    // get commits by branch id

    // get commits by repository id

    // get commits by user id

    // create a commit
    public async createCommit(commit: Omit<Commit, "pageId">) {
        try {
            await createCommitEntry(commit);
            return true;
        } catch (err) {
            console.log(err);
            return false;

        }
    }

}

export default CommitRepository