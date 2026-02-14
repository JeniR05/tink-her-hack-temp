<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# SecureNest 🎯

## Basic Details

### Team Name: CodeNova

### Team Members
- Member 1: Fathima  Shifana S- LBS Institue of Technology for Women
- Member 2: Jeni R- LBS Institue of Technology for Women


### Project Description
SecureNest is a lightweight, self-hosted personal cloud storage solution that enables users to transform their local computer into a private file server. It provides a secure web-based interface for managing data without relying on expensive, third-party cloud providers.

### The Problem statement
Many mainstream cloud services raise privacy concerns, impose strict storage limits, or require monthly subscriptions. Users often have significant unused hard drive space on their local machines but lack a streamlined way to access or manage those files remotely from other devices.

### The Solution
We developed a "private nest" for data by building a Node.js web application that uses the local file system as storage. With features like encrypted authentication and a responsive dashboard, SecureNest allows users to securely upload, track, and download their files directly from their own hardware over a local network

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used:HTML,CSS,JAVA SCRIPT
- Frameworks used: Express.js
- Libraries used:Multer,Bcrypt.js,Express-Session
- Tools used: VS Code, Git


## Features


​Secure Authentication: User signup and login with hashed password protection.
​Storage Dashboard: Real-time tracking of file counts and total storage used.
​File Management: A clean interface to upload, list, and download files.
​Private Storage: Files are stored locally on the server's hard drive, not on a third-party cloud.

---

## Implementation

### For Software:


#### Installation
```bash
# Install required dependencies
npm install

# Create the folder where files will be stored
mkdir uploads

```

#### Run
```bash
# 1. Start MongoDB on your machine
# 2. Start the SecureNest server
node server.js
```



## Project Documentation

### For Software:



**System Architecture:**

The Frontend (HTML/CSS) makes requests to the Node.js server. The server stores file metadata in MongoDB and saves the physical files to the local disk.




  



### Video
https://drive.google.com/file/d/1DZSS4oEDL4u0Fo3BeK48UW2808-IVYNm/view?usp=drivesdk

*Explain what the video demonstrates - key features, user flow, technical highlights*


## AI Tools Used (Optional - For Transparency Bonus)

ChatGPT,Gemini

**Tool Used:**  GitHub Copilot,ChatGPT

**Purpose:**  

Backend Logic: Assisted in writing the asynchronous MongoDB connection logic and setting up the Express.js middleware for session management.
​File Handling: Helped configure the Multer storage engine to correctly handle original file names and file extensions.
​CSS Styling: Provided guidance on creating a responsive dark-mode UI and fixing vertical alignment issues (Flexbox) within the file management table.
​Debugging: Assisted in troubleshooting "Path not found" errors and ensuring the local server could be accessed by mobile devices on the same network.
​Documentation: Helped structure the technical documentation and project description to meet hackathon standards.

## Team Contributions

- Fathima Shifana S: Backend development, MongoDB schema design, and Authentication logic.
- Jeni R: Frontend UI/UX design, CSS styling, and File upload/download integration.
  
