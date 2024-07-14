# Resonex

Resonex is a task management web application developed using the MERN stack to make life easier for student developers. It’s not just about organizing stuff – it’s about helping us work smarter and have a clear plan for success. It’s a handy tool where everything is organized in one place, allowing us to stay focused on building our projects with efficiency and clarity.

## 🛠️ Technologies & Tools Used

- **Design:** **`Figma`**
- **Frontend Development:** **`React`** **`Tailwind CSS`** **`Axios`** **`Vite`**
- **Backend Development:** **`Node.js`** **`Express.js`** **`MongoDB`**
- **Other Libraries:** **`Lucide Icons`** **`react-hot-toast`** **`embla-carousel-react`** **`Chart.js`** **`syncfusion library`**
- **Deployment:** **`Render`** **`Vercel`**

## 👾 Features

1. **Authentication:**

   - Users can sign-in/sign-up within the application using an email and a password.
   - The app is secured using Node.js and Express.js. Passwords are authenticated using JWT (JSON Web Token), which is one of the best authentication methods.

2. **Resources:**

   - Resources are organized into folders.
   - Users can create (website details: title, logo, URL) and delete resources with confirmation within a specific folder.
   - Clicking on any resource redirects to that specific webpage.

3. **Tasks Tracker:** (divided into two sections)

   Current Project Tasks Section

   - A fully functional to-do list where users can create, update, delete a task, and view task details.
   - Update the status of a task (Pending or Done).
   - Tasks can be sorted by status.
   - Tasks can be deleted or saved in another list called the saved list.

   Progress Details section

   - Shows the number of tasks done and pending, a progress bar, and the completion percentage.
   - Different chart views displaying task completion percentages of each day.
   - Users can update the chart and save tasks in the saved list based on the progress bar.
   - The chart can be updated once per day (for daily progress).
   - The chart data can be saved once per week (for weekly progress - checks if it’s Sunday).

4. **Events Calendar:**

- Set reminders for important tasks, deadlines, and events.
- Create or delete events with date filtering functionality.

5. **Dashboard:**

   - Resources section with a functional slider.
   - A section for tracking weekly progress.

## 📝 Application plan

![diagram-export-14-07-2024-12_01_08](https://github.com/user-attachments/assets/d19d0b76-7419-4862-8758-b88d514fbd3e)

## 🔄 Project Idea

As a developer, I always have a lot to manage, like frameworks, websites, tools, and tasks. These things are all over the place – on our laptops, iPads, phones, and buried in messy bookmarks as shown below 😅

![Screenshot 2024-01-27 at 14 38 1](https://github.com/user-attachments/assets/0cd0f11f-d2e7-4377-9336-7f8ffa950ba5)

Therefore, I thought about creating an application that serves as a centralized dashboard, bringing together all our coding resources, frameworks, and task progress into one organized and visually appealing space, making it easy to find and use everything we need. This is **`ResoNex`**

## 🔄 Project Process

### Design Phase using Figma:

- Created initial sketches and refining the app’s look.
- Transition to Figma for detailed design work.

### Development Phase:

Backend Development

1. Setup Development Environment:

- Installed Node.js and initialized the project.
- Installed Express.js for the server framework.

2. Database Setup:

- Set up MongoDB and connect it to the application.
- Defined models for data structure using Mongoose.

3. API Development:

- Created RESTful API endpoints using Express.js.
- Implemented controllers for handling business logic.
- Set up routes to manage incoming requests.
- Implemented middleware for validation, error handling, and authentication.

4. Authentication:

- Implemented JWT for user authentication and authorization.
- Set up secure password storage using bcrypt.

5. Integration of External APIs:

- Used Axios to fetch data from external APIs as needed.

Frontend Development

1. Setup Development Environment:

- Initialized the frontend using Vite.

2. Component Development:

- Built reusable React components for UI elements.
- Implemented state management using React hooks.

3. Styling:

- Used Tailwind CSS for styling the components and layout.

4. API Integration:

- Used Axios to connect frontend with backend APIs.
- Handled data fetching, posting, and updating.

5. Additional Libraries:

- Integrated additional libraries like Lucide Icons, react-hot-toast, embla-carousel-react, Chart.js, and Syncfusion Library as needed.

### Deployment:

- Deployed the backend using Render.
- Deployed the frontend using Vercel.
- Tested the deployed website to ensure functionality and performance.

## 🎯 Learning

- Gained experience in full-stack development, focusing on building both the frontend and backend from scratch.
- Understood the importance of structuring RESTful APIs and handling various HTTP methods for CRUD operations.
- Enhanced skills in working with JWT for authentication and authorization, ensuring secure user access.
- Learned effective state management in React and making complex components reusable.
- Improved understanding of styling using Tailwind CSS and integrating various third-party libraries for additional functionalities.
- Emphasized the significance of clean, maintainable code and version control for collaboration and future improvements.

## ✨ Improvement

The app still needs more improvements and functionalities for better usability:

- Enhance app performance to reduce login time.
- Allow users to upload an avatar, update their name, and change their password.
- Enable users to create their own folders.
- Add a Jobs Tracker to help users track job applications, interviews, and job search progress.

## 📹 Video

https://github.com/user-attachments/assets/f027938a-36aa-404e-8cb4-4d1638871b74

- Check it out live here [Resonex](https://reso-nex.vercel.app/).
