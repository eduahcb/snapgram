CREATE TABLE "comment" (
	"id" bigserial PRIMARY KEY,
	"uuid" uuid NOT NULL UNIQUE,
	"post_id" bigint NOT NULL,
	"user_id" integer NOT NULL,
	"parent_comment_id" bigint,
	"text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comment_like" (
	"user_id" integer,
	"comment_id" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "comment_like_pkey" PRIMARY KEY("user_id","comment_id")
);
--> statement-breakpoint
CREATE TABLE "follow" (
	"follower_id" integer,
	"following_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "follow_pkey" PRIMARY KEY("follower_id","following_id"),
	CONSTRAINT "no_self_follow" CHECK ("follower_id" <> "following_id")
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" bigserial PRIMARY KEY,
	"uuid" uuid NOT NULL UNIQUE,
	"author_id" integer NOT NULL,
	"image_key" text NOT NULL,
	"caption" text,
	"location" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_like" (
	"user_id" integer,
	"post_id" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_like_pkey" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
CREATE TABLE "post_save" (
	"user_id" integer,
	"post_id" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_save_pkey" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
CREATE TABLE "post_tag" (
	"post_id" bigint,
	"tag_id" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "post_tag_pkey" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" bigserial PRIMARY KEY,
	"name" text NOT NULL UNIQUE
);
--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id");--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_parent_comment_id_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comment"("id");--> statement-breakpoint
ALTER TABLE "comment_like" ADD CONSTRAINT "comment_like_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "comment_like" ADD CONSTRAINT "comment_like_comment_id_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comment"("id");--> statement-breakpoint
ALTER TABLE "follow" ADD CONSTRAINT "follow_follower_id_user_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "follow" ADD CONSTRAINT "follow_following_id_user_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_author_id_user_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_post_id_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id");--> statement-breakpoint
ALTER TABLE "post_save" ADD CONSTRAINT "post_save_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "post_save" ADD CONSTRAINT "post_save_post_id_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id");--> statement-breakpoint
ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_post_id_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id");--> statement-breakpoint
ALTER TABLE "post_tag" ADD CONSTRAINT "post_tag_tag_id_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id");