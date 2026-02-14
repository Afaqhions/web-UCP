// PROTOTYPE MOCK AUTHENTICATION
// This service bypasses the backend to allow frontend testing without a server.

// MOCK CREDENTIALS:
// Admin: admin@taakra.com / admin123
// User:  user@taakra.com  / user123

const MOCK_USERS = [
  {
    id: 'u1',
    email: 'user@taakra.com',
    password: 'user123',
    firstName: 'Demo',
    lastName: 'User',
    role: 'USER',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  },
  {
    id: 'a1',
    email: 'admin@taakra.com',
    password: 'admin123',
    firstName: 'System',
    lastName: 'Administrator',
    role: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  }
];

export const authService = {
  async login(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Return success with a fake token
    return {
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar
      }
    };
  },

  async register(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simply mock a success registration and log them in
    const newUser = {
      id: `u${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName || 'New',
      lastName: 'User',
      role: 'USER',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
    };

    return {
      token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
      user: newUser
    };
  },

  async getCurrentUser() {
    // In a real app, we'd use the token to fetch user data.
    // For mock, we'll try to retrieve the user stored in localStorage (handled by AuthContext generally)
    // But since AuthContext calls this to Validate token, we should return a mock user if a token exists.

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // Retrieve token from storage to see if we are "logged in"
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    // If token has "admin" in it, return admin, else default user
    if (token.includes('a1')) {
      return MOCK_USERS[1]; // Admin
    }

    // Default return the first mock user for simplicity if we can't parse the token, 
    // or arguably we should fail. Let's return the user that matches the token ID if possible.
    // Simpler: Just return the User mock for now unless it is admin.
    return MOCK_USERS[0];
  },

  async logout() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  },

  async updateProfile(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...MOCK_USERS[0],
      ...userData
    };
  },

  async changePassword(oldPassword, newPassword) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  },

  async forgotPassword(email) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Password reset email sent' };
  },

  async resetPassword(token, newPassword) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Password successfully reset' };
  },

  async loginWithGoogle(googleToken) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      token: 'mock-google-token',
      user: MOCK_USERS[0]
    };
  },
};
