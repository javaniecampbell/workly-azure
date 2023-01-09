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

// class for work item repository
class WorkItemRepository {
  constructor(){
    
  }
  
}

export default WorkItemRepository