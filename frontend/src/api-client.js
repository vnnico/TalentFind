const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_URL);

export const createCV = async (formData) => {
  const response = await fetch(`${API_URL}/cv`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  console.log(body);
  return body;
};

export const getProfile = async () => {
  const response = await fetch(`${API_URL}/talent/profile`, {
    credentials: "include",
    method: "GET",
  });

  const body = await response.json();
  if (!response.ok) {
    console.log(body.message);
    throw new Error(body.message);
  }

  return body;
};

export const talentLogin = async (formData) => {
  const response = await fetch(`${API_URL}/talent/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const talentRegister = async (formData) => {
  const response = await fetch(`${API_URL}/talent/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const recruiterLogin = async (formData) => {
  const response = await fetch(`${API_URL}/recruiter/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const recruiterRegister = async (formData) => {
  const response = await fetch(`${API_URL}/recruiter/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_URL}/talent/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid Token");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/talent/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Invalid Token");
  }

  return response.json();
};

export const registerCompany = async (formData) => {
  const response = await fetch(`${API_URL}/company`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};
