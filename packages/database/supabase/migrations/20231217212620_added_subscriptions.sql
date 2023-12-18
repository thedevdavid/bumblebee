create table "public"."plans" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "product_id" text not null,
    "variant_id" text not null,
    "name" text,
    "description" text,
    "variant_name" text not null,
    "sort" smallint not null,
    "status" text not null,
    "price" smallint not null,
    "interval" text not null,
    "interval_count" smallint not null default '1'::smallint
);


alter table "public"."plans" enable row level security;

create table "public"."subscriptions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "lemonsqueezy_id" bigint not null,
    "order_id" bigint not null,
    "name" text not null,
    "email" text not null,
    "status" text not null,
    "renews_at" timestamp with time zone,
    "ends_at" timestamp with time zone,
    "trial_ends_at" timestamp with time zone,
    "resumes_at" timestamp with time zone,
    "price" smallint not null,
    "is_usage_based" boolean not null default false,
    "subscription_item_id" bigint,
    "user_id" uuid,
    "plan_id" uuid
);


create table "public"."webhook_event" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "event_name" text not null,
    "processed" boolean not null default false,
    "body" jsonb not null
);


alter table "public"."webhook_event" enable row level security;

alter table "public"."profiles" add column "billing_address" jsonb;

alter table "public"."profiles" add column "payment_method" jsonb;

CREATE UNIQUE INDEX plans_pkey ON public.plans USING btree (id);

CREATE UNIQUE INDEX plans_variant_id_key ON public.plans USING btree (variant_id);

CREATE UNIQUE INDEX subscriptions_lemonsqueezy_id_key ON public.subscriptions USING btree (lemonsqueezy_id);

CREATE UNIQUE INDEX subscriptions_order_id_key ON public.subscriptions USING btree (order_id);

CREATE UNIQUE INDEX subscriptions_pkey ON public.subscriptions USING btree (id);

CREATE UNIQUE INDEX subscriptions_subscription_item_id_key ON public.subscriptions USING btree (subscription_item_id);

CREATE UNIQUE INDEX webhook_event_pkey ON public.webhook_event USING btree (id);

alter table "public"."plans" add constraint "plans_pkey" PRIMARY KEY using index "plans_pkey";

alter table "public"."subscriptions" add constraint "subscriptions_pkey" PRIMARY KEY using index "subscriptions_pkey";

alter table "public"."webhook_event" add constraint "webhook_event_pkey" PRIMARY KEY using index "webhook_event_pkey";

alter table "public"."plans" add constraint "plans_variant_id_key" UNIQUE using index "plans_variant_id_key";

alter table "public"."subscriptions" add constraint "subscriptions_lemonsqueezy_id_key" UNIQUE using index "subscriptions_lemonsqueezy_id_key";

alter table "public"."subscriptions" add constraint "subscriptions_order_id_key" UNIQUE using index "subscriptions_order_id_key";

alter table "public"."subscriptions" add constraint "subscriptions_plan_id_fkey" FOREIGN KEY (plan_id) REFERENCES plans(id) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_plan_id_fkey";

alter table "public"."subscriptions" add constraint "subscriptions_subscription_item_id_key" UNIQUE using index "subscriptions_subscription_item_id_key";

alter table "public"."subscriptions" add constraint "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_user_id_fkey";

grant delete on table "public"."plans" to "anon";

grant insert on table "public"."plans" to "anon";

grant references on table "public"."plans" to "anon";

grant select on table "public"."plans" to "anon";

grant trigger on table "public"."plans" to "anon";

grant truncate on table "public"."plans" to "anon";

grant update on table "public"."plans" to "anon";

grant delete on table "public"."plans" to "authenticated";

grant insert on table "public"."plans" to "authenticated";

grant references on table "public"."plans" to "authenticated";

grant select on table "public"."plans" to "authenticated";

grant trigger on table "public"."plans" to "authenticated";

grant truncate on table "public"."plans" to "authenticated";

grant update on table "public"."plans" to "authenticated";

grant delete on table "public"."plans" to "service_role";

grant insert on table "public"."plans" to "service_role";

grant references on table "public"."plans" to "service_role";

grant select on table "public"."plans" to "service_role";

grant trigger on table "public"."plans" to "service_role";

grant truncate on table "public"."plans" to "service_role";

grant update on table "public"."plans" to "service_role";

grant delete on table "public"."subscriptions" to "anon";

grant insert on table "public"."subscriptions" to "anon";

grant references on table "public"."subscriptions" to "anon";

grant select on table "public"."subscriptions" to "anon";

grant trigger on table "public"."subscriptions" to "anon";

grant truncate on table "public"."subscriptions" to "anon";

grant update on table "public"."subscriptions" to "anon";

grant delete on table "public"."subscriptions" to "authenticated";

grant insert on table "public"."subscriptions" to "authenticated";

grant references on table "public"."subscriptions" to "authenticated";

grant select on table "public"."subscriptions" to "authenticated";

grant trigger on table "public"."subscriptions" to "authenticated";

grant truncate on table "public"."subscriptions" to "authenticated";

grant update on table "public"."subscriptions" to "authenticated";

grant delete on table "public"."subscriptions" to "service_role";

grant insert on table "public"."subscriptions" to "service_role";

grant references on table "public"."subscriptions" to "service_role";

grant select on table "public"."subscriptions" to "service_role";

grant trigger on table "public"."subscriptions" to "service_role";

grant truncate on table "public"."subscriptions" to "service_role";

grant update on table "public"."subscriptions" to "service_role";

grant delete on table "public"."webhook_event" to "anon";

grant insert on table "public"."webhook_event" to "anon";

grant references on table "public"."webhook_event" to "anon";

grant select on table "public"."webhook_event" to "anon";

grant trigger on table "public"."webhook_event" to "anon";

grant truncate on table "public"."webhook_event" to "anon";

grant update on table "public"."webhook_event" to "anon";

grant delete on table "public"."webhook_event" to "authenticated";

grant insert on table "public"."webhook_event" to "authenticated";

grant references on table "public"."webhook_event" to "authenticated";

grant select on table "public"."webhook_event" to "authenticated";

grant trigger on table "public"."webhook_event" to "authenticated";

grant truncate on table "public"."webhook_event" to "authenticated";

grant update on table "public"."webhook_event" to "authenticated";

grant delete on table "public"."webhook_event" to "service_role";

grant insert on table "public"."webhook_event" to "service_role";

grant references on table "public"."webhook_event" to "service_role";

grant select on table "public"."webhook_event" to "service_role";

grant trigger on table "public"."webhook_event" to "service_role";

grant truncate on table "public"."webhook_event" to "service_role";

grant update on table "public"."webhook_event" to "service_role";


