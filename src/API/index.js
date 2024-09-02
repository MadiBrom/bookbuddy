const API_BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

// Fetch all books from the API
export async function fetchBooks() {
  const url = `${API_BASE_URL}/books`;
  try {
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return the array of books, handling different response structures
    if (Array.isArray(data)) {
      return data;
    } else if (Array.isArray(data.books)) {
      return data.books;
    } else {
      console.error("Unexpected response structure:", data);
      return [];
    }
  } catch (error) {
    // Log any errors encountered during the fetch
    console.error("Error fetching all books:", error.message);
    return [];
  }
}

// Fetch details of a single book by ID
export async function fetchSingleBook(id) {
  const url = `${API_BASE_URL}/books/${id}`;
  try {
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.book; // Return the book details
  } catch (error) {
    // Log the error and rethrow it for further handling if needed
    console.error("Error fetching book:", error.message);
    throw error;
  }
}

// Handle user login and store the authentication token
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Send login credentials
    });

    // If login is successful, store the token and return a success message
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      return { success: true, message: "Login successful!" };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
  } catch (error) {
    // Log any errors encountered during the login process
    console.error("An error occurred during login:", error);
    return { success: false, message: error.message };
  }
}

// Handle user registration and automatically log the user in
export async function registerUser(first, last, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first, last, email, password }), // Send registration details
    });

    const data = await response.json();
    console.log("registerUser response data:", data);

    if (response.ok) {
      // If registration is successful, log the user in
      const loginResult = await loginUser(email, password);
      if (loginResult.success) {
        return {
          token: localStorage.getItem("authToken"),
          message: "Registration and login successful!",
        };
      } else {
        return { token: null, message: loginResult.message };
      }
    } else {
      const errorMessage = data.message || "Sign-up failed";
      throw new Error(errorMessage);
    }
  } catch (error) {
    // Log any errors encountered during the registration process
    console.error("An error occurred during sign-up and login:", error);
    return { token: null, message: error.message };
  }
}

// Check if a book is available by ID
export async function checkBookAvailability(id) {
  const url = `${API_BASE_URL}/books/${id}`;
  try {
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.book && data.book.available; // Return book availability status
  } catch (error) {
    // Log any errors encountered while checking availability
    console.error("Error checking book availability:", error.message);
    throw error;
  }
}

// Fetch the current authenticated user's details
export async function fetchCurrentUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the auth token in the request
      },
    });

    // If fetching the user is successful, return the user data
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
  } catch (error) {
    // Log any errors encountered while fetching the current user
    console.error("Error fetching current user:", error.message);
    throw error;
  }
}
