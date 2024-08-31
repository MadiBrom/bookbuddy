const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";
const AUTH_ENDPOINT =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/auth/login";
const API_BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function fetchAllBooks() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json.books;
  } catch (error) {
    console.error("Error fetching all books:", error);
    return [];
  }
}

export async function fetchSingleBook(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error("Failed to fetch single book:", errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.book;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
}

export async function fetchBooks() {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(`${API_BASE_URL}/secure-books`, {
      // Updated to actual secure endpoint
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error("Failed to fetch books with token:", errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error("Error fetching books with token:", error);
    throw error;
  }
}

export async function handleLogin(email, password) {
  try {
    const response = await fetch(AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      console.log("Sign-in successful");
      return data.token;
    } else {
      throw new Error("Sign-in failed");
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    throw error;
  }
}

export async function handleSignUp(first, last, email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first, last, email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  const { token } = await response.json();
  return token;
}

export async function checkBookAvailability(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data.book && data.book.available;
  } catch (error) {
    console.error("Error checking book availability:", error);
    throw error;
  }
}
