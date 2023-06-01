CREATE DATABASE WorklyDev001
GO
USE WorklyDev001
GO

CREATE TABLE WorkItems
(
	WorkItemId VARCHAR(50) NOT NULL PRIMARY KEY
);
GO

CREATE TABLE WorkItemStates
(
  
);
GO

CREATE TABLE Repositories
(

);
GO

CREATE TABLE Branches
(

);
GO

CREATE TABLE Commits
(
	-- https://www.shellhacks.com/git-get-short-hash-sha-1-from-long-hash-head-log/
	CommitId VARCHAR(50) NOT NULL PRIMARY KEY,
	Subject VARCHAR(255) NULL,
	[CommitMessage] VARCHAR(500) NOT NULL,
	Body VARCHAR(MAX) NULL,
	AuthorName VARCHAR(255) NOT NULL,
	AuthorEmail VARCHAR(255) NOT NULL,
	AuthorDate DATETIME2 NOT NULL,
	CommitterName VARCHAR(255) NULL,
	CommitterEmail VARCHAR(255) NULL,
	CommitterDate DATETIME2 NULL
	-- [Hash] VARCHAR(50) NULL,
	-- [Name] VARCHAR(255) NULL,
	-- HashShort VARCHAR(50) NULL,
	-- HashParent VARCHAR(50) NULL,
);
GO

CREATE TABLE Authors
(
	AuthorId VARCHAR(36) NOT NULL PRIMARY KEY
);
GO

CREATE TABLE Teams
(
	TeamId VARCHAR(36) NOT NULL PRIMARY KEY
);
GO

CREATE TABLE Projects
(
	ProjectId VARCHAR(36) NOT NULL PRIMARY KEY

);
GO

CREATE TABLE Members
(
	MemberId VARCHAR(36) NOT NULL PRIMARY KEY

);
GO


 