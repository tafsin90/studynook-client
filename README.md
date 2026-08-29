# StudyNook 📚

A modern platform for browsing, booking, and listing study rooms. Perfect for students and professionals looking for dedicated study spaces.

## 🔗 Live Links

- **Live-link**: [https://studynook-two.vercel.app/](https://studynook-two.vercel.app/)
- **Frontend Repository**: [https://github.com/tafsin90/studynook-client](https://github.com/tafsin90/studynook-client)
- **Backend Repository**: [https://github.com/tafsin90/studynook-server](https://github.com/tafsin90/studynook-server)

---

## 📖 About StudyNook

StudyNook is a comprehensive study room booking application that connects room owners with students and professionals seeking dedicated study spaces. The platform makes it easy to discover available rooms, check amenities, book time slots, and manage bookings efficiently.

---

## ✨ Features

### For Students & Professionals
- 🔐 **User Authentication**: Sign up with email/password or Google OAuth
- 🏠 **Browse Rooms**: Explore featured and all available study rooms
- 🔍 **View Room Details**: See room amenities, capacity, hourly rates, and owner information
- 📅 **Book Rooms**: Reserve rooms by selecting date, start time, and end time
- ⏰ **Manage Bookings**: View all your bookings and cancel when needed
- 🌓 **Dark/Light Mode**: Toggle between themes for comfortable viewing

### For Room Owners
- ➕ **Add Rooms**: List new study rooms with details, amenities, and pricing
- 📊 **Manage Listings**: View, edit, and delete your room listings
- 💰 **Set Pricing**: Configure hourly rates for your rooms
- 📈 **Track Bookings**: See how many times your room has been booked

### Smart Features
- 🚫 **Booking Conflict Detection**: Prevents double-booking of rooms
- ✅ **Automatic Status Updates**: Bookings automatically expire after the booking date
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Built with HeroUI components and Tailwind CSS

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 16.3.0](https://nextjs.org/) - React meta-framework with App Router
- **UI Library**: [React 19.2.8](https://react.dev/)
- **Styling**: 
  - [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
  - [HeroUI 3.2.4](https://heroui.org/) - Component library
- **Authentication**: [better-auth 1.6.29](https://www.better-auth.com/) - Next.js authentication
- **Theme Management**: [next-themes 0.4.6](https://github.com/pacocoursey/next-themes)
- **Icons**: 
  - [react-icons 5.7.0](https://react-icons.github.io/react-icons/)
  - [Gravity UI Icons 2.21.0](https://gravity-ui.com/)
- **Date Handling**: [date-fns 4.4.0](https://date-fns.org/)
- **Notifications**: [react-toastify 11.1.0](https://fkhadra.github.io/react-toastify/introduction)
- **Database Driver**: [mongodb 7.5.0](https://www.mongodb.com/)

### Backend
- **Framework**: [Express.js 5.2.1](https://expressjs.com/) - Node.js web framework
- **Database**: [MongoDB 7.5.0](https://www.mongodb.com/) - NoSQL database
- **Authentication**: [jose-cjs 6.2.3](https://github.com/panva/jose) - JWT verification
- **CORS**: [cors 2.8.6](https://github.com/expressjs/cors) - Cross-Origin Resource Sharing
- **Environment**: [dotenv 17.4.2](https://github.com/motdotla/dotenv) - Environment variables

---

## 🚀 Getting Started

### ⚠️ Important: Backend Setup Required

**Before running the frontend, you must clone and set up the backend server first.**

The frontend requires the backend API to function. Please follow the setup instructions in the backend repository:

👉 **[StudyNook Backend Repository](https://github.com/tafsin90/studynook-server)**

After cloning and starting the backend server, come back to set up the frontend.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Google OAuth credentials (for Google login)
- Backend server running on `http://localhost:5000` (or configured in environment variables)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/tafsin90/studynook-client.git
cd studynook-client
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Authentication
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=StudyNook

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Backend Server
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

#### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

#### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📱 How to Use the Website

### 1. **Sign Up / Login**
   - Click "Sign Up" and create an account with email & password, or sign in with Google
   - Complete your profile with necessary information

### 2. **Browse Rooms**
   - Visit the "Rooms" page to see all available study rooms
   - View room cards with images, descriptions, capacity, and hourly rates
   - Click on a room card to view detailed information

### 3. **Book a Room**
   - On the room detail page, fill out the booking form:
     - Select a date
     - Choose start time and end time
     - Specify number of people
   - Click "Confirm Booking"
   - You'll receive a confirmation notification

### 4. **Manage Bookings**
   - Go to "My Bookings" to view all your active and expired bookings
   - See booking status: Confirmed, Cancelled, or Expired
   - Cancel bookings before the booking date if needed

### 5. **List Your Room**
   - Click "Add Room" to create a new listing
   - Fill in room details:
     - Room name and description
     - Floor number
     - Seat capacity (min & max)
     - Hourly rate
     - Select amenities (WiFi, Whiteboard, Projector, etc.)
     - Upload room image URL
   - Submit to list your room

### 6. **Manage Listings**
   - Go to "My Listings" to manage your rooms
   - Edit room details and pricing
   - Delete rooms (this also removes all related bookings)
   - View booking count for each room

### 7. **Toggle Theme**
   - Use the theme toggle in the navbar to switch between light and dark modes

---

## 🔌 API Endpoints

All API endpoints are accessed at the `NEXT_PUBLIC_SERVER_URL` (default: `http://localhost:5000`)

### Public Endpoints

#### Get Featured Rooms
```
GET /
Response: Array of 6 most recent rooms
```

#### Get All Rooms
```
GET /rooms
Response: Array of all rooms
```

#### Get All Rooms (with Filter)
```
GET /rooms
Response: Array of all rooms
```

### Protected Endpoints (Require JWT Token)

#### Get Single Room
```
GET /rooms/:id
Headers: Authorization: Bearer <token>
Response: Room object
```

#### Create Booking
```
POST /bookings
Headers: Authorization: Bearer <token>
Body: {
  userId: string,
  roomId: string,
  date: string (YYYY-MM-DD),
  startHour: number,
  endHour: number,
  guestCount: number
}
Response: Booking confirmation
```

### Admin/Owner Endpoints

#### Add Room
```
POST /add-room
Body: {
  userId: string,
  roomImageUrl: string,
  roomName: string,
  shortDescription: string,
  floor: number,
  seatCapacity: { min: number, max: number },
  hourlyRate: number,
  amenities: string[]
}
Response: Inserted room object
```

#### Update Room
```
PATCH /rooms/:id
Body: Updated room fields
Response: Update confirmation
```

#### Delete Room
```
DELETE /rooms/:id
Body: { userId: string }
Response: Deletion confirmation
```

### User Endpoints

#### Get User Bookings
```
GET /bookings?userId=<userId>
Response: Array of user's bookings
```

#### Cancel Booking
```
PATCH /bookings/:id
Body: { userId: string }
Response: Update confirmation
```

#### Update Booking Status
```
PATCH /bookings/status
Response: Count of updated bookings
```

#### Get User Listings
```
GET /listings?userId=<userId>
Response: Array of user's room listings
```

---

## 📂 Project Structure

```
studynook/
├── public/
│   └── image/                    # Static images
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.js            # Root layout
│   │   ├── (auth)/              # Auth routes (login, register)
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/              # Main app routes
│   │   │   ├── page.jsx         # Home/featured rooms
│   │   │   ├── rooms/
│   │   │   │   ├── page.jsx     # All rooms listing
│   │   │   │   └── [id]/        # Room details
│   │   │   ├── add-room/        # Add room form
│   │   │   ├── my-bookings/     # User bookings
│   │   │   └── my-listings/     # User listings
│   │   └── api/auth/            # Authentication API routes
│   ├── components/              # React components
│   │   ├── Navbar.jsx
│   │   ├── RoomCard.jsx
│   │   ├── RoomList.jsx
│   │   ├── Bookingform.jsx
│   │   ├── BookingsTable.jsx
│   │   ├── ListingTable.jsx
│   │   ├── DatePicker.jsx
│   │   ├── TimePicker.jsx
│   │   ├── EditRoomModal.jsx
│   │   ├── DeleteRoomModal.jsx
│   │   ├── DeleteBooking.jsx
│   │   ├── Filter.jsx
│   │   ├── Banner.jsx
│   │   ├── Footer.jsx
│   │   ├── ToggleTheme.jsx
│   │   └── provider/
│   │       └── ThemeProviderWrapper.jsx
│   └── lib/
│       ├── auth.js              # Backend authentication setup
│       └── auth-client.js       # Frontend authentication client
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.mjs
└── package.json
```

---

## 🔐 Authentication Flow

1. User signs up with email/password or Google OAuth
2. `better-auth` creates a session and JWT token
3. Token is stored in HTTP-only cookie
4. On protected routes, token is verified via JWKS endpoint
5. Backend verifies JWT signature before processing requests
6. Sessions can be up to 7 days

---

## 🐛 Troubleshooting

### "Room not found" error on room detail page
- Ensure backend server is running and accessible
- Check `NEXT_PUBLIC_SERVER_URL` environment variable
- Verify MongoDB connection

### Authentication fails
- Check `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` are set correctly
- Ensure Google OAuth credentials are valid
- Clear browser cookies and try again

### Booking conflict errors
- Check if the time slot is already booked
- Try selecting a different time
- Verify date format is correct (YYYY-MM-DD)

### Images not loading
- Verify the image URL is accessible
- Check if Vercel remote patterns are configured correctly
- Ensure image host is in `next.config.mjs` remote patterns

---

## 📝 Notes

- Bookings are automatically marked as "Expired" after the booking date passes
- Room owners can edit/delete rooms anytime
- Cancelling a booking doesn't affect the room's booking count
- Dark mode preference is saved to local storage
- All sensitive data (tokens, secrets) should never be committed to version control

---

## 📄 License

ISC

---

## 👨‍💻 Author

**Tafsin** - [GitHub](https://github.com/tafsin90)

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

## 📞 Support

For issues, feature requests, or questions, please open an issue on the [GitHub repository](https://github.com/tafsin90/studynook-client/issues).

---

**Happy Studying! 📖✨**
