import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('ru', 'en');
  CREATE TYPE "public"."enum_team_members_role_type" AS ENUM('teacher', 'administration', 'staff');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'in-progress', 'resolved', 'spam');
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"featured_image_id" integer,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"cover_image_id" integer,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"is_featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_locales" (
  	"title" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"role_type" "enum_team_members_role_type" DEFAULT 'teacher' NOT NULL,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_locales" (
  	"position" varchar NOT NULL,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"status" "enum_contact_submissions_status" DEFAULT 'new' NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_header_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_header_navigation_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "site_settings_footer_navigation_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT true
  );
  
  CREATE TABLE "site_settings_social_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"logo_light_id" integer,
  	"phone" varchar,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"school_name" varchar NOT NULL,
  	"school_subtitle" varchar,
  	"footer_quick_links_title" varchar NOT NULL,
  	"footer_social_title" varchar NOT NULL,
  	"footer_address_title" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer NOT NULL,
  	"hero_primary_c_t_a_href" varchar NOT NULL,
  	"about_preview_image_id" integer NOT NULL,
  	"about_preview_cta_href" varchar NOT NULL,
  	"student_life_preview_image_id" integer NOT NULL,
  	"student_life_preview_cta_href" varchar NOT NULL,
  	"latest_news_button_href" varchar NOT NULL,
  	"instagram_c_t_a_link_u_r_l" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar NOT NULL,
  	"hero_primary_c_t_a_label" varchar NOT NULL,
  	"about_preview_title" varchar NOT NULL,
  	"about_preview_description" varchar NOT NULL,
  	"about_preview_cta_label" varchar NOT NULL,
  	"student_life_preview_title" varchar NOT NULL,
  	"student_life_preview_description" varchar NOT NULL,
  	"student_life_preview_cta_label" varchar NOT NULL,
  	"latest_news_heading" varchar NOT NULL,
  	"latest_news_button_label" varchar NOT NULL,
  	"instagram_c_t_a_before_link_text" varchar NOT NULL,
  	"instagram_c_t_a_link_label" varchar NOT NULL,
  	"instagram_c_t_a_after_link_text" varchar,
  	"contact_section_title" varchar NOT NULL,
  	"contact_section_description" varchar NOT NULL,
  	"contact_section_submit_button_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_values_section_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "about_page_values_section_values_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"director_section_image_id" integer NOT NULL,
  	"values_section_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar NOT NULL,
  	"director_section_title" varchar NOT NULL,
  	"director_section_description" varchar NOT NULL,
  	"values_section_title" varchar NOT NULL,
  	"administration_section_title" varchar NOT NULL,
  	"administration_section_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "news_page_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "events_page_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "team_page_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "news_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_locales" ADD CONSTRAINT "team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_header_navigation" ADD CONSTRAINT "site_settings_header_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_header_navigation_locales" ADD CONSTRAINT "site_settings_header_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_navigation" ADD CONSTRAINT "site_settings_footer_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_navigation_locales" ADD CONSTRAINT "site_settings_footer_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links_locales" ADD CONSTRAINT "site_settings_social_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_light_id_media_id_fk" FOREIGN KEY ("logo_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_about_preview_image_id_media_id_fk" FOREIGN KEY ("about_preview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_student_life_preview_image_id_media_id_fk" FOREIGN KEY ("student_life_preview_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values_section_values" ADD CONSTRAINT "about_page_values_section_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values_section_values_locales" ADD CONSTRAINT "about_page_values_section_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page_values_section_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_director_section_image_id_media_id_fk" FOREIGN KEY ("director_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_values_section_image_id_media_id_fk" FOREIGN KEY ("values_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_page_locales" ADD CONSTRAINT "news_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_page_locales" ADD CONSTRAINT "events_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_page_locales" ADD CONSTRAINT "team_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_featured_image_idx" ON "news" USING btree ("featured_image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_cover_image_idx" ON "events" USING btree ("cover_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "team_members_slug_idx" ON "team_members" USING btree ("slug");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_members_locales_locale_parent_id_unique" ON "team_members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "site_settings_header_navigation_order_idx" ON "site_settings_header_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_header_navigation_parent_id_idx" ON "site_settings_header_navigation" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_header_navigation_locales_locale_parent_id_uni" ON "site_settings_header_navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_footer_navigation_order_idx" ON "site_settings_footer_navigation" USING btree ("_order");
  CREATE INDEX "site_settings_footer_navigation_parent_id_idx" ON "site_settings_footer_navigation" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_footer_navigation_locales_locale_parent_id_uni" ON "site_settings_footer_navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_social_links_locales_locale_parent_id_unique" ON "site_settings_social_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_light_idx" ON "site_settings" USING btree ("logo_light_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_hero_hero_background_image_idx" ON "homepage" USING btree ("hero_background_image_id");
  CREATE INDEX "homepage_about_preview_about_preview_image_idx" ON "homepage" USING btree ("about_preview_image_id");
  CREATE INDEX "homepage_student_life_preview_student_life_preview_image_idx" ON "homepage" USING btree ("student_life_preview_image_id");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_values_section_values_order_idx" ON "about_page_values_section_values" USING btree ("_order");
  CREATE INDEX "about_page_values_section_values_parent_id_idx" ON "about_page_values_section_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "about_page_values_section_values_locales_locale_parent_id_un" ON "about_page_values_section_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page_director_section_director_section_image_idx" ON "about_page" USING btree ("director_section_image_id");
  CREATE INDEX "about_page_values_section_values_section_image_idx" ON "about_page" USING btree ("values_section_image_id");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "news_page_locales_locale_parent_id_unique" ON "news_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "events_page_locales_locale_parent_id_unique" ON "events_page_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "team_page_locales_locale_parent_id_unique" ON "team_page_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  ALTER TABLE "media" DROP COLUMN "alt";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_header_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_header_navigation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_footer_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_footer_navigation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_values_section_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_values_section_values_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_page_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "team_members_locales" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "site_settings_header_navigation" CASCADE;
  DROP TABLE "site_settings_header_navigation_locales" CASCADE;
  DROP TABLE "site_settings_footer_navigation" CASCADE;
  DROP TABLE "site_settings_footer_navigation_locales" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_social_links_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "about_page_values_section_values" CASCADE;
  DROP TABLE "about_page_values_section_values_locales" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "news_page" CASCADE;
  DROP TABLE "news_page_locales" CASCADE;
  DROP TABLE "events_page" CASCADE;
  DROP TABLE "events_page_locales" CASCADE;
  DROP TABLE "team_page" CASCADE;
  DROP TABLE "team_page_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_news_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk";
  
  DROP INDEX "payload_locked_documents_rels_news_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  DROP INDEX "payload_locked_documents_rels_team_members_id_idx";
  DROP INDEX "payload_locked_documents_rels_contact_submissions_id_idx";
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "news_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_submissions_id";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_team_members_role_type";
  DROP TYPE "public"."enum_contact_submissions_status";`)
}
