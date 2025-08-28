# POC - 10
<img width="921" height="365" alt="image" src="https://github.com/user-attachments/assets/ec0e81b2-71a7-4470-a640-6b4afbe8d974" />


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

