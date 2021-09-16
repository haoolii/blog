import { Migration } from '@mikro-orm/migrations';

export class Migration20210912154645 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop constraint if exists "post_category_id_check";');
    this.addSql('alter table "post" alter column "category_id" type varchar(255) using ("category_id"::varchar(255));');
    this.addSql('alter table "post" alter column "category_id" drop not null;');
  }

}
