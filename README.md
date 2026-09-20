# Gujarat Kutumb ID

A comprehensive Family Registry and Beneficiary Management System designed for the Gujarat Government to streamline welfare scheme delivery through digital governance.

## 🌟 Features

### For Citizens
- **Family Registration**: Register family members with comprehensive demographic data
- **Scheme Discovery**: Discover eligible government schemes based on family attributes
- **Application Tracking**: Track application status in real-time
- **Benefit Wallet**: View active benefits and DBT payment history
- **Secure Authentication**: Login via username/password or Google OAuth

### For Administrators
- **Family Verification**: Verify family attributes and approve registrations
- **Duplicate Detection**: AI-powered duplicate record detection and resolution
- **Audit Logging**: Complete audit trail of all administrative actions
- **Life Event Management**: Process life events (birth, death, marriage, migration)
- **Dashboard Analytics**: Overview with KPIs and statistics
- **Scheme Management**: Manage government schemes and eligibility rules

### System Features
- **Eligibility Engine**: Automatic eligibility evaluation based on family attributes
- **Deprivation Index**: SECC-based deprivation scoring (7 indicators)
- **Role-Based Access Control**: Secure access based on user roles
- **Real-time Updates**: Live status updates and notifications
- **Responsive Design**: Mobile-friendly interface

## 🚀 Tech Stack

### Frontend
- **React 19** - UI Framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM v7** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **date-fns** - Date utilities

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Prisma** - ORM for database operations
- **SQLite** - Database (development)
- **PostgreSQL** - Database (production)
- **JWT** - Authentication tokens
- **Passport.js** - OAuth authentication
- **bcryptjs** - Password hashing

### Database
- **SQLite** (for local development)
- **PostgreSQL** (recommended for production)

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- PostgreSQL (for production deployment)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/manit3007/Kutum_ID.git
cd Kutum_ID
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL="file:./dev.db"
PORT=5000
JWT_SECRET=your-jwt-secret-change-in-production
SESSION_SECRET=your-session-secret-change-in-production

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback
```

### 4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with sample data
npx prisma db seed
```

### 5. Start Backend Server

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 6. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

### 7. Start Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5174`

## 🎯 Usage

### Demo Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Citizen Account:**
- Username: `ramesh`
- Password: `citizen123`

### Accessing the Application

1. Open your browser and navigate to `http://localhost:5174`
2. Login with demo credentials or register a new account
3. Based on your role, you'll be redirected to the appropriate dashboard

### Citizen Workflow

1. **Register/Login**: Create account or login with existing credentials
2. **View Dashboard**: See family profile, verification status, and data quality score
3. **Browse Schemes**: Visit Suvidha Portal to discover eligible schemes
4. **Apply for Schemes**: Submit applications for eligible schemes
5. **Track Applications**: Monitor application status in Applications page
6. **View Benefits**: Check active benefits and payment history in Benefit Wallet

### Admin Workflow

1. **Login**: Login with admin credentials
2. **View Dashboard**: See overview with KPIs and statistics
3. **Verify Families**: Review and verify pending family registrations
4. **Review Duplicates**: Resolve duplicate record conflicts
5. **Audit Logs**: View complete audit trail of all actions
6. **Simulate Events**: Test life event processing in the simulator

## 📁 Project Structure

```
Kutum_ID/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── seed.ts                # Database seeding
│   ├── src/
│   │   ├── app.ts                 # Express app setup
│   │   ├── middleware/
│   │   │   ├── auth.ts           # Authentication middleware
│   │   │   └── passport.ts       # OAuth configuration
│   │   ├── routes/
│   │   │   ├── auth.ts           # Auth endpoints
│   │   │   ├── family.ts         # Family management
│   │   │   └── suvidha.ts        # Suvidha portal
│   │   └── engines/
│   │       ├── eligibility.ts     # Eligibility evaluation
│   │       ├── deduplication.ts  # Duplicate detection
│   │       ├── deprivation.ts    # Deprivation calculation
│   │       └── exclusion.ts      # Exclusion rules
│   ├── package.json
│   └── .env                      # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layouts/
│   │   │   │   ├── CitizenLayout.tsx
│   │   │   │   └── AdminLayout.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── OAuthCallback.tsx
│   │   │   ├── citizen/
│   │   │   │   ├── CitizenDashboard.tsx
│   │   │   │   ├── SuvidhaPortal.tsx
│   │   │   │   ├── Applications.tsx
│   │   │   │   └── BenefitWallet.tsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.tsx
│   │   │       ├── FamilyVerification.tsx
│   │   │       ├── DuplicateReview.tsx
│   │   │       ├── AuditLogs.tsx
│   │   │       └── LifeEventSimulator.tsx
│   │   ├── utils/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
├── ARCHITECTURE.md                # Detailed architecture documentation
├── README.md                      # This file
└── .gitignore
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/auth/google` - Initiate Google OAuth
- `GET /api/v1/auth/google/callback` - OAuth callback

### Family Management
- `GET /api/v1/families/:id` - Get family profile
- `GET /api/v1/families/search` - Search families
- `POST /api/v1/families` - Create family
- `POST /api/v1/families/:id/verify` - Verify family (Admin)

### Suvidha Portal
- `GET /api/v1/suvidha/schemes` - Get available schemes
- `POST /api/v1/suvidha/apply` - Apply for scheme

## 🎨 Design System

The application uses a custom design system with a blue color theme:

- **Primary Color**: `#2563eb` (blue-600)
- **Background**: `#f8fafc` (slate-50)
- **Text**: `#1e293b` (slate-800)
- **Components**: Cards, buttons, badges, inputs with consistent styling
- **Animations**: Fade-in, slide-up, scale-in effects
- **Responsive**: Mobile-first responsive design

## 🔐 Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Access Control**: Middleware enforces permissions
- **CORS Protection**: Configured for trusted origins
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **Audit Logging**: Complete audit trail for all actions

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import repository in Vercel
3. Configure build settings:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy

### Backend (Render)

1. Push code to GitHub
2. Import repository in Render
3. Configure build settings:
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `npm start`
4. Add environment variables
5. Deploy

### Database

- **Development**: SQLite (local file)
- **Production**: PostgreSQL (Render or Neon)

For detailed deployment instructions, see [ARCHITECTURE.md](ARCHITECTURE.md#deployment-architecture)

## 📊 Database Schema

The system uses the following main entities:

- **Family**: Household unit with address and verification status
- **Member**: Individual person with demographics
- **FamilyMembership**: Many-to-many relationship with temporal tracking
- **FamilyAttribute**: Key-value pairs for eligibility evaluation
- **Scheme**: Government welfare schemes
- **EligibilityResult**: Cached eligibility evaluations
- **Benefit**: Active benefits and disbursements
- **LifeEvent**: Life events triggering recalculation
- **AuditLog**: Audit trail for all actions
- **User**: System users for authentication

For detailed schema documentation, see [ARCHITECTURE.md](ARCHITECTURE.md#database-schema)

## 🧪 Testing

### Manual Testing

1. **Authentication**: Test login, registration, and OAuth
2. **Family Registration**: Create a new family with members
3. **Verification**: Verify family attributes as admin
4. **Eligibility**: Check scheme eligibility
5. **Benefits**: View benefit wallet
6. **Duplicates**: Test duplicate detection
7. **Audit Logs**: Verify audit trail

### Test Data

The database is seeded with sample data including:
- 2 families (one verified, one pending)
- 4 members per family
- 6 family attributes per family
- 4 government schemes
- Admin and citizen user accounts

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Team

- **Developed by**: MSESTAG Team
- **Purpose**: Gujarat Government Family Registry & Beneficiary Management System

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🙏 Acknowledgments

- Gujarat Government for the opportunity
- Open source community for the amazing tools and libraries

## 📚 Documentation

- [Architecture Documentation](ARCHITECTURE.md) - Detailed technical architecture
- [Project Documentation](PROJECT_DOCUMENTATION.md) - Complete project details

---

**Built with ❤️ for Digital Gujarat**
