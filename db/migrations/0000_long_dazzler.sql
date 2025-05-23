CREATE TABLE IF NOT EXISTS "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"appointment_type" varchar NOT NULL,
	"date" timestamp NOT NULL,
	"duration" integer NOT NULL,
	"status" varchar DEFAULT 'scheduled' NOT NULL,
	"notes" text,
	"care_provider_id" integer,
	"location" varchar DEFAULT 'client_home' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"postcode" text NOT NULL,
	"service_needed" text NOT NULL,
	"care_frequency" text NOT NULL,
	"start_date" text NOT NULL,
	"additional_info" text,
	"contact_preference" text NOT NULL,
	"hear_about_us" text,
	"data_consent" boolean NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "care_providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"title" varchar NOT NULL,
	"specialization" varchar,
	"bio" text,
	"image_url" varchar,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"service" text,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "detailed_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"personal_details" json NOT NULL,
	"further_information" json NOT NULL,
	"next_of_kin" json NOT NULL,
	"fitness_for_work" json NOT NULL,
	"disabilities" json NOT NULL,
	"education" json NOT NULL,
	"employment_history" json NOT NULL,
	"supporting_statement" text NOT NULL,
	"equality_act" text NOT NULL,
	"referees" json NOT NULL,
	"terms_and_conditions" boolean NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"postcode" text NOT NULL,
	"position" text NOT NULL,
	"experience" text NOT NULL,
	"availability" text NOT NULL,
	"drivers_license" text NOT NULL,
	"right_to_work" text NOT NULL,
	"cover_letter" text NOT NULL,
	"cv_file_name" text,
	"reference_contact" boolean NOT NULL,
	"data_consent" boolean NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_features" (
	"id" serial PRIMARY KEY NOT NULL,
	"service_id" integer NOT NULL,
	"feature" text NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"author" text NOT NULL,
	"relationship" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"preferences" jsonb,
	"phone" varchar,
	"address" varchar,
	"city" varchar,
	"postcode" varchar,
	"emergency_contact_name" varchar,
	"emergency_contact_phone" varchar,
	"medical_conditions" text,
	"allergies" text,
	"medications" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_features" ADD CONSTRAINT "service_features_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" USING btree ("expire");