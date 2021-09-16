import { Migration } from '@mikro-orm/migrations';

export class Migration20210916140424 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "category" drop constraint if exists "category_meta_title_check";');
    this.addSql('alter table "category" alter column "meta_title" type text using ("meta_title"::text);');
    this.addSql('alter table "category" alter column "meta_title" drop not null;');
    this.addSql('alter table "category" drop constraint if exists "category_content_check";');
    this.addSql('alter table "category" alter column "content" type text using ("content"::text);');
    this.addSql('alter table "category" alter column "content" drop not null;');
  }

}
