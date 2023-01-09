enum CommitFields {
    CommitId = "XCUG",
    Name = "title",
    Type = "Wzwa",
    Date = "P%5DpB",
    Subject = "%7CirQ",
    Body = "kfq%5D",
    Authors = "_pws",
    Branches = "%5DvEw",
    Message = ""
}

enum AuthorFields {
    AuthorId = "rWHS",
    Name = "title",
    Email = "P%60Rr",
    Commits = "zjYQ",
}

enum RepositoryFields {
    RepositoryId = "%5C~n%60",
    Name = "title",
    Url = "uhHx",
    Tags = "d%5E%5DA",
    Branches = "Zj%3F%7C",
}

enum BranchFields {
    BranchId = "%3FtT%5D",
    Name = "title",
    Path = "%3CYj%7C",
    BranchCreatedOn = "rs%3EY",
    RemovedOn = "C%3CCc",
    Status = "o~Dx",
    Commits = "W%7DKw",
    Repository = "%5D%5Eom",
}

enum WorkItemFields {
    WorkItemId = "ScjJ",
    Name = "title",
    Type = "%7CAn%3A",
    Size = "fR%3Ac",
    Tags = "k%5CJ%60",
    Description = "utFO",
    AcceptanceCriteria = "ZHXM",
    State = "",
    Points = "m%60X%3A",
}

enum WorkItemSystemFields {
    // System fields
    IterationPath = "Zj%3F%7C",
    AssignedTo = "Zj%3F%7C",
    CreatedBy = "Zj%3F%7C",
    CreatedOn = "Zj%3F%7C",
    ChangedBy = "Zj%3F%7C",
    ChangedOn = "Zj%3F%7C",
    ClosedBy = "Zj%3F%7C",
    ClosedOn = "Zj%3F%7C",
    ResolvedBy = "Zj%3F%7C",
    ResolvedOn = "Zj%3F%7C",
    ActivatedBy = "Zj%3F%7C",
    ActivatedOn = "Zj%3F%7C",
    CompletedBy = "Zj%3F%7C",
    CompletedOn = "Zj%3F%7C",
    RemovedBy = "Zj%3F%7C",
    RemovedOn = "Zj%3F%7C",
    Repository = "Zj%3F%7C",
    Branch = "Zj%3F%7C",
    Commit = "Zj%3F%7C",
    Author = "Zj%3F%7C",
    WorkItem = "Zj%3F%7C",
    WorkItemLink = "Zj%3F%7C",
    WorkItemLinkType = "Zj%3F%7C",
}

enum RelationshipFields {
    Authors = "d8944d87-2103-459d-861b-a22e503df2d1",
    Branches = "c53c6873-5c32-4b81-9a43-c8e13ad720d3",
    Commits = "a291821a-8a7a-4f18-b7ba-6c41b89534ec",
    WorkItems = "132e2f18-9e2e-44f5-a048-b5cd94cc0332",
    Repositories = "095bc78e-b24b-4dc6-ba94-edbf40a78f4c"
}

export {
    AuthorFields,
    BranchFields,
    CommitFields,
    WorkItemFields,
    WorkItemSystemFields,
    RepositoryFields,
    RelationshipFields,
};