// src/services/authService.ts
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

// Login
export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.session?.user ?? null;
};

// Sign up
export const signUp = async (
  email: string,
  password: string
): Promise<User | null> => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data.user ?? null;
};

// Logout
export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
};
