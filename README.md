
# Slice Social – Explanation Documentation

This document explains the reasoning and design choices behind *Slice Social*.  
It is not a tutorial or API reference — instead, it provides context, motivations, and tradeoffs to give insight into how I think as an engineer.

---
## Version 1.0

## Table of Contents
1. [The Concept](#1-the-concept)  
2. [The Problem Space](#2-the-problem-space)  
3. [System Design Overview](#3-system-design-overview)  
4. [Key Design Choices and Tradeoffs](#4-key-design-choices-and-tradeoffs)  
5. [Engineering Practices](#5-engineering-practices)  
6. [Future Considerations](#6-future-considerations)  
7. [What This Project Demonstrates](#7-what-this-project-demonstrates)  

---

## 1. The Concept

### What is Slice Social?

People have become wary of social media since its inception. Many people have a complicated relationship with their phones and believe that they would be better off without social media. I disagree. I believe that technology has the capability to connect us and enrich our lives, and by rethinking how social media should be designed, I'm aiming to create a product that empowers us and pushes us to build and maintain strong social networks in person.

My goal in making this app is to demonstrate what a healthy form of social media should look like. There are many positive benefits to social media, and if we can thoughtfully filter out the negative facets, we are left with a product that can truly empower us to connect with one another in a meaningful way. I want to lay out in this documentation the reasons behind the design choices I’ve made- specifically, why I’ve chosen to exclude certain features from the app. The finished product is simple and easy to use, and it doesn’t add clutter and noise to your world. I am not designing this app with the goal of maximizing user engagement. I want slice to be a reflection of your immediate social circle: no more influencers, no more recommendations, no more explore. If you want to expand your network, you need to connect outside of the app. Slice makes it easier for you to maintain the network you’ve built. 

### Core Philosophy
  - Seamless and comfortable experience.  
  - No ads or engagement traps. 
  - Privacy and authenticity prioritized.
  - Free to use and self-hosted

---

## 3. System Design Overview

### Frontend 
  - **React Native + TypeScript** for iOS/Android parity with one codebase.  
  - Modular UI components: bottom sheets, comment overlays, custom SVG icons.  
  - Strong typing for safety (`ProfileType`, `PostType`, `CommentType`).  

### Backend 
  - **FastAPI** for clean, async REST endpoints.  
  - **PostgreSQL** in production, with Postgres container instance for local dev.  
  - **JWT-based authentication** to keep backend stateless and scalable.
  - **Docker Compose** orchestrates database services locally.
  - **Nginx** planned as a reverse proxy with TLS termination in production. 

### Storage  
  - Relational DB for users, posts, comments, and relationships.  
  - **AWS S3** for profile pictures and future media (images, videos).  

---

## 4. Key Design Choices and Tradeoffs

### Database Choice
- **Why PostgreSQL (Aurora):** Strong relational schema, proven reliability, complex queries supported.  
- **Alternatives:** DynamoDB (cheaper scaling, but weaker fit for relational feed queries).  
- **Tradeoff:** Aurora setup is more complex, but better reflects professional relational database design.  

### Frontend Stack
- **Why React Native:** One codebase → faster MVP delivery for iOS/Android.  
- **Alternatives:** Native Swift/Kotlin (best UX but slower dev).  
- **Tradeoff:** Some minor performance/UX compromises, but massive productivity gain.  

### DevOps & Deployment
- **Why Docker:** Reproducible environments for backend + Postgres. 
- **Tradeoff:** Slightly steeper setup curve, but prepares the app for production environments.  

---

## 5. Engineering Practices

- **Type Safety:** Strict TypeScript interfaces for all data models.  
- **Version Control:** Clean Git commit history and GitHub repo organization.  
- **DevOps:** Docker for local development, `.env` for configuration.
- **Security:**  
  - SSL-encrypted Postgres connections.  
  - JWT for identity/auth.
  - TLS is automatically implemented by the Fetch API in Node ecosystems.

---

## 6. Future Considerations

There are many features that I want to add in the future. For starters, I want to add a direct messaging feature. This would likely add significantly to the cost of managing the backend, but I have a potential solution to the inevitable cost increases that would coinside with platform growth: a **distributed backend**. I've considered redeveloping the frontend for a web-based desktop environment and utilizing spare compute from user devices to finance the app's backend. There are blockchains such as **Filecoin** that distribute data on a decentralized network of storage devices, so revenue from the distributed compute network consisting of Slice's users could be easily converted to finance the backend storage and server-side compute. If data were encrypted prior to being stored on the distributed storage network, security would be preserved. Unfortunately, this sort of system is impossible to implement on iOS due to Apple's watchdog protocol, which puts significant limitations on an app's access to device resources. So, to implement this system, Slice would need to be desktop only.

I also plan to add auto-renewed, CA-signed TLS certificates. This adds an extra layer of security to the app, ensuring that user data is kept private. I also plan to scale beyond Docker Compose with Kubernetes. This would allow me to manage increased traffic as the userbase grows and would ensure that the user experience remains smooth. I intend to add analytics on feed/post performance, as well as on other user metrics, prior to launching the app on the app store. This will allow me to follow the CI/CD workflow as I continue development beyond the MVP.

---

## 7. What This Project Demonstrates

- **System thinking:** Weighed tradeoffs between cost, scalability, UX, and implementation speed.  
- **Full-stack capability:** Built frontend in React Native + TypeScript, backend in FastAPI, and relational database with Postgres.  
- **Professional practices:** Strong typing, modular code, secure authentication, Dockerized development.  
- **Forward-looking design:** MVP ready today, but with a clear path to scaling.

---

*Last updated: September 2025*