import { Migration } from '@mikro-orm/migrations';

export class Migration20210912152001 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" varchar(255) not null, "parent_id" varchar(255) null, "title" text not null, "slug" text not null, "meta_title" text not null, "content" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "category" add constraint "category_pkey" primary key ("id");');
    this.addSql('alter table "category" add constraint "category_slug_unique" unique ("slug");');

    this.addSql('create table "tag" ("id" varchar(255) not null, "title" text not null, "slug" text not null, "meta_title" text not null, "content" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "tag" add constraint "tag_pkey" primary key ("id");');
    this.addSql('alter table "tag" add constraint "tag_slug_unique" unique ("slug");');

    this.addSql('create table "user" ("id" varchar(255) not null, "name" text not null, "email" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "post" ("id" varchar(255) not null, "author_id" varchar(255) not null, "title" text not null, "slug" text not null, "meta_title" text not null, "content" text not null, "category_id" varchar(255) not null, "published_at" timestamptz(0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "post" add constraint "post_pkey" primary key ("id");');
    this.addSql('alter table "post" add constraint "post_slug_unique" unique ("slug");');

    this.addSql('create table "post_tags" ("post_id" varchar(255) not null, "tag_id" varchar(255) not null);');
    this.addSql('alter table "post_tags" add constraint "post_tags_pkey" primary key ("post_id", "tag_id");');

    this.addSql('alter table "category" add constraint "category_parent_id_foreign" foreign key ("parent_id") references "category" ("id") on update cascade on delete set null;');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "post" add constraint "post_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;');

    this.addSql('alter table "post_tags" add constraint "post_tags_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "post_tags" add constraint "post_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
