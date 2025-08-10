# Digital Competency Platform

This repository contains the source code for the Digital Competency Platform, including both server-side (backend) and client-side (frontend) applications.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Running the Application Locally](#running-the-application-locally)  
- [Environment Variables](#environment-variables)  
- [Features](#features)  
- [Admin Credentials](#admin-credentials)  
- [License](#license)

---

## Project Overview

The Digital Competency Platform is a full-stack web application designed to assess and manage user skills through various competency tests. The project is divided into two main parts:

- **Server**: RESTful API built with Node.js, Express, and MongoDB  

---

## Prerequisites

Make sure you have the following installed on your system:

- Node.js (v16 or later)  
- npm or yarn  
- MongoDB (local or cloud instance like MongoDB Atlas)  
- Git  

---

## Installation

### Clone the repositories

```bash
# Clone backend repository
git clone https://github.com/Sakib-Atreus/digital-competency-platform-server.git


cd digital-competency-platform-server

# Install dependencies
npm install

# Create a .env file in the root directory and configure environment variables (see below)
NODE_ENV=development
PORT=5000

MONGOOSE_URI=your_mongodb_url

JWT_TOKEN_SECRET=jwt_secret_token
JWT_REFRESHTOKEN_SECRET=jwt_refreshtoken_secret
TOKEN_EXPAIRS_IN=set_your_time
REFRESH_TOKEN_EXPAIRS_IN=set_your_time
OTP_TOKEN_DURATION=set_5_minutes

BCRYPT_SALT=set_the_hash_round

CLOUDNAME=your_cloudinary_name
APIkEY=your_cloudinary_api_key
APISECRET=your_cloudinary_api_secret_key

# gmail
COMPANY_GMAIL=your_two_factor_authentic_mail
GMAIL_APP_PASSWORD=your_mail

```bash
# Start the server
npm run start:dev

```bash
# Testing the all api
http://localhost:5000/api/v1

```bash
# API Documentation 
https://documenter.getpostman.com/view/26679586/2sB3BEnAUy

```