import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import notion, { notionPropertiesById } from "../../utils/notion";
import { BranchFields, RelationshipFields } from "../enums";

// data type for a branch
type Branch = {
    branchId: string;
    name: string;
    path: string;
    branchCreatedOn: string;
    removedOn: string;
    status: string;
    pageId?: string;
    // commits: string;
    // repository: string;
}

// create a branch entry
const createBranchEntry = async (branch: Omit<Branch, "pageId">) => {
    const response = await notion.pages.create({
        parent: {
            database_id: RelationshipFields.Branches,
        },
        properties: {
            [BranchFields.BranchId]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: branch.branchId,
                        },
                    },
                ],
            },
            [BranchFields.Name]: {
                type: "title",
                title: [
                    {
                        type: "text",
                        text: {
                            content: branch.name,
                        },
                    },
                ],
            },
            [BranchFields.Path]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: branch.path,
                        },
                    },
                ],
            },
            [BranchFields.BranchCreatedOn]: {
                type: "date",
                date: {
                    start: branch.branchCreatedOn,
                }
            },
            [BranchFields.RemovedOn]: {
                type: "date",
                date: {
                    start: branch.removedOn,
                }
            },
            [BranchFields.Status]: {
                type: "status",
                status: {
                    id: branch.status,
                }
            },
        }
    });
    return response;
};

// class for branch repository
class BranchRepository {
    constructor() {

    }



    // Get all branches
    public async getAllBranches(): Promise<Branch[]> {
        const response = await notion.databases.query({
            database_id: RelationshipFields.Branches,
            filter: {
                property: BranchFields.BranchId,
                rich_text: {
                    is_not_empty: true,
                },
            },
                
        });
        const branches = response.results.map((page) => {
            const branch = notionPropertiesById((page as PageObjectResponse).properties) as any;
            return {
                branchId: branch[BranchFields.BranchId]?.rich_text[0]?.text?.content,
                name: branch[BranchFields.Name]?.title[0]?.text?.content,
                path: branch[BranchFields.Path]?.rich_text[0]?.text?.content,
                branchCreatedOn: branch[BranchFields.BranchCreatedOn]?.date?.start,
                removedOn: branch[BranchFields.RemovedOn]?.date?.start,
                status: branch[BranchFields.Status]?.status?.id,
                pageId: page.id,
            };
        });
        return branches;
    }

    // Get a branch by its id
    public async getBranchById(branchId: string): Promise<Branch> {
        const response = await notion.databases.query({
            database_id: RelationshipFields.Branches,
            filter: {
                property: BranchFields.BranchId,
                rich_text: {
                    contains: branchId,
                },
            },
        });
        const branch = notionPropertiesById((response.results[0] as PageObjectResponse).properties) as any;
        return {
            branchId: branch[BranchFields.BranchId]?.rich_text[0]?.text?.content,
            name: branch[BranchFields.Name]?.title[0]?.text?.content,
            path: branch[BranchFields.Path]?.rich_text[0]?.text?.content,
            branchCreatedOn: branch[BranchFields.BranchCreatedOn]?.date?.start,
            removedOn: branch[BranchFields.RemovedOn]?.date?.start,
            status: branch[BranchFields.Status]?.status?.id,
            pageId: response.results[0]?.id,
        };
    }

    public async createBranch(branch: Branch): Promise<boolean> {
        try {
            await createBranchEntry(branch);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

// export the branch repository
export default BranchRepository