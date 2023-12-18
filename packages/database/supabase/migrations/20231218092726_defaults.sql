create type "public"."template_types" as enum ('default', 'modern', 'brutalist');

alter table "public"."publications" drop constraint "publications_profile_id_fkey";

alter table "public"."profiles" drop column "onboarding_finished";

alter table "public"."profiles" add column "avatar_path" text default ''::text;

alter table "public"."publications" drop column "font";

alter table "public"."publications" drop column "logo_url";

alter table "public"."publications" drop column "og_image_url";

alter table "public"."publications" add column "logo_path" text not null;

alter table "public"."publications" add column "og_image_path" text not null;

alter table "public"."publications" add column "template" template_types not null default 'default'::template_types;

alter table "public"."publications" add column "theme" jsonb;

alter table "public"."publications" add constraint "publications_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) not valid;

alter table "public"."publications" validate constraint "publications_profile_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.raw_user_meta_data->>'email');
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";