const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";
const AUTH_ENDPOINT =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/auth/login";
const API_BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";
const API_LOG = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/users/login";
const API_REG =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/users/register";

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

    const json = await response.json();
    return json.book;
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

    const json = await response.json();
    return json.books;
  } catch (error) {
    console.error("Error fetching books with token:", error);
    throw error;
  }
}

export async function handleLogin(email, password) {
  try {
    const response = await fetch(API_LOG, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("authToken", data.token);
      console.log("Sign-in successful");
      return json.token;
    } else {
      throw new Error("Sign-in failed");
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    throw error;
  }
}

export async function handleSignUp(first, last, email, password) {
  const response = await fetch(API_REG, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first, last, email, password }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
}
