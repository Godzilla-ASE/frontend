#  Godzila Social Comunity Website 
## Introduction
This is the frontend part of Godzila Social Comunity Website in course ASE II. It is build with react framework as well as S3 server in AWS by 3 group members. It contains all the pages, components within the presentation. It also handle and reply to all the user interaction on website.

## Features
The project inlcludes but not limited to the following features:
- Listen to, handle and reply users interaction.
- Communicate with micro-servers through API interfaces.
- Communicate with S3 AWS server, store user's uploaded images.
- User can take actions related to account like login, register, setting profile, etc.
- User can take actions related post like view posts, create post, interact with a post, etc.
- You can see more features in detail in Usage part.

## Installation
### Environment requirement
Node.js V16.0
docker compose up

### Install and test without back-end server
step1. You can directly clone this repo from 'main' branch.
step2. cd into project root directory in your terminal. (Like cd /Users/username/frontend)
step3. Execute 'npm i', then execute 'npm run start' .
If you start without docker environment, your experience would be very limited. However, you can still see the UI and website framwork.

## Usage
If you sucessfully run the project within docker, then just see it as a normal pictures community.
You can creat new account, login a exsiting account, modify your profile and logout in account center. 
You can view posts, filter post by tags or location, interacte with a post, create post in homepage.
You can view post detial by clicking the title of a post. Then you can comment on post, reply on comment, follow author, delete post, etc.

## Development
We follow a branch policy. Developers should always develop features in their branch.
Before you start your work, please make sure your code version is the newest from main branch. You can either merge main branch into your exsiting branch by pull request, or clone main branch and creacte a new branch in your local device.
Don't forget to excute 'npm i' after a new clone or pull.
After you finish your work, please make sure your code is pushed to your branch on github. Then merge your branch into main branch by pull request. In case there is any conflict while merging, discuss it with the contributors of conflict files.

API referrence: you can find API file in Repo/submission.
Please put your new file in proper folder:
- Components: Maintain a consistent design and functionality across the application.
- Context: Efficiently update client state across components to avoid "props drilling" issues.
- Services: API endpoints and communication with the backend for easy maintenance.
- Hooks: Reusable stateful logic for improved reusability and maintenance between components.
- Views: Organized into subfolders containing relevant components as the primary user interface.

## Testing
We use sonarqube to conduct quality check before every commit and push. 
 
## Contributing
To participate in the project, you can push your branch to the repo, and let us see what you did or what you advise in your readme.md.
