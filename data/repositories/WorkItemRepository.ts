// import notion client
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import notion, { notionPropertiesById } from "../../utils/notion";
import { WorkItemFields, RelationshipFields } from "../enums";

// data type for a work item
type WorkItem = {
    workItemId: string;
    name: string;
    type: string;
    size: string;
    tags: string;
    description: string;
    acceptanceCriteria: string;
    state: string;
    points: string;
    pageId?: string;
};

// create a work item entry
const createWorkItemEntry = async (workItem: Omit<WorkItem, "pageId">) => {
    const response = await notion.pages.create({
        parent: {
            database_id: RelationshipFields.WorkItems,
        },
        properties: {
            [WorkItemFields.WorkItemId]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: workItem.workItemId,
                        },
                    },
                ],
            },
            [WorkItemFields.Name]: {
                type: "title",
                title: [
                    {
                        type: "text",
                        text: {
                            content: workItem.name,
                        },
                    },
                ],
            },
            [WorkItemFields.Type]: {
                type: "select",
                select: {
                    id: workItem.type,
                }
            },
            [WorkItemFields.Size]: {
                type: "select",
                select: {
                    id: workItem.size,
                }
            },
            [WorkItemFields.Tags]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: workItem.tags,
                        },
                    },
                ],
            },
            [WorkItemFields.Description]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: workItem.description,
                        },
                    },
                ],
            },
            [WorkItemFields.AcceptanceCriteria]: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: workItem.acceptanceCriteria,
                        },
                    },
                ],
            },
            // [WorkItemFields.State]: {
            //     type: "rich_text",
            //     rich_text: [
            //         {
            //             type: "text",
            //             text: {
            //                 content: workItem.state,
            //             },
            //         },
            //     ],
            // }
        },
    });
    return response;
};

// class for work item repository
class WorkItemRepository {
    constructor() {

    }

    // get all work items
    async getAllWorkItems(): Promise<WorkItem[]> {
        const response = await notion.databases.query({
            database_id: RelationshipFields.WorkItems,
        });
        const workItems: WorkItem[] = response.results.map((page) => {
            const currentWorkItem = notionPropertiesById((page as PageObjectResponse).properties) as any;
            const workItem: WorkItem = {
                workItemId: currentWorkItem[WorkItemFields.WorkItemId]?.rich_text[0]?.plain_text,
                name: currentWorkItem[WorkItemFields.Name]?.title[0]?.plain_text,
                type: currentWorkItem[WorkItemFields.Type]?.select?.id,
                size: currentWorkItem[WorkItemFields.Size]?.select?.id,
                tags: currentWorkItem[WorkItemFields.Tags]?.rich_text[0]?.plain_text,
                description: currentWorkItem[WorkItemFields.Description]?.rich_text[0]?.plain_text,
                acceptanceCriteria: currentWorkItem[WorkItemFields.AcceptanceCriteria]?.rich_text[0]?.plain_text,
                state: currentWorkItem[WorkItemFields.State]?.rich_text[0]?.plain_text,
                points: currentWorkItem[WorkItemFields.Points]?.rich_text[0]?.plain_text,
                pageId: page.id,
            };
            return workItem;
        });
        return workItems;
    }

    // create a work item return true if successful, false otherwise
    async createWorkItem(workItem: Omit<WorkItem, "pageId">): Promise<boolean> {
        try {
            await createWorkItemEntry(workItem);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    

}

export default WorkItemRepository