import axios from "axios";
import type { Job, JobCreate, Analytics } from "@/types";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchJobs(): Promise<Job[]> {
  const { data } = await api.get("/JOBS/Read_Jobs");
  return data;
}

export async function fetchJob(id: number): Promise<Job> {
  const { data } = await api.get(`/JOBS/Read_Job/${id}`);
  return data;
}

export async function createJob(job: JobCreate): Promise<Job> {
  const { data } = await api.post("/JOBS/Create_Job", job);
  return data;
}

export async function updateJob(id: number, job: JobCreate): Promise<Job> {
  const { data } = await api.put(`/JOBS/Update_Job/${id}`, job);
  return data;
}

export async function deleteJob(id: number): Promise<void> {
  await api.delete(`/JOBS/Delete_Job/${id}`);
}

export async function fetchAnalytics(): Promise<Analytics> {
  const { data } = await api.get("/JOBS/Analytics");
  return data;
}
