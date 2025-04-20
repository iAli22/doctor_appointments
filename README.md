# 🛠️ Project Setup Guide

This guide will walk you through setting up and running the **Doctor Appointment Booking UI** project locally.

---

## 📁 Clone the Repository

````bash
git clone https://github.com/iAli22/doctor_appointments.git
cd doctor_appointments


## 📦 Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed (version 16+ recommended).

Then install the required packages:

```bash
npm install

## 🚀 Run the Development Server

```bash
npm run dev




## ⚙️ Tech Stack

- **Framework:** React
- **Styling:** TailwindCSS
- **State Management:** Zustand
- **Build Tool:** Vite
- **Language:** JavaScript

````

## 🤖 How AI Tools Helped Me

To enhance development speed and code quality, I leveraged various AI tools throughout this project:

- **ChatGPT (OpenAI):**  
  Assisted in designing component structures, generating mock data (doctors, time slots), improving accessibility with proper ARIA tags, and refining the logic for filtering and appointment management.

- **Cursor AI:**  
  Used to scaffold the project structure, auto-generate reusable UI components (e.g., `DoctorCard`, `Modal`), and optimize responsiveness and layout using TailwindCSS.

- **GitHub Copilot:**  
  Helped streamline writing boilerplate code and provided real-time suggestions for React hooks, Zustand state management, and UI interactions.

- **Accessibility Tools (Lighthouse + axe DevTools):**  
  Guided by AI to resolve accessibility violations and ensure keyboard navigability and screen reader support.

## ⚠️ Known Limitations / Next Steps

- **Mock Data Only:**  
  The doctor directory and availability are based on hardcoded mock data. No real-time updates or backend connection exists yet.

### 🔜 Next Steps

- Integrate a backend or database for real appointment and doctor management
- Add user authentication and profile management
- Implement advanced validation and error handling
- Enable dynamic time slot generation based on doctor availability
- Add localization and language support
