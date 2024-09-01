const API_BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    return await fetch(response);
  } catch (error) {
    console.error("Network error:", error);
    throw new Error("Network error, please try again later.");
  }
}

export async function fetchBooks() {
  try {
    const response = await fetchWithErrorHandling(`${API_BASE_URL}/books`);
    console.log("API Response:", response);
    return response.books;
  } catch (error) {
    console.error("Error fetching all books:", error);
    return [];
  }
}

export async function fetchSingleBook(id) {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/books/${id}`);
    return data.book;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json(); // Extract the JSON data
      localStorage.setItem("authToken", data.token); // Store the token in local storage
      return { success: true, message: "Login successful!" };
    } else {
      // Handle non-200 responses
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    return { success: false, message: error.message };
  }
}

export async function registerUser(first, last, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first,
        last,
        email,
        password,
      }),
    });

    const data = await response.json(); // Extract the JSON data
    console.log("registerUser response data:", data); // Log the response data

    if (response.ok) {
      // Automatically log in the user after successful registration
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
      throw new Error(errorMessage); // Use the message from the response or a default message
    }
  } catch (error) {
    console.error("An error occurred during sign-up and login:", error);
    return { token: null, message: error.message }; // Return error message
  }
}

export async function checkBookAvailability(id) {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/books/${id}`);
    return data.book && data.book.available;
  } catch (error) {
    console.error("Error checking book availability:", error);
    throw error;
  }
}

export async function fetchCurrentUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}
