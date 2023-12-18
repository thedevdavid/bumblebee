export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          interval: string
          interval_count: number
          name: string | null
          price: number
          product_id: string
          sort: number
          status: string
          updated_at: string | null
          variant_id: string
          variant_name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          interval: string
          interval_count?: number
          name?: string | null
          price: number
          product_id: string
          sort: number
          status: string
          updated_at?: string | null
          variant_id: string
          variant_name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          interval?: string
          interval_count?: number
          name?: string | null
          price?: number
          product_id?: string
          sort?: number
          status?: string
          updated_at?: string | null
          variant_id?: string
          variant_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          beehiiv_api_key: string | null
          billing_address: Json | null
          email: string | null
          id: string
          onboarding_finished: boolean
          payment_method: Json | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          beehiiv_api_key?: string | null
          billing_address?: Json | null
          email?: string | null
          id: string
          onboarding_finished?: boolean
          payment_method?: Json | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          beehiiv_api_key?: string | null
          billing_address?: Json | null
          email?: string | null
          id?: string
          onboarding_finished?: boolean
          payment_method?: Json | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      publications: {
        Row: {
          about_content: string | null
          beehiiv_publication_id: string
          created_at: string
          custom_domain: string | null
          font: string
          id: string
          logo_url: string | null
          name: string
          not_found_content: string | null
          og_image_url: string
          profile_id: string
          subdomain: string
          updated_at: string | null
        }
        Insert: {
          about_content?: string | null
          beehiiv_publication_id?: string
          created_at?: string
          custom_domain?: string | null
          font?: string
          id?: string
          logo_url?: string | null
          name?: string
          not_found_content?: string | null
          og_image_url: string
          profile_id: string
          subdomain?: string
          updated_at?: string | null
        }
        Update: {
          about_content?: string | null
          beehiiv_publication_id?: string
          created_at?: string
          custom_domain?: string | null
          font?: string
          id?: string
          logo_url?: string | null
          name?: string
          not_found_content?: string | null
          og_image_url?: string
          profile_id?: string
          subdomain?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "publications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          email: string
          ends_at: string | null
          id: string
          is_usage_based: boolean
          lemonsqueezy_id: number
          name: string
          order_id: number
          plan_id: string | null
          price: number
          renews_at: string | null
          resumes_at: string | null
          status: string
          subscription_item_id: number | null
          trial_ends_at: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          ends_at?: string | null
          id?: string
          is_usage_based?: boolean
          lemonsqueezy_id: number
          name: string
          order_id: number
          plan_id?: string | null
          price: number
          renews_at?: string | null
          resumes_at?: string | null
          status: string
          subscription_item_id?: number | null
          trial_ends_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          ends_at?: string | null
          id?: string
          is_usage_based?: boolean
          lemonsqueezy_id?: number
          name?: string
          order_id?: number
          plan_id?: string | null
          price?: number
          renews_at?: string | null
          resumes_at?: string | null
          status?: string
          subscription_item_id?: number | null
          trial_ends_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      webhook_event: {
        Row: {
          body: Json
          created_at: string
          event_name: string
          id: string
          processed: boolean
        }
        Insert: {
          body: Json
          created_at?: string
          event_name: string
          id?: string
          processed?: boolean
        }
        Update: {
          body?: Json
          created_at?: string
          event_name?: string
          id?: string
          processed?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

