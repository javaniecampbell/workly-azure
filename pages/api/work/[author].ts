// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as azdev from "azure-devops-node-api";
import * as workTracking from "azure-devops-node-api/WorkItemTrackingApi";
import * as git from "azure-devops-node-api/GitApi";


type Data = {
    work: Record<any, any>[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { id } = req.query;

    // your collection url
    let orgUrl = "https://dev.azure.com/Digicel-DevOps";

    let token: string = process.env.AZURE_PERSONAL_ACCESS_TOKEN!;

    let authHandler = azdev.getPersonalAccessTokenHandler(token);
    let connection = new azdev.WebApi(orgUrl, authHandler);

    // let workTrackingClient: workTracking.IWorkItemTrackingApi = await connection.getWorkItemTrackingApi();
    let gitClient: git.IGitApi = await connection.getGitApi();
    let repository = await gitClient.getCommits(id as string, { author: "Javanie Campbell" }, "SD_Projects");
    // get all commits for a user
    // const commits = gitClient.getCommits(repository.id!, { includeWorkItems: true })

    // get work items for a users
    // let workItems = await workTrackingClient.getWorkItemsBatch({

    // })
    res.status(200).json({ work: repository })
}
