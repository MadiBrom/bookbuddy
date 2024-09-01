const API_BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function fetchBooks() {
  try {
    const response = await fetch(url); // Fetching the response object

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response body as JSON
    const data = await response.json();

    // Check if the data structure is as expected
    if (Array.isArray(data)) {
      return data; // If the response is an array, return it directly
    } else if (data.books) {
      return data.books; // If the response has a "books" property, return it
    } else {
      console.error("Unexpected response structure:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching all books:", error.message);
    return [];
  }
}

export async function fetchSingleBook(id) {
  try {
    const data = await fetch(url / id);
    return data.book;
  } catch (error) {
    console.error("Error fetching book:", error.message);
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
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      return { success: true, message: "Login successful!" };
    } else {
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
      body: JSON.stringify({ first, last, email, password }),
    });

    const data = await response.json();
    console.log("registerUser response data:", data);

    if (response.ok) {
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
    console.error("An error occurred during sign-up and login:", error);
    return { token: null, message: error.message };
  }
}

export async function checkBookAvailability(id) {
  try {
    const data = await fetch(`${API_BASE_URL}/books/${id}`);
    return data.book && data.book.available;
  } catch (error) {
    console.error("Error checking book availability:", error.message);
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
      return await response.json();
    } else {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    throw error;
  }
}
