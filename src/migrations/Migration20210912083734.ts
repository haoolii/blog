import { Migration } from '@mikro-orm/migrations';

export class Migration20210912083734 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" serial primary key, "parent_id" int4 null, "title" text not null, "slug" text not null, "meta_title" text not null, "content" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "category" add constraint "category_slug_unique" unique ("slug");');

    this.addSql('alter table "post" add column "category_id" int4 not null;');

    this.addSql('alter table "category" add constraint "category_parent_id_foreign" foreign key ("parent_id") references "category" ("id") on update cascade on delete set null;');

    this.addSql('alter table "post" add constraint "post_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;');
  }

}
