# Highlights of this project:
- Linear Regression and Random Forest Regression algorithms are used to train on Boston Housing dataset, to accurately estimate the price of the house given the input features.
- The front-end is developed in React that includes a single page with a form to submit the input values.
- The back-end is developed in Flask, that exposes prediction endpoints to predict using a trained model and send the result back to the front-end for easy consumption.
- RESTful API in Flask is used to communicate between the React web UI and MongoDB; database used for persistent storage of data.
- Additionally, the trained model is deployed to azure cloud for global access.

# Step-by-step instructions:
- **Clone the repository** 
	- Run the command: **git clone https://github.com/Gunjan1917/ML_cloud.git**
  
- **Connect to MongoDB**
	- Create an account or login to **https://www.mongodb.com/cloud/atlas**
	- After logging in, click the green button to create a new project and then the green button to build a new cluster.
	- To configure the new cluster, choose a cloud provider, the zone or region where the data has to be stored in. Note that some of the regions offer a Free Tier which is  great for a sandbox environment.
	- After the cluster is created, configure the security. The two things that are required to setup from a security standpoint are IP Whitelist addresses and a database user. For the IP Whitelist, just add the current IP address.
	- Create a MongoDB User by adding a username and password. 
	- Configure the username, password and dbname to the following line in app.py:
		**</br> MongoClient('mongodb+srv://username:password@cluster0.pnrjd.mongodb.net/dbname?retryWrites=true&w=majority')**
	- Connect to the created database via the application connection string.
    
- **Prepare the React UI**:
	- Open a new terminal, go inside the ui folder using **cd ui**. Use the node version 10.4.1 on the computer.
	- Once inside the folder, run the command **yarn install** to install all dependencies. 
	- Use the following commands:
		- **npm install -g serve**
		- **npm run build**
		- **serve -s build -l 3000**
	- Go to localhost:3000 to see that the UI is up and running.

- **Prepare the Flask service**:
	- On the second terminal, move inside the service folder using **cd service**. 
	- Create a virtual environment using virtualenv and Python. Install all the required dependencies using pip after activating the environment. 
	- Finally, run the Flask app. Use the following commands:
		- **pip install virtualenv**
    - **virtualenv myenv**
		- cd **myenv\Scripts\activate**
		- **pip install -r requirements.txt**
		- **python app.py** 
		- **flask run**
	- This will start up the service on 127.0.0.1:5000.
	
- **Deploy model to azure cloud**:
  - Create a workspace by logging into portal.azure.com or the workspace can be created using Azure CLI.
  - Choose **App Services** from the menu.
  - Click on **Add**. Fill the details in the relevant details.
  - Create a new **Resource Group** and enter **Name** in the Instance Details. 
  - Click on **Review+Create**.
  - Go to resource and click on **Deployment Center** in the left pane.
  - Link Github repository to Azure for model deployment.
  - Click on **App Service build service** and continue.
  - In the code section, the **Organization** will automatically update after connecting to GitHub. Select the required **Repository** and continue.
  - Click on **Finish**.
  - After completion, you will see the status as **Success**. Click on **Overview** in the left pane. The result is a web URL created with the Azure domain.
  
  ![alt text](https://github.com/Gunjan1917/ML_cloud/blob/main/azure_deploy_succcess.PNG)
  ![alt text](https://github.com/Gunjan1917/ML_cloud/blob/main/azure_deployment.PNG)


  
 
    
  
  
