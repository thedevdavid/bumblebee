drop policy "Public profiles are viewable by everyone." on "public"."profiles";

create policy "Everyone can see plans."
on "public"."plans"
as permissive
for select
to public
using (true);


create policy "Users can view their own profiles."
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "Enable delete for users based on user_id"
on "public"."publications"
as permissive
for delete
to public
using ((auth.uid() = profile_id));


create policy "Enable insert for authenticated users only"
on "public"."publications"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."publications"
as permissive
for select
to public
using (true);


create policy "Enable update for users based on user_id"
on "public"."publications"
as permissive
for update
to public
using ((auth.uid() = profile_id))
with check ((auth.uid() = profile_id));


create policy "Users can view their own subscriptions"
on "public"."subscriptions"
as permissive
for select
to public
using ((auth.uid() = user_id));



