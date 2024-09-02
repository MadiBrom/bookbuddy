const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/";

export async function fetchAllBooks() {
  try {
    const response = await fetch(`${API_URL}/books`);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error("Uh oh, trouble fetching books!", err);
  }
}

export async function fetchSingleBook(id) {
  try {
    const response = await fetch(`${API_URL}/books/${id}`);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error("Uh oh, trouble fetching books!", err);
  }
}

export async function createNewUser(firstname, lastname, email, password) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.error("Oops, something went wrong!", err);
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Login failed");
    }

    return json;
  } catch (err) {
    console.error("Oops, something went wrong during login!", err);
    throw err;
  }
}

export async function fetchUserDetails(token) {
  try {
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || "Failed to fetch user details");
    }
    return json;
  } catch (err) {
    console.error("Error fetching user details:", err);
    throw err;
  }
}

export async function checkBook(bookId, token, available) {
  try {
    const response = await fetch(`${API_URL}/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        available,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to check out the book.");
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.error("Uh oh, trouble checking out the book!", err);
  }
}

export async function returnBook(reservationId, token) {
  try {
    const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to return the book.");
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.error("Uh oh, trouble returning the book!", err);
  }
}

export async function getReservations(token) {
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(json.message || "Failed");
    }
    const json = await response.json();

    return json;
  } catch (err) {
    console.error("Error fetching:", err);
    throw err; // Throw the error to handle it in the component
  }
}
