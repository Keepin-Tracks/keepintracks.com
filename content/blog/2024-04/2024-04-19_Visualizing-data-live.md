---
title: Visualizing data live
image: '/images/francislah.png'
---
Since business intelligence is becoming more and more critical in businesses today. We are going to implement a structure to easily track and visualize our data right from the start.

To do so, we are going to use the open source tool Streamlit, which will enable us to deploy an app connected to our google sheets data previously entered from the Appsheet app. So much technology, with so few hassle!

## Enabling connections to the private Google Sheets
To do so, we are going to follow the documentation of Streamlit which is straightforward. [Documentation](https://docs.streamlit.io/develop/tutorials/databases/private-gsheet)

## Set up the development environment
Here I followed the Streamlit documentation once again : [Documentation](https://docs.streamlit.io/get-started/installation/command-line)

## Deploy to the Streamlit Community Cloud
In order to make our app accessible to the public, we need a deployment to the web, outside our local machine.

Here again we will follow the [Streamlit Documentation](https://docs.streamlit.io/deploy/streamlit-community-cloud/get-started/quickstart)

By connecting to our Github account, Streamlit will retrieve latest code and deploy the app automatically with every new release or push to the main branch.

When connecting to the Github repo where we pushed the Streamlit app code, we need to press "Advanced settings" and then add the content of the local secrets.toml file in the box.

## App might break... Add depedencies
Now our app is live at : [https://keepintracks-accounting.streamlit.app/](https://keepintracks-accounting.streamlit.app/)
Live but broken for now. That is because we used a depedency for Google Sheets that Stremlit doesn't know about. It was installed locally, but now the cloud doesn't know the project needs it...

By adding a requirements.txt file with all python packages depedencies we need in order for the project to run properly, the app will now build without problems in the Cloud Community deployment.