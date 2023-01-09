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
    message: string;
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

    // get all commits

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