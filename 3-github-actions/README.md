# Deploying a Node.js Web App using GitHub Actions

## Overview

**GitHub Actions** gives you the flexibility to build an automated software development lifecycle workflow. You can write individual tasks ("Actions") and combine them to create a custom workflow. Workflows are configurable automated processes that you can set up in your repository to build, test, package, release, or deploy any project on GitHub.

With **GitHub Actions** you can build end-to-end continuous integration (CI) and continuous deployment (CD) capabilities directly in your repository.

### What’s covered in this lab

In this lab, you will:

1. Create a web app on Azure using the App Service extension
1. Create a workflow with GitHub Actions to add CI/CD to your app

### Prerequisites

1. Your Windows machine should have Node.js LTS, Docker, and Visual Studio Code

1. You are using a GitHub account and an Azure account made for the purposes of this lab. These have been already logged into from your machine and the account info is saved.

### Setting up the GitHub repo

1. Click the "Fork" button in the upper-right hand corner of this repository. From there, click the green "Clone" button and copy the URL.

   ![](assets/images/fork-github.png)

1) Open up the Terminal and run the following command, pasting in the link you just copied.

   ```cmd
   git clone <pasted URL>
   ```

1) Open the repo in Visual Studio Code.

   ```
   cd azure-javascript-labs/3-github-actions

   code .
   ```

## Create an Azure App Service web app

Now that the app is cloned locally, create the App Service web app that you'l deploy to from GitHub.

1. Click on the Azure icon in the sidebar.

   ![](assets/images/azure-sidebar.png)

1) Click on the `+` icon to create a new app service under the **VSCode GitHub Universe HOL** subscription.

   ![](assets/images/create-app-service.png)

1. Give your webapp a unique name (we recommend calling it **YOUR_NAME-jsinteractive** )

1. Select **Linux** as your OS and **Node.js LTS** as your runtime.

1. It will take a minute or two to create the app. Once it's done, you'll get a prompt to browse to your new site. Click on "View output" and open the link to your site.

   > Note: If creation of the app is taking a bit longer than you expect, call one of the proctors and we'll switch you to an already created app

1. The page you browse to will be the default site you see, since you haven't yet deployed anything to the site.

   ![](assets/images/python-default-site.png)

## Set up CI/CD with GitHub Actions

Use GitHub actions to automate the deployment workflow for this web app.

1. Inside the App Service extension, right click on the name of your app service and choose "Open in Portal".

   ![](assets/images/open-in-portal.png)

1. From the Overview page, click on "Get publish profile". A publish profile is a kind of deployment credential, useful when you don't own the Azure subscription.

   ![](assets/images/get-publish-profile.png)

1. Open the settings file you just downloaded in VS Code and copy the contents of the file.

1. Add the publish profile as a secret associated with this repo. On the GitHub repository, click on the "Settings" tab.

   ![](assets/images/github-settings.png)

1) Go to "Secrets". Create a new secret and call it "AZURE_WEBAPP_PUBLISH_PROFILE". Paste the contents from the settings file.

   ![](assets/images/create-secret.png)

1. Find the **Deploy Node.js to Azure Web App** template and select "Set up this workflow".

   ![](assets/images/new-action.png)

1. Update the `env` object, set `AZURE_WEBAPP_NAME` to the name of your app.


    ```yml
    env:
        AZURE_WEBAPP_NAME: YOUR_NAME-jsinteractive
    ```

    ![](assets/images/add-yaml-file.png)

1. Once you're done, click on "Start commit". Fill in the text box with a commit message, and then click the "Commit change" button, which will trigger the workflow.

1. While the Action is being queued, let's get into the details of what this workflow is actually doing. Go to the `.github/workflows/azure.yml` file to follow along.

   - **Workflow Triggers (line 11)**: Your workflow is set up to run on "push" events to the branch

   ```yaml
   on:
     push:
       branches:
         - master
   ```

   For more information, see [Events that trigger workflows](https://help.github.com/articles/events-that-trigger-workflows).

   - **Running your jobs on hosted runners (line 21):** GitHub Actions provides hosted runners for Linux, Windows, and macOS. We specify the hosted runner in our workflow as below.

   ```yaml
   jobs:
     build-and-deploy:
       name: Build and Deploy
       runs-on: ubuntu-latest
   ```

   - **Using an action (line 26)**: Actions are reusable units of code that can be built and distributed by anyone on GitHub. To use an action, you must specify the repository that contains the action. We are also specifying the version of Node.js.

   ```yaml
   - uses: actions/checkout@master
       - name: Use Node.js ${{ env.NODE_VERSION }}
         uses: actions/setup-node@v1
         with:
           node-version: ${{ env.NODE_VERSION }}
   ```

   - **Running a command (line 31)**: You can run commands on the job's virtual machine. This action is running the npm commands below to install the dependencies, build the application, and run the tests.

     ```yaml

     ```

   - name: npm install, build, and test
     run: |
     # Build and test the project, then
     # deploy to Azure Web App.
     npm install
     npm run build --if-present
     npm run test --if-present

   ```

   > For workflow syntax for GitHub Actions see [here](https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions)

   ```

1. You can go back to the Actions tab, click on your workflow, and see that the workflow is queued or being deployed. Wait for the job to complete successfully before going back to your website.

   ![](assets/images/workflow-complete.png)

## Test out your app!

1. Back in VS Code, go to the App Service extension, and right click on your app service and click on "Browse Website".

1. Next, test the GitHub Actions workflow you just made. Add the following lines of code to `views/index.hbs` on line 11

   ```html
   <div>
       <h1 style="text-align:center;"> Press the button!<h1>
   </div>
   ```

   ![](assets/images/add-html-code.png)

1) In the terminal, run the following commands:

   ```cmd
   git pull
   git add .
   git commit -m "test ci/cd"
   git push
   ```

1) Go back to the Actions tab and you can watch the build finishing up. Once you see all the green check marks, go to Edge and reload your website!
