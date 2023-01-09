// import notion client
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