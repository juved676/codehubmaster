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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_config: {
        Row: {
          api_key_name: string
          created_at: string | null
          id: string
          model: string | null
          provider: string | null
          status: string | null
        }
        Insert: {
          api_key_name?: string
          created_at?: string | null
          id?: string
          model?: string | null
          provider?: string | null
          status?: string | null
        }
        Update: {
          api_key_name?: string
          created_at?: string | null
          id?: string
          model?: string | null
          provider?: string | null
          status?: string | null
        }
        Relationships: []
      }
      ai_conversations: {
        Row: {
          answer: string | null
          confidence_level: number | null
          created_at: string | null
          id: string
          question: string
          sources: string[] | null
          topic_id: string | null
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          confidence_level?: number | null
          created_at?: string | null
          id?: string
          question: string
          sources?: string[] | null
          topic_id?: string | null
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          confidence_level?: number | null
          created_at?: string | null
          id?: string
          question?: string
          sources?: string[] | null
          topic_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      answers: {
        Row: {
          ai_provider: string | null
          ai_response_raw: Json | null
          answer_text: string
          confidence_score: number | null
          created_at: string
          id: string
          published: boolean
          question_id: string
          requires_review: boolean
          sources_used: Json | null
          summary_text: string | null
          updated_at: string
        }
        Insert: {
          ai_provider?: string | null
          ai_response_raw?: Json | null
          answer_text: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          published?: boolean
          question_id: string
          requires_review?: boolean
          sources_used?: Json | null
          summary_text?: string | null
          updated_at?: string
        }
        Update: {
          ai_provider?: string | null
          ai_response_raw?: Json | null
          answer_text?: string
          confidence_score?: number | null
          created_at?: string
          id?: string
          published?: boolean
          question_id?: string
          requires_review?: boolean
          sources_used?: Json | null
          summary_text?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions_public"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          created_at: string
          details: Json | null
          event_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          details?: Json | null
          event_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          details?: Json | null
          event_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          expires_at: string
          id: string
          payment_method: string
          payment_status: string
          plan_id: string | null
          updated_at: string
          upi_ref: string | null
          upi_transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          expires_at?: string
          id?: string
          payment_method?: string
          payment_status?: string
          plan_id?: string | null
          updated_at?: string
          upi_ref?: string | null
          upi_transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          expires_at?: string
          id?: string
          payment_method?: string
          payment_status?: string
          plan_id?: string | null
          updated_at?: string
          upi_ref?: string | null
          upi_transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans_public"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          preferred_language: string | null
          study_level: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          preferred_language?: string | null
          study_level?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          preferred_language?: string | null
          study_level?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          audience_level: Database["public"]["Enums"]["audience_level"]
          body: string
          created_at: string
          id: string
          language: Database["public"]["Enums"]["language_type"]
          status: Database["public"]["Enums"]["question_status"]
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          audience_level?: Database["public"]["Enums"]["audience_level"]
          body: string
          created_at?: string
          id?: string
          language?: Database["public"]["Enums"]["language_type"]
          status?: Database["public"]["Enums"]["question_status"]
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          audience_level?: Database["public"]["Enums"]["audience_level"]
          body?: string
          created_at?: string
          id?: string
          language?: Database["public"]["Enums"]["language_type"]
          status?: Database["public"]["Enums"]["question_status"]
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          answer_id: string
          created_at: string
          id: string
          notes: string | null
          reviewer_id: string
          verdict: Database["public"]["Enums"]["review_verdict"] | null
        }
        Insert: {
          answer_id: string
          created_at?: string
          id?: string
          notes?: string | null
          reviewer_id: string
          verdict?: Database["public"]["Enums"]["review_verdict"] | null
        }
        Update: {
          answer_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          reviewer_id?: string
          verdict?: Database["public"]["Enums"]["review_verdict"] | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answers_public"
            referencedColumns: ["id"]
          },
        ]
      }
      secure_audit_logs: {
        Row: {
          action_type: string
          created_at: string | null
          id: string
          input_data: string | null
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: string
          input_data?: string | null
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: string
          input_data?: string | null
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      seo_metadata: {
        Row: {
          canonical_url: string | null
          created_at: string | null
          description: string | null
          id: string
          keywords: string[] | null
          og_image: string | null
          page_url: string
          title: string
          updated_at: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          keywords?: string[] | null
          og_image?: string | null
          page_url: string
          title: string
          updated_at?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          keywords?: string[] | null
          og_image?: string | null
          page_url?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sources: {
        Row: {
          citation: string | null
          contributor: string | null
          id: string
          text_snippet: string | null
          title: string
          trust_level: string | null
          type: string | null
        }
        Insert: {
          citation?: string | null
          contributor?: string | null
          id?: string
          text_snippet?: string | null
          title: string
          trust_level?: string | null
          type?: string | null
        }
        Update: {
          citation?: string | null
          contributor?: string | null
          id?: string
          text_snippet?: string | null
          title?: string
          trust_level?: string | null
          type?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          credits_per_period: number | null
          discounted_price: number | null
          duration_days: number | null
          features: string[] | null
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          original_price: number | null
          periods_per_month: number | null
        }
        Insert: {
          created_at?: string | null
          credits_per_period?: number | null
          discounted_price?: number | null
          duration_days?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          original_price?: number | null
          periods_per_month?: number | null
        }
        Update: {
          created_at?: string | null
          credits_per_period?: number | null
          discounted_price?: number | null
          duration_days?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          original_price?: number | null
          periods_per_month?: number | null
        }
        Relationships: []
      }
      topics: {
        Row: {
          category: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          credits_remaining: number
          current_period: number
          expires_at: string
          id: string
          payment_id: string | null
          period_start_date: string
          plan_id: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          credits_remaining?: number
          current_period?: number
          expires_at: string
          id?: string
          payment_id?: string | null
          period_start_date?: string
          plan_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          credits_remaining?: number
          current_period?: number
          expires_at?: string
          id?: string
          payment_id?: string | null
          period_start_date?: string
          plan_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans_public"
            referencedColumns: ["id"]
          },
        ]
      }
      user_usage: {
        Row: {
          created_at: string | null
          credits_used_current_period: number | null
          current_period_number: number | null
          id: string
          last_period_reset: string | null
          plan_id: string | null
          status: string | null
          subscription_start: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credits_used_current_period?: number | null
          current_period_number?: number | null
          id?: string
          last_period_reset?: string | null
          plan_id?: string | null
          status?: string | null
          subscription_start?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          credits_used_current_period?: number | null
          current_period_number?: number | null
          id?: string
          last_period_reset?: string | null
          plan_id?: string | null
          status?: string | null
          subscription_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_usage_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_usage_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans_public"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      answers_public: {
        Row: {
          answer_text: string | null
          created_at: string | null
          id: string | null
          published: boolean | null
          question_id: string | null
          summary_text: string | null
          updated_at: string | null
        }
        Insert: {
          answer_text?: string | null
          created_at?: string | null
          id?: string | null
          published?: boolean | null
          question_id?: string | null
          summary_text?: string | null
          updated_at?: string | null
        }
        Update: {
          answer_text?: string | null
          created_at?: string | null
          id?: string | null
          published?: boolean | null
          question_id?: string | null
          summary_text?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions_public"
            referencedColumns: ["id"]
          },
        ]
      }
      questions_public: {
        Row: {
          audience_level: Database["public"]["Enums"]["audience_level"] | null
          body: string | null
          created_at: string | null
          id: string | null
          language: Database["public"]["Enums"]["language_type"] | null
          status: Database["public"]["Enums"]["question_status"] | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          audience_level?: Database["public"]["Enums"]["audience_level"] | null
          body?: string | null
          created_at?: string | null
          id?: string | null
          language?: Database["public"]["Enums"]["language_type"] | null
          status?: Database["public"]["Enums"]["question_status"] | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          audience_level?: Database["public"]["Enums"]["audience_level"] | null
          body?: string | null
          created_at?: string | null
          id?: string | null
          language?: Database["public"]["Enums"]["language_type"] | null
          status?: Database["public"]["Enums"]["question_status"] | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscription_plans_public: {
        Row: {
          credits_per_period: number | null
          discounted_price: number | null
          features: string[] | null
          id: string | null
          is_popular: boolean | null
          name: string | null
          periods_per_month: number | null
        }
        Insert: {
          credits_per_period?: number | null
          discounted_price?: number | null
          features?: string[] | null
          id?: string | null
          is_popular?: boolean | null
          name?: string | null
          periods_per_month?: number | null
        }
        Update: {
          credits_per_period?: number | null
          discounted_price?: number | null
          features?: string[] | null
          id?: string | null
          is_popular?: boolean | null
          name?: string | null
          periods_per_month?: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      ask_question_with_credits: {
        Args: { question_text: string; user_uuid: string }
        Returns: Json
      }
      can_user_purchase: { Args: { user_uuid: string }; Returns: boolean }
      check_user_credits: { Args: { user_uuid: string }; Returns: Json }
      cleanup_expired_payments: { Args: never; Returns: undefined }
      get_ai_answer: {
        Args: { requesting_user_id?: string; user_question: string }
        Returns: {
          answer_text: string
          confidence: number
          sources: string[]
        }[]
      }
      get_current_period: { Args: never; Returns: number }
      get_user_credits_detailed: { Args: { user_uuid: string }; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      initiate_upi_payment: {
        Args: { plan_uuid: string; user_uuid: string }
        Returns: Json
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_admin_email: { Args: { user_email: string }; Returns: boolean }
      manage_topic: {
        Args: {
          action_type: string
          topic_category?: string
          topic_description?: string
          topic_id?: string
          topic_name?: string
          topic_tags?: string[]
        }
        Returns: string
      }
      mark_expired_subscriptions: { Args: never; Returns: undefined }
      update_seo_metadata: {
        Args: {
          page_description: string
          page_keywords: string[]
          page_title: string
          page_url: string
        }
        Returns: string
      }
      update_user_credits: {
        Args: { credits_to_use: number; user_id: string }
        Returns: number
      }
      validate_user_input: { Args: { input_text: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      audience_level: "school" | "college" | "research"
      language_type: "english" | "urdu" | "arabic"
      question_status: "draft" | "published" | "pending_review" | "flagged"
      review_verdict: "approve" | "reject" | "edit"
      source_type: "quran" | "hadith" | "tafsir" | "book" | "url"
      user_role: "user" | "reviewer" | "admin"
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
      app_role: ["admin", "moderator", "user"],
      audience_level: ["school", "college", "research"],
      language_type: ["english", "urdu", "arabic"],
      question_status: ["draft", "published", "pending_review", "flagged"],
      review_verdict: ["approve", "reject", "edit"],
      source_type: ["quran", "hadith", "tafsir", "book", "url"],
      user_role: ["user", "reviewer", "admin"],
    },
  },
} as const
