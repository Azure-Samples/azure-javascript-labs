# Deploying a Node.js Web App using GitHub Actions

## Overview


## 1. Launch Visual Studio Online

Browse to the [Visual Studio Online](https://online.visualstudio.com/environments). If you're prompted to sign in, contact a proctor to get you signed in.

## 2. Create a plan

A VS Online plan is required to create VS Online environments. In this lab a VS Online plan has been created for you.

## 3. Create an Environment

To create a new cloud-hosted environment in VS Online select the **Create environment** button in the VS Online management portal.

![Create environment in Visual Studio Code](./create-env-vso-01.png)

Complete the form with the following values:

- **Environment Name**: My Quick Environment
- **Git Repository**: microsoft/vsonline-quickstart
- **Put environment to sleep after...**: 30 minutes
- **Instance Type**: Standard Environment (Linux)

![Create environment in Visual Studio Code](./create-quickstart-vso-02.png)

A card with the name **My Quick Environment** will appear in the management portal with a status badge of **Creating**.

## 4. Connect To and Use the Environment

Once the green **Available** status badge appears on the environment card, click **My Quick Environment** to connect.

Once connected, open **Readme.md** from **File Explorer**, and then press [`ctrl`]+[`shift`]+[`V`] to render the markdown file.

Follow the instructions in **Readme.md** to complete the lab.
