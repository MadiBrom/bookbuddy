const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";
const AUTH_ENDPOINT =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/auth/login";

async function handleApiResponse(response) {
  if (!response.ok) {
    const errorMessage = `Error: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
}

async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    return await handleApiResponse(response);
  } catch (error) {
    console.error("Network error:", error);
    throw new Error("Network error, please try again later.");
  }
}

export async function fetchAllBooks() {
  try {
    const data = await fetchWithErrorHandling(API_URL);
    return data.books;
  } catch (error) {
    console.error("Error fetching all books:", error);
    return [];
  }
}

export async function fetchSingleBook(id) {
  try {
    const data = await fetchWithErrorHandling(`${API_URL}/${id}`);
    return data.book;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
}

export async function fetchBooks() {
  const token = localStorage.getItem("authToken");
  try {
    const data = await fetchWithErrorHandling(`${API_URL}/secure-books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.books;
  } catch (error) {
    console.error("Error fetching books with token:", error);
    throw error;
  }
}

export async function registerUser(first, last, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first, last, email, password }),
    });
    const data = await handleApiResponse(response);
    return data.token;
  } catch (error) {
    console.error("An error occurred during sign-up:", error);
    throw error;
  }
}

export async function checkBookAvailability(id) {
  try {
    const data = await fetchWithErrorHandling(`${API_URL}/${id}`);
    return data.book && data.book.available;
  } catch (error) {
    console.error("Error checking book availability:", error);
    throw error;
  }
}

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const signupUser = async (first, last, email, password) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first, last, email, password }),
  });

  if (!response.ok) {
    throw new Error("Sign-up failed");
  }

  return response.json();
};
