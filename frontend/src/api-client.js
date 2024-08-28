const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_URL);

export const createCV = async (formData) => {
  const response = await fetch(`${API_URL}/cv`, {
    method: "POST",
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  } else {
    localStorage.setItem("token", body.token);
    localStorage.setItem("userId", body.talentId);
    localStorage.setItem("role", body.role);
  }

  return body;
};

export const recruiterLogin = async (formData) => {
  const response = await fetch(`${API_URL}/recruiter/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  } else {
    localStorage.setItem("token", body.token);
    localStorage.setItem("userId", body.recruiterId);
    localStorage.setItem("role", body.role);
  }

  return body;
};