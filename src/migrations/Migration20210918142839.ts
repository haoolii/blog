import { Migration } from '@mikro-orm/migrations';

export class Migration20210918142839 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tag" add constraint "tag_title_unique" unique ("title");');
  }

}
