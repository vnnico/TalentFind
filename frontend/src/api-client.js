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

export const getCompany = async () => {
  const response = await fetch(`${API_URL}/company`, {
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const updateCompany = async (formData) => {
  const response = await fetch(`${API_URL}/company`, {
    method: "PUT",
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

export const getAllJobPosts = async () => {
  const response = await fetch(`${API_URL}/job`, {
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const getAllJobApplication = async () => {
  const response = await fetch(`${API_URL}/application`, {
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const applyJob = async (jobPostID) => {
  const response = await fetch(`${API_URL}/job/${jobPostID}/apply`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const postJob = async (formData) => {
  const response = await fetch(`${API_URL}/job`, {
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

export const getPostedJob = async () => {
  const response = await fetch(`${API_URL}/job/company`, {
    method: "GET",
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const getAllTalents = async () => {
  const response = await fetch(`${API_URL}/talent`, {
    credentials: "include",
  });

  const body = await response.json();
  console.log("HAHAHA");
  console.log(body);
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const getListApplicant = async (params) => {
  const jobPostID = params.queryKey[1];
  const response = await fetch(`${API_URL}/job/${jobPostID}/apply`, {
    credentials: "include",
  });

  const body = await response.json();
  console.log(body);
  if (!response.ok) {
    throw new Error(body.message);
  }

  return body;
};

export const analyzeCV = async (fileData) => {
  const formData = new FormData();
  formData.append("file", fileData);

  const response = await fetch(`${API_URL}/cv/analyze`, {
    method: "POST",
    credentials: "include",

    body: formData,
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);

  return body;
};

export const getCV = async () => {
  const response = await fetch(`${API_URL}/cv`, {
    credentials: "include",
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);

  return body;
};

export const findRecommendedTalent = async (formData) => {
  const response = await fetch(`${API_URL}/recruiter/hire`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) throw new Error(body.message);

  return body;
};
