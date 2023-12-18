drop policy "Users can delete own profile." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

drop policy "Users can view their own profiles." on "public"."profiles";

alter table "public"."profiles" drop constraint "profiles_username_key";

alter table "public"."profiles" drop constraint "username_length";

drop index if exists "public"."profiles_username_key";

alter table "public"."profiles" drop column "username";

alter table "public"."profiles" alter column "avatar_path" set default '/default.png'::text;

alter table "public"."publications" alter column "beehiiv_publication_id" set default 'unset'::text;

alter table "public"."publications" alter column "logo_path" drop not null;

alter table "public"."publications" alter column "name" set default 'unset'::text;

alter table "public"."publications" alter column "og_image_path" drop not null;

alter table "public"."publications" alter column "subdomain" set default 'unset'::text;

alter table "public"."subscriptions" enable row level security;

CREATE UNIQUE INDEX publications_beehiiv_publication_id_key ON public.publications USING btree (beehiiv_publication_id);

CREATE UNIQUE INDEX publications_custom_domain_key ON public.publications USING btree (custom_domain);

CREATE UNIQUE INDEX publications_subdomain_key ON public.publications USING btree (subdomain);

alter table "public"."publications" add constraint "publications_beehiiv_publication_id_key" UNIQUE using index "publications_beehiiv_publication_id_key";

alter table "public"."publications" add constraint "publications_custom_domain_key" UNIQUE using index "publications_custom_domain_key";

alter table "public"."publications" add constraint "publications_subdomain_key" UNIQUE using index "publications_subdomain_key";

create policy "Users can delete their own profiles"
on "public"."profiles"
as permissive
for delete
to public
using ((auth.uid() = id));


create policy "Users can edit their own profiles"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id))
with check ((auth.uid() = id));


create policy "Users can see their own profiles"
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = id));



