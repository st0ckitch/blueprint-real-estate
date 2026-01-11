export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      apartment_feature_assignments: {
        Row: {
          apartment_id: string
          feature_id: string
          id: string
        }
        Insert: {
          apartment_id: string
          feature_id: string
          id?: string
        }
        Update: {
          apartment_id?: string
          feature_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "apartment_feature_assignments_apartment_id_fkey"
            columns: ["apartment_id"]
            isOneToOne: false
            referencedRelation: "apartments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apartment_feature_assignments_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "apartment_features"
            referencedColumns: ["id"]
          },
        ]
      }
      apartment_features: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name_en: string
          name_ka: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name_en: string
          name_ka: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name_en?: string
          name_ka?: string
        }
        Relationships: []
      }
      apartments: {
        Row: {
          area: number | null
          balcony_area: number | null
          bathrooms: number | null
          bedrooms: number | null
          created_at: string
          floor: number | null
          floor_plan_url: string | null
          id: string
          image_url: string | null
          is_active: boolean
          living_area: number | null
          price: number | null
          project_id: string
          rooms: number | null
          sort_order: number | null
          status: Database["public"]["Enums"]["apartment_status_type"]
          title_en: string | null
          title_ka: string | null
          updated_at: string
        }
        Insert: {
          area?: number | null
          balcony_area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          floor?: number | null
          floor_plan_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          living_area?: number | null
          price?: number | null
          project_id: string
          rooms?: number | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["apartment_status_type"]
          title_en?: string | null
          title_ka?: string | null
          updated_at?: string
        }
        Update: {
          area?: number | null
          balcony_area?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string
          floor?: number | null
          floor_plan_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          living_area?: number | null
          price?: number | null
          project_id?: string
          rooms?: number | null
          sort_order?: number | null
          status?: Database["public"]["Enums"]["apartment_status_type"]
          title_en?: string | null
          title_ka?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "apartments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      banners: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_active: boolean
          link_url: string | null
          sort_order: number | null
          title_en: string | null
          title_ka: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean
          link_url?: string | null
          sort_order?: number | null
          title_en?: string | null
          title_ka?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean
          link_url?: string | null
          sort_order?: number | null
          title_en?: string | null
          title_ka?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name_en: string
          name_ka: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name_en: string
          name_ka: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name_en?: string
          name_ka?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          category_id: string | null
          content_en: string | null
          content_ka: string | null
          created_at: string
          excerpt_en: string | null
          excerpt_ka: string | null
          focus_keyword: string | null
          id: string
          image_url: string | null
          is_active: boolean
          meta_description_en: string | null
          meta_description_ka: string | null
          meta_title_en: string | null
          meta_title_ka: string | null
          read_time: number | null
          seo_score: number | null
          slug: string
          title_en: string
          title_ka: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          content_en?: string | null
          content_ka?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_ka?: string | null
          focus_keyword?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          meta_description_en?: string | null
          meta_description_ka?: string | null
          meta_title_en?: string | null
          meta_title_ka?: string | null
          read_time?: number | null
          seo_score?: number | null
          slug: string
          title_en: string
          title_ka: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          content_en?: string | null
          content_ka?: string | null
          created_at?: string
          excerpt_en?: string | null
          excerpt_ka?: string | null
          focus_keyword?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          meta_description_en?: string | null
          meta_description_ka?: string | null
          meta_title_en?: string | null
          meta_title_ka?: string | null
          read_time?: number | null
          seo_score?: number | null
          slug?: string
          title_en?: string
          title_ka?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tag_assignments: {
        Row: {
          id: string
          project_id: string
          tag_id: string
        }
        Insert: {
          id?: string
          project_id: string
          tag_id: string
        }
        Update: {
          id?: string
          project_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tag_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tag_assignments_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "project_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tags: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name_en: string
          name_ka: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name_en: string
          name_ka: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name_en?: string
          name_ka?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          address_en: string | null
          address_ka: string | null
          available_units: number | null
          completion_date: string | null
          created_at: string
          description_en: string | null
          description_ka: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name_en: string
          name_ka: string
          price_from: number | null
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["project_status_type"]
          total_units: number | null
          updated_at: string
        }
        Insert: {
          address_en?: string | null
          address_ka?: string | null
          available_units?: number | null
          completion_date?: string | null
          created_at?: string
          description_en?: string | null
          description_ka?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name_en: string
          name_ka: string
          price_from?: number | null
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["project_status_type"]
          total_units?: number | null
          updated_at?: string
        }
        Update: {
          address_en?: string | null
          address_ka?: string | null
          available_units?: number | null
          completion_date?: string | null
          created_at?: string
          description_en?: string | null
          description_ka?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name_en?: string
          name_ka?: string
          price_from?: number | null
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["project_status_type"]
          total_units?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          label_en: string | null
          label_ka: string | null
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          label_en?: string | null
          label_ka?: string | null
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          label_en?: string | null
          label_ka?: string | null
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      apartment_status_type: "available" | "reserved" | "sold"
      app_role: "admin" | "moderator" | "user"
      project_status_type: "ongoing" | "completed" | "upcoming"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      apartment_status_type: ["available", "reserved", "sold"],
      app_role: ["admin", "moderator", "user"],
      project_status_type: ["ongoing", "completed", "upcoming"],
    },
  },
} as const
