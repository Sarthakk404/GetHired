import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchJobs() {
  const { data } = await api.get("/JOBS/Read_Jobs");
  return data;
}

export async function fetchJob(id) {
  const { data } = await api.get(`/JOBS/Read_Job/${id}`);
  return data;
}

export async function createJob(job) {
  const { data } = await api.post("/JOBS/Create_Job", job);
  return data;
}

export async function updateJob(id, job) {
  const { data } = await api.put(`/JOBS/Update_Job/${id}`, job);
  return data;
}

export async function deleteJob(id) {
  await api.delete(`/JOBS/Delete_Job/${id}`);
}

export async function fetchAnalytics() {
  const { data } = await api.get("/JOBS/Analytics");
  return data;
}
