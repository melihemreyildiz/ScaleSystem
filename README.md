# Traffic Management

Welcome to the Traffic Management repository! This README file provides essential information to get you started with the project and explains how to scale the backend instances for better performance.

## Getting Started

To start the project, follow these steps:

1. Open your terminal.

2. Navigate to the root directory of this project.

3. Run the following command to build and launch the project's containers:

   ```bash
   docker-compose up --build
This command will set up all the required containers and services for the project.

Scaling the Backend

If you find the need to increase the number of backend instances to improve performance, follow these steps:

1) In your terminal, navigate to the project's root directory.

2) Run the following command to scale up the backend containers to the desired number of instances (for example, 3 instances):
    ```bash
    docker-compose up -d --scale backend=3

3) Open the nginx configuration file named nginx.conf (or similar). Locate the section related to load balancing or upstream servers.
4) Uncomment the relevant lines in the nginx configuration to configure load balancing for the additional backend instances.
5) Save the changes to the nginx configuration file.
6) Restart the nginx container to apply the configuration changes:
        
    ```bash
        docker-compose restart nginx

The load balancing settings will now distribute incoming traffic among the backend instances, optimizing performance.

Feel free to adjust the number of backend instances and the configuration as needed based on your project's requirements.

Deploy using Ansible

7) Run the Ansible playbook to deploy your Django app
   
   ```bash 
      ansible-playbook -i inventories/production.ini playbooks/deploy.yml

This playbook will copy your Django app files to the target server, install Docker if not present, build a Docker image using the provided Dockerfile, and then run a Docker container with your Django app.

Remember to replace placeholders like /path/to/your/local/app with the actual paths and configurations suitable for your environment. Also, ensure that your Dockerfile and other necessary files are located in the specified directories.

Make sure you have proper SSH access to the target server and adjust your SSH configuration accordingly.


For more detailed information on Docker, nginx, or specific configuration options, refer to their official documentation.

Contact If you have questions, concerns, or feedback, please don't hesitate to contact with me by melihy4@gmail.com.
