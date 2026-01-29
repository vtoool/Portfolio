// Supabase database type definitions

export interface Database {
  public: {
    Tables: {
      // Define your database tables here when you implement Supabase
      // For now, this is a placeholder for future database schema
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          tag: string;
          short_description: string;
          description: string;
          tech_stack: string[];
          visual: string;
          status: string;
          grid_size: "large" | "medium" | "small";
          featured: boolean;
          live_url?: string;
          situation: string;
          task: string;
          action: string;
          result: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          tag: string;
          short_description: string;
          description: string;
          tech_stack: string[];
          visual: string;
          status: string;
          grid_size: "large" | "medium" | "small";
          featured?: boolean;
          live_url?: string;
          situation: string;
          task: string;
          action: string;
          result: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          tag?: string;
          short_description?: string;
          description?: string;
          tech_stack?: string[];
          visual?: string;
          status?: string;
          grid_size?: "large" | "medium" | "small";
          featured?: boolean;
          live_url?: string;
          situation?: string;
          task?: string;
          action?: string;
          result?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Database connection and query types
export interface DatabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

export interface QueryResult<T> {
  data: T[] | null;
  error: DatabaseError | null;
  count: number | null;
}

export type SupabaseClient = import('@supabase/supabase-js').SupabaseClient<Database>;