import { Migration } from '@mikro-orm/migrations';

export class Migration20210912082252 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tag" ("id" serial primary key, "title" text not null, "slug" text not null, "meta_title" text not null, "content" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "tag" add constraint "tag_slug_unique" unique ("slug");');

    this.addSql('create table "post" ("id" serial primary key, "author_id" int4 not null, "title" text not null, "slug" text not null, "meta_title" text not null, "content" text not null, "published_at" timestamptz(0) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "post" add constraint "post_slug_unique" unique ("slug");');

    this.addSql('create table "post_tags" ("post_id" int4 not null, "tag_id" int4 not null);');
    this.addSql('alter table "post_tags" add constraint "post_tags_pkey" primary key ("post_id", "tag_id");');

    this.addSql('alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "post_tags" add constraint "post_tags_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "post_tags" add constraint "post_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;');
  }

}
