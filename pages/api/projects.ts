// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as azdev from "azure-devops-node-api";
import * as core from "azure-devops-node-api/CoreApi";


type Data = {
  projects: Record<any, any>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // your collection url
  let orgUrl = "https://dev.azure.com/Digicel-DevOps";

  let token: string = process.env.AZURE_PERSONAL_ACCESS_TOKEN!;

  let authHandler = azdev.getPersonalAccessTokenHandler(token);
  let connection = new azdev.WebApi(orgUrl, authHandler);
  let coreClient: core.ICoreApi = await connection.getCoreApi();

  // Get projects
  let projects = await coreClient.getProjects();

  // const projectsResponse = await Promise.all(
  // projects.map(async project => {

  let project = await coreClient.getProject("SD_Projects");

  // get all team members
  let teams = await coreClient.getTeams(project.id!);
  const dictionary = await Promise.all(teams.map(async team => {

    let teamMembers = await coreClient.getTeamMembersWithExtendedProperties(project.id!, team.id!);

    let teamMap = { id: team.id, name: team.name, url: team.url };

    let teamMembersMap = teamMembers.map(teamMember => { return { id: teamMember.identity?.id, name: teamMember.identity?.displayName, avatar: teamMember.identity?._links?.avatar?.href, isActive: teamMember.identity?.inactive, email: teamMember.identity?.uniqueName } });

    return { team: teamMap, members: teamMembersMap }
  }));


  // }
  // ).flatMap(x => x));

  const projectsResponse = { id: project.id, name: project.name, url: project.url, teams: dictionary };
  //
  res.status(200).json({ projects: projectsResponse })
}
