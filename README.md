

# POC - 10

<img width="721" height="265" alt="image" src="https://github.com/user-attachments/assets/ec0e81b2-71a7-4470-a640-6b4afbe8d974" />  

##  Project Description

**POC-10** is a demonstration of a complete **CI/CD pipeline** for deploying a simple static **HTML web application** using DevOps tools.

The project showcases:

* **Source Code Management** with Git & GitHub
* **Continuous Integration** with Jenkins
* **Static Code Analysis** using SonarQube
* **Containerization** with Docker
* **Image Management** via Docker Hub
* **Deployment** using an **Nginx container** (exposed on port `8000`)

This POC helps understand how different DevOps tools integrate to automate the software delivery lifecycle from code commit, build, testing, quality checks, image creation, pushing to registry, and finally deployment on a containerized environment.


##  Tools Installed

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

* Username: `admin`
* Password: `admin`

## 🔍 SonarQube Scanner Installation for Jenkins

To enable **static code analysis** in your Jenkins pipeline using **SonarQube**, follow these steps to install and configure the SonarQube Scanner CLI:

### 📦 Step 1: Install SonarQube Scanner on Jenkins Server

```bash
# Download the latest SonarQube Scanner
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip

# Install unzip if not already installed
sudo apt install unzip -y

# Unzip and move to /opt directory
unzip sonar-scanner-cli-5.0.1.3006-linux.zip
sudo mv sonar-scanner-5.0.1.3006-linux /opt/sonar-scanner

# Add Sonar Scanner to system PATH
echo 'export PATH=$PATH:/opt/sonar-scanner/bin' >> ~/.bashrc
source ~/.bashrc
```

### ✅ Step 2: Verify Installation

```bash
sonar-scanner --version
```

Expected output:
```
SonarScanner 5.0.1.3006
Java 17.x (Eclipse Adoptium or compatible)
```

### ⚙️ Step 3: Configure in Jenkins

1. Go to **Jenkins Dashboard → Manage Jenkins → Global Tool Configuration**
2. Scroll to **SonarQube Scanner**
3. Click **Add SonarQube Scanner**
   - **Name**: `SonarScanner`
   - **Path to executable**: `/opt/sonar-scanner/bin/sonar-scanner`

---

##  Application Deployment (Nginx on Port 8000)

Your Dockerfile uses the **official Nginx image** to serve the static website:

**Dockerfile**

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
```

Run the container like this:

```bash
docker run -d --name poc10-app -p 8000:80 devenops641/poc10
```

Access your application at:

```
http://<your-ec2-public-ip>:8000
```

---

##  Adding Docker Hub Credentials in Jenkins

To securely push Docker images to Docker Hub from Jenkins, steps to add the Docker Hub credentials:

### Step 1: Open Jenkins Credentials Manager

* Go to your Jenkins Dashboard.
* Navigate to:
  `Manage Jenkins` → `Manage Credentials` → `(global)` → `Add Credentials`.

### Step 2: Add Docker Hub Credentials

* **Kind**: Username and password
* **Username**: Your Docker Hub username (e.g., `devenops641`)
* **Password**: Your Docker Hub password
* **ID**: `docker-hub-creds` (this is used in the Jenkinsfile)
* **Description**: (Optional) e.g., "Docker Hub login for pushing images"

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


