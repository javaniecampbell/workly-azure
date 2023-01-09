import notion from "../../utils/notion";
import { BranchFields, RelationshipFields } from "../enums";

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
};

class BranchRepository {
    constructor() {

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

export default BranchRepository