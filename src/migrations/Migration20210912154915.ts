import { Migration } from '@mikro-orm/migrations';

export class Migration20210912154915 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop constraint if exists "post_author_id_check";');
    this.addSql('alter table "post" alter column "author_id" type varchar(255) using ("author_id"::varchar(255));');
    this.addSql('alter table "post" alter column "author_id" drop not null;');
  }

}
