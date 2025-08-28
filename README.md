# POC - 10
<img width="721" height="265" alt="image" src="https://github.com/user-attachments/assets/ec0e81b2-71a7-4470-a640-6b4afbe8d974" />


## 🛠️ Tools Installed

### 1. Git
Used for version control and pulling code from GitHub.
```bash
sudo apt update
sudo apt install git -y
```

### 2. Java 17
Required for running Jenkins.
```bash
sudo apt install openjdk-17-jdk -y
```

### 3. Jenkins
Automates build and deployment processes.
```bash
# Add Jenkins key securely
curl -fsSL https://pkg.origin.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Add Jenkins repository
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.origin.jenkins.io/debian-stable/ binary/ | \
  sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update and install Jenkins
sudo apt update
sudo apt install jenkins -y

# Start and enable Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### 4. Docker
Used to build and run containerized applications.
```bash
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker jenkins
```

### 5. SonarQube (via Docker)
Used for static code analysis and quality checks.
```bash
# Pull the SonarQube image
sudo docker pull sonarqube

# Run SonarQube container
sudo docker run -d --name sonarqube -p 9000:9000 sonarqube
```

Access SonarQube at:
```
http://<your-ec2-public-ip>:9000
```

Default credentials:
- Username: `admin`
- Password: `admin`

 Application Deployment (Tomcat on Port 8000)
Your Dockerfile uses the official Tomcat image:




Dockerfile
```bash
FROM tomcat:9.0-jdk11
COPY src/main/webapp/ /usr/local/tomcat/webapps/ROOT/
```
To avoid conflict with Jenkins (port 8080), run the container like this:



```bash
docker run -d --name myapp -p 8000:8080 tomcat:9.0-jdk11
```
Access your application at:
```bash
http://<your-ec2-public-ip>:8000
```



##  Adding Docker Hub Credentials in Jenkins

To securely push Docker images to Docker Hub from Jenkins, follow these steps to add your Docker Hub credentials:

### Step 1: Open Jenkins Credentials Manager
- Go to your Jenkins Dashboard.
- Navigate to:  
  `Manage Jenkins` → `Manage Credentials` → `(global)` → `Add Credentials`.

### Step 2: Add Docker Hub Credentials
- **Kind**: Username and password
- **Username**: Your Docker Hub username (e.g., `devenops641`)
- **Password**: Your Docker Hub password
- **ID**: `docker-hub-creds` (this is used in the Jenkinsfile)
- **Description**: (Optional) e.g., "Docker Hub login for pushing images"

### Step 3: Use Credentials in Jenkinsfile
Make sure your Jenkinsfile uses the credentials like this:
```groovy
withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
    sh '''
        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
        docker push $IMAGE_NAME
    '''
}
```

This ensures your Docker Hub credentials are stored securely and not exposed in your code.

